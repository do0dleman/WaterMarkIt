"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var imageRouter_1 = __importDefault(require("./src/routers/imageRouter"));
var errorHandler_1 = __importDefault(require("./src/middlewares/errorHandler"));
var outputCleaner_1 = __importDefault(require("./src/middlewares/outputCleaner"));
var corsOptions_1 = __importDefault(require("./src/config/corsOptions"));
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
require('dotenv').config();
exports.app = (0, express_1["default"])();
var port = process.env.PORT || 3000;
exports.app.locals.cleanup_counter = Date.now();
exports.app.use((0, cors_1["default"])(corsOptions_1["default"]));
exports.app.use(express_1["default"].json());
exports.app.use(outputCleaner_1["default"]);
exports.app.use(express_1["default"].static(path_1["default"].join(__dirname, 'client', 'dist')));
exports.app.get("/", function (req, res) {
    res.sendFile(path_1["default"].join(__dirname, "../", "client", "dist", 'index.html'));
});
exports.app.use('/image', imageRouter_1["default"]);
exports.app.use(errorHandler_1["default"]);
exports.app.listen(port, function () {
    console.log("Server is running on port ".concat(port));
});
