import express, { NextFunction, Request, Response } from "express";
import { cardTypes } from "../Types/card";
import {
  addCardValidationSchema,
  paginationValidationSchema,
} from "./wedding.validation";
import Card from "./wedding.model";
import { title } from "process";

const router = express.Router();

// Create Wedding Card
router.post(
  "/card/create",
  async (req: Request, res: Response, next: NextFunction) => {
    // extract new card from req.body
    const newCard: cardTypes = req.body;
    // validate new card
    try {
      const validatedData: cardTypes = await addCardValidationSchema.validate(
        newCard
      );
      req.body = validatedData;
      next();
    } catch (error) {
      return res.status(400).send({ message: (error as Error).message });
    }
  },
  // create Card
  async (req: Request, res: Response) => {
    // extract new card from req.body
    const newCard: cardTypes = req.body;
    // create Card
    try {
      await Card.create(newCard);
      // send response

      return res.status(200).send({ message: "Card is created successfully" });
    } catch (error) {
      return res.status(500).send({ message: "Error creating card" });
    }
  }
);

// Get card list
router.post(
  "/card/list",
  async (req: Request, res: Response, next: NextFunction) => {
    // Extract pagination data form req.body
    const paginationData = req.body;
    try {
      const validatedData = await paginationValidationSchema.validate(
        paginationData
      );
      req.body = validatedData;
      next();
    } catch (error) {
      return res.status(400).send({ message: (error as Error).message });
    }
  },
  // extract pagination data from req.body
  async (req: Request, res: Response) => {
    const { page, limit } = req.body;
    // Calculate skip
    const skip = (page - 1) * limit;
    let match = {};
    const cardList = await Card.aggregate([
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
    const totalCards = await Card.find(match).countDocuments();
    const numberOfPages = Math.ceil(totalCards / limit);
    return res
      .status(200)
      .send({ message: "Success", cardList: cardList, numberOfPages });
  }
);

// Edit Card Details
router.put(
  "/card/edit/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    // Extract editCardDetails from req.body
    const editCardDetails: cardTypes = req.body;
    try {
      const validatedData = await addCardValidationSchema.validate(
        editCardDetails
      );
      req.body = validatedData;
      next();
    } catch (error) {
      return res.status(400).send({ message: (error as Error).message });
    }
  },
  async(req:Request,res:Response)=>{
        // Extract card Id from req.params.id
        const cardId = req.params.id
        // find Card
        const newCard = await Card.findById(cardId)
        // If not find throw error message
        if(!newCard){
          return res.status(404).send({message:"Card Does not exist..."})
        }
        const newCardValue = req.body
        await Card.updateOne({_id:cardId},{$set:{...newCardValue}})
        //send response
        return res.status(200).send({message:"Card is updated successfully"})
  }
);


router.get("/details/edit/:id", async (req, res) => {
    //extract product id from req.params
    const cardId = req.params.id;
    //find task
    const cardDetails = await Card.findById(cardId);
    // if not find task throw error
    if (!cardDetails) {
      return res.status(404).send({ message: "Task does not exist." });
    }
    // send task with response
    return res.status(200).send({ message: "Success", cardDetails: cardDetails });
  });

  router.delete("/delete/:id", async (req, res) => {
    // extract id from req.params
    const cardId = req.params.id;
    // find task
      const result = await Card.findByIdAndDelete({ _id: cardId });
      // if not task find throw error
      if(!result){
        return res.status(400).send({message:"Task does not exist"})
      }
  // send response
      res.status(200).send({ message: "Success", result: result })
  });
export default router;
