import { Model, Schema, model } from "mongoose";
import { IAddress, IUser, UserInstanceMethods, UserStaticMethods } from "../interfaces/user.interface";
import validator from 'validator';
import bcrypt from "bcryptjs";
import { Note } from "./notes.model";


const addressSchema = new Schema<IAddress>(
    {
        city: { type: String },
        street: { type: String },
        zip: { type: Number }
    }, {
    _id: false
})

const userSchema = new Schema<IUser, UserStaticMethods, UserInstanceMethods>({
    firstName: {
        type: String,
        required: [true, 'first name must be given'],
        trim: true,
        minLength: [3, "First name must be at least 3 characters, got {VALUE}"],
        maxLength: 10,
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        max: 60,
        min: [18, 'Age must be at least 18, got {VALUE}']
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        // mongoose validator
        /*    validate: {
               validator: function (value) {
                   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
               },
               message: function (props) {
                   return `email ${props.value} is not valid`
               }
           } */
        // validator package
        validate: [validator.isEmail,
            "Invalid email {VALUE}"]
        //we don't need to call the function validator.isEmail, Mongoose will do it

    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        uppercase: true,
        enum: {
            values: ['USER', 'ADMIN', 'SUPERADMIN'],
            message: "Role is not valid, got {VALUE} role"
        },
        default: 'USER'
    },
    address: {
        type: addressSchema
    }
}, {
    versionKey: false,
    timestamps: true,
    // to create a virtual
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

userSchema.method("hashPassword", async function (plainPassword: string) {
    const password = await bcrypt.hash(plainPassword, 10)
    return password
})
userSchema.static("hashPassword", async function (plainPassword: string) {
    const password = await bcrypt.hash(plainPassword, 10)
    return password
})

// pre hooks - document middleware
userSchema.pre('save', async function (next) {
    // console.log('inside pre hook');
    // console.log(this);
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// query middleware
userSchema.pre('find', function (next) {
    console.log('inside pre find')
    next()
})

// post middleware - document middleware
userSchema.post("save", function (doc, next) {
    console.log('%s has been saved', doc._id);
    next()
})

// query middleware
// deleting user's note after the user has been deleted
userSchema.post("findOneAndDelete", async function (doc, next) {
    if (doc) {
        // console.log(doc);
        await Note.deleteMany({ user: doc._id })
    }
    next()
})

userSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`
})

export const User = model<IUser, UserStaticMethods>('User', userSchema);

