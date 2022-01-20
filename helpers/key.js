/**
 * This function generates unique keys
 * @function generate()
 * @param { Number } length 
 * @returns { String }
 */
exports.generate = (length) => {
  const string =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  let key = "";

  for (let count = 0; count < length; count++) {
    key += string[Math.floor(Math.random() * string.length)];
  }

  return key;
};
