"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPromise = void 0;
function createPromise(value) {
    const promise = new Promise((resolve) => {
        setTimeout(resolve, 1000, value);
    });
    return promise;
}
exports.createPromise = createPromise;
