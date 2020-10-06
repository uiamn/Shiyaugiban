import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { changeBoardAction } from '../actions/BoardActions'
import { IBoard } from '../states/IBoard'
import { Piece } from '../Piece'

export const initBoard: IBoard = {
  board: [
    Piece.EKY, Piece.EKE, Piece.EGI, Piece.EKI, Piece.EOU, Piece.EKI, Piece.EGI, Piece.EKE, Piece.EKY,
    Piece.EMPTY, Piece.EHI, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EKA, Piece.EMPTY,
    Piece.EFU, Piece.EFU, Piece.EFU, Piece.EFU, Piece.EFU, Piece.EFU, Piece.EFU, Piece.EFU, Piece.EFU,
    Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY,
    Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY,
    Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY,
    Piece.FU, Piece.FU, Piece.FU, Piece.FU, Piece.FU, Piece.FU, Piece.FU, Piece.FU, Piece.FU,
    Piece.EMPTY, Piece.KA, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.EMPTY, Piece.HI, Piece.EMPTY,
    Piece.KY, Piece.KE, Piece.GI, Piece.KI, Piece.OU, Piece.KI, Piece.GI, Piece.KE, Piece.KY,
  ],
  selected: -1,
  isBlackTurn: true,
  bStand: [],
  wStand: []
}

export const boardReducer = reducerWithInitialState<IBoard>(initBoard)
  .case(changeBoardAction, (state, payload) => ({...state, ...payload}))
  .build();
