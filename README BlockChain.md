# 🧮 MathChain — Blockchain avec Preuve de Travail Mathématique

Ce projet implémente une blockchain en JavaScript (Node.js) dans laquelle les blocs sont validés par un système de preuve de travail (Proof of Work) **mathématiquement contraint** : le `nonce` doit être un **carré parfait**, et le `hash` doit commencer par un certain nombre de zéros (`difficulty`).

---

## ✨ Fonctionnement du minage

Pour qu’un bloc soit considéré comme valide, il doit respecter **deux conditions simultanées** :

1. Le `hash` SHA256 du bloc doit commencer par `difficulty` zéros.
2. Le `nonce` utilisé doit être un **carré parfait** (ex: 1, 4, 9, 16, 25, 36...).

Le hash est calculé avec :

```
SHA256(timestamp + previousHash + data + nonce)
```

---

## 📦 Structure des fichiers

| Fichier                | Rôle                                                                |
| ---------------------- | ------------------------------------------------------------------- |
| `block.js`             | Classe Block : contient la logique de minage et de validation       |
| `blockchain.js`        | Classe Blockchain : gestion de la chaîne et des blocs validés       |
| `validate.js`          | Lit un fichier `.txt` contenant des preuves et les valide           |
| `proof.txt`            | Fichier texte contenant des preuves de minage manuelles ou générées |
| `miner.js` (optionnel) | Générateur de preuves valides (non inclus par défaut)               |

---

## 🧪 Format de `proof.txt`

Chaque bloc proposé est séparé par `# Bloc N` :

```
# Bloc 1
timestamp=1746011846060
lastHash=abcd1234...
data=some block data
nonce=625
difficulty=3
givenHash=000abc...

# Bloc 2
...
```

---

## ✅ Valider un fichier `proof.txt`

Lancer la commande :

```bash
node validate.js
```

Chaque bloc sera vérifié individuellement avec message :

```
Bloc 1 : ✅ Valide
Bloc 2 : ❌ Invalide
...
```

---

## 🛠 Ajouter un bloc à la chaîne (si preuve valide)

La méthode `addBlockFromProof(proof)` est utilisée pour intégrer un bloc déjà miné :

```js
blockchain.addBlockFromProof(proof);
```

---

## 🚧 À venir (extensions possibles)

- Générateur automatique de preuves (`miner.js`)
- Interface web pour visualiser les blocs
- Intégration réseau P2P
- Tokens mathématiques ou leaderboard par √nonce

---

## 📚 Technologies

- Node.js
- crypto / crypto-js
- SHA256
- Système de fichiers (`fs`)
- Javascript pur

---

## 📖 Auteur

Projet développé par Max-Yves Mastrodicasa
