import express, { Application, Request, Response } from "express";
import fetch from 'node-fetch';
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8000;

app.get("/exchange-rates", async (req: Request, res: Response) => {
  try {
    // URL, na kterou budeme posílat požadavek
    const url = process.env.CNB_API || "";

    // Odeslání HTTP požadavku a čekání na odpověď
    const response = await fetch(url);

    // Kontrola, zda je odpověď v pořádku
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }

    // Načtení dat jako textu
    const data = await response.text();

    // Odeslání dat jako odpověď na původní požadavek
    res.send(data);
  } catch (error) {
    // Odeslání chyby, pokud něco selže
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Spuštění serveru
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
