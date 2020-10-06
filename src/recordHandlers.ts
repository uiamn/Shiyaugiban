import { changeRecordAction } from './actions/RecordAction'
import { changeBoardAction } from './actions/BoardActions'
import { store } from './Store'
import { Piece, promote, disPromote, isPromoted } from './Piece'
import { changeSide } from './move'

export const addMove = (from: number | undefined, to: number, piece: Piece, hasPromoted?: boolean, takenPiece?: Piece) => {
  const { record, pointer } = store.getState().record
  const dispatch = store.dispatch
  const record_ = [...record]

  record_.splice(pointer)
  record_.push({from: from, to: to, piece: piece, hasPromoted: hasPromoted, takenPiece: takenPiece})

  dispatch(changeRecordAction({record: record_, pointer: pointer+1}))
}

export const moveBack = () => {
  const { record, pointer } = store.getState().record
  const { board, selected, isBlackTurn, bStand, wStand } = store.getState().board
  const dispatch = store.dispatch

  const stand = [...(isBlackTurn?wStand:bStand)]

  const lastMove = record[pointer-1]

  if(lastMove === undefined) return // when a board is an initial one

  if(lastMove.from === undefined) stand.push(lastMove.piece)
  else board[lastMove.from] = lastMove.hasPromoted?disPromote(lastMove.piece):lastMove.piece

  if(lastMove.takenPiece === undefined) board[lastMove.to] = Piece.EMPTY
  else {
    board[lastMove.to] = lastMove.takenPiece;
    stand.splice(stand.indexOf(changeSide(lastMove.takenPiece)), 1)
  }

  dispatch(changeRecordAction({pointer: pointer-1}))
  dispatch(changeBoardAction({board: board, selected: -1, isBlackTurn: !isBlackTurn, ...{[isBlackTurn?'wStand':'bStand']: stand}}))
}

export const moveForward = () => {
  const { record, pointer } = store.getState().record
  const { board, selected, isBlackTurn, bStand, wStand } = store.getState().board
  const dispatch = store.dispatch

  const nextMove = record[pointer]
  const stand = [...(isBlackTurn?wStand:bStand)]

  if(nextMove === undefined) return // when a board is a latest one

  if(nextMove.from === undefined) {
    stand.splice(stand.indexOf(changeSide(nextMove.piece)), 1)
    board[nextMove.to] = nextMove.piece
  } else {
    board[nextMove.to] = nextMove.hasPromoted?promote(board[nextMove.from]):board[nextMove.from]
    board[nextMove.from] = Piece.EMPTY
  }
  if(nextMove.takenPiece !== undefined) stand.push(changeSide(nextMove.takenPiece))

  dispatch(changeRecordAction({pointer: pointer+1}))
  dispatch(changeBoardAction({board: board, selected: -1, isBlackTurn: !isBlackTurn, ...{[isBlackTurn?'wStand':'bStand']: stand}}))
}
