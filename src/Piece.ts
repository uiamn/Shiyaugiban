export enum Piece {
  EMPTY = 0,
  FU, KY, KE, GI, KI, KA, HI, OU, TO, NY, NK, NG, UM, RY,
  EFU, EKY, EKE, EGI, EKI, EKA, EHI, EOU, ETO, ENY, ENK, ENG, EUM, ERY
}

export const isEnemy = (p: Piece) => p > Piece.RY
