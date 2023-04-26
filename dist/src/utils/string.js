"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNumberKey = exports.getId = exports.getPlotName = void 0;
function getPlotName(block, plot) {
    const format = (num) => ("0" + num).slice(-2);
    return `Mz${format(block)} - Lt${format(plot)}`;
}
exports.getPlotName = getPlotName;
function getId(id) {
    return id.split("-");
}
exports.getId = getId;
function getNumberKey(key) {
    return Number(key.split("_")[1] || "0");
}
exports.getNumberKey = getNumberKey;
