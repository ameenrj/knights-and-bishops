## Bishops and Knights

Simple console program written in Node.js/Typescript and tested with Jest - Receives a number of pieces (Bishop, Knight or Rook) and their positions  and prints the available moves each piece can make.

Some rules considered:

- Can't move onto a piece of the same colour
- Can move (capture) a piece of another colour
- Can't start the game with two pieces on the same position on the board
- Pieces cannot move 'behind' another piece (exception: Knight)
- You cannot have more pieces than the number of positions available on the board
- You cannot enter a position out of bounds on the board
- General bad input is handled gracefully


NOTE: Also contains Rook functionality.

### Setup

```
npm install
```

### Development

```bash
npm run dev
```

### Running tests

```bash
npm test
```
