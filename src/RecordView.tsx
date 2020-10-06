import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IState } from './states/IState'
import { IRecord, tMove } from './states/IRecord'
import { pieceChar } from './Piece'

const moveToText = (m: tMove) => `${(9-m.to%9)}${(m.to/9 | 0)+1}${pieceChar(m.piece)}${m.hasPromoted===undefined?'':m.hasPromoted?'成':'不成'}${m.from<81?`(${9-m.from%9}${(m.from/9 | 0) + 1})`:''}`

export const RecordView: React.FC = () => {
    const { record, pointer } = useSelector<IState, IRecord>(a => a.record)
    const dispatch = useDispatch()

    return <select multiple={true}>
        <option>----開始局面----</option>
        {record.map((m, i) => <option style={(i+1===pointer)?{backgroundColor: '#0000FF', color: '#FFFFFF'}:{}}>{moveToText(m)}</option>)}
    </select>
}
