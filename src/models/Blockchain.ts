import Block from "./Block";
import { SHA256 } from "crypto-js";

export default class Blockchain {
    private chain: Block[] = [];

    constructor() {
        this.addBlock(
            this.createBlock("First block to this blockchain - the genesis block")
        );
    }

    getChain(): Block[] {
        return [...this.chain];
    }

    createBlock(data: any) {
        return new Block(this.chain.length, data, this.getLastBlockHash());
    }

    addBlock(block: Block) {
        this.chain.push(block);
    }

    getBlockHeight() {
        return this.chain.length - 1;
    }

    getBlock(blockNumber: number): Block | undefined {
        if (blockNumber >= 0 && blockNumber < this.chain.length) {
            return this.chain[blockNumber];
        }
        return undefined;
    }

    // 
    getLastBlockHash(): string {
        const lastBlock = this.getBlock(this.chain.length - 1);
        if (lastBlock) {
            return lastBlock.hash;
        }
        return "";
    }

    validateBlock(blockHeight: number) {
        const block = this.getBlock(blockHeight);
        if (block) {
            const blockHash = block.hash;
            delete block.hash;
            const validBlockHash = SHA256(JSON.stringify(block)).toString();
            block.hash = validBlockHash;
            if (blockHash === validBlockHash) {
                return true;
            } else {
                console.log("Block #" + blockHeight + " invalid hash:\n" + blockHash + "<>" + validBlockHash);
                return false;
            }
        } else {
            console.log("No block ", blockHeight);
        }
    }

    validateChain() {
        const errorLog = [];
        for (let i = 0; i < this.chain.length - 1; i++) {
            // validate block
            if (!this.validateBlock(i)) errorLog.push(i);
            // compare blocks hash link
            const blockHash = this.chain[i].hash;
            const previousHash = this.chain[i + 1].previousBlockHash;
            console.log(blockHash, previousHash);
            if (blockHash !== previousHash) {
                errorLog.push(i);
            }
        }
        if (errorLog.length > 0) {
            console.log("Block errors = " + errorLog.length);
            console.log("Blocks: " + errorLog);
        } else {
            console.log("No errors detected");
        }
    }
}
