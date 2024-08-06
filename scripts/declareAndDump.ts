import { exec } from "child_process";
import { declareDapp, dumpDevnet } from "./utils";

const command1 = "scarb run start-devnet";

exec(command1, (error, stdout, stderr) => {
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

console.log("Dumping devnet....");
await dumpDevnet();
console.log("Devnet dumped");

const command2 = "scarb run kill-devnet";

exec(command2, (error, stdout, stderr) => {
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
