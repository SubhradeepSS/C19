import React from 'react'

export default function StateTableRow(props){
    return (
        <tr>
            <td>{props.data.state}</td>
            <td>{props.data.active} (+{props.data.aChanges})</td>
            <td>{props.data.recovered} (+{props.data.rChanges})</td>
            <td>{props.data.deaths} (+{props.data.dChanges})</td>
            <td>{props.data.confirmed} (+{props.data.cChanges})</td>
        </tr>
    )
}