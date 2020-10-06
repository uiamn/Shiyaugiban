import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { changeRecordAction } from '../actions/RecordAction'
import { IRecord } from '../states/IRecord'
import { Piece } from '../Piece'

const initRecord: IRecord = {
  record: [],
  pointer: 0
}

export const recordReducer = reducerWithInitialState<IRecord>(initRecord)
  .case(changeRecordAction, (state, payload) => ({...state, ...payload}))
  .build();
