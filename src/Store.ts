import { combineReducers, createStore } from 'redux'
import { IState } from './states/IState'
import boardReducer from './reducers/BoardReducer'

const combinedReducer = combineReducers<IState>({
  board: boardReducer
})

export const store = createStore(combinedReducer)
export default store
