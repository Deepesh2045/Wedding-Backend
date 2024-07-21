import mongoose, { Model, Schema, Document } from "mongoose";
import { cardTypes } from "../Types/card";

// Extend the UserTypes interface with Document to include Mongoose-specific properties and methods
interface UserDocument extends cardTypes, Document {}

// Set rule for card schema
const cardSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500,
  },
  image: {
    type: String,
    required: false,
  },
  postDate: {
    type: String,
    required: true,
    trim: true,
  },
  
},
{
    timestamps: true,
  },
);

// Create table
const Card: Model<UserDocument> = mongoose.model<UserDocument>(
  "Card",
  cardSchema
);
export default Card;
