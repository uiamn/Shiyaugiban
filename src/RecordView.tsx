import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IState } from './states/IState'
import { IRecord, tMove } from './states/IRecord'
import { pieceChar } from './Piece'

const moveToText = (m: tMove) => `${(m.to/9 | 0)+1}${(m.to%9 + 1)}(${(m.from/9 | 0) + 1}${m.from%9 + 1})${pieceChar(m.piece)}${m.hasPromoted===undefined?'':m.hasPromoted?'成':'不成'}`

export const RecordView: React.FC = () => {
    const { record } = useSelector<IState, IRecord>(a => a.record)
    const dispatch = useDispatch()

    return <select multiple={true}>
        <option>----開始局面----</option>
        {record.map(m => <option>{moveToText(m)}</option>)}
    </select>
}
