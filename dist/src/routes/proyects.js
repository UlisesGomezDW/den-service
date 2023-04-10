"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const constants_1 = require("../constants");
const middleware_1 = require("../middleware");
const proyects_json_1 = __importDefault(require("../data/proyects.json"));
const area_json_1 = __importDefault(require("../data/area.json"));
const router = (0, express_1.Router)();
router.use(middleware_1.authMiddleware);
router.get("/", (req, res) => {
    try {
        const data = proyects_json_1.default.map((item) => {
            return Object.assign(Object.assign({}, item), { area: item.area.map((key) => area_json_1.default.find(({ uid }) => uid === key)) });
        });
        res.json(Object.assign(Object.assign({}, constants_1.response_success), { message: "success data", data })).status(200);
    }
    catch (err) {
        console.error(err);
        res.json(Object.assign(Object.assign({}, constants_1.response_error), { message: err === null || err === void 0 ? void 0 : err.message }));
    }
});
exports.default = router;
