// Function to generate a shell command to compile (for compiled languages like C, C++, Rust, etc..) and execute an excerpt.

import path from "path";

import { ShellCommandInput } from "types";
import { ALLOWED_LANGUAGES } from "types/enums";

import * as fs from "fs";

const outputDirectory = "src/outputs";

if (!fs.existsSync(outputDirectory))
  fs.mkdirSync(outputDirectory, { recursive: true }); // recursive:true --> create any missing parent directories automatically.

//   filepath Input Ex: /Users/vijayskumar/Desktop/Personal/online-ide/server/src/excerpts/f889aa44-f7a1-423d-947c-c1d9b5ed6629.cpp
const generateShellCommand = ({ filePath, language }: ShellCommandInput) => {
  const EXECUTABLE_FILE_EXTENTION = getOutputFileExtension(language);
  // The basename method returns the filename we need which has the JobId. (Output Ex: f889aa44-f7a1-423d-947c-c1d9b5ed6629.cpp)
  const basename = path.basename(filePath);
  const jobId = basename.split(".")[0];
  const outputFilePath = path.join(
    outputDirectory,
    `${jobId}.${EXECUTABLE_FILE_EXTENTION}`
  );

  switch (language) {
    case ALLOWED_LANGUAGES["C++"]:
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
      return `g++ ${filePath} -o ${outputFilePath} && cd ${outputDirectory} && ./${jobId}.${EXECUTABLE_FILE_EXTENTION}`;

    case ALLOWED_LANGUAGES.PYTHON:
      return `python3 ${filePath}`;

    // case ALLOWED_LANGUAGES.JAVA:
    //   return `javac ${filePath} && cd ${outputDirectory} && java ${jobId}.${EXECUTABLE_FILE_EXTENTION}`;
    // case ALLOWED_LANGUAGES.JAVA:
    //   return `docker run --rm -v "$(pwd)":/server -w /server openjdk:latest javac ${filePath} && java ${jobId}.${EXECUTABLE_FILE_EXTENTION}`;

// spawn('docker', ['run', '--rm', '-v', `${path}:/usr/src/${filename}`, selectedLanguage.image, ...selectedLanguage.command(filename)]);

    default:
      break;
  }
};

const getOutputFileExtension = (language: ALLOWED_LANGUAGES) => {
  switch (language) {
    case ALLOWED_LANGUAGES["C++"]:
      return ".out";
    case ALLOWED_LANGUAGES["JAVA"]:
      return ".class";
  }
};

export default generateShellCommand;
