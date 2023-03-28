// Function that executes the file stored in the excerpts directory using shell commands.

// More on Child Process : https://nodejs.org/docs/latest-v18.x/api/child_process.html#child-process

import { exec } from "child_process";
import * as fs from "fs";
import path from "path";

const outputDirectory = "src/outputs";

if (!fs.existsSync(outputDirectory))
  fs.mkdirSync(outputDirectory, { recursive: true }); // recursive:true --> create any missing parent directories automatically.

//   Input Ex: /Users/vijayskumar/Desktop/Personal/online-ide/server/src/excerpts/f889aa44-f7a1-423d-947c-c1d9b5ed6629.cpp
const executeExcerpt = async (excerptFilePath: string) => {
  const EXECUTABLE_FILE_EXTENTION = "out"; // TODO: Figure our for how to switch for windows (exe)

  // The basename method returns the filename we need which has the JobId. (Output Ex: f889aa44-f7a1-423d-947c-c1d9b5ed6629.cpp)
  const basename = path.basename(excerptFilePath);
  const jobId = basename.split(".")[0];
  const outputFilePath = path.join(
    outputDirectory,
    `${jobId}.${EXECUTABLE_FILE_EXTENTION}`
  );

  return new Promise((resolve, reject) => {
    /**
     * g++ : Command to execute C++ programme. (explore more..)
     * excerptFilePath : File to be compiled / executed
     * -o : flag to specify the output path
     * outputFilePath : path where the executable output file is stored after compilation.
     *
     * The above steps will generate an executable file. Now we need to dive into the outputs directory and then run the executable.
     *
     * ./${jobId}.out : The compiled executable file present and on enter will be executed as a regualar application code.
     */
    exec(
      `g++ ${excerptFilePath} -o ${outputFilePath} && cd ${outputDirectory} && ./${jobId}.${EXECUTABLE_FILE_EXTENTION}`,
      (error, stdout, stderr) => {
        error && reject({ error, stderr });
        stderr && reject({ error, stderr });
        resolve(stdout);
      }
    );
  });
};

export default executeExcerpt;
