import React, { useCallback } from 'react'
import { Piece, isEnemy, promote, isPromoted, disPromote } from './Piece'
import { isLegalMove } from './isLegalMove'
import './Board.css'
import { useDispatch, useSelector } from 'react-redux';
import { changeBoardAction } from './actions/BoardActions';
import { IState } from './states/IState';
import IBoard from './states/IBoard';
import Store from './Store';

const pieceChar = (p: Piece) => {
  const pc = [' 　', '歩', '香', '桂', '銀', '金', '角', '飛', '王', 'と', '杏', '圭', '全', '馬', '龍']
  return isEnemy(p)?('v'+pc[p-Piece.RY]):(' '+pc[p])
}

const move = (i: number) => {
  const { board, selected, isBlackTurn, bStand, wStand } = Store.getState().board
  const dispatch = Store.dispatch

  if(selected === -1) {
    if(board[i] !== Piece.EMPTY && (isBlackTurn !== isEnemy(board[i]))) {
      dispatch(changeBoardAction({selected: i}))
    } else {
      dispatch(changeBoardAction({selected: -1}))
    }
  } else {
    if(isLegalMove(selected, i, board)) {
      const newPiece = ((isBlackTurn && i < 27) || (!isBlackTurn && i > 53)) && !isPromoted(board[selected]) && window.confirm('promotion?')
                       ?promote(board[selected])
                       :board[selected]

      const newBoard = board.map((p, j) => j===i?newPiece:j===selected?Piece.EMPTY:p)

      const takenPiece = board[i]===Piece.EMPTY?undefined:isPromoted(board[i])?disPromote(board[i]):board[i]
      const newStand = (isBlackTurn?bStand:wStand)
      if(takenPiece !== undefined) newStand.push(takenPiece + (isBlackTurn?-14:14))

      const newState = {selected: -1, board: newBoard, isBlackTurn: !isBlackTurn}
      Object.assign(newState, {[(isBlackTurn?'bStand':'wStand')]: newStand})

      dispatch(changeBoardAction(newState))
    } else if(board[i] !== Piece.EMPTY && (isBlackTurn !== isEnemy(board[i]))) {
      dispatch(changeBoardAction({selected: i}))
    } else {
      dispatch(changeBoardAction({selected: -1}))
    }
  }
}


const Main: React.FC = () => {
  return (
    <div style={{border: 'solid 1px blue', display: 'flex', height: 600}}>
      <Board/>
      <div id="stands">
        <Stand isBlack={true} />
        <Stand isBlack={false} />
      </div>
    </div>
  )
}

const Board: React.FC = () => {
  const { board, selected, isBlackTurn, bStand, wStand } = useSelector<IState, IBoard>(a => a.board)

  const Square: React.FC<{row: number, col: number, p: Piece}> = (props) => (
    <td style={{border: 'solid 1px', backgroundColor: (props.row*9+props.col)===selected?'#FF0000':''}} key={`square${props.row*9+props.col}`} onClick={() => move(props.row*9+props.col)}>{pieceChar(props.p)}</td>
  )

  const fields = [...Array(9).keys()].map(i =>
    <tr>
      {board.slice(i*9, (i+1)*9).map((p, j) => <Square row={i} col={j} p={p} />)}
    </tr>
  )

  return (
    <table className="board">
      {fields}
    </table>
  )
}

const Stand: React.FC<{isBlack: boolean}> = (isBlack) => {
  return (
    <table className="stand" id={isBlack?'black-stand':'white-stand'}>
      <tr><td>1</td><td>2</td></tr>
      <tr><td>1</td><td>2</td></tr>
      <tr><td>1</td><td>2</td></tr>
      <tr><td>1</td><td>2</td></tr>
    </table>
  )
  // {this.props.stand.map(p => <span>{pieceChar(p)}</span>)}
}

export default Main
