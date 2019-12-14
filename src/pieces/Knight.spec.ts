import Knight from './Knight'
import { Piece } from '../BishopsAndKnights'

const shared = require('./shared');

describe('Knight', () => {
  describe('isValidMove', () => {

    it('should return false if onSameColourPiece returns true', async() => {
      shared.onSameColourPiece = jest.fn().mockResolvedValueOnce(true)
      const result = Knight.isValidMove(3, 3, {} as Piece, [])

      expect(result).toBe(false)
      expect(shared.onSameColourPiece).toBeCalledTimes(1)
    })

    it('should return false if row + col difference is less than 3', async() => {
      const result = Knight.isValidMove(3, 3, { row: 4, col: 4 } as Piece, [])
      expect(result).toBe(false)
    })

    it('should return false if row + col difference is greater than 3', async() => {
      const result = Knight.isValidMove(3, 3, { row: 5, col: 5 } as Piece, [])
      expect(result).toBe(false)
    })

    it('should return true if row + col difference is greater than 3', async() => {
      const result = Knight.isValidMove(3, 3, { row: 5, col: 4 } as Piece, [])
      expect(result).toBe(true)
    })

    it('should return false if row + col difference is greater than 3 but col difference same', async() => {
      const result = Knight.isValidMove(3, 3, { row: 6, col: 3 } as Piece, [])
      expect(result).toBe(false)
    })

    it('should return false if row + col difference is greater than 3 but row difference same', async() => {
      const result = Knight.isValidMove(3, 3, { row: 3, col: 6 } as Piece, [])
      expect(result).toBe(false)
    })

  })
})
