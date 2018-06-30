import Blockchain from "./models/Blockchain";



(async () => {
    const blockchain = new Blockchain();
    await blockchain.createAndAddBlock("First block of this blockchain - the genesis block");
    
    console.log(await blockchain.getChain());

    blockchain.validateChain();
})();