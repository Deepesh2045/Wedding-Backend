import express from "express";
import cors from "cors";
import connectDb from "./connectDB";
import weddingRoutes from "./Wedding/wedding.routes";

const app = express();
const port: number = process.env.API_PORT
  ? parseInt(process.env.API_PORT)
  : 3000;

app.use(express.json());
app.use(
  cors({
    // origin: "http://wedding-frontend-phi.vercel.app",
    // methods: ["POST", "GET"],
    // credentials: true,
  })
);

// connect Database
connectDb();

// Register Routes
app.use(weddingRoutes);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
