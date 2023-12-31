"use strict";
require("react-native-get-random-values");

/*
 * react-native-get-random-values defines globally only crypto.getRandomValues
 * therefore it maps only this function
 */
exports.getRandomValues = crypto.getRandomValues;

// Implementation of getRandomBytes using getRandomValues
exports.randomBytes = (size, callback) => {
  const array = new Uint32Array(size);
  if (callback) {
    callback();
  }
  return Buffer.from(crypto.getRandomValues(array));
};

exports.createHash = exports.Hash = require("create-hash");
exports.createHmac = exports.Hmac = require("create-hmac");

var hashes = [
  "sha1",
  "sha224",
  "sha256",
  "sha384",
  "sha512",
  "md5",
  "rmd160",
].concat(Object.keys(require("browserify-sign/algos")));
exports.getHashes = function () {
  return hashes;
};

var p = require("pbkdf2");
exports.pbkdf2 = p.pbkdf2;
exports.pbkdf2Sync = p.pbkdf2Sync;

var aes = require("browserify-cipher");
[
  "Cipher",
  "createCipher",
  "Cipheriv",
  "createCipheriv",
  "Decipher",
  "createDecipher",
  "Decipheriv",
  "createDecipheriv",
  "getCiphers",
  "listCiphers",
].forEach(function (key) {
  exports[key] = aes[key];
});

var dh = require("diffie-hellman");
[
  "DiffieHellmanGroup",
  "createDiffieHellmanGroup",
  "getDiffieHellman",
  "createDiffieHellman",
  "DiffieHellman",
].forEach(function (key) {
  exports[key] = dh[key];
});

var sign = require("browserify-sign");
["createSign", "Sign", "createVerify", "Verify"].forEach(function (key) {
  exports[key] = sign[key];
});

exports.createECDH = require("create-ecdh");

var publicEncrypt = require("public-encrypt");

["publicEncrypt", "privateEncrypt", "publicDecrypt", "privateDecrypt"].forEach(
  function (key) {
    exports[key] = publicEncrypt[key];
  }
);

var rf = require("randomfill");

exports.randomFill = rf.randomFill;
exports.randomFillSync = rf.randomFillSync;

// the least I can do is make error messages for the rest of the node.js/crypto api.
["createCredentials"].forEach(function (name) {
  exports[name] = function () {
    throw new Error("sorry, " + name + " is not implemented yet");
  };
});
