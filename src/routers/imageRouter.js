"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var processImage_1 = __importDefault(require("../use-cases/processImage"));
var multer_1 = __importDefault(require("../config/multer"));
var imageRouter = express_1["default"].Router();
imageRouter.post('/', multer_1["default"].fields([{ name: 'image', maxCount: 1 },
    { name: 'watermark', maxCount: 1 }]), processImage_1["default"]);
exports["default"] = imageRouter;
