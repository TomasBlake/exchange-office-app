"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_fetch_1 = __importDefault(require("node-fetch"));
require('dotenv').config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
app.get("/api", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(`Express on Vercel on port ${PORT} and CNB_API: ${process.env.CNB_API}`);
}));
app.get("/api/exchange-rates", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = process.env.CNB_API || "";
        const response = yield (0, node_fetch_1.default)(url);
        if (!response.ok) {
            throw new Error("Network response was not ok: " + response.statusText);
        }
        const data = yield response.text();
        res.send(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
module.exports = app;
