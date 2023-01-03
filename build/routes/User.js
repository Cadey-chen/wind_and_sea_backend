"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../controllers/User"));
const ValidateSchema_1 = require("../middleware/ValidateSchema");
const router = express_1.default.Router();
router.post('/create', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.user.create), User_1.default.createUser);
router.post('/login', User_1.default.authenticateUser);
router.get('/get/:userId', User_1.default.readOneUser);
router.get('/get/', User_1.default.readAllUser);
router.patch('/update/:userId', (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.user.create), User_1.default.UpdateUser);
router.delete('/delete/:userId', User_1.default.DeleteUser);
module.exports = router;
