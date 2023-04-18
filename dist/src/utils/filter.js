"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNumberOfElements = void 0;
function getNumberOfElements(array, search) {
    return array.filter(({ status }) => status === search).length;
}
exports.getNumberOfElements = getNumberOfElements;
