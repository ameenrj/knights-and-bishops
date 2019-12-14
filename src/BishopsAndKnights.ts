import * as readline from 'readline-sync'
import Bishop from './pieces/Bishop'
import Knight from './pieces/Knight'
import Rook from './pieces/Rook'

export default class BishopsAndKnights {
  private readonly BISHOP_KEY = 'b'
  private readonly KNIGHT_KEY = 'n'
  private readonly ROOK_KEY = 'r'
  private readonly BASE_ASCII_CODE = 96

  private chessConfig: ChessConfig
  private pieces: Piece[] = []

  private readonly pieceValidators: Object = {
    [this.BISHOP_KEY]: (row: number, col: number, piece: Piece, pieces: Piece[]) => Bishop.isValidMove(row, col, piece, pieces),
    [this.KNIGHT_KEY]: (row: number, col: number, piece: Piece, pieces: Piece[]) => Knight.isValidMove(row, col, piece, pieces),
    [this.ROOK_KEY]: (row: number, col: number, piece: Piece, pieces: Piece[]) => Rook.isValidMove(row, col, piece, pieces)
  }

  constructor(chessConfig: ChessConfig) {
    this.chessConfig = chessConfig
  }

  public run(): void {
    do {
      this.pieces = []
      const piecesCount = this.getNumberOfPieces()
      for (let i = 1; i <= piecesCount; i++) {
        console.log(`\nPiece ${i}`)
        const colour = this.getColour()
        const type = this.getType()
        const position = this.getPosition()

        this.pieces.push({
          colour,
          type,
          position,
          row: Number(position.charAt(1)),
          col: position.charCodeAt(0) - this.BASE_ASCII_CODE
        })
      }

      if (piecesCount > 0) console.log('\nValid moves')
      this.pieces.forEach((piece) => {
        console.log(`${piece.type.toUpperCase()} on ${piece.position}: [${this.getValidMoves(piece, this.pieces)}]`)
      })
    } while (this.shouldContinue())
  }

  private getValidMoves(piece: Piece, pieces: Piece[]): String[] {
    const moves: String[] = []

    for (let col = 1; col <= this.chessConfig.NUMBER_OF_FILES; col++) {
      for (let row = 1; row <= this.chessConfig.NUMBER_OF_RANKS; row++) {
        if (this.pieceValidators[piece.type](row, col, piece, pieces)) {
          moves.push(`${String.fromCharCode(this.BASE_ASCII_CODE + col)}${row}`)
        }
      }
    }

    return moves
  }

  private getNumberOfPieces(): number {
    let piecesCount

    console.log()
    do {
      const input = (readline.question('Enter number of pieces: ')).toLowerCase()

      if (isNaN(input)) {
        console.log('Number of pieces must be a number. Please try again.')
      } else if (input > (this.chessConfig.NUMBER_OF_FILES * this.chessConfig.NUMBER_OF_RANKS)) {
        console.log('There cannot be more pieces than board space. Please try again.')
      } else if (input < 0) {
        console.log('You cannot have a negative number of pieces. Please try again.')
      } else {
        piecesCount = input
      }
    } while (!piecesCount)

    return piecesCount
  }

  private getColour(): string {
    let colour
    do {
      const input = (readline.question('Enter colour (W/B): ')).toLowerCase()

      if (input !== 'w' && input !== 'b') {
        console.log('Colour must be White (W) or Black (B). Please try again.')
      } else {
        colour = input
      }
    } while (!colour)

    return colour
  }

  private getType(): string {
    let type
    do {
      const input = (readline.question('Enter type (B/N/R): ')).toLowerCase()

      if (![this.BISHOP_KEY, this.KNIGHT_KEY, this.ROOK_KEY].includes(input)) {
        console.log(`Type must be Bishop (${this.BISHOP_KEY.toUpperCase()}) `
          + `or Knight (${this.KNIGHT_KEY.toUpperCase()}) `
          + `or Rook (${this.ROOK_KEY.toUpperCase()}). `
          + `Please try again.`)
      } else {
        type = input
      }
    } while (!type)

    return type
  }

  private getPosition(): string {
    let position
    do {
      const input = (readline.question('Enter position: ')).toLowerCase()

      const fileAsNumber = input.charCodeAt(0) - this.BASE_ASCII_CODE
      const rank = Number(input.substr(1))

      const minimumFile = 1
      const minimumRank = 1
      if (fileAsNumber < minimumFile || fileAsNumber > this.chessConfig.NUMBER_OF_FILES) {
        console.log(`File must be between ${String.fromCharCode(minimumRank + this.BASE_ASCII_CODE)} `
          + `and ${String.fromCharCode(this.chessConfig.NUMBER_OF_FILES + this.BASE_ASCII_CODE)} inclusive. Please try again.`)
      } else if (isNaN(rank)) {
        console.log('Rank must be a number. Please try again.')
      } else if (rank < minimumRank || rank > this.chessConfig.NUMBER_OF_RANKS) {
        console.log(`Rank must be between ${minimumRank} and ${this.chessConfig.NUMBER_OF_RANKS} inclusive. Please try again.`)
      } else if (!this.isPositionUnique(input)) {
        console.log('Pieces cannot share the same position. Please try again.')
      } else {
        position = input
      }
    } while (!position)

    return position
  }

  private isPositionUnique(position: string): boolean {
    const positions = this.pieces.map(p => p.position)

    return !positions.includes(position)
  }

  private shouldContinue(): boolean {
    let continueResponse

    console.log()
    do {
      const input = (readline.question('Continue (Y/N)?: ')).toLowerCase()

      if (input !== 'y' && input !== 'n') {
        console.log('Continue response must be \'Y\' or \'N\'. Please try again.')
      } else {
        continueResponse = input
      }
    } while (!continueResponse)

    return continueResponse === 'y'
  }
}

export interface ChessConfig {
  NUMBER_OF_RANKS: number,
  NUMBER_OF_FILES: number
}

export interface Piece {
  colour: string
  type: string,
  position: string
  row: number,
  col: number
}
