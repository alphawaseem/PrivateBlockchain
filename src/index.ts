import Blockchain from "./models/Blockchain";

const blockchain = new Blockchain();

console.log(blockchain.getBlockByNumber(0));