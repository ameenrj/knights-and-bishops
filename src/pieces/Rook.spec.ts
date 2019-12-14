import { Piece } from '../BishopsAndKnights'
import Rook from './Rook'

const shared = require('./shared');

describe('Rook', () => {
  describe('isValidMove', () => {

    it('should return false if on the current piece', async () => {
      const piece = {row: 3, col: 3} as Piece
      const result = Rook.isValidMove(3, 3, piece, [piece])

      expect(result).toBe(false)
    })

    it('should return false if onSameColourPiece returns true', async() => {
      shared.onSameColourPiece = jest.fn().mockResolvedValueOnce(true)
      const result = Rook.isValidMove(3, 3, {} as Piece, [])

      expect(result).toBe(false)
      expect(shared.onSameColourPiece).toBeCalledTimes(1)
    })

    describe('isBehindAnotherPiece', () => {
      const piece1 = { row: 3, col: 3 } as Piece

      it('should return false if behind another piece North (N)', async() => {
        const piece2 = { row: 4, col: 3 } as Piece
        const result = Rook.isValidMove(5, 3, piece1, [piece1, piece2])

        expect(result).toBe(false)
      })

      it('should return false if behind another piece East (E)', async() => {
        const piece2 = { row: 3, col: 4 } as Piece
        const result = Rook.isValidMove(3, 5, piece1, [piece1, piece2])

        expect(result).toBe(false)
      })

      it('should return false if behind another piece South (S)', async() => {
        const piece2 = { row: 2, col: 3 } as Piece
        const result = Rook.isValidMove(1, 2, piece1, [piece1, piece2])

        expect(result).toBe(false)
      })

      it('should return false if behind another piece West (S)', async() => {
        const piece2 = { row: 3, col: 2 } as Piece
        const result = Rook.isValidMove(3, 1, piece1, [piece1, piece2])

        expect(result).toBe(false)
      })

      it('should return true if not behind another piece', async() => {
        const piece2 = { row: 2, col: 3 } as Piece
        const result = Rook.isValidMove(4, 3, piece1, [piece1, piece2])

        expect(result).toBe(true)
      })
    })

    describe('straight rules', () => {
      it('should return false if position is not on same row or col to piece', async() => {
        const result = Rook.isValidMove(2, 2, { row: 3, col: 3 } as Piece, [])

        expect(result).toBe(false)
      })

      it('should return true if position is straight on to piece (Top)', async() => {
        const result = Rook.isValidMove(4, 3, { row: 3, col: 3 } as Piece, [])

        expect(result).toBe(true)
      })

      it('should return true if position is straight on to piece (Right)', async() => {
        const result = Rook.isValidMove(3, 4, { row: 3, col: 3 } as Piece, [])

        expect(result).toBe(true)
      })

      it('should return true if position is straight on to piece (Bottom)', async() => {
        const result = Rook.isValidMove(2, 3, { row: 3, col: 3 } as Piece, [])

        expect(result).toBe(true)
      })

      it('should return true if position is straight on to piece (Left)', async() => {
        const result = Rook.isValidMove(3, 2, { row: 3, col: 3 } as Piece, [])

        expect(result).toBe(true)
      })
    })

  })
})
