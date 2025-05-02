const hre = require("hardhat");

async function main() {
  // 🔁 Remplace cette ligne avec l’adresse réelle de ton contrat
  const contractAddress = "0xe70DDC3ca38955c25801Ad7f180Bc0e9Ebd1cBA4";

  // Connexion au contrat
  const HelloWorld = await hre.ethers.getContractFactory("HelloWorld");
  const hello = await HelloWorld.attach(contractAddress);

  // Lire le message actuel
  const currentMessage = await hello.message();
  console.log("Message actuel :", currentMessage);

  // Mettre à jour le message
  const tx = await hello.update("Max-Yves Mastrodicasa");
  await tx.wait();
  console.log("Message mis à jour !");

  // Vérifier la mise à jour
  const newMessage = await hello.message();
  console.log("Nouveau message :", newMessage);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
