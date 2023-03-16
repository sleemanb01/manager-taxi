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
exports.deleteFileS3 = exports.getFileS3 = exports.uploadToS3 = void 0;
const aws_sdk_1 = require("aws-sdk");
const fs_1 = __importDefault(require("fs"));
const messages_1 = require("../util/messages");
const ENV = process.env;
const bucketName = ENV.AWS_BUCKET;
const region = ENV.AWS_BUCKET_REGION;
const accessKeyId = ENV.AWS_ACCESS_KEY;
const secretAccessKey = ENV.AWS_SECRET_KEY;
const s3 = new aws_sdk_1.S3({
    region,
    accessKeyId,
    secretAccessKey,
});
const uploadToS3 = (fileData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fileContent = fs_1.default.readFileSync(fileData.path);
        const params = {
            Bucket: bucketName,
            Key: fileData.originalname,
            Body: fileContent,
        };
        const res = yield s3.upload(params).promise();
        const ret = { success: true, message: "", data: res.Key };
        return ret;
    }
    catch (e) {
        const ret = {
            success: false,
            message: messages_1.ERROR_UPLOAD_FILE,
            data: undefined,
        };
        return ret;
    }
});
exports.uploadToS3 = uploadToS3;
const getFileS3 = (fileKey) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const downloadParams = {
            Key: fileKey,
            Bucket: bucketName,
        };
        const downloadUrl = yield s3.getSignedUrlPromise("getObject", downloadParams);
        return downloadUrl;
    }
    catch (e) {
        throw new Error(messages_1.ERROR_UPLOAD_FILE);
    }
});
exports.getFileS3 = getFileS3;
const deleteFileS3 = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = {
            Key: filePath,
            Bucket: bucketName,
        };
        const res = yield s3.deleteObject(params).promise();
        return !!res.$response.error;
    }
    catch (e) {
        throw new Error(messages_1.ERROR_UPLOAD_FILE);
    }
});
exports.deleteFileS3 = deleteFileS3;
