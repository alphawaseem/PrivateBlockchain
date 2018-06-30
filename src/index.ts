import Blockchain from "./models/Blockchain";



(async () => {
    const blockchain = new Blockchain();
    const blockHeight = await blockchain.getBlockHeight();
    await blockchain.createAndAddBlock("Creating block " + (+blockHeight + 1)).then(async () => {
        const chain = await blockchain.getChain();
        console.log(chain);
        await blockchain.validateChain();
    });
})();