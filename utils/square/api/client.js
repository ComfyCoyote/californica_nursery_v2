"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var square_1 = require("square");
var SQUARE_ACCESS_TOKEN = "EAAAED0c7skUBbt2MT25KLFdEFaBIeXFnMl5lv4tNxJaR-3Zaa3q11eJHDxf_PNO";
var client = new square_1.SquareClient({
    token: SQUARE_ACCESS_TOKEN,
});
exports.default = client;
