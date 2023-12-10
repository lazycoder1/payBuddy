import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

import { getSafeModule } from "./utils/safeAPI";
import { OneInchCall, getTransferTokenCalldata, executeSwap } from "./utils/moduleExec";



const app: Express = express();

app.use(express.json());
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

app.get('/hook', async (req: Request, res: Response) => {
    console.log(req.query);
    res.send('ok');
});

app.post('/hook', async (req: Request, res: Response) => {
    console.log(req.body.event);
    console.log(req.body.event.activity[0].rawContract);

    if ('event' in req.body && 'activity' in req.body.event) {
        for (const i in req.body.event.activity) {
            const activity = req.body.event.activity[i];
            // console.log(activity);
            if (activity.category === 'token') {
                console.log('address', activity.rawContract.address);
                console.log('amount', activity.value * 10 ** activity.rawContract.decimals);
                const callData = await OneInchCall((activity.value * 10 ** activity.rawContract.decimals).toString(), activity.rawContract.address);
                if (callData != null) {
                    console.log(callData);
                    const txData = await executeSwap(callData.tx.to, callData.tx.data, callData.tx.value);
                    console.log(txData);
                }
            }
        }
    }
    res.send('ok');
});


app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});


