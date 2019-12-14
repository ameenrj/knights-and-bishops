import { Piece } from '../BishopsAndKnights'
import { onSameColourPiece } from './shared'

export default class Bishop {
  public static isValidMove(row: number, col: number, piece: Piece, pieces: Piece[]): boolean {
    const onCurrentPiece = row === piece.row && col === piece.col
    const onSameColour = onSameColourPiece(row, col, piece, pieces)
    const isBehindAnotherPiece = this.isBehindAnotherPiece(row, col, piece, pieces)

    if (onCurrentPiece || onSameColour || isBehindAnotherPiece) return false

    return (row - piece.row === piece.col - col) || (piece.row - row === piece.col - col)
  }

  private static isBehindAnotherPiece(row: number, col: number, piece: Piece, pieces: Piece[]): boolean {
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
