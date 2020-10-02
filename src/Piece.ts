export enum Piece {
  EMPTY = 0,
  FU, KY, KE, GI, KI, KA, HI, OU, TO, NY, NK, NG, UM, RY,
  EFU, EKY, EKE, EGI, EKI, EKA, EHI, EOU, ETO, ENY, ENK, ENG, EUM, ERY
}

export const isEnemy = (p: Piece) => p > Piece.RY
export const promote = (p: Piece) => {
  if((!isEnemy(p) && p < Piece.KI) || (isEnemy(p) && p < Piece.EKI)) return p + 8
  else return p + 7
}

export const disPromote = (p: Piece) => {
  if((!isEnemy(p) && p < Piece.UM) || (isEnemy(p) && p < Piece.EUM)) return p - 8
  else return p - 7
}

export const isPromoted = (p: Piece) => (!isEnemy(p) && Piece.OU < p) || (isEnemy(p) && Piece.EOU < p)
