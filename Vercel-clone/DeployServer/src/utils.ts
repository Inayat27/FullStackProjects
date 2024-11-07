import { exec } from "child_process";
import path from "path";

export function buildProject(id: string) {
    return new Promise((resolve, reject) => {
        const folderPath = path.join(__dirname, `output/${id}`);

        const child = exec(`cd ${folderPath} && npm install && npm run build`, (error, stdout, stderr) => {
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
