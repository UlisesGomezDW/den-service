"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTasks = exports.getInicidets = void 0;
const incidents_json_1 = __importDefault(require("../data/incidents.json"));
const tasks_json_1 = __importDefault(require("../data/tasks.json"));
function getInicidets(array) {
    return array.map((incidentId) => {
        var _a;
        const incident = incidents_json_1.default.find(({ uid }) => uid === incidentId);
        const index = incidents_json_1.default.findIndex(({ uid }) => uid == incidentId);
        return {
            id: incident === null || incident === void 0 ? void 0 : incident.uid,
            name: ((_a = tasks_json_1.default[index]) === null || _a === void 0 ? void 0 : _a.name) || "Tarea",
        };
    });
}
exports.getInicidets = getInicidets;
function getTasks(array) {
    return array.map((incidentId) => {
        const task = tasks_json_1.default.find(({ uid }) => uid === incidentId);
        return {
            id: task === null || task === void 0 ? void 0 : task.uid,
            name: task === null || task === void 0 ? void 0 : task.name,
            resolved: task === null || task === void 0 ? void 0 : task.resolved,
        };
    });
}
exports.getTasks = getTasks;
