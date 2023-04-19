"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPlanes = void 0;
const plane_json_1 = __importDefault(require("../data/plane.json"));
const blocks_json_1 = __importDefault(require("../data/blocks.json"));
function getAllPlanes() {
    const data = plane_json_1.default.map(({ uid, blocks }) => {
        const blocksItem = blocks.map((blockId) => {
            const block = blocks_json_1.default.find(({ uid }) => uid === blockId);
            return {
                plots: block === null || block === void 0 ? void 0 : block.plots,
                number: block === null || block === void 0 ? void 0 : block.number,
            };
        });
        return {
            uid,
            blocks: blocksItem,
        };
    });
    return data;
}
exports.getAllPlanes = getAllPlanes;
