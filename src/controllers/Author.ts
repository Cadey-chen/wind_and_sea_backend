import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Author from '../models/Author';

const createAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    const author = new Author({
        _id: new mongoose.Types.ObjectId(),
        name
    });

    return await author
    .save()
    .then(author => res.status(201).json({ author }))
    .catch((error) => res.status(500).json({ error }));
};

const readOneAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    return await Author.findById(authorId)
    .then(author => author ? res.status(200).json({ author }) : res.status(404).json({ message: 'Not found.' }));
};


const readAllAuthor = async (req: Request, res: Response, next: NextFunction) => {
    return await Author.find()
    .then((authors) => res.status(200).json({ authors }))
    .catch((error) => res.status(500).json( { error }));
};

const UpdateAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    return await Author.findById(authorId)
    .then((author) => {
        if (author) {
            author.set(req.body);

            return author
            .save()
            .then((author) => res.status(201).json({ author }))
            .catch((error) => res.status(500).json({ error }));
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    })
    .catch((error) => res.status(500).json( { error }));
};

const DeleteAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    return await Author.findByIdAndDelete(authorId).then((author) => (author ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
    .catch((error) => res.status(500).json( { error }));
};

export default { createAuthor, readOneAuthor, readAllAuthor, UpdateAuthor, DeleteAuthor };