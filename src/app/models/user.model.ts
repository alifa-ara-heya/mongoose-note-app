import { Model, Schema, model } from "mongoose";
import { IAddress, IUser, UserInstanceMethods } from "../interfaces/user.interface";
import validator from 'validator';
import bcrypt from "bcryptjs";


const addressSchema = new Schema<IAddress>(
    {
        city: { type: String },
        street: { type: String },
        zip: { type: Number }
    }, {
    _id: false
}
)

const userSchema = new Schema<IUser, Model<IUser>, UserInstanceMethods>({
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
        validate: [validator.isEmail, "Invalid email {VALUE}"]
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
    timestamps: true
})

userSchema.method("hashPassword", async function (plainPassword: string) {
    const password = await bcrypt.hash(plainPassword, 10)
    this.password = password
})

export const User = model<IUser>('User', userSchema);