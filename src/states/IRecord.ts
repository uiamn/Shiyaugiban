import { Piece, pieceChar } from '../Piece'

export type tMove = {
  from?: number, // undefined when a piece is dropped from a stand
  to: number, piece: Piece,
  hasPromoted?: boolean, // undefined when players don't have the choice to promotion or not
  takenPiece?: Piece
}

export interface IRecord {
  record: tMove[],
  pointer: number
}
