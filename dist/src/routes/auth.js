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
exports.login = void 0;
const constants_1 = require("./../constants");
const users_json_1 = __importDefault(require("./../data/users.json"));
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        try {
            if (username && password) {
                const token = "token90";
                const user = users_json_1.default === null || users_json_1.default === void 0 ? void 0 : users_json_1.default.find((user) => user.username === username && user.password === password);
                res.json(Object.assign(Object.assign({}, constants_1.response_success), { token: token, message: "success login", data: Object.assign(Object.assign({}, user), { password: "..." }) })).status(200);
            }
            else {
                res.json(Object.assign(Object.assign({}, constants_1.response_error), { message: "username or password not received" })).status(404);
            }
        }
        catch (err) {
            console.error(err);
            res.json(Object.assign(Object.assign({}, constants_1.response_error), { message: err === null || err === void 0 ? void 0 : err.message }));
        }
    });
}
exports.login = login;
