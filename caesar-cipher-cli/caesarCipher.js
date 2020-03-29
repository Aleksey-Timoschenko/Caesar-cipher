const isUpperCase = str => {
  return str === str.toUpperCase();
};

const coder = (letter, shift, action) => {
  const actionShift = action === 'encode' ? shift : -shift;

  if (isUpperCase(letter)) {
    return String.fromCharCode(
      ((letter.charCodeAt(0) + actionShift - 65) % 26) + 65
    );
  }

  return String.fromCharCode(
    ((letter.charCodeAt(0) + actionShift - 97) % 26) + 97
  );
};

module.exports = coder;
