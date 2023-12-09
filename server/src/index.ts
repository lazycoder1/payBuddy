import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

import { getSafeModule } from "./utils/safeAPI";
import { getTransferTokenCalldata } from "./utils/moduleExec";



const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

app.get('/getModule', async (req: Request, res: Response) => {
    const moduleAddress = await getSafeModule(req.query.safe as string, req.query.network as string)
    res.send(moduleAddress);
});

app.get('/test', async (req: Request, res: Response) => {
    const whatever = await getTransferTokenCalldata('abc', 'dec', '100', '0x41a30B57CE94aA01a526215Dbfab6DE7B63eaE14');
});


app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
