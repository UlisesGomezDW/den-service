"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const constants_1 = require("../constants");
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
router.use(middleware_1.authMiddleware);
router.post("/", (req, res) => {
    const { lead = "", pieceworker = [], photos = [], detail = "" } = req.body;
    try {
        if (Object.values(req.body).length > 0) {
            res.json(Object.assign(Object.assign({}, constants_1.response_success), { message: "success", data: {
                    lead,
                    pieceworker,
                    photos,
                    detail,
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
router.post("/solution", (req, res) => {
    const { photos = [], detail = "" } = req.body;
    try {
        if (Object.values(req.body).length > 0) {
            res.json(Object.assign(Object.assign({}, constants_1.response_success), { message: "success", data: {
                    photos,
                    detail,
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
router.get("/:id", (req, res) => {
    const { id } = req.params;
    try {
        const data = {
            name: "Random",
            laeder: "Name 1",
            pieceworker: [],
            detail: "",
            createdAt: "04/11/2022",
            resolvedAt: "",
            resolved: false,
        };
        // @ts-ignore
        data === null || data === void 0 ? true : delete data.uid;
        res.json(Object.assign(Object.assign({}, constants_1.response_success), { data })).status(200);
    }
    catch (err) {
        console.error(err);
        res.json(Object.assign(Object.assign({}, constants_1.response_error), { message: err === null || err === void 0 ? void 0 : err.message }));
    }
});
exports.default = router;
