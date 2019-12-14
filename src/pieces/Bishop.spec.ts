import { Piece } from '../BishopsAndKnights'
import Bishop from './Bishop'

const shared = require('./shared');

describe('Bishop', () => {
  describe('isValidMove', () => {

    it('should return false if on the current piece', async() => {
      const piece = { row: 3, col: 3 } as Piece
      const result = Bishop.isValidMove(3, 3, piece, [piece])

      expect(result).toBe(false)
    })

    it('should return false if onSameColourPiece returns true', async() => {
      shared.onSameColourPiece = jest.fn().mockResolvedValueOnce(true)
      const result = Bishop.isValidMove(3, 3, {} as Piece, [])

      expect(result).toBe(false)
      expect(shared.onSameColourPiece).toBeCalledTimes(1)
    })

    describe('isBehindAnotherPiece', () => {
      const piece1 = { row: 3, col: 3 } as Piece

      it('should return false if behind another piece North West (NW)', async() => {
        const piece2 = { row: 4, col: 2 } as Piece
        const result = Bishop.isValidMove(5, 1, piece1, [piece1, piece2])

        expect(result).toBe(false)
      })

      it('should return false if behind another piece North East (NE)', async() => {
        const piece2 = { row: 4, col: 4 } as Piece
        const result = Bishop.isValidMove(5, 5, piece1, [piece1, piece2])

        expect(result).toBe(false)
      })

      it('should return false if behind another piece South East (SE)', async() => {
        const piece2 = { row: 2, col: 4 } as Piece
        const result = Bishop.isValidMove(1, 5, piece1, [piece1, piece2])

        expect(result).toBe(false)
      })

      it('should return false if behind another piece South West (SW)', async() => {
        const piece2 = { row: 2, col: 2 } as Piece
        const result = Bishop.isValidMove(1, 1, piece1, [piece1, piece2])

        expect(result).toBe(false)
      })

      it('should return true if not behind another piece', async() => {
        const piece2 = { row: 2, col: 2 } as Piece
        const result = Bishop.isValidMove(4, 4, piece1, [piece1, piece2])

        expect(result).toBe(true)
      })
    })

    describe('diagonal rules', () => {
      it('should return false if position is not diagonal to piece', async() => {
        const result = Bishop.isValidMove(2, 3, { row: 3, col: 3 } as Piece, [])

        expect(result).toBe(false)
      })

      it('should return true if position is diagonal to piece (Top Left)', async() => {
        const result = Bishop.isValidMove(4, 2, { row: 3, col: 3 } as Piece, [])

        expect(result).toBe(true)
      })

      it('should return true if position is diagonal to piece (Top Right)', async() => {
        const result = Bishop.isValidMove(4, 4, { row: 3, col: 3 } as Piece, [])

        expect(result).toBe(true)
      })

      it('should return true if position is diagonal to piece (Bottom Right)', async() => {
        const result = Bishop.isValidMove(2, 4, { row: 3, col: 3 } as Piece, [])

        expect(result).toBe(true)
      })

      it('should return true if position is diagonal to piece (Bottom Left)', async() => {
        const result = Bishop.isValidMove(2, 2, { row: 3, col: 3 } as Piece, [])

        expect(result).toBe(true)
      })
    })

  })
})
