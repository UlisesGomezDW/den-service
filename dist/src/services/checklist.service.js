"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCheklist = void 0;
const date_1 = require("../utils/date");
const number_1 = require("../utils/number");
const filter_1 = require("../utils/filter");
const partidas_json_1 = __importDefault(require("../data/partidas.json"));
const piecework_json_1 = __importDefault(require("../data/piecework.json"));
const groups_json_1 = __importDefault(require("../data/groups.json"));
const pieceworker_services_1 = require("../services/pieceworker.services");
function getCheklist(groupId) {
    const detail = partidas_json_1.default.detail.find(({ uid }) => uid === groupId);
    const index = partidas_json_1.default.detail.findIndex(({ uid }) => uid === groupId);
    const group = groups_json_1.default[index];
    const data = Object.assign(Object.assign({}, group), { startDate: (0, date_1.getDateString)((group === null || group === void 0 ? void 0 : group.startDate) || ""), finishDate: (0, date_1.getDateString)((group === null || group === void 0 ? void 0 : group.finishDate) || "") });
    const pieceworkList = (detail === null || detail === void 0 ? void 0 : detail.list.map((key, index) => {
        let item = piecework_json_1.default[index];
        return Object.assign(Object.assign({}, item), { name: key, editable: true, incidents: (0, pieceworker_services_1.getInicidets)(item.incidents), tasks: [], startDate: (0, date_1.getDateString)(item.startDate), finishDate: (0, date_1.getDateString)(item.finishDate) });
    })) || [];
    const incidents = pieceworkList.filter(({ incidents }) => incidents.length > 0).length;
    const subtotals = {
        toDo: (0, filter_1.getNumberOfElements)(pieceworkList, "to-do"),
        inProgress: (0, filter_1.getNumberOfElements)(pieceworkList, "in-progress"),
        finished: (0, filter_1.getNumberOfElements)(pieceworkList, "finished"),
    };
    const totals = Object.assign(Object.assign({}, subtotals), { inProgress: subtotals.inProgress - incidents, incidents });
    const progress = (0, number_1.getProgress)(subtotals);
    return Object.assign(Object.assign({}, data), { pieceworks: pieceworkList, totals, progress });
}
exports.getCheklist = getCheklist;
