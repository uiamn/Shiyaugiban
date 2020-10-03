import { changeRecordAction } from './actions/RecordAction'
import { store } from './Store'
import { Piece } from './Piece'

export const addMove = (from: number, to: number, piece: Piece, hasPromoted?: boolean, takenPiece?: Piece) => {
  const { record } = store.getState().record
  const dispatch = store.dispatch

  record.push({from: from, to: to, piece: piece, hasPromoted: hasPromoted, takenPiece: takenPiece})

  dispatch(changeRecordAction({record: record}))
}
