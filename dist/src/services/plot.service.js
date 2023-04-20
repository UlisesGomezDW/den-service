"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlotById = exports.getPlotsByBlocks = void 0;
const plots_json_1 = __importDefault(require("../data/plots.json"));
const partidas_json_1 = __importDefault(require("../data/partidas.json"));
const blocks_json_1 = __importDefault(require("../data/blocks.json"));
const string_1 = require("../utils/string");
const date_1 = require("../utils/date");
const checklist_service_1 = require("../services/checklist.service");
const getPlotsByBlocks = (blocks) => {
    const array = blocks === null || blocks === void 0 ? void 0 : blocks.map((blockId) => {
        const block = blocks_json_1.default.find(({ uid }) => uid === blockId);
        const plots = block === null || block === void 0 ? void 0 : block.plots;
        const blockIndex = (block === null || block === void 0 ? void 0 : block.number) || 1;
        return plots === null || plots === void 0 ? void 0 : plots.map((plotId, index) => {
            return getPlotById(plotId, { blockIndex, index: index + 1 });
        });
    });
    return array.flat(1);
};
exports.getPlotsByBlocks = getPlotsByBlocks;
function getPlotById(plotId, { blockIndex = 1, index = 1 }) {
    var _a;
    const plot = plots_json_1.default.find(({ uid }) => uid === plotId);
    const partidas = (_a = partidas_json_1.default.list.find(({ uid }) => uid === (plot === null || plot === void 0 ? void 0 : plot.partida))) === null || _a === void 0 ? void 0 : _a.groups;
    const incidents = (partidas === null || partidas === void 0 ? void 0 : partidas.filter(({ uid }) => {
        return (0, checklist_service_1.getCheklist)(uid).pieceworks.map(({ incidents }) => {
            return incidents;
        });
    }).flat(1)) || [];
    return Object.assign(Object.assign({}, plot), { name: (0, string_1.getPlotName)(blockIndex, index), finishDate: (plot === null || plot === void 0 ? void 0 : plot.finishDate) ? (0, date_1.getDateString)(plot === null || plot === void 0 ? void 0 : plot.finishDate, true) : "", incidents: (plot === null || plot === void 0 ? void 0 : plot.status) === "in-progress" ? incidents : [] });
}
exports.getPlotById = getPlotById;
