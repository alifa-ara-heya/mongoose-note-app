import express, { Application, Request, Response } from 'express';
import mongoose, { Schema, model } from 'mongoose';
import { Note } from './app/models/notes.model';
import { notesRoutes } from './app/controllers/notes.controller';
import { usersRoutes } from './app/controllers/users.controller';

const app: Application = express();
app.use(express.json())

app.use('/notes', notesRoutes)

app.use('/users', usersRoutes)

app.get('/', (req: Request, res: Response) => {
    res.send('welcome from note app')
})

export default app;