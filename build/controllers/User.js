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
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    // Hash password 
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashedPassword = yield bcrypt_1.default.hash(password, salt);
    const user = yield User_1.default.create({
        _id: new mongoose_1.default.Types.ObjectId(),
        username, email, password: hashedPassword
    });
    if (user) {
        res.status(201).json({ user });
    }
    else {
        let error = new Error('Invalid user data');
        res.status(500).json({ error });
    }
});
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // Check for username
    const user = yield User_1.default.findOne({ username });
    if (user && (yield bcrypt_1.default.compare(password, user.password))) {
        return res.status(201);
    }
    else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
});
const readOneUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    return yield User_1.default.findById(userId)
        .populate('username')
        .populate('email')
        .select('password')
        .then(user => user ? res.status(200).json({ user }) : res.status(404).json({ message: 'Not found.' }));
});
const readAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.default.find()
        .populate('username')
        .populate('email')
        .select('password')
        .then((users) => res.status(200).json({ users }))
        .catch((error) => res.status(500).json({ error }));
});
const UpdateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    return yield User_1.default.findById(userId)
        .then((user) => {
        if (user) {
            user.set(req.body);
            return user
                .save()
                .then((user) => res.status(201).json({ user }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            res.status(404).json({ message: 'Not found' });
        }
    })
        .catch((error) => res.status(500).json({ error }));
});
const DeleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    return yield User_1.default.findByIdAndDelete(userId).then((user) => (user ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
});
exports.default = { createUser, authenticateUser, readOneUser, readAllUser, UpdateUser, DeleteUser };
