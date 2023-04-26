"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const constants_1 = require("../constants");
const middleware_1 = require("../middleware");
const plot_service_1 = require("../services/plot.service");
const plane_services_1 = require("../services/plane.services");
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
router.post("/validation", (req, res) => {
    const { plots = [], comments = "" } = req.body;
    try {
        if (Object.values(req.body).length > 0) {
            res.json(Object.assign(Object.assign({}, constants_1.response_success), { data: {
                    plots,
                    comments,
                } })).status(200);
        }
        else {
            res.json(Object.assign(Object.assign({}, constants_1.response_error), { message: "not data" }));
        }
    }
    catch (err) {
        console.error(err);
        res.json(Object.assign(Object.assign({}, constants_1.response_error), { message: err === null || err === void 0 ? void 0 : err.message }));
    }
});
exports.default = router;
