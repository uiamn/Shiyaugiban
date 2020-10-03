import { Piece } from '../Piece'

export interface IBoard {
  board: Piece[]
  selected: number
  isBlackTurn: boolean
  bStand: Piece[]
  wStand: Piece[]
}
