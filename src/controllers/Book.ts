import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Book from '../models/Book';

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    const { type, author, title, description, userID, yearPublished, url  } = req.body;

    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        type, author, title, description, userID, yearPublished, 
        url });

    return await book
    .save()
    .then(book => res.status(201).json({ book }))
    .catch((error) => res.status(500).json({ error }));
};

const readOneBook = async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    return await Book.findById(bookId)
    .populate('author')
    .select('-__v')
    .then(book => book ? res.status(200).json({ book }) : res.status(404).json({ message: 'Not found.' }));
};


const readAllBook = async (req: Request, res: Response, next: NextFunction) => {
    return await Book.find()
    .populate('author')
    .populate('title')
    .populate('url')
    .select('-__v')
    .then((books) => res.status(200).json({ books }))
    .catch((error) => res.status(500).json( { error }));
};

const getBookByUser = async (req: Request, res: Response, next: NextFunction) => {
    const uid = req.params.userId;

    return await Book.find({ userID: uid })
    .select('-__v')
    .then(book => book ? res.status(200).json({ book }) : res.status(404).json({ message: 'Not found.' }));
};

const UpdateBook = async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    return await Book.findById(bookId)
    .then((book) => {
        if (book) {
            book.set(req.body);

            return book
            .save()
            .then((book) => res.status(201).json({ book }))
            .catch((error) => res.status(500).json({ error }));
        } else {
            res.status(404).json({ message: 'Not found' });
        }
    })
    .catch((error) => res.status(500).json( { error }));
};

const DeleteBook = async (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    return await Book.findByIdAndDelete(bookId).then((book) => (book ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
    .catch((error) => res.status(500).json( { error }));
};

export default { createBook, readOneBook, readAllBook, UpdateBook, DeleteBook, getBookByUser };