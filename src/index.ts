import * as readline from 'readline-sync'

const ChessConfig = {
  board: {
    NUMBER_OF_RANKS: 8,
    NUMBER_OF_FILES: 8
  },
  pieces: {
    BISHOP_KEY: 'b',
    KNIGHT_KEY: 'n'
  }
}

const BASE_ASCII_CODE = 96

const pieces: Piece[] = []

const main = () => {
  do {

    const piecesCount = getNumberOfPieces()
    for (let i = 1; i <= piecesCount; i++) {
      console.log(`\nPiece ${i}`)
      const colour = getColour()
      const type = getType()
      const position = getPosition()

      pieces.push({
        colour,
        type,
        position,
        row: Number(position.charAt(1)),
        col: position.charCodeAt(0) - BASE_ASCII_CODE
      })
    }

    if (piecesCount > 0) console.log('\nValid moves')
    pieces.forEach(piece => {
      console.log(`${piece.type.toUpperCase()} on ${piece.position}: [${getValidMoves(piece, pieces)}]`)
    })
  } while (shouldContinue())
}

const getNumberOfPieces = (): number => {
  let piecesCount

  console.log()
  do {
    const input = (readline.question('Enter number of pieces: ')).toLowerCase()

    if (isNaN(input)) {
      console.log('Number of pieces must be a number. Please try again.')
      continue
    }
    if (input > (ChessConfig.board.NUMBER_OF_FILES * ChessConfig.board.NUMBER_OF_RANKS)) {
      console.log('There cannot be more pieces than board space. Please try again.')
      continue
    }
    if (input < 0) {
      console.log('You cannot have a negative number of pieces. Please try again.')
      continue
    }

    piecesCount = input
  } while (!piecesCount)

  return piecesCount
}

const getColour = (): string => {
  let colour
  do {
    const input = (readline.question('Enter colour (W/B): ')).toLowerCase()

    if (input !== 'w' && input !== 'b') {
      console.log('Colour must be White (W) or Black (B). Please try again.')
      continue
    }

    colour = input
  } while (!colour)

  return colour
}

const getType = (): string => {
  let type
  do {
    const input = (readline.question('Enter type (B/N): ')).toLowerCase()

    if (![ChessConfig.pieces.BISHOP_KEY, ChessConfig.pieces.KNIGHT_KEY].includes(input)) {
      console.log(`Type must be Bishop (${ChessConfig.pieces.BISHOP_KEY.toUpperCase()}) ` +
        `or Knight (${ChessConfig.pieces.KNIGHT_KEY.toUpperCase()}). Please try again.`)
      continue
    }

    type = input
  } while (!type)

  return type
}

const shouldContinue = (): boolean => {
  let continueResponse

  console.log()
  do {
    const input = (readline.question('Continue (Y/N)?: ')).toLowerCase()

    if (input !== 'y' && input !== 'n') {
      console.log(`Continue response must be 'Y' or 'N'. Please try again.`)
      continue
    }

    continueResponse = input
  } while (!continueResponse)

  return continueResponse === 'y'
}

const getPosition = (): string => {
  let position
  do {
    const input = (readline.question('Enter position: ')).toLowerCase()

    const fileAsNumber = input.charCodeAt(0) - BASE_ASCII_CODE
    const rank = Number(input.substr(1))

    const minimumFile = 1
    const minimumRank = 1
    if (fileAsNumber < minimumFile || fileAsNumber > ChessConfig.board.NUMBER_OF_FILES) {
      console.log(`File must be between ${String.fromCharCode(minimumRank + BASE_ASCII_CODE)} ` +
        `and ${String.fromCharCode(ChessConfig.board.NUMBER_OF_FILES + BASE_ASCII_CODE)} inclusive. Please try again.`)
      continue
    }
    if (isNaN(rank)) {
      console.log('Rank must be a number. Please try again.')
      continue
    }
    if (rank < minimumRank || rank > ChessConfig.board.NUMBER_OF_RANKS) {
      console.log(`Rank must be between ${minimumRank} and ${ChessConfig.board.NUMBER_OF_RANKS} inclusive. Please try again.`)
      continue
    }
    if (!isPositionUnique(input)) {
      console.log('Pieces cannot share the same position. Please try again.')
      continue
    }

    position = input
  } while (!position)

  return position
}

const isPositionUnique = (position: string): boolean => {
  const allPiecePositions = pieces.map(p => p.position)

  return !allPiecePositions.includes(position)
}

const getValidMoves = (piece: Piece, pieces: Piece[]): String[] => {
  const moves: String[] = []

  for (let col = 1; col <= ChessConfig.board.NUMBER_OF_FILES; col++) {
    for (let row = 1; row <= ChessConfig.board.NUMBER_OF_RANKS; row++) {
      if (isValidMove[piece.type](row, col, piece, pieces)) {
        moves.push(`${String.fromCharCode(BASE_ASCII_CODE + col)}${row}`)
      }
    }
  }

  return moves
}

const isValidMove = {
  [ChessConfig.pieces.BISHOP_KEY]: (row, col, piece: Piece, pieces: Piece[]): boolean => {
    const onCurrentPiece = row === piece.row && col === piece.col
    const onSameColour = isValidMove.onSameColour(row, col, piece, pieces)
    const isBehindAnotherPiece = isValidMove.isBehindAnotherPiece(row, col, piece, pieces)

    if (onCurrentPiece || onSameColour || isBehindAnotherPiece) return false

    return (row - piece.row === piece.col - col) || (piece.row - row === piece.col - col)
  },
  [ChessConfig.pieces.KNIGHT_KEY]: (row, col, piece: Piece, pieces: Piece[]): boolean => {
    const onSameColour = isValidMove.onSameColour(row, col, piece, pieces)
    if (onSameColour) return false

    const rowDifference = Math.abs(row - piece.row)
    const colDifference = Math.abs(col - piece.col)

    return (rowDifference + colDifference === 3) && (rowDifference > 0 && colDifference > 0)
  },
  onSameColour: (row: number, col: number, piece: Piece, pieces: Piece[]): boolean => {
    return !!(pieces.find(p => (p.row === row && p.col === col) && p.colour === piece.colour))
  },
  isBehindAnotherPiece: (row: number, col: number, piece: Piece, pieces: Piece[]): boolean=> {
    let currentPositionsDirectionFromPiece: string

    if (row <= piece.row && col <= piece.col) {
      currentPositionsDirectionFromPiece = 'SW'
    } else if (row >= piece.row && col <= piece.col) {
      currentPositionsDirectionFromPiece = 'NW'
    } else if (row <= piece.row && col >= piece.col) {
      currentPositionsDirectionFromPiece = 'SE'
    } else if (row >= piece.row && col >= piece.col) {
      currentPositionsDirectionFromPiece = 'NE'
    }

    switch(currentPositionsDirectionFromPiece) {
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
  colour: string
  type: string,
  position: string
  row: number,
  col: number
}
