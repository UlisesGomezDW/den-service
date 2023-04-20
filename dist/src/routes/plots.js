"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const constants_1 = require("../constants");
const middleware_1 = require("../middleware");
const plot_service_1 = require("../services/plot.service");
const plane_json_1 = __importDefault(require("../data/plane.json"));
const router = (0, express_1.Router)();
router.use(middleware_1.authMiddleware);
router.get("/", (req, res) => {
    var _a;
    try {
        const planeId = req.query.planeId || "";
        const plotId = req.query.plotId || "";
        if (planeId) {
            const blocks = ((_a = plane_json_1.default.find(({ uid }) => uid === planeId)) === null || _a === void 0 ? void 0 : _a.blocks) || [];
            const blockList = (0, plot_service_1.getPlotsByBlocks)(blocks);
            res.json(Object.assign(Object.assign({}, constants_1.response_success), { data: blockList })).status(200);
        }
        else if (plotId) {
            const data = (0, plot_service_1.getPlotById)(`${plotId}`, { blockIndex: 1, index: 1 });
            res.json(Object.assign(Object.assign({}, constants_1.response_success), { data })).status(200);
        }
        else {
            const data = plane_json_1.default.map(({ blocks }) => (0, plot_service_1.getPlotsByBlocks)(blocks));
            res.json(Object.assign(Object.assign({}, constants_1.response_success), { data: data.flat() })).status(200);
        }
    }
    catch (err) {
        console.error(err);
        res.json(Object.assign(Object.assign({}, constants_1.response_error), { message: err === null || err === void 0 ? void 0 : err.message }));
    }
});
router.post("/validation", (req, res) => {
    const { plots = [], comments = "" } = req.body;
    try {
        if (Object.values(req.body).length > 0) {
            res.json(Object.assign(Object.assign({}, constants_1.response_success), { data: {
                    plots,
                    comments,
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
exports.default = router;
