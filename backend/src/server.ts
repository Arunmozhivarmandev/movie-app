import express, { Request, Response, Application } from "express";
import mediaRoutes from './routes/media.routes';
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req: Request, res: Response): void => {
    res.status(200).json("Server is running");
});

app.use('/api', mediaRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));


app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});
