"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const utils_1 = require("./utils");
const simple_git_1 = require("simple-git");
const file_1 = require("./file");
const path = __importStar(require("path"));
const upload_1 = require("./upload");
const redis_1 = require("redis");
require("dotenv").config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const publisher = (0, redis_1.createClient)();
publisher.connect();
// Inside the POST /deploy route handler
app.post("/deploy", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repoUrl = req.body.repoUrl;
    const id = (0, utils_1.generate)();
    const client = (0, redis_1.createClient)();
    client.connect();
    const outputDir = path.join(__dirname, `output/${id}`);
    yield (0, simple_git_1.simpleGit)().clone(repoUrl, outputDir);
    const files = (0, file_1.getAllFiles)(outputDir);
    // Uploading files to S3
    files.forEach((file) => __awaiter(void 0, void 0, void 0, function* () {
        const relativePath = file.slice(__dirname.length + 1).replace(/\\/g, "/");
        // console.log(relativePath);
        // Uncomment the following line to upload to S3
        yield (0, upload_1.uploadToS3)(relativePath, file);
    }));
    yield new Promise((resolve) => setTimeout(resolve, 5000));
    client.lPush("build-queues", id);
    client.hSet("status", id, "Uploaded");
    const value = client.hGet("status", id);
    res.json({
        id: id,
    });
}));
app.get("/status", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const response = yield publisher.hGet("status", id);
    res.json({
        status: response,
    });
}));
app.listen(process.env.PORT, () => {
    console.log(`server running at port ${process.env.PORT}`);
});
