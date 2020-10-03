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
      if(selected < 81) {
        // move piece on board
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
      } else {
        // move piece on stand
        const newPiece = isBlackTurn?(Piece.HI+81-selected):(Piece.EHI+88-selected)
        const newBoard = board.map((p, j) => j===i?newPiece:p)
        const newStand = isBlackTurn?bStand:wStand
        newStand.splice(newStand.indexOf(newPiece), 1)
        console.log(newStand)
        const newState = {selected: -1, board: newBoard, isBlackTurn: !isBlackTurn}

        Object.assign(newState, {[(isBlackTurn?'bStand':'wStand')]: newStand})
        dispatch(changeBoardAction(newState))
      }

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
        <Stand isBlack={false} />
        <Stand isBlack={true} />
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

const Stand: React.FC<{isBlack: boolean}> = (props) => {
  const { board, selected, isBlackTurn, bStand, wStand } = useSelector<IState, IBoard>(a => a.board)
  const dispatch = useDispatch()
  const select = (i: number) => {
    if(isBlackTurn === (i < 88)) dispatch(changeBoardAction({selected: i}))
  }

  const PieceOnStand: React.FC<{p: Piece, i: number}> = (p) => {
    const nPiece = (props.isBlack?bStand:wStand).filter(q => p.p===q).length
    if(nPiece) return <td style={{backgroundColor: selected===p.i?'#FF0000':''}} onClick={() => select(p.i)}>{pieceChar(p.p)} x {nPiece}</td>
    else return <td/>
  }

  return (
    <table className="stand" id={props.isBlack?'black-stand':'white-stand'}>
      {
        [...Array(4).keys()].map((_, i) => <tr>
          <PieceOnStand p={(props.isBlack?Piece.HI:Piece.EHI)-2*i} i={(props.isBlack?81:88)+2*i} />
          {i===3?<td/>:<PieceOnStand p={(props.isBlack?Piece.HI:Piece.EHI)-2*i-1} i={(props.isBlack?81:88)+2*i+1} />}
        </tr>)
      }
    </table>
  )
}

export default Main
