import { initBoard } from './reducers/BoardReducer'
import { initRecord } from './reducers/RecordReducer'
import { changeRecordAction } from './actions/RecordAction'
import { changeBoardAction } from './actions/BoardActions'
import { store } from './Store'

export const initialize = () => {
  const dispatch = store.dispatch
  dispatch(changeBoardAction(initBoard))
  dispatch(changeRecordAction(initRecord))
}
