"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var multer_1 = __importDefault(require("multer"));
var upload = (0, multer_1["default"])({
// dest: 'uploads/',
});
exports["default"] = upload;
