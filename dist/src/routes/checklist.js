"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const constants_1 = require("../constants");
const middleware_1 = require("../middleware");
const lista_json_1 = __importDefault(require("../data/lista.json"));
const checklist_service_1 = require("../services/checklist.service");
const plane_services_1 = require("../services/plane.services");
const string_1 = require("../utils/string");
const router = (0, express_1.Router)();
router.use(middleware_1.authMiddleware);
router.get("/batch", (req, res) => {
    try {
        const planeId = req.query.planeId || "";
        if (planeId) {
            const data = (0, checklist_service_1.getBatchList)(`${planeId}`);
            res.json(Object.assign(Object.assign({}, constants_1.response_success), { data })).status(200);
        }
        else {
            const collection = Object.values(lista_json_1.default).map((value) => value.map(({ uid, name }) => {
                return {
                    name,
                    ref: uid,
                };
            }));
            const data = Object.keys(lista_json_1.default).reduce((obj, key, index) => {
                return Object.assign(Object.assign({}, obj), { [key]: collection[index] });
            }, {});
            res.json(Object.assign(Object.assign({}, constants_1.response_success), { data: data })).status(200);
        }
    }
    catch (err) {
        console.error(err);
        res.json(Object.assign(Object.assign({}, constants_1.response_error), { message: err === null || err === void 0 ? void 0 : err.message }));
    }
});
router.get("/", (req, res) => {
    var _a, _b;
    try {
        const plotId = ((_a = req.query) === null || _a === void 0 ? void 0 : _a.plotId) || "";
        const ref = ((_b = req.query) === null || _b === void 0 ? void 0 : _b.ref) || "";
        if (plotId && plotId) {
            const [planeId, mz, plotID] = (0, string_1.getId)(`${plotId}`);
            const data = (0, checklist_service_1.getCheklist)(`${planeId}`, `${plotID}`, `${ref}`);
            res.json(Object.assign(Object.assign({}, constants_1.response_success), { data })).status(200);
        }
        else {
            const plotsArray = (0, plane_services_1.getAllPlanes)()
                .map(({ uid, blocks }) => {
                const plots = blocks.map(({ plots }) => {
                    return plots === null || plots === void 0 ? void 0 : plots.map((plotId) => {
                        return uid + "-" + plotId;
                    });
                });
                return plots;
            })
                .flat(2);
            const data = [...new Set(plotsArray)]
                .map((key = "") => {
                const path = key.split("-");
                const planeId = path[0];
                const plotId = path[1];
                const list = (0, checklist_service_1.getBatchList)(planeId).map(({ ref }) => ref);
                return list.map((ref) => {
                    return (0, checklist_service_1.getCheklist)(planeId, plotId, ref);
                });
            })
                .flat(1);
            res.json(Object.assign(Object.assign({}, constants_1.response_success), { data })).status(200);
        }
    }
    catch (err) {
        console.error(err);
        res.json(Object.assign(Object.assign({}, constants_1.response_error), { message: err === null || err === void 0 ? void 0 : err.message }));
    }
});
router.post("/pending-completion", (req, res) => {
    const { pieceworks = [] } = req.body;
    try {
        if (Object.values(req.body).length > 0) {
            res.json(Object.assign(Object.assign({}, constants_1.response_success), { data: { pieceworks } })).status(200);
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
exports.default = router;
