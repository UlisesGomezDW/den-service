"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const constants_1 = require("../constants");
const middleware_1 = require("../middleware");
const date_1 = require("../utils/date");
const filter_1 = require("../utils/filter");
const partidas_json_1 = __importDefault(require("../data/partidas.json"));
const piecework_json_1 = __importDefault(require("../data/piecework.json"));
const groups_json_1 = __importDefault(require("../data/groups.json"));
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
        const index = partidas_json_1.default.detail.findIndex(({ uid }) => uid === groupId);
        const group = groups_json_1.default[index];
        const data = Object.assign(Object.assign({}, group), { startDate: (0, date_1.getDateString)((group === null || group === void 0 ? void 0 : group.startDate) || ""), finishDate: (0, date_1.getDateString)((group === null || group === void 0 ? void 0 : group.finishDate) || "") });
        const pieceworkList = (detail === null || detail === void 0 ? void 0 : detail.list.map((key, index) => {
            let item = piecework_json_1.default[index];
            return Object.assign(Object.assign({}, item), { name: key, editable: true, incidents: [], tasks: [], startDate: (0, date_1.getDateString)(item.startDate), finishDate: (0, date_1.getDateString)(item.finishDate) });
        })) || [];
        // @ts-ignore
        //delete data?.uid
        const totals = {
            toDo: (0, filter_1.getNumberOfElements)(pieceworkList, "to-do"),
            inProgress: (0, filter_1.getNumberOfElements)(pieceworkList, "in-progress"),
            finished: (0, filter_1.getNumberOfElements)(pieceworkList, "finished"),
            incidents: 0,
        };
        res.json(Object.assign(Object.assign({}, constants_1.response_success), { data: Object.assign(Object.assign({}, data), { pieceworks: pieceworkList, totals }) })).status(200);
    }
    catch (err) {
        console.error(err);
        res.json(Object.assign(Object.assign({}, constants_1.response_error), { message: err === null || err === void 0 ? void 0 : err.message }));
    }
});
exports.default = router;
