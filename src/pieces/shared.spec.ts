import { Piece } from '../BishopsAndKnights'
import { onSameColourPiece } from './shared'

describe('shared', () => {
  describe('onSameColourPiece', () => {

    const row = 2
    const col = 5
    const piece: Piece = {
      colour: 'w',
      type: 'b',
      position: 'e3',
      row,
      col
    }
    const pieces = [piece]

    it('should return true if on a piece same colour', async() => {
      const result = onSameColourPiece(row, col, piece, pieces)
      expect(result).toBe(true)
    })

    it('should return false if not on any piece', async() => {
      const result = onSameColourPiece(1, 1, piece, pieces)
      expect(result).toBe(false)
    })

    it('should return false if on a piece of a different colour', async() => {
      const result = onSameColourPiece(row, col, { colour: 'b' } as Piece, pieces)
      expect(result).toBe(false)
    })

  })
})
