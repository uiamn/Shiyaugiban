import { actionCreatorFactory } from 'typescript-fsa'
import { IBoard } from '../states/IBoard'

const actionCreator = actionCreatorFactory('board-action')
export const changeBoardAction = actionCreator<Partial<IBoard>>('change-board')
