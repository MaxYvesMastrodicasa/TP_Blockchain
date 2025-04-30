const Block = require("./block");

describe("Proof-of-Work avec carré parfait", () => {
  it("devrait miner un bloc avec un hash valide et un nonce carré parfait", () => {
    const block = new Block(Date.now(), { amount: 50 }, "", 3);
    block.mineBlock();

    expect(block.hash.startsWith("0".repeat(block.difficulty))).toBe(true);
    expect(Block.isPerfectSquare(block.nonce)).toBe(true);
    expect(block.isValid()).toBe(true);
  });

  it("devrait retourner false si le nonce n’est pas un carré parfait", () => {
    const block = new Block(Date.now(), { amount: 100 }, "", 2);
    block.nonce = 3; // 3 n’est pas un carré parfait
    block.hash = block.calculateHash();
    expect(block.isValid()).toBe(false);
  });

  it("affiche correctement √nonce et validation dans toString()", () => {
    const block = new Block(Date.now(), { msg: "Test" }, "", 2);
    block.mineBlock();
    const output = block.toString();

    expect(output).toMatch(/√nonce/);
    expect(output).toMatch(/✅/);
  });

  it("validateProof retourne true uniquement si hash et nonce sont valides", () => {
    const block = new Block(Date.now(), {}, "", 2);
    let valid = block.validateProof(49); // 49 = 7² → bon nonce

    if (block.hash.startsWith("0".repeat(block.difficulty))) {
      expect(valid).toBe(true);
    } else {
      expect(valid).toBe(false);
    }

    // Mauvais test volontaire : 50 n’est pas un carré
    valid = block.validateProof(50);
    expect(valid).toBe(false);
  });
});
