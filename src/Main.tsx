import React from 'react'
import { Piece, isEnemy, promote, isPromoted } from './Piece'
import { isLegalMove } from './isLegalMove'
import './Board.css'

const pieceChar = (p: Piece) => {
  const pc = [' 　', '歩', '香', '桂', '銀', '金', '角', '飛', '王', 'と', '杏', '圭', '全', '馬', '龍']
  return isEnemy(p)?('v'+pc[p-Piece.RY]):(' '+pc[p])
}

interface IMainState {
  board: Piece[],
  selected: number,
  isMyTurn: boolean
}

class Main extends React.Component<{}, IMainState> {
  constructor() {
    super({})

    this.state = {
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
      isMyTurn: true
    }
  }

  render() {
    return (
      <div>
        <Board
          board={this.state.board} selected={this.state.selected} clickHandler={this.clickHandler}
        />
      </div>
    )
  }

  clickHandler = (i: number) => {
    if(this.state.selected === -1) {
      if(this.state.board[i] !== Piece.EMPTY && (this.state.isMyTurn !== isEnemy(this.state.board[i]))) {
        this.setState({selected: i})
      } else {
        this.setState({selected: -1})
      }
    } else {
      if(isLegalMove(this.state.selected, i, this.state.board)) {
        const newPiece = ((this.state.isMyTurn && i < 27) || (!this.state.isMyTurn && i > 53)) && !isPromoted(this.state.board[this.state.selected]) && window.confirm('promotion?')
                         ?promote(this.state.board[this.state.selected])
                         :this.state.board[this.state.selected]

        const newBoard = this.state.board.map((p, j) => j===i?newPiece:j===this.state.selected?Piece.EMPTY:p)
        this.setState({selected: -1, board: newBoard, isMyTurn: !this.state.isMyTurn})
      } else if(this.state.board[i] !== Piece.EMPTY && (this.state.isMyTurn !== isEnemy(this.state.board[i]))) {
        this.setState({selected: i})
      } else {
        this.setState({selected: -1})
      }
    }
  }
}

class Board extends React.Component<{board: Piece[], selected: number, clickHandler: (_: number) => void}> {
  render() {
    const Square: React.FC<{row: number, col: number, p: Piece}> = (props) => (
      <td style={{border: 'solid 1px', backgroundColor: (props.row*9+props.col)===this.props.selected?'#FF0000':''}} key={`square${props.row*9+props.col}`} onClick={() => this.props.clickHandler(props.row*9+props.col)}>{pieceChar(props.p)}</td>
    )

    const fields = [...Array(9).keys()].map(i =>
      <tr>
        {this.props.board.slice(i*9, (i+1)*9).map((p, j) => <Square row={i} col={j} p={p} />)}
      </tr>
    )

    return (
      <table className="board">
        {fields}
      </table>
    )
  }
}

export default Main
