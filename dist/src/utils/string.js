"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlotName = void 0;
function getPlotName(block, plot) {
    const format = (num) => ("0" + num).slice(-2);
    return `Mz${format(block)} - Lt${format(plot)}`;
}
exports.getPlotName = getPlotName;
