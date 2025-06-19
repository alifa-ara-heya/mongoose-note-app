import { Schema, model } from "mongoose"
import { INotes } from "../interfaces/notes.interface"

const noteSchema = new Schema<INotes>({
    title: { type: String, required: true, trim: true }, //trim removes extra whitespace.
    content: { type: String, default: "" },
    category: {
        type: String,
        enum: ["personal", "work", "study", "other"],
        default: 'personal'
    },
    pinned: {
        type: Boolean,
        default: false
    },
    tags: {
        label: { type: String, required: true },
        color: { type: String, default: 'gray' }
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User", // here, "User" is the "User" model name before userSchema... export const User = model<IUser>('User', userSchema);
        required: true
    }
}, {
    versionKey: false,
    timestamps: true
})

export const Note = model<INotes>("Note", noteSchema)
