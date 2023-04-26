"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlotById = exports.getPlotsIdByPlane = exports.getPlotsByBlocks = void 0;
const plots_json_1 = __importDefault(require("../data/plots.json"));
const blocks_json_1 = __importDefault(require("../data/blocks.json"));
const plane_services_1 = require("../services/plane.services");
const string_1 = require("../utils/string");
const date_1 = require("../utils/date");
const checklist_service_1 = require("../services/checklist.service");
const getPlotsByBlocks = (blocks) => {
    const array = blocks === null || blocks === void 0 ? void 0 : blocks.map((blockId) => {
        const block = blocks_json_1.default.find(({ uid }) => uid === blockId);
        const plots = block === null || block === void 0 ? void 0 : block.plots;
        const blockIndex = (block === null || block === void 0 ? void 0 : block.number) || 1;
        return plots === null || plots === void 0 ? void 0 : plots.map((plotId, index) => {
            return getPlotById(plotId);
        });
    });
    return array.flat(1);
};
exports.getPlotsByBlocks = getPlotsByBlocks;
function getPlotsIdByPlane(planeId) {
    var _a;
    const plane = (0, plane_services_1.getAllPlanes)().find(({ uid }) => planeId === uid);
    const plots = ((_a = plane === null || plane === void 0 ? void 0 : plane.blocks) === null || _a === void 0 ? void 0 : _a.map(({ plots, number }) => {
        return plots === null || plots === void 0 ? void 0 : plots.map((plotId) => {
            return `${plane.uid}-mz_${number}-${plotId}`;
        });
    })) || [];
    const clear = plots.flat(1);
    return [...new Set(clear)];
}
exports.getPlotsIdByPlane = getPlotsIdByPlane;
function getPlotById(plotId) {
    const [planeId, mzId, plotUID] = (0, string_1.getId)(plotId);
    const plot = plots_json_1.default.find(({ uid }) => uid === plotUID);
    const area = (0, checklist_service_1.getBatchList)(planeId);
    const incidents = area
        .map(({ ref }) => {
        return (0, checklist_service_1.getCheklist)(planeId, plotUID, ref).pieceworks.map(({ incidents }) => {
            return incidents;
        });
    })
        .flat(1) || [];
    return Object.assign(Object.assign({}, plot), { uid: plotId, name: (0, string_1.getPlotName)((0, string_1.getNumberKey)(mzId), (0, string_1.getNumberKey)(plotUID)), finishDate: (plot === null || plot === void 0 ? void 0 : plot.finishDate) ? (0, date_1.getDateString)(plot === null || plot === void 0 ? void 0 : plot.finishDate, true) : "", incidents: (plot === null || plot === void 0 ? void 0 : plot.status) === "in-progress" ? incidents : [] });
}
exports.getPlotById = getPlotById;
