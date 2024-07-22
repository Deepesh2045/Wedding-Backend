"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationValidationSchema = exports.addCardValidationSchema = void 0;
const Yup = __importStar(require("yup"));
exports.addCardValidationSchema = Yup.object({
    title: Yup.string().required("Title is required").trim(),
    description: Yup.string()
        .required("Description is required")
        .trim()
        .max(1000, "Description must be at max 1000 character."),
    image: Yup.string().nullable(),
    postDate: Yup.string().required("Post Date is required").trim(),
});
exports.paginationValidationSchema = Yup.object({
    page: Yup.number().default(1).min(1, "Page must be at least 1."),
    limit: Yup.number().default(6).min(1, "Limit must be at least 1."),
});
