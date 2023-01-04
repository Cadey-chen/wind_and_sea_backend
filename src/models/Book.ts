import mongoose, {Document, Schema} from "mongoose";

export interface IBook {
    type: string,
    title: string;
    author: string;
    description: string,
    yearPublished: string,
    url: string,
    userID: string
}

export interface IBookModel extends IBook, Document {}

const BookSchema: Schema = new Schema(
    {
        type: { type: String, required: true },
        title: { type: String, required: true },
        author: { type: String, required: true },
        description: { type: String, required: true },
        yearPublished: { type: String, required: true },
        url: { type: String, required: true },
        userID: { type: String, required: true },
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IBookModel>('Book', BookSchema);