"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInicidets = void 0;
const incidents_json_1 = __importDefault(require("../data/incidents.json"));
function getInicidets(array) {
    return array.map((incidentId) => {
        const incident = incidents_json_1.default.find(({ uid }) => uid === incidentId);
        return {
            id: incident === null || incident === void 0 ? void 0 : incident.uid,
            name: incident === null || incident === void 0 ? void 0 : incident.name,
            resolved: incident === null || incident === void 0 ? void 0 : incident.resolved,
        };
    });
}
exports.getInicidets = getInicidets;
