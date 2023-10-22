"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jimp_1 = __importDefault(require("jimp"));
var express_async_handler_1 = __importDefault(require("express-async-handler"));
/**
 * @description adds a watermark to an image
 * @method POST
 * @access public
 */
var processImage = (0, express_async_handler_1["default"])(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var files, imageData, RawWatermarkPosition, watermarkPositionArray, watermarkPosition, RawWatermarkTransformation, watermarkTransformationArray, watermarkTransformation, watermarkOpacity, watermarkData, imageBuffer, watermarkBuffer, image, watermark;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                files = req.files;
                if (!Object.hasOwnProperty.bind(files)('image') ||
                    !Object.hasOwnProperty.bind(files)('watermark')) {
                    res.status(400).json({ message: 'You must provide image files.' });
                    return [2 /*return*/];
                }
                imageData = files['image'][0];
                if (!imageData) {
                    res.status(400).json({ message: 'You must provide an image.' });
                    return [2 /*return*/];
                }
                RawWatermarkPosition = req.body['watermark-position'];
                if (!RawWatermarkPosition) {
                    res.status(400).json({ message: 'You must provide a watermark position' });
                    return [2 /*return*/];
                }
                watermarkPositionArray = RawWatermarkPosition.split(':');
                if (watermarkPositionArray.length !== 2) {
                    res.status(400).json({ message: 'Invalid watermark position' });
                    return [2 /*return*/];
                }
                watermarkPosition = {
                    x: +watermarkPositionArray[0],
                    y: +watermarkPositionArray[1]
                };
                if (isNaN(watermarkPosition.x) || isNaN(watermarkPosition.y)) {
                    res.status(400).json({ message: 'Invalid watermark position' });
                    return [2 /*return*/];
                }
                RawWatermarkTransformation = req.body['watermark-transformation'];
                if (!RawWatermarkTransformation) {
                    res.status(400).json({ message: 'You must provide a watermark transformation' });
                    return [2 /*return*/];
                }
                watermarkTransformationArray = RawWatermarkTransformation.split(':');
                if (watermarkTransformationArray.length !== 3) {
                    res.status(400).json({ message: 'Invalid watermark transformation' });
                    return [2 /*return*/];
                }
                watermarkTransformation = {
                    angle: +watermarkTransformationArray[0],
                    scaleX: +watermarkTransformationArray[1],
                    scaleY: +watermarkTransformationArray[2]
                };
                if (isNaN(watermarkTransformation.angle) ||
                    isNaN(watermarkTransformation.scaleX) ||
                    isNaN(watermarkTransformation.scaleY)) {
                    res.status(400).json({ message: 'Invalid watermark transformation' });
                    return [2 /*return*/];
                }
                watermarkOpacity = +req.body['watermark-opacity'];
                if (watermarkOpacity === undefined) {
                    res.status(400).json({ message: 'You must provide a watermark opaciity' });
                    return [2 /*return*/];
                }
                if (isNaN(watermarkOpacity)) {
                    res.status(400).json({ message: 'Invalid watermark opacity' });
                    return [2 /*return*/];
                }
                watermarkData = files['watermark'][0];
                if (!imageData) {
                    res.status(400).json({ message: 'You must provide a wattermark.' });
                    return [2 /*return*/];
                }
                imageBuffer = Buffer.from(imageData.buffer);
                watermarkBuffer = Buffer.from(watermarkData.buffer);
                return [4 /*yield*/, jimp_1["default"].read(imageBuffer)];
            case 1:
                image = _a.sent();
                return [4 /*yield*/, jimp_1["default"].read(watermarkBuffer)
                    // Process the images
                ];
            case 2:
                watermark = _a.sent();
                // Process the images
                watermark.resize(watermark.getWidth() * watermarkTransformation.scaleX, watermark.getHeight() * watermarkTransformation.scaleY);
                watermark.rotate(-watermarkTransformation.angle);
                image.composite(watermark, watermarkPosition.x - watermark.getWidth() / 2, watermarkPosition.y - watermark.getHeight() / 2, {
                    mode: jimp_1["default"].BLEND_SOURCE_OVER,
                    opacityDest: 1,
                    opacitySource: watermarkOpacity
                });
                return [4 /*yield*/, image.writeAsync("./output/".concat(imageData.originalname))];
            case 3:
                _a.sent();
                res.download("./output/".concat(imageData.originalname));
                return [2 /*return*/];
        }
    });
}); });
exports["default"] = processImage;
