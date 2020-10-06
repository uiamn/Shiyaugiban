import { changeRecordAction } from './actions/RecordAction'
import { changeBoardAction } from './actions/BoardActions'
import { store } from './Store'
import { Piece, promote, disPromote, isPromoted } from './Piece'
import { changeSide } from './move'

export const addMove = (from: number, to: number, piece: Piece, hasPromoted?: boolean, takenPiece?: Piece) => {
  const { record, pointer } = store.getState().record
  const dispatch = store.dispatch

  record.splice(pointer)
  record.push({from: from, to: to, piece: piece, hasPromoted: hasPromoted, takenPiece: takenPiece})

  dispatch(changeRecordAction({record: record, pointer: pointer+1}))
}

export const moveBack = () => {
  const { record, pointer } = store.getState().record
  const { board, selected, isBlackTurn, bStand, wStand } = store.getState().board
  const dispatch = store.dispatch

  const lastMove = record[pointer-1]
  if(lastMove === undefined) return
  board[lastMove.from] = lastMove.hasPromoted?disPromote(board[lastMove.to]):board[lastMove.to]

  if(lastMove.takenPiece === undefined) board[lastMove.to] = Piece.EMPTY
  else {
    board[lastMove.to] = lastMove.takenPiece;
    (isBlackTurn?wStand:bStand).splice((isBlackTurn?wStand:bStand).indexOf(changeSide(lastMove.takenPiece)), 1)
  }

  dispatch(changeRecordAction({pointer: pointer-1}))
  dispatch(changeBoardAction({board: board, selected: -1, isBlackTurn: !isBlackTurn, bStand: bStand, wStand: wStand}))
}

export const moveForward = () => {
  const { record, pointer } = store.getState().record
  const { board, selected, isBlackTurn, bStand, wStand } = store.getState().board
  const dispatch = store.dispatch

  const nextMove = record[pointer]
  if(nextMove === undefined) return
  board[nextMove.to] = nextMove.hasPromoted?promote(board[nextMove.from]):board[nextMove.from]
  board[nextMove.from] = Piece.EMPTY
  if(nextMove.takenPiece !== undefined) (isBlackTurn?bStand:wStand).push(changeSide(nextMove.takenPiece))

  dispatch(changeRecordAction({pointer: pointer+1}))
  dispatch(changeBoardAction({board: board, selected: -1, isBlackTurn: !isBlackTurn, bStand: bStand, wStand: wStand}))
}
