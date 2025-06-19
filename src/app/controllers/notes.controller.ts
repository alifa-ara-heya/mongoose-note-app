import express, { Request, Response } from "express";
import { Note } from "../models/notes.model";


export const notesRoutes = express.Router();

notesRoutes.post('/create-note', async (req: Request, res: Response) => {

    const body = req.body;

    // approach-1 of creating a data

    /*    const myNote = new Note({
           title: "Learning Node",
           tags: {
               label: "database"
           }
       })
   
       await myNote.save() */

    // approach-2
    const note = await Note.create(body)

    res.status(201).json({
        success: true,
        message: 'Note created successfully',
        note
    })
})

// getting all notes

notesRoutes.get('/', async (req: Request, res: Response) => {
    const notes = await Note.find().populate('user')

    res.status(201).json({
        success: true,
        message: 'Note created successfully',
        notes
    })
})

// getting a single note

notesRoutes.get('/:noteId', async (req: Request, res: Response) => {
    const idOfNote = req.params.noteId;

    const note = await Note.findById(idOfNote)
    const note2 = await Note.findOne({ _id: idOfNote })
    const note3 = await Note.findOne({ title: 'postgreSQL' })

    res.status(201).json({
        success: true,
        message: 'Note created successfully',
        note
    })
})


// updating a single note

notesRoutes.patch('/:noteId', async (req: Request, res: Response) => {
    const idOfNote = req.params.noteId;
    const updatedBody = req.body;
    const note = await Note.findByIdAndUpdate(idOfNote, updatedBody, { new: true })
    // or,
    const note2 = await Note.updateOne({ _id: idOfNote }, updatedBody, { new: true }) //this creates the response message like mongodb, 'acknowledged: true' and doesn't show the new updated post
    // or,
    const note3 = await Note.findOneAndUpdate({ _id: idOfNote }, updatedBody, { new: true })  //shows the updated post and you can use title, content as well to search

    // { new: true } makes sure to view the latest post updated by the user in the Postman

    res.status(201).json({
        success: true,
        message: 'Note updated successfully',
        note
    })
})


// deleting a single note

notesRoutes.delete('/:noteId', async (req: Request, res: Response) => {
    const idOfNote = req.params.noteId;

    const note = await Note.findByIdAndDelete(idOfNote)
    const note2 = await Note.findOneAndDelete({ _id: idOfNote })
    const note3 = await Note.deleteOne({ _id: idOfNote })

    res.status(201).json({
        success: true,
        message: 'Note deleted successfully',
        note
    })
})

