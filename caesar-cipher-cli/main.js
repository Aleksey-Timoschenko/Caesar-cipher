const minimist = require('minimist');

const cli = require('./cli.js');

const main = async () => {
  try {
    const cliData = minimist(process.argv.slice(2));

    process.stdout.write('To exit from app use Ctrl + C');

    const inputFilePath = cliData.i || cliData.input || null;
    const outputFilePath = cliData.o || cliData.output || null;
    const shift = cliData.s || cliData.shift || null;
    const action = cliData.a || cliData.action || null;

    if (!cli.isActionOptionValid(action) || !cli.isShiftOptionValid(shift)) {
      process.stderr.write('Need to set valid shift and action options');

      // eslint-disable-next-line no-process-exit
      process.exit(500);
    }

    await cli.createIOStreams(inputFilePath, outputFilePath, shift, action);
  } catch (error) {
    console.error('ERROR', error);
    process.stderr.write('code error');

    // eslint-disable-next-line no-process-exit
    process.exit(500);
  }
};

module.exports = main;
