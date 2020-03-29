const fs = require('fs');
const util = require('util');
const { pipeline } = require('stream');

const CoderStream = require('./coder.js');

const isShiftOptionValid = option => {
  return Number(option);
};

const isActionOptionValid = option => {
  return option && (option === 'encode' || option === 'decode');
};

const isFileValid = filePath => {
  const stat = util.promisify(fs.stat);

  return stat(filePath)
    .then(stats => {
      if (stats.isFile()) {
        return true;
      }

      return new Error('File is not a valid');
    })
    .catch(() => {
      process.stderr.write('Need to set valid file path');

      // eslint-disable-next-line no-process-exit
      process.exit(500);
    });
};

const createIOStreams = async (
  inputFilePath,
  outputFilePath,
  shift,
  action
) => {
  const isInputFileValid = inputFilePath
    ? await isFileValid(inputFilePath)
    : false;
  const isOutputFileValid = outputFilePath
    ? await isFileValid(outputFilePath)
    : false;

  if (!isOutputFileValid) {
    process.stdout.write('Coded text will be showed in the terminal\n');
  }

  if (!isInputFileValid) {
    process.stdout.write('Please, use terminal to enter text: ');
  }

  process.stdin.setEncoding('utf8');

  const inputFileStream = isInputFileValid
    ? fs.createReadStream(inputFilePath)
    : process.stdin;

  const outputFileStream = isOutputFileValid
    ? fs.createWriteStream(outputFilePath, {
        flags: 'a'
      })
    : process.stdout;

  pipeline(
    inputFileStream,
    new CoderStream({ shift, action }),
    outputFileStream,
    err => {
      if (err) {
        console.error('Pipeline failed');

        throw new Error('Code error');
      } else {
        console.error('Pipeline succeeded');
      }
    }
  );
};

module.exports = {
  createIOStreams,
  isFileValid,
  isActionOptionValid,
  isShiftOptionValid
};
