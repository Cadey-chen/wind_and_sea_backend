import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/User';
import bcrypt from 'bcrypt';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;

    // Hash password 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        _id: new mongoose.Types.ObjectId(),
        username, email, password: hashedPassword
    });

    if (user) {
        res.status(201).json({ user });
    } else {
        let error = new Error('Invalid user data');
        res.status(500).json({ error });
    }
};

const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    // Check for username
    const user = await User.findOne({ username });
    console.log(JSON.stringify(user));

    if (user && (await bcrypt.compare(password, user.password))) {
        return res.status(201).json({ user });
    } else {
        res.status(400).json({ message: 'Invalid credentials'});
    }
}

const readOneUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return await User.findById(userId)
    .populate('username')
    .populate('email')
    .select('password')
    .then(user => user ? res.status(200).json({ user }) : res.status(404).json({ message: 'Not found.' }));
};


const readAllUser = async (req: Request, res: Response, next: NextFunction) => {
    return await User.find()
    .populate('username')
    .populate('email')
    .select('password')
    .then((users) => res.status(200).json({ users }))
    .catch((error) => res.status(500).json( { error }));
};

const UpdateUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return await User.findById(userId)
    .then((user) => {
        if (user) {
            user.set(req.body);

            return user
            .save()
            .then((user) => res.status(201).json({ user }))
            .catch((error) => res.status(500).json({ error }));
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    })
    .catch((error) => res.status(500).json( { error }));
};

const DeleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return await User.findByIdAndDelete(userId).then((user) => (user ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
    .catch((error) => res.status(500).json( { error }));
};

export default { createUser, authenticateUser, readOneUser, readAllUser, UpdateUser, DeleteUser };