# Blockchain Data

Blockchain has the potential to change the way that the world approaches data. Develop Blockchain skills by understanding the data model behind Blockchain by developing your own simplified private blockchain.

## Getting Started

Download/Clone this repo. If you have downlaoded the zip file then unzip it first and browse to
the project directory from your terminal.

### Prerequisites

Installing Node and NPM is pretty straightforward using the installer package available from the (Node.js® web site)[https://nodejs.org/en/].

### Install the project dependencies

Install all the project dependencies with this command
```
npm install
```

### Building the project

I have used TypeScript in this project, so you have to compile it to JavaScript before running the
project. To build the project just run the following command.

```
npm run build
```

### About My Blockchain.

When you clone this repo, you will already have a folder called chaindata with the only one block in the blockchain, this is the first block to the blockchain known as genesis block.


### Running/Testing the project

When you type the following command it will create a new block and add it to the existing blockchain and prints entire blockchain and the message which tells the validity of the blockchain. Here is the command to test it
```
npm test
```
Each time you run this command a new block is created which is linked to previous block.