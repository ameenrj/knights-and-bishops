import { Piece } from '../bishopsAndKnights'
import { onSameColourPiece } from './shared'

export default class Rook {
  public static isValidMove(row: number, col: number, piece: Piece, pieces: Piece[]): boolean {
    const onSameColour = onSameColourPiece(row, col, piece, pieces)
    if (onSameColour) return false

    const rowDifference = Math.abs(row - piece.row)
    const colDifference = Math.abs(col - piece.col)

    return (rowDifference === 0 || colDifference === 0) && !this.isBehindAnotherPiece(row, col, piece, pieces)
  }

  private static isBehindAnotherPiece(row: number, col: number, piece: Piece, pieces: Piece[]): boolean {
    let currentPositionsDirectionFromPiece: string

    if (row > piece.row && col === piece.col) {
      currentPositionsDirectionFromPiece = 'N'
    } else if (row === piece.row && col > piece.col) {
      currentPositionsDirectionFromPiece = 'E'
    } else if (row <= piece.row && col === piece.col) {
      currentPositionsDirectionFromPiece = 'S'
    } else if (row === piece.row && col < piece.col) {
      currentPositionsDirectionFromPiece = 'W'
    }

    switch(currentPositionsDirectionFromPiece) {
      case 'N':
        return !!(pieces.find(p => (p.row > piece.row && p.col === piece.col) && (p.row < row && p.col === col)))
      case 'E':
        return !!(pieces.find(p => (p.row === piece.row && p.col > piece.col) && (p.row === row && p.col < col)))
      case 'S':
        return !!(pieces.find(p => (p.row < piece.row && p.col === piece.col) && (p.row > row && p.col === col)))
      case 'W':
        return !!(pieces.find(p => (p.row === piece.row && p.col < piece.col) && (p.row === row && p.col > col)))
    }
  }
}
