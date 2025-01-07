import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/database.js";
import dotenv from "dotenv";
import express from "express";
import router from "./routes/index.js";

dotenv.config();
const app = express();
try {
    await db.authenticate()
    console.log("Database authenticated")
} catch (error) {
    console.log(error)
}

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))
app.use(cookieParser())
app.use(express.json())
app.use(router)

app.listen(5000, () => console.log("Server running on port 5000"))