import express from 'express';
import controller from '../controllers/User';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create', ValidateSchema(Schemas.user.create), controller.createUser);
router.post('/login', controller.authenticateUser);
router.get('/get/:userId', controller.readOneUser);
router.get('/get/', controller.readAllUser);
router.patch('/update/:userId', ValidateSchema(Schemas.user.create), controller.UpdateUser);
router.delete('/delete/:userId', controller.DeleteUser);

export = router;