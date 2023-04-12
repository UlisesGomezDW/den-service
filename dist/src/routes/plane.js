"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const constants_1 = require("../constants");
const middleware_1 = require("../middleware");
const plots_json_1 = __importDefault(require("../data/plots.json"));
const router = (0, express_1.Router)();
router.use(middleware_1.authMiddleware);
router.get("/:id", (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const data = {
            streets: ["Calle 1", "Calle 2"],
            blocks: [
                {
                    number: 1,
                    plots: plots_json_1.default.map(({ uid, status, progress }, index) => {
                        return {
                            uid,
                            number: index + 1,
                            status,
                            incidents: index === 2 ? 2 : 0,
                            progress,
                        };
                    }),
                },
            ],
        };
        res.json(Object.assign(Object.assign({}, constants_1.response_success), { message: "success data", data })).status(200);
    }
    catch (err) {
        console.error(err);
        res.json(Object.assign(Object.assign({}, constants_1.response_error), { message: err === null || err === void 0 ? void 0 : err.message }));
    }
});
exports.default = router;