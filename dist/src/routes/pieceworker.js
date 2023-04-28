"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const constants_1 = require("../constants");
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
router.use(middleware_1.authMiddleware);
router.post("/validation", (req, res) => {
    const { lead = "", pieceworker = [], photos = [], comments = "", taskId = "" } = req.body;
    try {
        console.log(req.body);
        if (Object.values(req.body).length > 0) {
            res.json(Object.assign(Object.assign({}, constants_1.response_success), { message: "success data", data: {
                    lead,
                    pieceworker,
                    photos,
                    comments,
                    taskId,
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
router.post("/validation-multiple", (req, res) => {
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
