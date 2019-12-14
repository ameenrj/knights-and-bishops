import { Piece } from '../bishopsAndKnights'
import { onSameColourPiece } from './shared'

export default class Knight {
  public static isValidMove(row: number, col: number, piece: Piece, pieces: Piece[]): boolean {
    const onSameColour = onSameColourPiece(row, col, piece, pieces)
    if (onSameColour) return false

    const rowDifference = Math.abs(row - piece.row)
    const colDifference = Math.abs(col - piece.col)

    return (rowDifference + colDifference === 3) && (rowDifference > 0 && colDifference > 0)
  }
}
