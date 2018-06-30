import Block from "./Block";
import { SHA256 } from "crypto-js";

const level = require("level");

const chainDB = level("./chaindata");
const CHAIN_DB_NAME = "blockchain";

export default class Blockchain {

    async getChain(): Promise<Block[]> {
        return (await chainDB.get(CHAIN_DB_NAME).then(JSON.parse).catch(() => []));
    }

    private async createBlock(chain: Block[], data: any) {
        return new Block(chain.length, data, this.getLastBlockHash(chain));
    }

    getLastBlockHash(chain: Block[]): string {
        const lastBlock = chain.length > 0 ? chain[chain.length - 1] : false;
        if (lastBlock) {
            return lastBlock.hash;
        }
        return "";
    }

    private async addBlock(chain: Block[], block: Block) {
        chain.push(block);
        await chainDB.put(CHAIN_DB_NAME, JSON.stringify(chain));
    }

    async createAndAddBlock(data: any) {
        const chain = await this.getChain();
        return await this.createBlock(chain, data).then(async (block) => {
            await this.addBlock(chain, block);
        }).catch(console.log);
    }

    async getBlockHeight(): Promise<number> {
        return (await this.getChain()).length - 1;
    }

    async getBlock(blockNumber: number): Promise<Block | undefined> {
        const chain = await this.getChain();
        if (blockNumber >= 0 && blockNumber < chain.length) {
            return chain[blockNumber];
        }
        return undefined;
    }

    async validateBlock(blockHeight: number) {
        const block = await this.getBlock(blockHeight);
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
        }
    }

    async validateChain() {
        const chain = await this.getChain();
        const errorLog = [];
        for (let i = 0; i < chain.length - 1; i++) {
            // validate block
            if (!this.validateBlock(i)) errorLog.push(i);
            // compare blocks hash link
            const blockHash = chain[i].hash;
            const previousHash = chain[i + 1].previousBlockHash;
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
