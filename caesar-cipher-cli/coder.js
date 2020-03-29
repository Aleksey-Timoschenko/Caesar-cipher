const { Transform } = require('stream');
const { StringDecoder } = require('string_decoder');

const coder = require('./caesarCipher.js');

class CoderStream extends Transform {
  constructor(options) {
    super(options);

    const { shift, action } = options;

    this.shift = shift;
    this.action = action;
    this._decoder = new StringDecoder('utf-8');
  }

  _transform(chunk, encoding, callback) {
    if (encoding === 'buffer') {
      chunk = this._decoder.write(chunk);
    }

    if (chunk === '\u0003') {
      // eslint-disable-next-line no-process-exit
      process.exit();
    }

    chunk = chunk
      .split('')
      .map(letter =>
        letter.match(/[a-zA-Z]/)
          ? coder(letter, this.shift, this.action)
          : letter
      )
      .join('');

    callback(null, chunk);
  }
}

module.exports = CoderStream;
