import { readFileSync } from "fs";
import path from "path";
import {
  Account,
  DeclareContractPayload,
  extractContractHashes,
  json,
  RpcProvider,
} from "starknet";

const dumpFolder = "../dump/dump.json";

export async function dumpDevnet() {
  const url = `http://127.0.0.1:5050/dump`;
  const headers = { "Content-Type": "application/json" };
  const payload = { path: dumpFolder };
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error(
      `HTTP error! calling ${url} Status: ${response.status} Message: ${await response.text()}`,
    );
  }
}

export async function declareDapp() {
  const contractPath = path.resolve(__dirname, "../target/dev/");

  const provider = new RpcProvider({ nodeUrl: "http://127.0.0.1:5050" });

  const privateKey = "0x71d7bb07b9a64f6f78ac4c816aff4da9";
  const accountAddress: string =
    "0x64b48806902a367c8598f4f95c305e8c1a1acba5f082d294a43793113115691";
  const account = new Account(provider, accountAddress, privateKey);

  // Declare & deploy Test contract in devnet
  const compiledTestSierra = json.parse(
    readFileSync(
      contractPath + "/devnet_MockDapp.contract_class.json",
    ).toString("ascii"),
  );
  const compiledTestCasm = json.parse(
    readFileSync(
      contractPath + "/devnet_MockDapp.compiled_contract_class.json",
    ).toString("ascii"),
  );

  const payload: DeclareContractPayload = { contract: compiledTestSierra };
  payload.casm = compiledTestCasm;

  const hash = extractContractHashes(payload);

  try {
    await provider.getClassByHash(hash.classHash);
    console.log("Contract already declared");
    console.log("Test Contract Class Hash =", hash.classHash);
  } catch (e) {
    console.log("Contract not yet declared, declaring...");
    const declare = await account.declareIfNot(payload);
    console.log("Test Contract Class Hash =", declare.class_hash);
  }
}
