"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const constants_1 = require("./../constants");
const users_json_1 = __importDefault(require("./../data/users.json"));
const router = (0, express_1.Router)();
router.post("/login", (req, res) => {
    const { username, password } = req.body;
    try {
        if (username && password) {
            const token = "token90";
            const user = users_json_1.default === null || users_json_1.default === void 0 ? void 0 : users_json_1.default.find((user) => user.username === username && user.password === password);
            if (user) {
                res.json(Object.assign(Object.assign({}, constants_1.response_success), { token: token, message: "success login", data: Object.assign(Object.assign({}, user), { password: "...", token }) })).status(200);
            }
            else {
                res.json(Object.assign(Object.assign({}, constants_1.response_error), { message: "user not found", data: null })).status(200);
            }
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
exports.default = router;
