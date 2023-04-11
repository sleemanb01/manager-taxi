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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStock = exports.updateStockPartial = exports.updateStock = exports.addStock = exports.getStocks = exports.getStock = void 0;
const express_validator_1 = require("express-validator");
const http_error_1 = require("../models/http-error");
const stock_model_1 = __importDefault(require("../models/stock.model"));
const user_model_1 = __importDefault(require("../models/user.model"));
const shift_model_1 = __importDefault(require("../models/shift.model"));
const enums_1 = require("../types/enums");
const messages_1 = require("../util/messages");
const s3_1 = require("../middleware/s3");
const mongoose_1 = __importDefault(require("mongoose"));
/* ************************************************************** */
const internalError = new http_error_1.HttpError(messages_1.ERROR_INTERNAL_SERVER, enums_1.HTTP_RESPONSE_STATUS.Internal_Server_Error);
/* ************************************************************** */
const getStock = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.stockId;
    let stock;
    try {
        stock = yield stock_model_1.default.findOne({ _id: id });
    }
    catch (_a) {
        return next(new http_error_1.HttpError(messages_1.ERROR_INVALID_DATA, enums_1.HTTP_RESPONSE_STATUS.Not_Found));
    }
    if (!stock) {
        return next(internalError);
    }
    stock.image = yield (0, s3_1.getFileS3)(stock.image);
    res.status(enums_1.HTTP_RESPONSE_STATUS.OK).json({ stock: stock });
});
exports.getStock = getStock;
/* ************************************************************** */
const getStocks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let stocks = [];
    let shift;
    const date = req.params.date;
    try {
        const sess = yield mongoose_1.default.startSession();
        sess.startTransaction();
        stocks = yield stock_model_1.default.find();
        shift = yield shift_model_1.default.findOne({ date: date });
        sess.commitTransaction();
    }
    catch (_b) {
        return next(internalError);
    }
    for (let i = 0; i < stocks.length; i++) {
        if (stocks[i].image) {
            stocks[i].image = yield (0, s3_1.getFileS3)(stocks[i].image);
        }
    }
    res.status(enums_1.HTTP_RESPONSE_STATUS.OK).json({
        stocks: stocks,
        shift: shift,
    });
});
exports.getStocks = getStocks;
/* ************************************************************** */
const addStock = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new http_error_1.HttpError(messages_1.ERROR_INVALID_INPUTS, enums_1.HTTP_RESPONSE_STATUS.Unprocessable_Entity));
    }
    const { name, quantity, categoryId, minQuantity } = req.body;
    const creatorId = req.userData.userId;
    let targetUser;
    try {
        targetUser = yield user_model_1.default.findById(creatorId);
    }
    catch (_c) {
        return next(internalError);
    }
    if (!targetUser) {
        const error = new http_error_1.HttpError(messages_1.ERROR_UNAUTHORIZED, enums_1.HTTP_RESPONSE_STATUS.Unauthorized);
        return next(error);
    }
    const image = req.file;
    let upload = undefined;
    if (image) {
        upload = yield (0, s3_1.uploadToS3)(req.file);
        if (!upload.success) {
            upload = undefined;
            return next(internalError);
        }
    }
    const newStock = new stock_model_1.default({
        name,
        quantity,
        categoryId,
        image: upload === null || upload === void 0 ? void 0 : upload.data,
        minQuantity,
    });
    try {
        yield newStock.save();
    }
    catch (_d) {
        return next(internalError);
    }
    res.status(enums_1.HTTP_RESPONSE_STATUS.Created).json({ stock: newStock });
});
exports.addStock = addStock;
/* ************************************************************** */
const updateStock = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new http_error_1.HttpError(messages_1.ERROR_INVALID_INPUTS, enums_1.HTTP_RESPONSE_STATUS.Unprocessable_Entity));
    }
    const { name, categoryId, minQuantity } = req.body;
    const stockId = req.params.stockId;
    let stock;
    try {
        stock = yield stock_model_1.default.findById(stockId);
    }
    catch (_e) {
        return next(internalError);
    }
    if (!stock) {
        return next(new http_error_1.HttpError(messages_1.ERROR_INVALID_DATA, enums_1.HTTP_RESPONSE_STATUS.Not_Found));
    }
    stock.name = name;
    stock.minQuantity = minQuantity;
    stock.categoryId = categoryId;
    if (req.file) {
        const resError = yield (0, s3_1.deleteFileS3)(stock.image);
        if (resError) {
            return next(internalError);
        }
    }
    const upload = yield (0, s3_1.uploadToS3)(req.file);
    if (!upload.success && upload.data) {
        return next(internalError);
    }
    stock.image = upload.data;
    try {
        yield stock.save();
    }
    catch (_f) {
        return next(internalError);
    }
    res.status(enums_1.HTTP_RESPONSE_STATUS.OK).json({ stock: stock });
});
exports.updateStock = updateStock;
/* ************************************************************** */
const updateStockPartial = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new http_error_1.HttpError(messages_1.ERROR_INVALID_INPUTS, enums_1.HTTP_RESPONSE_STATUS.Unprocessable_Entity));
    }
    const { quantity } = req.body;
    const stockId = req.params.stockId;
    const shiftId = req.params.shiftId;
    let stock;
    try {
        stock = yield stock_model_1.default.findById(stockId);
    }
    catch (_g) {
        return next(internalError);
    }
    if (!stock) {
        return next(new http_error_1.HttpError(messages_1.ERROR_INVALID_DATA, enums_1.HTTP_RESPONSE_STATUS.Not_Found));
    }
    let isSupply = quantity > (stock === null || stock === void 0 ? void 0 : stock.quantity);
    let shift;
    try {
        shift = yield shift_model_1.default.findById(shiftId);
    }
    catch (_h) {
        return internalError;
    }
    if (!shift) {
        return next(new http_error_1.HttpError(messages_1.ERROR_INVALID_DATA, enums_1.HTTP_RESPONSE_STATUS.Not_Found));
    }
    let dataArr;
    if (isSupply) {
        dataArr = shift.supply;
    }
    else {
        dataArr = shift.consumption;
    }
    const usage = { stockId, quantity: quantity };
    const index = dataArr.findIndex((e) => e.stockId === stockId);
    if (index === -1) {
        dataArr.push(usage);
    }
    else {
        dataArr[index] = usage;
    }
    stock.quantity = quantity;
    try {
        const sess = yield mongoose_1.default.startSession();
        sess.startTransaction();
        yield stock.save({ session: sess });
        yield shift.save({ session: sess });
        sess.commitTransaction();
    }
    catch (_j) {
        return next(internalError);
    }
    res.status(enums_1.HTTP_RESPONSE_STATUS.OK).json({ stock: stock });
});
exports.updateStockPartial = updateStockPartial;
/* ************************************************************** */
const deleteStock = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const stockId = req.params.placeId;
    let targetStock;
    try {
        targetStock = yield stock_model_1.default.findById(stockId);
    }
    catch (_k) {
        return next(internalError);
    }
    if (!targetStock) {
        const error = new http_error_1.HttpError(messages_1.ERROR_UNAUTHORIZED, enums_1.HTTP_RESPONSE_STATUS.Not_Found);
        return next(error);
    }
    const creatorId = req.userData.userId;
    let targetUser;
    try {
        targetUser = yield user_model_1.default.findById(creatorId);
    }
    catch (_l) {
        return next(internalError);
    }
    if (!targetUser || !(targetUser.phone === process.env.MANAGER)) {
        const error = new http_error_1.HttpError(messages_1.ERROR_INVALID_DATA, enums_1.HTTP_RESPONSE_STATUS.Unauthorized);
        return next(error);
    }
    const resError = yield (0, s3_1.deleteFileS3)(targetStock.image);
    if (resError) {
        return next(internalError);
    }
    try {
        yield targetStock.remove();
    }
    catch (_m) {
        return next(internalError);
    }
    res.status(enums_1.HTTP_RESPONSE_STATUS.OK).json({ message: messages_1.DELETED });
});
exports.deleteStock = deleteStock;
