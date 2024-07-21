import * as Yup from "yup"
import { cardTypes } from "./../Types/card";
import { ObjectSchema } from "yup";

export const addCardValidationSchema:ObjectSchema<cardTypes> = Yup.object({
  title: Yup.string().required("Title is required").trim(),

  description: Yup.string()
    .required("Description is required")
    .trim()
    .max(1000, "Description must be at max 1000 character."),

    image: Yup.string().nullable(),

  postDate: Yup.string().required("Post Date is required").trim(),
});

export const paginationValidationSchema= Yup.object({
  page: Yup.number().default(1).min(1, "Page must be at least 1."),
  limit: Yup.number().default(6).min(1, "Limit must be at least 1."),
})
