const crypto = require("crypto");
const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(
    timestamp,
    data,
    previousHash = "",
    difficulty = 5,
    nonce = 0,
    hash = ""
  ) {
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.difficulty = difficulty;
    this.nonce = nonce;
    this.hash = hash || this.calculateHash();
  }

  calculateHash() {
    return crypto
      .createHash("sha256")
      .update(
        this.timestamp +
          this.previousHash +
          JSON.stringify(this.data) +
          this.nonce
      )
      .digest("hex");
  }

  static isPerfectSquare(n) {
    return Number.isInteger(Math.sqrt(n));
  }

  static hash(timestamp, lastHash, data, nonce, difficulty) {
    return SHA256(
      `${timestamp}${lastHash}${data}${nonce}${difficulty}`
    ).toString();
  }

  mineBlock() {
    while (
      !this.hash.startsWith("0".repeat(this.difficulty)) ||
      !Block.isPerfectSquare(this.nonce)
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }

  isValid() {
    return (
      this.hash.startsWith("0".repeat(this.difficulty)) &&
      Block.isPerfectSquare(this.nonce)
    );
  }

  validateProof(nonce) {
    this.nonce = nonce;
    this.hash = this.calculateHash();
    return this.isValid();
  }

  toString() {
    const valid = this.isValid() ? "✅" : "❌";
    const sqrt = Math.sqrt(this.nonce).toFixed(2);
    return `Block -
  Timestamp : ${this.timestamp}
  Data      : ${JSON.stringify(this.data)}
  Nonce     : ${this.nonce} (√nonce ≈ ${sqrt})
  Hash      : ${this.hash}
  Valid     : ${valid}`;
  }
}

module.exports = Block;
