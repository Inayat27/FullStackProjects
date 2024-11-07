"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildProject = void 0;
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
function buildProject(id) {
    return new Promise((resolve, reject) => {
        const folderPath = path_1.default.join(__dirname, `output/${id}`);
        const child = (0, child_process_1.exec)(`cd ${folderPath} && npm install && npm run build`, (error, stdout, stderr) => {
            if (error) {
                console.error('Error:', error.message);
                reject(error);
                return;
            }
            if (stderr) {
                console.error('stderr:', stderr);
                reject(new Error(stderr));
                return;
            }
            console.log('stdout:', stdout);
            resolve(stdout);
        });
        child.on('exit', (code) => {
            console.log('Child process exited with code', code);
        });
    });
}
exports.buildProject = buildProject;
