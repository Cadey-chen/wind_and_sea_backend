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
const Author_1 = __importDefault(require("../models/Author"));
const createAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const author = new Author_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        name
    });
    return yield author
        .save()
        .then(author => res.status(201).json({ author }))
        .catch((error) => res.status(500).json({ error }));
});
const readOneAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorId = req.params.authorId;
    return yield Author_1.default.findById(authorId)
        .then(author => author ? res.status(200).json({ author }) : res.status(404).json({ message: 'Not found.' }));
});
const readAllAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Author_1.default.find()
        .then((authors) => res.status(200).json({ authors }))
        .catch((error) => res.status(500).json({ error }));
});
const UpdateAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorId = req.params.authorId;
    return yield Author_1.default.findById(authorId)
        .then((author) => {
        if (author) {
            author.set(req.body);
            return author
                .save()
                .then((author) => res.status(201).json({ author }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            res.status(404).json({ message: 'Not found' });
        }
    })
        .catch((error) => res.status(500).json({ error }));
});
const DeleteAuthor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorId = req.params.authorId;
    return yield Author_1.default.findByIdAndDelete(authorId).then((author) => (author ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
});
exports.default = { createAuthor, readOneAuthor, readAllAuthor, UpdateAuthor, DeleteAuthor };
