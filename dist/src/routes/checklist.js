"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const constants_1 = require("../constants");
const middleware_1 = require("../middleware");
const partidas_json_1 = __importDefault(require("../data/partidas.json"));
const piecework_json_1 = __importDefault(require("../data/piecework.json"));
const router = (0, express_1.Router)();
router.use(middleware_1.authMiddleware);
router.get("/partidas/:id", (req, res) => {
    const { id } = req.params;
    try {
        const data = partidas_json_1.default.list.find(({ uid }) => uid === id);
        // @ts-ignore
        data === null || data === void 0 ? true : delete data.uid;
        res.json(Object.assign(Object.assign({}, constants_1.response_success), { data })).status(200);
    }
    catch (err) {
        console.error(err);
        res.json(Object.assign(Object.assign({}, constants_1.response_error), { message: err === null || err === void 0 ? void 0 : err.message }));
    }
});
router.get("/", (req, res) => {
    try {
        const groupId = req.query.groupId;
        const detail = partidas_json_1.default.detail.find(({ uid }) => uid === groupId);
        const data = {
            progress: 50,
            startDate: "2021-10-05T14:48:00.000Z",
            finishedDate: "2022-04-30T14:48:00.000Z",
        };
        const pieceworkList = detail === null || detail === void 0 ? void 0 : detail.list.map((key, index) => {
            let item = piecework_json_1.default[index];
            return Object.assign(Object.assign({}, item), { name: key, editable: true, incidents: [] });
        });
        // @ts-ignore
        //delete data?.uid
        res.json(Object.assign(Object.assign({}, constants_1.response_success), { data: Object.assign(Object.assign({}, data), { piecework: pieceworkList }) })).status(200);
    }
    catch (err) {
        console.error(err);
        res.json(Object.assign(Object.assign({}, constants_1.response_error), { message: err === null || err === void 0 ? void 0 : err.message }));
    }
});
exports.default = router;
