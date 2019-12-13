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

    const piecesCount = readline.question('\nEnter number of pieces: ');
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
  [ChessConfig.pieces.BISHOP_KEY]: (row, col, piece: Piece, pieces: Piece[]): boolean => {
    const onCurrentPiece = row === piece.row && col === piece.col
    const onAnotherSameColour = isValidMove.onAnotherSameColour(row, col, piece, pieces)
    const isBehindAnotherPiece = isValidMove.isBehindAnotherPiece(row, col, piece, pieces)

    if (onCurrentPiece || onAnotherSameColour || isBehindAnotherPiece) return false

    return (row - piece.row === piece.col - col) || (piece.row - row === piece.col - col)
  },
  [ChessConfig.pieces.KNIGHT_KEY]: (row, col, piece: Piece, pieces: Piece[]): boolean => {
    const onAnotherSameColour = isValidMove.onAnotherSameColour(row, col, piece, pieces)

    if (onAnotherSameColour) return false

    const rowDifference = Math.abs(row - piece.row)
    const colDifference = Math.abs(col - piece.col)

    return (rowDifference + colDifference === 3) && (rowDifference > 0 && colDifference > 0)
  },
  onAnotherSameColour: (row: number, col: number, piece: Piece, pieces: Piece[]): boolean => {
    const onCurrentPiece = row === piece.row && col === piece.col
    if (onCurrentPiece) return false

    return !!(pieces.find(p => (p.row === row && p.col === col) && p.colour === piece.colour))
  },
  isBehindAnotherPiece: (row: number, col: number, piece: Piece, pieces: Piece[]): boolean=> {
    let currentPositionDirectionFromPiece: string

    if (row <= piece.row && col <= piece.col) {
      currentPositionDirectionFromPiece = 'SW'
    } else if (row >= piece.row && col <= piece.col) {
      currentPositionDirectionFromPiece = 'NW'
    } else if (row <= piece.row && col >= piece.col) {
      currentPositionDirectionFromPiece = 'SE'
    } else if (row >= piece.row && col >= piece.col) {
      currentPositionDirectionFromPiece = 'NE'
    }

    switch(currentPositionDirectionFromPiece) {
      case 'SW':
        return !!(pieces.find(p => (p.row < piece.row && p.col < piece.col) && (p.row > row && p.col > col)))
      case 'NW':
        return !!(pieces.find(p => (p.row > piece.row && p.col < piece.col) && (p.row < row && p.col > col)))
      case 'SE':
        return !!(pieces.find(p => (p.row < piece.row && p.col > piece.col) && (p.row > row && p.col < col)))
      case 'NE':
        return !!(pieces.find(p => (p.row > piece.row && p.col > piece.col) && (p.row < row && p.col < col)))
    }
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
