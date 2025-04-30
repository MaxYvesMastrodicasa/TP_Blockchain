# 🔨 MathMining CLI – Minage Proof-of-Work avec carrés parfaits

Bienvenue dans **MathMining**, une application de minage en ligne de commande qui explore une version élégante de la preuve de travail (Proof-of-Work) :  
👉 Un bloc est valide **uniquement si son nonce est un carré parfait** ET **si son hash SHA256 commence par un certain nombre de zéros** (`difficulty`).

---

## 🚀 Fonctionnement

L'utilisateur fournit :

- Une **difficulté** (nombre de zéros requis en début de hash)
- Un **intervalle de racines** (par exemple de 1 à 10 000)

L'application :

- Calcule chaque **nonce = i²**
- Calcule le **hash SHA256** du bloc
- Vérifie si le hash commence par `difficulty` zéros
- Enregistre chaque bloc valide dans un fichier `mined_blocks.txt`

---

## ⚙️ Utilisation

### 1. Installer Node.js

Assurez-vous d’avoir Node.js installé :

```bash
node -v
```

### 2. Lancer le mineur

```bash
node mine-range.js
```

### 3. Répondre aux questions :

```
Difficulté (nombres de zéros) ? 3
Racine min ? 1
Racine max ? 10000
```

---

## 📄 Exemple de sortie (`mined_blocks.txt`)

```txt
# Bloc 1
timestamp=1746005550000
lastHash=first
data=MathMining!
nonce=625
difficulty=3
givenHash=000abc...

# Bloc 2
timestamp=1746005570000
lastHash=000abc...
data=MathMining!
nonce=1225
difficulty=3
givenHash=000xyz...
```

---

## ✅ Contraintes de validation d’un bloc

Un bloc est valide **si et seulement si** :

- `hash.startsWith("0".repeat(difficulty))`
- `Number.isInteger(Math.sqrt(nonce))` → c’est un carré parfait

---

## 💡 Pourquoi cette approche ?

Ce système introduit une **preuve de travail mathématique plus élégante** :

- Plus lisible
- Plus difficile à tricher
- Plus amusante à expérimenter 💥

---

## 📁 Fichier principal

- `mine-range.js` : Script CLI de minage
- `mined_blocks.txt` : Résultat automatique à la fin du minage

---

## 👨‍💻 Auteur

Projet réalisé par Max-Yves Mastrodicasa
