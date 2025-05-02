# 🚀 Hello World - Smart Contract sur Ethereum Testnet (Sepolia)

Ce projet permet de créer, déployer et interagir avec un smart contract écrit en Solidity, sur le testnet Sepolia d’Ethereum à l’aide de Hardhat.

## 📦 Prérequis

- Node.js installé
- Un compte Infura (https://infura.io/)
- Un wallet Ethereum (Rabby ou MetaMask)
- ETH de test via un faucet Sepolia :
  - https://faucet.triangleplatform.com/ethereum/sepolia
  - https://sepolia-faucet.pk910.de/#/

## 🛠 Installation

```bash
git clone <ce dépôt>
cd hello-world
npm install
```

## 🧱 Structure du projet

```
hello-world/
├── contracts/
│   └── HelloWorld.sol        # Contrat intelligent
├── scripts/
│   ├── deploy.js             # Script de déploiement
│   └── interact.js           # Script d’interaction
├── .env                      # Variables d’environnement (non versionné)
├── hardhat.config.js         # Configuration Hardhat
└── package.json
```

## ⚙️ Fichier `.env` (exemple)

```
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/VOTRE_PROJECT_ID
PRIVATE_KEY=cle_privee_sans_0x
```

## 🚀 Déploiement du contrat

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

## 🤝 Interaction avec le contrat

```bash
npx hardhat run scripts/interact.js --network sepolia
```

## 🔍 Vérification

Utilisez https://sepolia.etherscan.io pour vérifier :

- le contrat
- les transactions associées (onglet "Logs" pour voir les messages)

## 📝 Rendu

Ajoutez l’URL de votre transaction contenant votre prénom dans le formulaire :
👉 https://forms.cloud.microsoft/e/62A9A7muwV

## 🧠 Auteur

Nom : Max-Yves Mastrodicasa  
Projet pédagogique – B3 Blockchain
