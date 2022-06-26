# @azuro-protocol/sdk

Is an SDK that will help you create better decentralized solutions in prediction markets.

Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [fetchGames](#fetchgames)
  - [setSelectedChainId](#setSelectedChainId)
  - [setContractAddresses](#setContractAddresses)
  - [configure](#configure)
  - [setWalletProvider](#setWalletProvider)
  - [fetchAllowance](#fetchAllowance)
  - [calculateActualOdds](#calculateActualOdds)
  - [approve](#approve)
  - [placeBet](#placeBet)
  - [fetchUserBets](#fetchUserBets)
  - [redeemPrize](#redeemPrize)
- [Dictionary](#dictionary)

## Installation

- Install [NodeJS](https://nodejs.org/en/) >= 14
- Run `npm install @azuro-protocol/sdk` command to install

## Usage

```javascript
import { fetchGames } from '@azuro-protocol/sdk'
// Or if you're stuck with CommonJS
const azuro = require('@azuro-protocol/sdk')
```
An example of how to get started with the SDK

```javascript
import {
  setContractAddresses,
  configure,
  setWalletProvider,
  fetchAllowance,
} from '@azuro-protocol/sdk'
import { Web3Provider } from '@ethersproject/providers'
const Web3 = require('web3')

const library = new Web3Provider(Web3.currentProvider)

await setContractAddresses({
  core: '0x4fE6A9e47db94a9b2a4FfeDE8db1602FD1fdd37d',
  lp: '0xac004b512c33D029cf23ABf04513f1f380B3FD0a',
  bet: '0xFd9E5A2A1bfc8B57A288A3e12E2c601b0Cc7e476',
  token: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
})

await configure({
  rpcUrl: 'https://rpc.xdaichain.com/',
  ipfsGateway: 'https://ipfs-gateway.azuro.org/ipfs/',
})

await setWalletProvider(library)
```
## API

#### fetchGames

This function synchronizes with the blockchain and gives you all the matches that are currently recorded in the blockchain. You also have the option to filter out these matches if you don't want to receive past matches or cancelled matches.

```javascript
const azuro = require('@azuro-protocol/sdk')

await azuro.fetchGames({
    resolved: false,
    canceled: false,
}).then(async res => {
    console.log(res)
}).catch(e => console.log(e))
```

An example of what you get when you use this function.
```json
[
  {
    "country": "International Tournaments",
    "league": "Dota 2. DPC NA 2021/2022 Tour 3: Division I  - Group Stage",
    "participants": [
      {
        "name": "Wildcard Gaming",
        "image": "https://cdn.sfp.odds.ru/img/234655.png"
      },
      {
        "name": "Nouns",
        "image": "https://cdn.sfp.odds.ru/img/243075.png"
      }
    ],
    "scopeId": 1854,
    "leagueId": 700,
    "countryId": 258,
    "sportTypeId": 1000,
    "id": 1854,
    "state": 0,
    "startsAt": 1655841600000,
    "conditions": [
      {
        "paramId": null,
        "odds": [
          {
            "conditionId": 642,
            "outcomeId": 32,
            "outcomeRegistryId": 10009,
            "paramId": 1,
            "value": 2.9613596003664573
          },
          {
            "conditionId": 642,
            "outcomeId": 33,
            "outcomeRegistryId": 10010,
            "paramId": 1,
            "value": 1.3562682487845052
          }
        ]
      }
    ],
    "marketRegistryId": 19
  },
  ...]
```

To understand what identifiers to outcomeId and other parameters mean, see our IPFS list, where we store [dictionary](#dictionary) and descriptions.

### setSelectedChainId

A function to set the chain id you will use for blockchain transactions.

```javascript
const azuro = require('@azuro-protocol/sdk')
azuro.setSelectedChainId(100)
```

### setContractAddresses

The function sets the contracts with which you will interact. These are the contracts of our protocol.

```javascript
const azuro = require('@azuro-protocol/sdk')

azuro.setContractAddresses({
    core: '0x4fE6A9e47db94a9b2a4FfeDE8db1602FD1fdd37d',
    lp: '0xac004b512c33D029cf23ABf04513f1f380B3FD0a',
    bet: '0xFd9E5A2A1bfc8B57A288A3e12E2c601b0Cc7e476',
    token: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
})
```

### configure

The function sets the rpcUrl and ipfs that you will interact with.

```javascript
const azuro = require('@azuro-protocol/sdk')

azuro.configure({
    rpcUrl: 'https://rpc.xdaichain.com/',
    ipfsGateway: 'https://ipfs-gateway.azuro.org/ipfs/',
})
```

## setWalletProvider

The function allows you to set your wallet provider for further interaction.

```javascript
import { setWalletProvider } from '@azuro-protocol/sdk'
import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers"

//library: Web3Provider
setWalletProvider(library);
```

## fetchAllowance

```javascript
const azuro = require('@azuro-protocol/sdk')

azuro.fetchAllowance(account) //account as string
```

## calculateActualOdds
The odds of events change over time, so in order to always know the actual odds we have a method.

```javascript
const azuro = require('@azuro-protocol/sdk')

azuro.calculateActualOdds({
    conditionId,
    betAmount,
    outcomeId,
})
```

## approve 
This method allows you to set the amount you allow our smart contract to use.

```javascript
const azuro = require('@azuro-protocol/sdk')
const { constants } = reqire("ethers")

azuro.approve(constants.MaxUint256)
```

## placeBet

This method allows you to bet on an event.

```javascript
const azuro = require('@azuro-protocol/sdk')

azuro.placeBet({
    conditionId,
    outcomeId,
    betAmount,
    betRate,
    slippage,
})
```

## fetchUserBets
This method allows you to get a list of matches on which you have bet.

```javascript
const azuro = require('@azuro-protocol/sdk')

azuro.fetchUserBets(account)
```
An example of what you get when you use this function.
```json
{
    "bets": [
        {
            "nftId": 145,
            "conditionId": 720,
            "paramId": 1,
            "marketRegistryId": 1,
            "outcomeRegistryId": 1,
            "rate": 2.062164217,
            "amount": 1,
            "result": -1,
            "createdAt": 1655913670000,
            "isRedeemed": false,
            "gameInfo": {
                "id": 1832,
                "country": "Brazil",
                "league": "Brasileiro Serie A - Round 14",
                "participants": [
                    {
                        "name": "Corinthians Paulista",
                        "image": "https://content.bookieratings.net/images/8e/o3/8eo376_20181001112205_100x100.png"
                    },
                    {
                        "name": "Santos",
                        "image": "https://content.bookieratings.net/images/et/z8/etz8q7_20181001112207_100x100.png"
                    }
                ],
                "scopeId": 1832,
                "leagueId": 329,
                "countryId": 31,
                "sportTypeId": 33,
                "startsAt": 1656194400000,
                "state": 1
            }
        },
    ]
}
```

## redeemPrize

This method allows you to get your reward for a winning bet.

```javascript
const azuro = require('@azuro-protocol/sdk')

azuro.redeemPrize(nftId)
```

## Dictionary

This is a dictionary that allows you to understand the parameters we give in the fetchGames method and others.

1. betTypeOdd.marketRegistry
IPFS hash: [QmPWps8adamqZfnie6MutAsrYUQynQ8ckwFb3bggz2T4aU](https://ipfs-gateway.azuro.org/ipfs/QmPWps8adamqZfnie6MutAsrYUQynQ8ckwFb3bggz2T4aU)

2. betTypeOdd.gamePeriod
IPFS hash: [QmTPaf3Vu1wuVH3CNagHmmvj7A9x4A4YHtm5jDzomLD2XP](https://ipfs-gateway.azuro.org/ipfs/QmTPaf3Vu1wuVH3CNagHmmvj7A9x4A4YHtm5jDzomLD2XP)

3. betTypeOdd.gameType
IPFS hash: [QmcxH3srMCPmaqCnSEtTE8PfhF5ykjEgUVgg9vYehmUc8v](https://ipfs-gateway.azuro.org/ipfs/QmcxH3srMCPmaqCnSEtTE8PfhF5ykjEgUVgg9vYehmUc8v)

4. betTypeOdd.gameVariety
IPFS hash: [QmUAPb5un7FCbXRJJLaSwGv8iH8yoEj4AQb1B8jbm1sAYg](https://ipfs-gateway.azuro.org/ipfs/QmUAPb5un7FCbXRJJLaSwGv8iH8yoEj4AQb1B8jbm1sAYg)

5. betTypeOdd.outcomeRegistry
IPFS hash: [QmQ34UYPPtpxJiWcVj4buh4HzFo4Z9gwGt5KRiprQN3fkT](https://ipfs-gateway.azuro.org/ipfs/QmQ34UYPPtpxJiWcVj4buh4HzFo4Z9gwGt5KRiprQN3fkT)

6. betTypeOdd.param
IPFS hash: [QmYsGGCbNrwcUpTCbVbKM7NrMZNg1coFpJDu9ZBrsVqL9H](https://ipfs-gateway.azuro.org/ipfs/QmYsGGCbNrwcUpTCbVbKM7NrMZNg1coFpJDu9ZBrsVqL9H)

7. betTypeOdd.teamPlayer
IPFS hash: [QmUbip5C5XhyW7mwHkRcdUYFb5jGaD4K7AmmKUNLuaMDi7](https://ipfs-gateway.azuro.org/ipfs/QmUbip5C5XhyW7mwHkRcdUYFb5jGaD4K7AmmKUNLuaMDi7)

8. sportTypeId
IPFS hash: [QmZ3UGFQreUNNtnW2v5uoQZLKPv5kJxWvZhr87kDSm6vyJ](https://ipfs-gateway.azuro.org/ipfs/QmZ3UGFQreUNNtnW2v5uoQZLKPv5kJxWvZhr87kDSm6vyJ)

9. betTypeOdd
IPFS hash: [QmZL7mcGKYnbhcWAxQShKtwn9nwZcimaeRFKgAnKm4mcsH](https://ipfs-gateway.azuro.org/ipfs/QmZL7mcGKYnbhcWAxQShKtwn9nwZcimaeRFKgAnKm4mcsH)







