import { SHA256 } from "crypto-js";

export default class Block {
    hash: string;
    height: number;
    body: any;
    time: string;
    previousBlockHash: string;

    constructor(height: number, data: any, previousBlockHash: string) {
        this.height = height;
        this.body = data;
        this.time = new Date().getTime().toString().slice(0, -3);
        this.previousBlockHash = previousBlockHash;
        this.hash = SHA256(JSON.stringify(this)).toString();
    }
}