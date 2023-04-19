"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const constants_1 = require("../constants");
const middleware_1 = require("../middleware");
const plane_services_1 = require("../services/plane.services");
const plots_json_1 = __importDefault(require("../data/plots.json"));
const filter_1 = require("../utils/filter");
const router = (0, express_1.Router)();
router.use(middleware_1.authMiddleware);
const getPlot = (array) => array.map(({ uid, status, progress, model }, index) => {
    return {
        uid,
        number: index + 1,
        status,
        model,
        incidents: index === 2 ? 2 : 0,
        progress,
    };
});
router.get("/", (req, res) => {
    try {
        const planeId = req.query.planeId;
        if (planeId) {
            const data = {
                streets: ["Calle 1", "Calle 2"],
                blocks: [
                    {
                        number: 1,
                        plots: getPlot(plots_json_1.default),
                    },
                    {
                        number: 2,
                        plots: getPlot([plots_json_1.default[0]]),
                    },
                ],
            };
            res.json(Object.assign(Object.assign({}, constants_1.response_success), { message: "success data", data })).status(200);
        }
        else {
            const data = (0, plane_services_1.getAllPlanes)();
            res.json(Object.assign(Object.assign({}, constants_1.response_success), { data })).status(200);
        }
    }
    catch (err) {
        console.error(err);
        res.json(Object.assign(Object.assign({}, constants_1.response_error), { message: err === null || err === void 0 ? void 0 : err.message }));
    }
});
router.get("/totals/:id", (req, res) => {
    var _a;
    const { id } = req.params;
    try {
        const planes = (0, plane_services_1.getAllPlanes)();
        const consult = (_a = planes.find(({ uid }) => uid == id)) === null || _a === void 0 ? void 0 : _a.blocks;
        const blocks = consult === null || consult === void 0 ? void 0 : consult.map(({ plots }) => plots);
        const allPlots = (blocks === null || blocks === void 0 ? void 0 : blocks.flat(1).map((plotId) => {
            const plot = plots_json_1.default.find(({ uid }) => plotId === uid);
            return {
                status: plot === null || plot === void 0 ? void 0 : plot.status,
            };
        })) || [];
        const data = {
            toDo: (0, filter_1.getNumberOfElements)(allPlots, "to-do"),
            inProgress: (0, filter_1.getNumberOfElements)(allPlots, "in-progress"),
            finished: (0, filter_1.getNumberOfElements)(allPlots, "finished"),
            incidents: 0,
        };
        res.json(Object.assign(Object.assign({}, constants_1.response_success), { message: "success data", data })).status(200);
    }
    catch (err) {
        console.error(err);
        res.json(Object.assign(Object.assign({}, constants_1.response_error), { message: err === null || err === void 0 ? void 0 : err.message }));
    }
});
exports.default = router;
