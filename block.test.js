const Block = require("./block");

describe("Block", () => {
  let data, lastBlock, block;

  beforeEach(() => {
    data = "Test data";
    lastBlock = Block.genesis();
    block = Block.mineBlock(lastBlock, data);
  });

  it("sets the `data` to match the input", () => {
    expect(block.data).toEqual(data);
  });

  it("sets the `lastHash` to match the hash of the last block", () => {
    expect(block.lastHash).toEqual(lastBlock.hash);
  });

  it("generates a hash based on the correct inputs", () => {
    expect(block.hash).toEqual(
      Block.hash(block.timestamp, block.lastHash, block.data)
    );
  });

  it("sets a timestamp", () => {
    expect(block.timestamp).not.toBeUndefined();
  });
});
