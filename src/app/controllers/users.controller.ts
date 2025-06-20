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

        /*  const password = await bcrypt.hash(body.password, 10)
 
         body.password = password */
        // const zodBody = await CreateUserZodSchema.parseAsync(req.body);
        // console.log(body, "zod body");
        // console.log(zodBody, "zod body");

        // const user = await User.create(body)

        // built in and custom instance methods
        /* 
                const user = new User(body)
        
                const password = await user.hashPassword(body.password)
        
                user.password = password
                console.log(password);
        
        
                await user.save() */

        // built in and custom static methods
        /*  const password = await User.hashPassword(body.password)
         console.log(password, 'static');
         body.password = password */
        const user = await User.create(body)

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
    // const users = await User.find()
    const userEmail = req.query.email ? req.query.email : ''

    let users = []

    // filtering
    if (userEmail) {
        users = await User.find({ email: userEmail })
    } else {
        users = await User.find()
    }


    // sorting
    // finding users sort by their emails
    // users = await User.find().sort({ "email": "asc" })
    // users = await User.find().sort({ "email": "desc" }) or { "email": -1 }

    // skipping
    users = await User.find().skip(10)

    // limiting
    users = await User.find().limit(2)

    res.status(201).json({
        success: true,
        message: 'All Users',
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

    // const user = await User.findByIdAndDelete(idOfUser)

    const user = await User.findOneAndDelete({ _id: idOfUser })


    res.status(201).json({
        success: true,
        message: 'User deleted successfully',
        user
    })
})

