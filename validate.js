const fs = require("fs");
const path = require("path");
const Block = require("./block");
const SHA256 = require("crypto-js/sha256");

/**
 * Vérifie si un nombre est un carré parfait
 */
function isPerfectSquare(n) {
  return Number.isInteger(Math.sqrt(n));
}

/**
 * Lit un fichier .txt contenant plusieurs blocs séparés par "# Bloc"
 * et retourne un tableau de preuves
 */
function loadMultipleProofs(filePath) {
  const raw = fs.readFileSync(filePath, "utf-8");

  // Séparer les blocs avec "# Bloc", insensible à la casse
  const blocks = raw.split(/^#\s*bloc.*$/gim).filter(Boolean);

  const proofs = blocks.map((blockText, i) => {
    const lines = blockText.trim().split("\n").filter(Boolean);
    const proof = {};

    for (const line of lines) {
      const [key, value] = line.split("=");
      if (key && value) {
        proof[key.trim()] = value.trim();
      }
    }

    // Convertir les types numériques
    proof.timestamp = Number(proof.timestamp);
    proof.nonce = Number(proof.nonce);
    proof.difficulty = Number(proof.difficulty);

    return proof;
  });

  return proofs;
}

/**
 * Valide une preuve unique
 */
function validateProof({
  timestamp,
  lastHash,
  data,
  nonce,
  difficulty,
  givenHash,
}) {
  const calculatedHash = Block.hash(
    timestamp,
    lastHash,
    data,
    nonce,
    difficulty
  );

  const isHashCorrect = givenHash === calculatedHash;
  const startsWithZeros = givenHash.startsWith("0".repeat(difficulty));
  const square = isPerfectSquare(nonce);

  return isHashCorrect && startsWithZeros && square;
}

// --- Test automatique si ce fichier est exécuté en direct ---
if (require.main === module) {
  const proofPath = path.join(__dirname, "proof.txt");
  const proofs = loadMultipleProofs(proofPath);

  proofs.forEach((proof, index) => {
    const result = validateProof(proof);
    console.log(`Bloc ${index + 1} : ${result ? "✅ Valide" : "❌ Invalide"}`);
  });
}

module.exports = {
  loadMultipleProofs,
  validateProof,
  isPerfectSquare,
};
