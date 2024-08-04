import path from "path";
import { fileURLToPath } from "url";
import solc from "solc";
import fs from "fs-extra";

// Get current module path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const contractPath = path.resolve(__dirname, "contracts", "contract.sol");
const source = fs.readFileSync(contractPath, "utf8");

// Define input for solc compiler
const input = {
  language: "Solidity",
  sources: {
    "contract.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["abi", "evm.bytecode"], // Fetch abi and bytecode
      },
    },
  },
};

// Compile the contract
try {
  const output = JSON.parse(solc.compile(JSON.stringify(input)));
  
  // Ensure build directory exists
  fs.ensureDirSync(buildPath);

  // Log output to console
  console.log(output);

  // Handle errors
  if (output.errors) {
    output.errors.forEach(err => {
      console.error(err.formattedMessage);
    });
  }

  // Write the compiled contract output to build directory
  for (let contract in output.contracts["contract.sol"]) {
    fs.outputJsonSync(
      path.resolve(buildPath, contract + ".json"),
      output.contracts["contract.sol"][contract]
    );
  }
} catch (error) {
  console.error("Error during compilation:", error);
}
