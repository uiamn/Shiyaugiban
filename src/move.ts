import { Piece, isEnemy, promote, isPromoted, disPromote } from './Piece'
import { changeBoardAction } from './actions/BoardActions';
import Store from './Store';

const isLegalMove = (from: number, to: number, board: Piece[]) => {
  if(from < 81) return movePieceOnBoard(from, to, board)
  else return movePieceOnStand(from, to, board)
}

const movePieceOnBoard = (from: number, to: number, board: Piece[]) => {
  const mvPiece = board[from]

  if(mvPiece === Piece.EMPTY || (board[to] !== Piece.EMPTY && isEnemy(mvPiece) === isEnemy(board[to]))) return false

  const legalSquares: Piece[] = []

  switch (mvPiece) {
    case Piece.FU:
    case Piece.EFU:
      legalSquares.push(from + (isEnemy(mvPiece)?9:-9))
      break

    case Piece.KY:
    case Piece.EKY:
      const d = isEnemy(mvPiece)?9:-9
      for(let i=from+d; (-1<i && i<81); i+=d)
        if(board[i] === Piece.EMPTY) legalSquares.push(i)
        else if(isEnemy(board[from]) !== isEnemy(board[i])) {
          legalSquares.push(i)
          break
        } else break
      break

    case Piece.KE:
      if(from % 9 !== 0) legalSquares.push(from-19)
      if(from % 9 !== 8) legalSquares.push(from-17)
      break

    case Piece.EKE:
      if(from % 9 !== 0) legalSquares.push(from+17)
      if(from % 9 !== 8) legalSquares.push(from+19)
      break

    case Piece.GI:
    case Piece.KI:
    case Piece.TO:
    case Piece.NY:
    case Piece.NK:
    case Piece.NG:
      legalSquares.push(from-9)
      if(from % 9 !== 0) {
        legalSquares.push(from-10)
        legalSquares.push(from+(mvPiece===Piece.GI?8:-1))
      }
      if(from % 9 !== 8) {
        legalSquares.push(from-8)
        legalSquares.push(from+(mvPiece===Piece.GI?10:1))
      }
    break

    case Piece.EGI:
    case Piece.EKI:
    case Piece.ETO:
    case Piece.ENY:
    case Piece.ENK:
    case Piece.ENG:
      legalSquares.push(from+9)
      if(from % 9 !== 0) {
        legalSquares.push(from+8)
        legalSquares.push(from+(mvPiece===Piece.EGI?-10:-1))
      }
      if(from % 9 !== 8) {
        legalSquares.push(from+10)
        legalSquares.push(from+(mvPiece===Piece.EGI?-8:1))
      }
    break

    case Piece.KA:
    case Piece.EKA:
    case Piece.UM:
    case Piece.EUM:
      for(let j of [8, -8, 10, -10]) {
        for(let i=from+j; (-1<i && i<81); i+=j) {
          if(board[i] === Piece.EMPTY) legalSquares.push(i)
          else if(isEnemy(board[from]) !== isEnemy(board[i])) {
            legalSquares.push(i)
            break
          } else break
          if(i%9 === ((j===-8 || j===10)?8:0)) break
        }
      }

      if(mvPiece === Piece.UM || mvPiece === Piece.EUM) {
        legalSquares.push(from-9, from+9)
        if(from % 9 !== 0) legalSquares.push(from-1)
        if(from % 9 !== 8) legalSquares.push(from+1)
      }

      break

    case Piece.HI:
    case Piece.EHI:
    case Piece.RY:
    case Piece.ERY:
      for(let j of [1, -1, 9, -9]) {
        for(let i=from+j; (-1<i && i<81); i+=j) {
          if(board[i] === Piece.EMPTY) legalSquares.push(i)
          else if(isEnemy(board[from]) !== isEnemy(board[i])) {
            legalSquares.push(i)
            break
          } else break
          if(j*j !== 1 && i%9 === (i===1?8:0)) break
        }
      }

      if(mvPiece === Piece.RY || mvPiece === Piece.ERY) {
        if(from % 9 !== 0) legalSquares.push(from-10, from+8)
        if(from % 9 !== 8) legalSquares.push(from-8, from+10)
      }
      break

    case Piece.OU:
    case Piece.EOU:
      legalSquares.push(from-9, from+9)
      if(from % 9 !== 0) legalSquares.push(from-10, from-1, from+8)
      if(from % 9 !== 8) legalSquares.push(from-8, from+1, from+10)
      break

    default:
      break;
  }

  return legalSquares.indexOf(to) !== -1
}

const movePieceOnStand = (from: number, to: number, board: Piece[]) => {
  if(from === 87 || from === 94) {
    for(let i=0; i<9; i++) if(board[9*i+(to%9)] === (from===87?Piece.FU:Piece.EFU)) return false
  }

  return board[to] === Piece.EMPTY
}

export const move = (i: number) => {
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
      const newStand = isBlackTurn?bStand:wStand

      if(selected < 81) {
        // move piece on board
        const newPiece = ((isBlackTurn && i < 27) || (!isBlackTurn && i > 53)) && !isPromoted(board[selected]) && window.confirm('promotion?')
                        ?promote(board[selected])
                        :board[selected]

        const newBoard = board.map((p, j) => j===i?newPiece:j===selected?Piece.EMPTY:p)

        const takenPiece = board[i]===Piece.EMPTY?undefined:isPromoted(board[i])?disPromote(board[i]):board[i]
        if(takenPiece !== undefined) newStand.push(takenPiece + (isBlackTurn?-14:14))

        const newState = {selected: -1, board: newBoard, isBlackTurn: !isBlackTurn}
        Object.assign(newState, {[(isBlackTurn?'bStand':'wStand')]: newStand})

        dispatch(changeBoardAction(newState))
      } else {
        // move piece on stand
        const newPiece = isBlackTurn?(Piece.HI+81-selected):(Piece.EHI+88-selected)
        const newBoard = board.map((p, j) => j===i?newPiece:p)
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