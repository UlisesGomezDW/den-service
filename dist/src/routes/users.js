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
const express_1 = require("express");
const constants_1 = require("../constants");
const middleware_1 = require("../middleware");
const pieceworkers_json_1 = __importDefault(require("../data/pieceworkers.json"));
const leaders_json_1 = __importDefault(require("../data/leaders.json"));
const promise_1 = require("../utils/promise");
const router = (0, express_1.Router)();
router.use(middleware_1.authMiddleware);
router.get("/pieceworkers", (req, res) => {
    try {
        res.json(Object.assign(Object.assign({}, constants_1.response_success), { data: pieceworkers_json_1.default })).status(200);
    }
    catch (err) {
        console.error(err);
        res.json(Object.assign(Object.assign({}, constants_1.response_error), { message: err === null || err === void 0 ? void 0 : err.message }));
    }
});
router.get("/leaders", (req, res) => {
    try {
        res.json(Object.assign(Object.assign({}, constants_1.response_success), { data: leaders_json_1.default })).status(200);
    }
    catch (err) {
        console.error(err);
        res.json(Object.assign(Object.assign({}, constants_1.response_error), { message: err === null || err === void 0 ? void 0 : err.message }));
    }
});
router.get("/test", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const key = req.query.key || "";
        const data = yield (0, promise_1.createPromise)({ users: ["JH", "CJ", "UJUM"] });
        console.log(key);
        res.json(Object.assign(Object.assign({}, constants_1.response_success), { data })).status(200);
    }
    catch (err) {
        console.error(err);
        res.json(Object.assign(Object.assign({}, constants_1.response_error), { message: err === null || err === void 0 ? void 0 : err.message }));
    }
}));
exports.default = router;
