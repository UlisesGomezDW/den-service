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
exports.authMiddleware = void 0;
const constants_1 = require("../constants");
const users_json_1 = __importDefault(require("./../data/users.json"));
function authMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.headers.authorization) {
            res.json(Object.assign(Object.assign({}, constants_1.response_error), { message: "auth headers not received" })).status(401);
        }
        else {
            const token = req.headers.authorization.split("Bearer ")[1];
            let payload = null;
            try {
                payload = users_json_1.default === null || users_json_1.default === void 0 ? void 0 : users_json_1.default.find((user) => user.id === 1);
            }
            catch (e) {
                return res.json(Object.assign(Object.assign({}, constants_1.response_error), { message: "invalid token", error: true })).status(401);
            }
            // @ts-ignore
            req.user = {
                id: payload === null || payload === void 0 ? void 0 : payload.id,
            };
            next();
            return;
        }
    });
}
exports.authMiddleware = authMiddleware;
