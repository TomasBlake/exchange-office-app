import express, { Application, Request, Response } from "express";
import fetch from 'node-fetch';
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8000;

app.get("/api", async (req: Request, res: Response) => {
  res.send(`Express on Vercel on port ${PORT}`);
})

app.get("/api/exchange-rates", async (req: Request, res: Response) => {
  try {
   
    const url = process.env.CNB_API || "";

    const response = await fetch("https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt");

    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }

    const data = await response.text();

    res.send(data);
  } catch (error) {

    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
