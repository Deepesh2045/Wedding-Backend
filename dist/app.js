"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connectDB_1 = __importDefault(require("./connectDB"));
const wedding_routes_1 = __importDefault(require("./Wedding/wedding.routes"));
const app = (0, express_1.default)();
const port = process.env.API_PORT
    ? parseInt(process.env.API_PORT)
    : 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)({
// origin: "http://wedding-frontend-phi.vercel.app",
// methods: ["POST", "GET"],
// credentials: true,
}));
// connect Database
(0, connectDB_1.default)();
// Register Routes
app.use(wedding_routes_1.default);
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
