import React from 'react'
import { Piece, isWhite} from './Piece'
import { moveHandler } from './move'
import './Board.css'
import { useDispatch, useSelector } from 'react-redux';
import { changeBoardAction } from './actions/BoardActions';
import { IState } from './states/IState';
import { IBoard } from './states/IBoard';
import { RecordView } from './RecordView'
import { moveBack, moveForward } from './recordHandlers'

const Main: React.FC = () => {
  return (
    <div>
      <div>
        <button onClick={moveBack}>{"<"}</button>
        <button onClick={moveForward}>{">"}</button>
      </div>
      <div style={{border: 'solid 1px blue', display: 'flex', height: 600}}>
        <Board/>
        <div id="stands">
          <Stand isBlack={false} />
          <Stand isBlack={true} />
        </div>

        <RecordView />
      </div>
    </div>
  )
}

const pieceToImg = (p: Piece) => {
  if(p === Piece.EMPTY) return <div/>
  else {
    const pieceArr = ['FU', 'KY', 'KE', 'GI', 'KI', 'KA', 'HI', 'OU', 'TO', 'NY', 'NK', 'NG', 'UM', 'RY']
    const isW = isWhite(p)
    return <img className="piece-image" src={`svg/piece/${isW?1:0}${pieceArr[(isW?p-14:p)-1]}.svg`} />
  }
}


const Board: React.FC = () => {
  const { board, selected, isBlackTurn, bStand, wStand } = useSelector<IState, IBoard>(a => a.board)

  const Square: React.FC<{row: number, col: number, p: Piece}> = (props) => (
  <td style={{border: 'solid 1px', backgroundColor: (props.row*9+props.col)===selected?'#FF0000':''}} key={`square${props.row*9+props.col}`} onClick={() => moveHandler(props.row*9+props.col)}>{pieceToImg(props.p)}</td>
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
    if(nPiece) return <td style={{backgroundColor: selected===p.i?'#FF0000':''}} onClick={() => select(p.i)}>{pieceToImg(p.p)}{nPiece}</td>
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
