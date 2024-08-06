import { exec } from "child_process";
import { declareDapp } from "./utils";

const command = "scarb run start-devnet-dumped";

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});
console.log("wait for devnet");
await new Promise((resolve) => setTimeout(resolve, 10000));

await declareDapp();
