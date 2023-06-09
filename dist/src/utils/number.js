"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomNumber = exports.getProgress = void 0;
function getProgress({ toDo = 0, inProgress = 0, finished = 0 }) {
    const total = toDo + inProgress + finished;
    return Math.round((finished * 100) / total);
}
exports.getProgress = getProgress;
function getRandomNumber(limit) {
    return Math.round(Math.random() * limit);
}
exports.getRandomNumber = getRandomNumber;
