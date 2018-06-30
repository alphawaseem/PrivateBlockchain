import Blockchain from "./models/Blockchain";



(async () => {
    const blockchain = new Blockchain();
    await blockchain.createAndAddBlock("First block of this blockchain - the genesis block");
    await blockchain.createAndAddBlock("block 1");
    await blockchain.createAndAddBlock("block 2");


    console.log(await blockchain.getChain());

    blockchain.validateChain();
})();