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
exports.getAllFiles = exports.copyFinalDist = exports.downloadS3Folder = void 0;
const aws_sdk_1 = require("aws-sdk");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const credentials = {
    accessKeyId: process.env.accessKeyId || "",
    secretAccessKey: process.env.secretAccessKey || "",
};
const s3 = new aws_sdk_1.S3({
    region: process.env.region,
    credentials: credentials,
});
function downloadS3Folder(prefix) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const allFiles = yield s3.listObjectsV2({
            Bucket: "xyz2622",
            Prefix: prefix
        }).promise();
        const allPromises = ((_a = allFiles.Contents) === null || _a === void 0 ? void 0 : _a.map(({ Key }) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                if (!Key) {
                    resolve("");
                    return;
                }
                const finalOutputPath = path_1.default.join(__dirname, Key);
                const outputFile = fs_1.default.createWriteStream(finalOutputPath);
                const dirName = path_1.default.dirname(finalOutputPath);
                if (!fs_1.default.existsSync(dirName)) {
                    fs_1.default.mkdirSync(dirName, { recursive: true });
                }
                s3.getObject({
                    Bucket: "xyz2622",
                    Key
                }).createReadStream().pipe(outputFile).on("finish", () => {
                    resolve("");
                });
            }));
        }))) || [];
        console.log("awaiting");
        yield Promise.all(allPromises.filter(x => x !== undefined));
    });
}
exports.downloadS3Folder = downloadS3Folder;
function copyFinalDist(id) {
    const folderPath = path_1.default.join(__dirname, `output/${id}/dist/`).replace(/\\/g, "/");
    if (!fs_1.default.existsSync(folderPath)) {
        console.error("Folder does not exist:", folderPath);
        return;
    }
    const allFiles = (0, exports.getAllFiles)(folderPath);
    allFiles.forEach(file => {
        const fileName = `dist/${id}/` + file.slice(folderPath.length + 1);
        uploadFile(fileName, file);
    });
}
exports.copyFinalDist = copyFinalDist;
const getAllFiles = (folderName) => {
    let allFiles = [];
    console.log(folderName);
    if (!fs_1.default.existsSync(folderName)) {
        console.error("Folder does not exist:", folderName);
        return allFiles;
    }
    const allFilesAndFolders = fs_1.default.readdirSync(folderName);
    allFilesAndFolders.forEach(file => {
        const fullFilePath = path_1.default.join(folderName, file);
        if (fs_1.default.statSync(fullFilePath).isDirectory()) {
            allFiles = allFiles.concat((0, exports.getAllFiles)(fullFilePath));
        }
        else {
            allFiles.push(fullFilePath);
        }
    });
    return allFiles;
};
exports.getAllFiles = getAllFiles;
const uploadFile = (fileName, localFilePath) => __awaiter(void 0, void 0, void 0, function* () {
    const fileContent = fs_1.default.readFileSync(localFilePath);
    const response = yield s3.upload({
        Body: fileContent,
        Bucket: "xyz2622",
        Key: fileName,
    }).promise();
    console.log(response);
});
