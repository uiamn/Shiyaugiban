import { Piece, pieceChar } from '../Piece'

export type tMove = {
  from: number, to: number, piece: Piece, hasPromoted?: boolean, takenPiece?: Piece
}

export interface IRecord {
  record: tMove[],
  pointer: number
}
