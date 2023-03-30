// Function that executes the file stored in the excerpts directory using shell commands.

// More on Child Process : https://nodejs.org/docs/latest-v18.x/api/child_process.html#child-process

// import { exec } from "child_process";
import { exec as executeShellCommand } from "shelljs";
import { ALLOWED_LANGUAGES } from "types/enums";
import generateShellCommand from "./generateShellCommand";

const executeExcerpt = async (
  excerptFilePath: string,
  language: ALLOWED_LANGUAGES
) =>
  new Promise((resolve, reject) => {
    executeShellCommand(
      generateShellCommand({ filePath: excerptFilePath, language }),
      (error, stdout, stderr) => {
        error && reject({ error, stderr });
        stderr && reject({ error, stderr });
        resolve(stdout);
      }
    );
  });

export default executeExcerpt;
