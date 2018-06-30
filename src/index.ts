import Blockchain from "./models/Blockchain";

const blockchain = new Blockchain();


blockchain.addBlock(blockchain.createBlock("block 1"));
blockchain.addBlock(blockchain.createBlock("block 2"));


// console.log(blockchain.getChain());

blockchain.validateChain();