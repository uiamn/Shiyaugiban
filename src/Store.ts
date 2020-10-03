import { combineReducers, createStore } from 'redux'
import { IState } from './states/IState'
import { boardReducer } from './reducers/BoardReducer'
import { recordReducer } from './reducers/RecordReducer'

const combinedReducer = combineReducers<IState>({
  board: boardReducer,
  record: recordReducer
})

export const store = createStore(combinedReducer)
