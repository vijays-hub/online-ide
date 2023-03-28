// Function to generate a programming file that has the code excerpt sent from the client.
import * as fs from "fs";
import path from "path";
import { CodeExcerpt } from "types";
import { generateUniqueId } from "utils";

const codeDirectory = "src/excerpts";

if (!fs.existsSync(codeDirectory))
  fs.mkdirSync(codeDirectory, { recursive: true }); // recursive:true --> create any missing parent directories automatically.

const generateFile = async ({ excerpt, language: format }: CodeExcerpt) => {
  const jobId = generateUniqueId();

  const fileName = `${jobId}.${format}`;
  const filePath = path.join(codeDirectory, fileName);

  //   Write the excerpts in the filepath brewed.
  fs.writeFileSync(filePath, excerpt);

  return filePath; // To aid in executing the file with shell commands.
};

export default generateFile;
