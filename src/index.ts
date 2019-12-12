import * as readline from 'readline-sync'

export const ChessConfig = {
  board: {
    NUMBER_OF_ROWS: 8,
    NUMBER_OF_COLUMNS: 8
  },
  pieces: {
    BISHOP_KEY: 'b',
    KNIGHT_KEY: 'n'
  }
}

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

  for (let col = 1; col <= ChessConfig.board.NUMBER_OF_COLUMNS; col++) {
    for (let row = 1; row <= ChessConfig.board.NUMBER_OF_ROWS; row++) {
      if (isValidMove[piece.type](row, col, piece, pieces)) {
        moves.push(`${String.fromCharCode(96 + col)}${row}`)
      }
    }
  }

  return moves
}

const isValidMove = {
  [ChessConfig.pieces.BISHOP_KEY]: (row, col, piece: Piece, pieces: Piece[]) => {
    const onCurrentPiece = row === piece.row && col === piece.col
    const onAnotherSameColour = isValidMove.onAnotherSameColour(row, col, piece, pieces)

    return ((row - piece.row === piece.col - col) || // top left to bottom right
      (piece.row - row === piece.col - col)) && // bottom left to top right
      (!onAnotherSameColour && !onCurrentPiece)
  },
  [ChessConfig.pieces.KNIGHT_KEY]: (row, col, piece: Piece, pieces: Piece[]) => {
    const rowDifference = Math.abs(row - piece.row)
    const colDifference = Math.abs(col - piece.col)
    const onAnotherSameColour = isValidMove.onAnotherSameColour(row, col, piece, pieces)

    return (rowDifference + colDifference === 3) &&
      (rowDifference > 0 && colDifference > 0) &&
      !onAnotherSameColour
  },
  onAnotherSameColour: (row: number, col: number, piece: Piece, pieces: Piece[]) => {
    const onCurrentPiece = row === piece.row && col === piece.col
    if (onCurrentPiece) return false

    return !!(pieces.find(p => (p.row === row && p.col === col) && p.colour === piece.colour))
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
