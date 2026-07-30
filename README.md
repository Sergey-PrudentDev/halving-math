# halving-math

Zero-dependency arithmetic for Bitcoin's issuance schedule: which halving
era a block belongs to, the subsidy paid in that era, how many blocks
until the next halving, and total BTC issued by a given height.

No network calls, no live node required — this is pure arithmetic against
the protocol's fixed schedule (the same schedule explained, with the
worked-out math, at [why21million.com/book/halving-schedule/](https://why21million.com/book/halving-schedule/)).

## Install

```
npm install halving-math
```

## Usage

```js
const {
  eraForBlock,
  rewardForEra,
  rewardAtBlock,
  blocksUntilNextHalving,
  nextHalvingBlock,
  totalIssuedByBlock,
  btcToSats,
  satsToBtc,
} = require('halving-math');

eraForBlock(850000);           // 5
rewardAtBlock(850000);         // 3.125
blocksUntilNextHalving(850000); // 200000
nextHalvingBlock(850000);      // 1050000
totalIssuedByBlock(840000);    // ~19,687,500 (approximate cumulative issuance)
btcToSats(1);                  // 100000000
```

## API

- `eraForBlock(height)` — 1-indexed halving era for a block height.
- `rewardForEra(era)` — block subsidy (BTC) for a given era; `0` once issuance ends (era > 33).
- `rewardAtBlock(height)` — block subsidy (BTC) at a given height.
- `blocksIntoEra(height)` — blocks into the current era (0-indexed).
- `blocksUntilNextHalving(height)` — blocks remaining until the next halving.
- `nextHalvingBlock(height)` — the block height of the next halving.
- `totalIssuedByBlock(height)` — approximate cumulative BTC issued through that height.
- `btcToSats(btc)` / `satsToBtc(sats)` — unit conversion (1 BTC = 100,000,000 sats).

Constants: `BLOCKS_PER_ERA` (210000), `GENESIS_REWARD` (50), `MAX_ERAS` (33), `SATS_PER_BTC` (100000000).

## Why this exists

Extracted from the arithmetic behind [why21million.com](https://why21million.com/) — a
free, plain-arithmetic explainer and toolkit for Bitcoin's supply schedule
(the [21 million cap](https://why21million.com/book/why-21-million/) and
the [full halving table](https://why21million.com/book/halving-schedule/)).
This package is the reusable, tested core of that arithmetic, with no
opinions, no price data, and no dependencies. See also [dca-math](https://github.com/Sergey-PrudentDev/dca-math), the companion library for cost-basis tracking and stacking-plan projections from the same site.

## License

MIT

