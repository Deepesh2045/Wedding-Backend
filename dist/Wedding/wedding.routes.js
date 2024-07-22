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
const express_1 = __importDefault(require("express"));
const wedding_validation_1 = require("./wedding.validation");
const wedding_model_1 = __importDefault(require("./wedding.model"));
const router = express_1.default.Router();
// Create Wedding Card
router.post("/card/create", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // extract new card from req.body
    const newCard = req.body;
    // validate new card
    try {
        const validatedData = yield wedding_validation_1.addCardValidationSchema.validate(newCard);
        req.body = validatedData;
        next();
    }
    catch (error) {
        return res.status(400).send({ message: error.message });
    }
}), 
// create Card
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // extract new card from req.body
    const newCard = req.body;
    // create Card
    try {
        yield wedding_model_1.default.create(newCard);
        // send response
        return res.status(200).send({ message: "Card is created successfully" });
    }
    catch (error) {
        return res.status(500).send({ message: "Error creating card" });
    }
}));
// Get card list
router.post("/card/list", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract pagination data form req.body
    const paginationData = req.body;
    try {
        const validatedData = yield wedding_validation_1.paginationValidationSchema.validate(paginationData);
        req.body = validatedData;
        next();
    }
    catch (error) {
        return res.status(400).send({ message: error.message });
    }
}), 
// extract pagination data from req.body
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit } = req.body;
    // Calculate skip
    const skip = (page - 1) * limit;
    let match = {};
    const cardList = yield wedding_model_1.default.aggregate([
        { $match: match },
        {
            $sort: {
                createdAt: -1,
            },
        },
        { $skip: skip },
        { $limit: limit },
        {
            $project: {
                title: 1,
                description: 1,
                // { $substr: ["$description", 0, 50] },
                postDate: 1,
                image: 1,
                createdAt: 1,
            },
        },
    ]);
    const totalCards = yield wedding_model_1.default.find(match).countDocuments();
    const numberOfPages = Math.ceil(totalCards / limit);
    return res
        .status(200)
        .send({ message: "Success", cardList: cardList, numberOfPages });
}));
// Edit Card Details
router.put("/card/edit/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract editCardDetails from req.body
    const editCardDetails = req.body;
    try {
        const validatedData = yield wedding_validation_1.addCardValidationSchema.validate(editCardDetails);
        req.body = validatedData;
        next();
    }
    catch (error) {
        return res.status(400).send({ message: error.message });
    }
}), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract card Id from req.params.id
    const cardId = req.params.id;
    // find Card
    const newCard = yield wedding_model_1.default.findById(cardId);
    // If not find throw error message
    if (!newCard) {
        return res.status(404).send({ message: "Card Does not exist..." });
    }
    const newCardValue = req.body;
    yield wedding_model_1.default.updateOne({ _id: cardId }, { $set: Object.assign({}, newCardValue) });
    //send response
    return res.status(200).send({ message: "Card is updated successfully" });
}));
router.get("/details/edit/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //extract product id from req.params
    const cardId = req.params.id;
    //find task
    const cardDetails = yield wedding_model_1.default.findById(cardId);
    // if not find task throw error
    if (!cardDetails) {
        return res.status(404).send({ message: "Task does not exist." });
    }
    // send task with response
    return res.status(200).send({ message: "Success", cardDetails: cardDetails });
}));
router.delete("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // extract id from req.params
    const cardId = req.params.id;
    // find task
    const result = yield wedding_model_1.default.findByIdAndDelete({ _id: cardId });
    // if not task find throw error
    if (!result) {
        return res.status(400).send({ message: "Task does not exist" });
    }
    // send response
    res.status(200).send({ message: "Success", result: result });
}));
exports.default = router;
