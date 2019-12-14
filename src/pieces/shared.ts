import { Piece } from '../bishopsAndKnights'

export const onSameColourPiece = (row: number, col: number, piece: Piece, pieces: Piece[]): boolean => {
  return !!(pieces.find(p => (p.row === row && p.col === col) && p.colour === piece.colour))
}
