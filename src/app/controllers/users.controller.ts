import express, { Request, Response } from "express"
import { User } from "../models/user.model";
import { z } from "zod";
import bcrypt from "bcryptjs";


export const usersRoutes = express.Router();

const CreateUserZodSchema = z.object(
    {
        firstName: z.string(),
        lastName: z.string(),
        age: z.number(),
        email: z.string(),
        password: z.string(),
        role: z.string().optional()
    }
)

usersRoutes.post('/create-user', async (req: Request, res: Response) => {
    try {
        const body = req.body;

        const password = await bcrypt.hash(body.password, 10)

        body.password = password
        // const zodBody = await CreateUserZodSchema.parseAsync(req.body);
        // console.log(body, "zod body");
        // console.log(zodBody, "zod body");

        // const user = await User.create(body)

        const user = new User(body)

        await user.save()

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: user
        })
    } catch (error: any) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message,
            error
        })
    }
})


// getting all users

usersRoutes.get('/', async (req: Request, res: Response) => {
    const users = await User.find()

    res.status(201).json({
        success: true,
        message: 'User created successfully',
        users: users
    })
})

// getting a single user

usersRoutes.get('/:userId', async (req: Request, res: Response) => {
    const idOfUser = req.params.userId;

    const user = await User.findById(idOfUser)

    res.status(201).json({
        success: true,
        message: 'User created successfully',
        user: user
    })
})


// updating a single user

usersRoutes.patch('/:userId', async (req: Request, res: Response) => {
    const idOfUser = req.params.userId;
    const updatedBody = req.body;
    const user = await User.findByIdAndUpdate(idOfUser, updatedBody, { new: true, runValidators: true })

    res.status(201).json({
        success: true,
        message: 'User updated successfully',
        user
    })
})


// deleting a single user

usersRoutes.delete('/:userId', async (req: Request, res: Response) => {
    const idOfUser = req.params.userId;

    const user = await User.findByIdAndDelete(idOfUser)


    res.status(201).json({
        success: true,
        message: 'User deleted successfully',
        user
    })
})

