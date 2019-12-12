import * as readline from 'readline-sync'

const NUMBER_OF_ROWS: number = 8
const NUMBER_OF_COLUMNS: number = 8

const main = () => {
  do {
    const pieces: Piece[] = []

    const piecesCount = readline.question('Enter number of pieces: ');
    for (let i = 1; i <= piecesCount; i++) {
      console.log(`\nPiece ${i}`)
      const colour = readline.question('Enter colour (W/B): ');
      const type = readline.question('Enter type (B/N): ');
      const position = readline.question('Enter position: ');

      pieces.push({
        colour: colour.toLowerCase(),
        type: type.toLowerCase(),
        position: position.toLowerCase(),
        row: Number(position.charAt(1)),
        col: position.charCodeAt(0) - 96
      })
    }

    if (piecesCount > 0) console.log('\nValid moves')
    pieces.forEach((piece, i) => {
      console.log(`${piece.type.toUpperCase()} on ${pieces[i].position}: [${getValidMoves(piece, pieces)}]`)
    })
  } while (readline.question('\nContinue (Y/N)?: ').toLowerCase() !== 'n')
}

const getValidMoves = (piece: Piece, pieces: Piece[]) => {
  const moves: String[] = []

  for (let col = 1; col <= NUMBER_OF_COLUMNS; col++) {
    for (let row = 1; row <= NUMBER_OF_ROWS; row++) {
      if (isValidMove[piece.type](row, col, piece, pieces)) {
        moves.push(`${String.fromCharCode(96 + col)}${row}`)
      }
    }
  }

  return moves
}

const isValidMove = {
  'b': (row, col, piece: Piece, pieces: Piece[]) => {
    const onOwnPosition = row === piece.row && col === piece.col

    return ((row - piece.row === piece.col - col) ||
      (piece.row - row === piece.col - col)) &&
      !onOwnPosition
  },
  'n': (row, col, piece: Piece, pieces: Piece[]) => {
    const rowDifference = Math.abs(row - piece.row)
    const colDifference = Math.abs(col - piece.col)
    const onAnotherSameColour = pieces.find(p => (p.row === row && p.col === col) && p.colour === piece.colour)

    return (rowDifference + colDifference === 3) &&
      (rowDifference > 0 && colDifference > 0) &&
      !onAnotherSameColour
  }
}

main()

interface Piece {
  colour: 'W' | 'B'
  type: 'B' | 'N',
  position: string
  row: number,
  col: number
}
