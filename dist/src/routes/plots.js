"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const constants_1 = require("../constants");
const middleware_1 = require("../middleware");
const plot_service_1 = require("../services/plot.service");
const plane_services_1 = require("../services/plane.services");
const string_1 = require("../utils/string");
const string_2 = require("../utils/string");
const string_3 = require("../utils/string");
const pieceworkers_json_1 = __importDefault(require("../data/pieceworkers.json"));
const leaders_json_1 = __importDefault(require("../data/leaders.json"));
const number_1 = require("../utils/number");
const router = (0, express_1.Router)();
router.use(middleware_1.authMiddleware);
router.get("/", (req, res) => {
    try {
        const planeId = req.query.planeId || "";
        const plotId = req.query.plotId || "";
        if (planeId) {
            const keys = (0, plot_service_1.getPlotsIdByPlane)(`${planeId}`);
            const data = keys === null || keys === void 0 ? void 0 : keys.map((id = "") => {
                return (0, plot_service_1.getPlotById)(id);
            });
            res.json(Object.assign(Object.assign({}, constants_1.response_success), { data })).status(200);
        }
        else if (plotId) {
            const data = (0, plot_service_1.getPlotById)(`${plotId}`);
            res.json(Object.assign(Object.assign({}, constants_1.response_success), { data })).status(200);
        }
        else {
            const plotKeys = (0, plane_services_1.getAllPlanes)()
                .map(({ uid }) => {
                return (0, plot_service_1.getPlotsIdByPlane)(uid);
            })
                .flat(1) || [];
            const data = plotKeys === null || plotKeys === void 0 ? void 0 : plotKeys.map((id = "") => {
                return (0, plot_service_1.getPlotById)(id);
            });
            res.json(Object.assign(Object.assign({}, constants_1.response_success), { data: data.flat(1) })).status(200);
        }
    }
    catch (err) {
        console.error(err);
        res.json(Object.assign(Object.assign({}, constants_1.response_error), { message: err === null || err === void 0 ? void 0 : err.message }));
    }
});
router.get("/validation", (req, res) => {
    var _a, _b, _c;
    try {
        const plotId = req.query.plotId || "";
        const [planeId] = (0, string_1.getId)(`${plotId}`);
        const filter = (0, plot_service_1.getPlotsIdByPlane)(`${planeId}`).filter((value) => value !== plotId);
        const keys = filter.filter((_, index) => index <= 2);
        const plots = [plotId, ...keys].map((uid) => {
            const [_, mz, plot] = (0, string_1.getId)(`${uid}`);
            return {
                uid,
                name: (0, string_2.getPlotName)((0, string_3.getNumberKey)(mz), (0, string_3.getNumberKey)(plot)) || "",
            };
        });
        const number = (0, number_1.getRandomNumber)(pieceworkers_json_1.default.length - 1);
        const next = number === pieceworkers_json_1.default.length - 1 ? number - 1 : number + 1;
        const pieceworkerList = [(_a = pieceworkers_json_1.default[number]) === null || _a === void 0 ? void 0 : _a.name, (_b = pieceworkers_json_1.default[next]) === null || _b === void 0 ? void 0 : _b.name];
        res.json(Object.assign(Object.assign({}, constants_1.response_success), { data: {
                plots,
                leaders: [(_c = leaders_json_1.default[(0, number_1.getRandomNumber)(leaders_json_1.default.length - 1)]) === null || _c === void 0 ? void 0 : _c.name],
                pieceworkers: pieceworkerList,
            } })).status(200);
    }
    catch (err) {
        res.json(Object.assign(Object.assign({}, constants_1.response_error), { message: err === null || err === void 0 ? void 0 : err.message }));
        console.log(err);
    }
});
exports.default = router;
