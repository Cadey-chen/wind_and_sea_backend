import express from 'express';
import controller from '../controllers/Author';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create', ValidateSchema(Schemas.author.create), controller.createAuthor);
router.get('/get/:authorId', controller.readOneAuthor);
router.get('/get/', controller.readAllAuthor);
router.patch('/update/:authorId', ValidateSchema(Schemas.author.update), controller.UpdateAuthor);
router.delete('/delete/:authorId', controller.DeleteAuthor);

export = router;