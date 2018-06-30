import Block from "./Block";

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

    getBlockByNumber(blockNumber: number): Block | undefined {
        if (blockNumber >= 0 && blockNumber < this.chain.length) {
            return this.chain[blockNumber];
        }
        return undefined;
    }

    getLastBlockHash(): string {
        const lastBlock = this.getBlockByNumber(this.chain.length - 1);
        if (lastBlock) {
            return lastBlock.hash;
        }
        return "";
    }
}