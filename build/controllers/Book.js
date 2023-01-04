"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Book_1 = __importDefault(require("../models/Book"));
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { type, author, title, description, userID, yearPublished, url } = req.body;
    const book = new Book_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        type, author, title, description, userID, yearPublished,
        url
    });
    return yield book
        .save()
        .then(book => res.status(201).json({ book }))
        .catch((error) => res.status(500).json({ error }));
});
const readOneBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    return yield Book_1.default.findById(bookId)
        .populate('author')
        .select('-__v')
        .then(book => book ? res.status(200).json({ book }) : res.status(404).json({ message: 'Not found.' }));
});
const readAllBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Book_1.default.find()
        .populate('author')
        .populate('title')
        .populate('url')
        .select('-__v')
        .then((books) => res.status(200).json({ books }))
        .catch((error) => res.status(500).json({ error }));
});
const getBookByUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.params.userId;
    return yield Book_1.default.find({ userID: uid })
        .select('-__v')
        .then(book => book ? res.status(200).json({ book }) : res.status(404).json({ message: 'Not found.' }));
});
const UpdateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    return yield Book_1.default.findById(bookId)
        .then((book) => {
        if (book) {
            book.set(req.body);
            return book
                .save()
                .then((book) => res.status(201).json({ book }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            res.status(404).json({ message: 'Not found' });
        }
    })
        .catch((error) => res.status(500).json({ error }));
});
const DeleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    return yield Book_1.default.findByIdAndDelete(bookId).then((book) => (book ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
});
exports.default = { createBook, readOneBook, readAllBook, UpdateBook, DeleteBook, getBookByUser };
