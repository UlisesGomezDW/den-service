"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCheklist = exports.getBatchList = void 0;
const date_1 = require("../utils/date");
const number_1 = require("../utils/number");
const filter_1 = require("../utils/filter");
const piecework_json_1 = __importDefault(require("../data/piecework.json"));
const groups_json_1 = __importDefault(require("../data/groups.json"));
const plane_json_1 = __importDefault(require("../data/plane.json"));
const lista_json_1 = __importDefault(require("../data/lista.json"));
const plots_json_1 = __importDefault(require("../data/plots.json"));
const pieceworker_services_1 = require("../services/pieceworker.services");
function getBatchList(planeId) {
    var _a;
    const area = ((_a = plane_json_1.default.find(({ uid }) => uid === planeId)) === null || _a === void 0 ? void 0 : _a.area) || "";
    // @ts-ignore
    const collection = lista_json_1.default[area] || lista_json_1.default.obra;
    const data = (collection === null || collection === void 0 ? void 0 : collection.map(({ name = "", uid = "" }) => {
        return {
            name,
            ref: uid,
        };
    })) || [];
    return data;
}
exports.getBatchList = getBatchList;
function getCheklist(plnaeId, plotId, ref) {
    var _a, _b;
    const collection = Object.values(lista_json_1.default).flat(1) || [];
    const status = (_a = plots_json_1.default.find(({ uid }) => uid === plotId)) === null || _a === void 0 ? void 0 : _a.status;
    const items = ((_b = collection.find(({ uid }) => uid === ref)) === null || _b === void 0 ? void 0 : _b.items) || [];
    const index = collection.findIndex(({ uid }) => uid === ref) || 0;
    const group = groups_json_1.default[index] || groups_json_1.default[0];
    const data = Object.assign(Object.assign({}, group), { uid: `${plnaeId}-${plotId}-${ref}`, startDate: (0, date_1.getDateString)((group === null || group === void 0 ? void 0 : group.startDate) || ""), finishDate: (0, date_1.getDateString)((group === null || group === void 0 ? void 0 : group.finishDate) || ""), completed: status === "finished" });
    const pieceworkList = items.map((key, index) => {
        let item = piecework_json_1.default[index];
        return status === "finished"
            ? Object.assign(Object.assign({}, item), { name: key, editable: false, incidents: [], status: "finished", tasks: [], startDate: (0, date_1.getDateString)(item.startDate), finishDate: (0, date_1.getDateString)(item.finishDate) }) : Object.assign(Object.assign({}, item), { name: key, editable: item.status !== "finished", incidents: item.status === "in-progress" ? (0, pieceworker_services_1.getInicidets)(item.incidents) : [], status: item.status === "in-progress"
                ? (0, pieceworker_services_1.getInicidets)(item.incidents).length > 0
                    ? "incidents"
                    : "in-progress"
                : item.status, tasks: (0, pieceworker_services_1.getTasks)(item.tasks), startDate: (0, date_1.getDateString)(item.startDate), finishDate: (0, date_1.getDateString)(item.finishDate) });
    }) || [];
    const incidents = pieceworkList.filter(({ incidents }) => incidents.length > 0).length;
    const subtotals = {
        toDo: (0, filter_1.getNumberOfElements)(pieceworkList, "to-do"),
        inProgress: (0, filter_1.getNumberOfElements)(pieceworkList, "in-progress"),
        finished: (0, filter_1.getNumberOfElements)(pieceworkList, "finished"),
    };
    const totals = Object.assign(Object.assign({}, subtotals), { inProgress: subtotals.inProgress, incidents });
    const progress = (0, number_1.getProgress)(subtotals);
    return Object.assign(Object.assign({}, data), { pieceworks: pieceworkList, totals, progress, total: pieceworkList.length });
}
exports.getCheklist = getCheklist;
/*
export function getCheklist(groupId: string) {
    const detail = partidas.detail.find(({ uid }) => uid === groupId)
    const index = partidas.detail.findIndex(({ uid }) => uid === groupId)
    const group = groups[index]
    const data = {
        ...group,
        startDate: getDateString(group?.startDate || ""),
        finishDate: getDateString(group?.finishDate || ""),
    }
    const pieceworkList =
        detail?.list.map((key, index) => {
            let item = piecework[index]
            return {
                ...item,
                name: key,
                editable: true,
                incidents: item.status === "in-progress" ? getInicidets(item.incidents) : [],
                tasks: [],
                startDate: getDateString(item.startDate),
                finishDate: getDateString(item.finishDate),
            }
        }) || []

    const incidents = pieceworkList.filter(({ incidents }) => incidents.length > 0).length

    const subtotals = {
        toDo: getNumberOfElements(pieceworkList, "to-do"),
        inProgress: getNumberOfElements(pieceworkList, "in-progress"),
        finished: getNumberOfElements(pieceworkList, "finished"),
    }

    const totals = {
        ...subtotals,
        inProgress: subtotals.inProgress - incidents,
        incidents,
    }

    const progress = getProgress(subtotals)

    return { ...data, pieceworks: pieceworkList, totals, progress }
}
*/
