import { actionCreatorFactory } from 'typescript-fsa'
import { IRecord } from '../states/IRecord'

const actionCreator = actionCreatorFactory('board-action')
export const changeRecordAction = actionCreator<Partial<IRecord>>('change-board')
