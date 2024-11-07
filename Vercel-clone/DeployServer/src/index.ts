import { createClient, commandOptions } from "redis";
import { copyFinalDist, downloadS3Folder } from "./aws";

import * as dotenv from "dotenv";
import path from "path";
import { buildProject } from "./utils";
dotenv.config();

const client = createClient();
client.connect();

const publisher = createClient();
publisher.connect();

export const main = async () => {
  while (1) {
    const response = await client.brPop(
      commandOptions({ isolated: true }),
      "build-queues",
      0
    );
    console.log(response);

    //  @ts-ignore;
    const id = response.element;

    await downloadS3Folder(`output/${id}`);

    console.log("downloaded");

    await buildProject(id);

    console.log("Build Completed");

    copyFinalDist(id);
    console.log("SuccessFully Pushed to S3..");

    publisher.hSet("status", id, "Deployed");
  }
};

main();
