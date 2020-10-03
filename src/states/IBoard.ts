import { Piece } from '../Piece'

export default interface IBoard {
  board: Piece[]
  selected: number
  isBlackTurn: boolean
  bStand: Piece[]
  wStand: Piece[]
}
