"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const constants_1 = require("../constants");
const middleware_1 = require("../middleware");
const incidents_json_1 = __importDefault(require("../data/incidents.json"));
const pieceworkers_json_1 = __importDefault(require("../data/pieceworkers.json"));
const tasks_json_1 = __importDefault(require("../data/tasks.json"));
const date_1 = require("../utils/date");
const router = (0, express_1.Router)();
router.use(middleware_1.authMiddleware);
router.post("/", (req, res) => {
    const { lead = "", pieceworker = [], photos = [], detail = "" } = req.body;
    try {
        if (Object.values(req.body).length > 0) {
            res.json(Object.assign(Object.assign({}, constants_1.response_success), { message: "success", data: {
                    lead,
                    pieceworker,
                    photos,
                    detail,
                } })).status(200);
        }
        else {
            res.json(Object.assign(Object.assign({}, constants_1.response_error), { message: "not data" }));
        }
    }
    catch (err) {
        console.error(err);
        res.json(Object.assign(Object.assign({}, constants_1.response_error), { message: err === null || err === void 0 ? void 0 : err.message }));
    }
});
router.post("/solution", (req, res) => {
    const { photos = [], detail = "", incidentId = "" } = req.body;
    try {
        if (Object.values(req.body).length > 0) {
            res.json(Object.assign(Object.assign({}, constants_1.response_success), { message: "success", data: {
                    incidentId,
                    photos,
                    detail,
                } })).status(200);
        }
        else {
            res.json(Object.assign(Object.assign({}, constants_1.response_error), { message: "not data" }));
        }
    }
    catch (err) {
        console.error(err);
        res.json(Object.assign(Object.assign({}, constants_1.response_error), { message: err === null || err === void 0 ? void 0 : err.message }));
    }
});
const getIncident = (incidentId) => {
    var _a, _b;
    const data = incidents_json_1.default.find(({ uid }) => uid == incidentId);
    const index = incidents_json_1.default.findIndex(({ uid }) => uid == incidentId);
    return {
        uid: data === null || data === void 0 ? void 0 : data.uid,
        name: ((_a = tasks_json_1.default[index]) === null || _a === void 0 ? void 0 : _a.name) || "Tarea",
        pieceworker: ((_b = pieceworkers_json_1.default.find(({ uid }) => uid === (data === null || data === void 0 ? void 0 : data.pieceworker))) === null || _b === void 0 ? void 0 : _b.name) || "",
        detail: data === null || data === void 0 ? void 0 : data.detail,
        photos: data === null || data === void 0 ? void 0 : data.photos,
        createdAt: (0, date_1.getDateString)(`${data === null || data === void 0 ? void 0 : data.createdAt}`),
    };
};
router.get("/", (req, res) => {
    try {
        const incidentId = req.query.incidentId || "";
        if (incidentId) {
            res.json(Object.assign(Object.assign({}, constants_1.response_success), { data: getIncident(`${incidentId}`) })).status(200);
        }
        else {
            res.json(Object.assign(Object.assign({}, constants_1.response_success), { data: incidents_json_1.default.map(({ uid }) => {
                    return getIncident(`${uid}`);
                }) })).status(200);
        }
    }
    catch (err) {
        console.error(err);
        res.json(Object.assign(Object.assign({}, constants_1.response_error), { message: err === null || err === void 0 ? void 0 : err.message }));
    }
});
exports.default = router;
