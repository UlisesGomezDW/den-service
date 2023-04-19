"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const constants_1 = require("../constants");
const middleware_1 = require("../middleware");
const partidas_json_1 = __importDefault(require("../data/partidas.json"));
const checklist_service_1 = require("../services/checklist.service");
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
        const groupId = req.query.groupId || "";
        if (groupId) {
            const data = (0, checklist_service_1.getCheklist)(groupId.toString());
            res.json(Object.assign(Object.assign({}, constants_1.response_success), { data })).status(200);
        }
        else {
            const data = partidas_json_1.default.list.map(({ uid, groups }) => {
                return {
                    uid,
                    groups: groups.map(({ uid }) => (0, checklist_service_1.getCheklist)(uid)),
                };
            });
            res.json(Object.assign(Object.assign({}, constants_1.response_success), { data })).status(200);
        }
    }
    catch (err) {
        console.error(err);
        res.json(Object.assign(Object.assign({}, constants_1.response_error), { message: err === null || err === void 0 ? void 0 : err.message }));
    }
});
exports.default = router;
