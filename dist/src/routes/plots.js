"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const constants_1 = require("../constants");
const middleware_1 = require("../middleware");
const plane_json_1 = __importDefault(require("../data/plane.json"));
const blocks_json_1 = __importDefault(require("../data/blocks.json"));
const plots_json_1 = __importDefault(require("../data/plots.json"));
const string_1 = require("../utils/string");
const date_1 = require("../utils/date");
const router = (0, express_1.Router)();
router.use(middleware_1.authMiddleware);
const getPlots = (blocks) => {
    const array = blocks === null || blocks === void 0 ? void 0 : blocks.map((blockId) => {
        const block = blocks_json_1.default.find(({ uid }) => uid === blockId);
        const plots = block === null || block === void 0 ? void 0 : block.plots;
        const blockIndex = (block === null || block === void 0 ? void 0 : block.number) || 1;
        return plots === null || plots === void 0 ? void 0 : plots.map((plotId, index) => {
            const plot = plots_json_1.default.find(({ uid }) => uid === plotId);
            // @ts-ignore
            delete plot.groups;
            return Object.assign(Object.assign({}, plot), { name: (0, string_1.getPlotName)(blockIndex, index + 1), incidents: index === 2 ? 2 : 0, finishDate: (plot === null || plot === void 0 ? void 0 : plot.finishDate) ? (0, date_1.getDateString)(plot === null || plot === void 0 ? void 0 : plot.finishDate, true) : "" });
        });
    });
    return array.flat(1);
};
router.get("/", (req, res) => {
    var _a;
    try {
        const planeId = req.query.planeId;
        if (planeId) {
            const blocks = ((_a = plane_json_1.default.find(({ uid }) => uid === planeId)) === null || _a === void 0 ? void 0 : _a.blocks) || [];
            const blockList = getPlots(blocks);
            res.json(Object.assign(Object.assign({}, constants_1.response_success), { data: blockList })).status(200);
        }
        else {
            const data = plane_json_1.default.map(({ blocks }) => getPlots(blocks));
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
