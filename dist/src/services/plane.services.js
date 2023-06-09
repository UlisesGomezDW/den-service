"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotals = exports.getAllPlanes = void 0;
const plane_json_1 = __importDefault(require("../data/plane.json"));
const blocks_json_1 = __importDefault(require("../data/blocks.json"));
const filter_1 = require("../utils/filter");
const plot_service_1 = require("../services/plot.service");
const number_1 = require("../utils/number");
function getAllPlanes() {
    const data = plane_json_1.default.map(({ uid, blocks, area }) => {
        const blocksItem = blocks.map((blockId) => {
            const block = blocks_json_1.default.find(({ uid }) => uid === blockId);
            return {
                plots: block === null || block === void 0 ? void 0 : block.plots,
                number: block === null || block === void 0 ? void 0 : block.number,
            };
        });
        return {
            uid,
            blocks: blocksItem,
            area,
        };
    });
    return data;
}
exports.getAllPlanes = getAllPlanes;
function getTotals(planeId) {
    const keys = (0, plot_service_1.getPlotsIdByPlane)(`${planeId}`);
    const allPlots = keys === null || keys === void 0 ? void 0 : keys.map((id = "") => {
        return (0, plot_service_1.getPlotById)(id);
    });
    const incidents = allPlots.filter((plot) => (plot === null || plot === void 0 ? void 0 : plot.incidents) && (plot === null || plot === void 0 ? void 0 : plot.incidents.length) > 0);
    const subtotals = {
        toDo: (0, filter_1.getNumberOfElements)(allPlots, "to-do"),
        inProgress: (0, filter_1.getNumberOfElements)(allPlots, "in-progress"),
        finished: (0, filter_1.getNumberOfElements)(allPlots, "finished"),
    };
    const progress = (0, number_1.getProgress)(subtotals) || 0;
    const totals = Object.assign(Object.assign({}, subtotals), { incidents: incidents.length });
    return {
        totals,
        progress,
    };
}
exports.getTotals = getTotals;
