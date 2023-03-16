"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const MB = 1024 * 1024;
const FILE_LIMIT = 1.5 * MB;
// const PATH_IMAGES_UPLOAD = "uploads/images";
const ERROR_MESSAGE = "Invalid mime type!";
const ERROR_LIMIT_EXCEEDED = "File is too big!";
const MIME_TYPE_MAP = new Map([
    ["image/png", "png"],
    ["image/jpeg", "jpeg"],
    ["image/jpg", "jpg"],
]);
// const destFunc = (
//   _req: MulterRequest,
//   _file: Express.Multer.File,
//   cb: DestinationCallback
// ) => {
//   cb(null, PATH_IMAGES_UPLOAD);
// };
const fileNameFunc = (_req, file, cb) => {
    const ext = MIME_TYPE_MAP.get(file.mimetype);
    cb(null, (0, uuid_1.v4)() + "." + ext);
};
const fileFilterFunc = (req, file, cb) => {
    let errorMessage = null;
    const size = parseInt(req.headers["content-length"]);
    const isValid = !!MIME_TYPE_MAP.get(file.mimetype);
    const isInLimit = size < FILE_LIMIT;
    if (!isInLimit) {
        errorMessage = ERROR_LIMIT_EXCEEDED;
    }
    if (!isValid) {
        errorMessage = ERROR_MESSAGE;
    }
    errorMessage ? cb(new Error(errorMessage)) : cb(null, isValid);
};
exports.fileUpload = (0, multer_1.default)({
    limits: { fileSize: FILE_LIMIT },
    storage: multer_1.default.diskStorage({
        // destination: destFunc,
        filename: fileNameFunc,
    }),
    fileFilter: fileFilterFunc,
});
