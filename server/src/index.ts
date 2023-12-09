import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import { getSafeModule } from "./utils/safeAPI";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.get('/getModule', async (req: Request, res: Response) => {
    const moduleAddress = await getSafeModule(req.query.safe as string, req.query.network as string)
    res.send(moduleAddress);
});


app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
