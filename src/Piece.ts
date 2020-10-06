export enum Piece {
  EMPTY = 0,
  FU, KY, KE, GI, KI, KA, HI, OU, TO, NY, NK, NG, UM, RY,
  EFU, EKY, EKE, EGI, EKI, EKA, EHI, EOU, ETO, ENY, ENK, ENG, EUM, ERY
}

export const pieceChar = (p: Piece) => {
  const pc = [' 　', '歩', '香', '桂', '銀', '金', '角', '飛', '王', 'と', '杏', '圭', '全', '馬', '龍']
  return isWhite(p)?(pc[p-Piece.RY]):(pc[p])
}

export const isWhite = (p: Piece) => p > Piece.RY
export const promote = (p: Piece) => {
  if(isPromoted(p)) return p

  if((!isWhite(p) && p < Piece.KI) || (isWhite(p) && p < Piece.EKI)) return p + 8
  else return p + 7
}

export const disPromote = (p: Piece) => {
  if(!isPromoted(p) || p === Piece.KI || p === Piece.EKI || p === Piece.OU || p === Piece.EOU) return p

  if((!isWhite(p) && p < Piece.UM) || (isWhite(p) && p < Piece.EUM)) return p - 8
  else return p - 7
}

export const isPromoted = (p: Piece) => (
  // Kin and Ou are handled as promoted pieces
  (!isWhite(p) && (
    (Piece.OU <= p) || (p === Piece.KI)
  )) ||
  (isWhite(p) && (
    (Piece.EOU <= p) || (p === Piece.EKI)
  ))
)
