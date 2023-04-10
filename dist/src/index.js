"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
dotenv_1.default.config();
const auth_1 = require("./routes/auth");
const proyects_1 = __importDefault(require("./routes/proyects"));
const app = (0, express_1.default)();
const apiRouter = express_1.default.Router();
const server = new http_1.default.Server(app);
exports.server = server;
app.get("/", (req, res) => {
    res.send("Server is running! 🐶");
});
app.use("/api", apiRouter);
app.get("/ping", (_, res) => {
    res.json({ pong: true }).status(301);
});
apiRouter.use("/auth", auth_1.login);
apiRouter.use("/proyects", proyects_1.default);
const host = process.env.HOST || "0.0.0.0";
const port = Number(process.env.PORT) || 5000;
server.listen(port, host, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
