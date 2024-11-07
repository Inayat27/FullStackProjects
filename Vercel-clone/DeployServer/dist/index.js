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
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const redis_1 = require("redis");
const aws_1 = require("./aws");
const dotenv = __importStar(require("dotenv"));
const utils_1 = require("./utils");
dotenv.config();
const client = (0, redis_1.createClient)();
client.connect();
const publisher = (0, redis_1.createClient)();
publisher.connect();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    while (1) {
        const response = yield client.brPop((0, redis_1.commandOptions)({ isolated: true }), "build-queues", 0);
        console.log(response);
        //  @ts-ignore;
        const id = response.element;
        yield (0, aws_1.downloadS3Folder)(`output/${id}`);
        console.log("downloaded");
        yield (0, utils_1.buildProject)(id);
        console.log("Build Completed");
        (0, aws_1.copyFinalDist)(id);
        console.log("SuccessFully Pushed to S3..");
        publisher.hSet("status", id, "Deployed");
    }
});
exports.main = main;
(0, exports.main)();
