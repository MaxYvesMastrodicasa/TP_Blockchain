const crypto = require("crypto");
const fs = require("fs");
const readline = require("readline");

function calculateHash(timestamp, lastHash, data, nonce, difficulty) {
  return crypto
    .createHash("sha256")
    .update(`${timestamp}${lastHash}${data}${nonce}${difficulty}`)
    .digest("hex");
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("=== 🛠️ Minage entre carrés parfaits ===");

rl.question("Difficulté (nombres de zéros) ? ", (difficultyInput) => {
  rl.question("Racine min ? ", (minRoot) => {
    rl.question("Racine max ? ", (maxRoot) => {
      const difficulty = parseInt(difficultyInput);
      const prefix = "0".repeat(difficulty);
      const start = parseInt(minRoot);
      const end = parseInt(maxRoot);
      const data = "MathMining!";
      const validBlocks = [];
      let previousHash = "first";

      const total = end - start + 1;
      let count = 0;

      for (let i = start; i <= end; i++) {
        count++;
        const nonce = i * i;
        const timestamp = Date.now();
        const hash = calculateHash(
          timestamp,
          previousHash,
          data,
          nonce,
          difficulty
        );

        if (count % 100 === 0 || i === end) {
          const percent = Math.floor((count / total) * 100);
          const barLength = 30;
          const filled = Math.floor((percent / 100) * barLength);
          const bar = "█".repeat(filled) + "-".repeat(barLength - filled);
          process.stdout.write(`\r🔄 Progression : [${bar}] ${percent}%`);
        }

        if (hash.startsWith(prefix)) {
          validBlocks.push({
            index: validBlocks.length + 1,
            timestamp,
            lastHash: previousHash,
            data,
            nonce,
            difficulty,
            hash,
          });
          previousHash = hash;
        }
      }

      console.log("\n🎉 Minage terminé !");

      if (validBlocks.length === 0) {
        console.log("❌ Aucun bloc valide trouvé.");
      } else {
        const content = validBlocks
          .map(
            (b) =>
              `# Bloc ${b.index}
timestamp=${b.timestamp}
lastHash=${b.lastHash}
data=${b.data}
nonce=${b.nonce}
difficulty=${b.difficulty}
givenHash=${b.hash}
`
          )
          .join("\n");

        fs.writeFileSync("proof.txt", content);
        console.log("📄 Fichier 'proof.txt' généré !");
      }

      rl.close();
    });
  });
});
