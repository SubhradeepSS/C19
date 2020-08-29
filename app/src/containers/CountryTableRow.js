import React from 'react'

export default function CountryTableRow(props){
    return (
        <tr>
            <td>{props.data.country}</td>
            <td>{props.data.confirmed} (+{props.data.cChanges})</td>
            <td>{props.data.recovered} (+{props.data.rChanges})</td>
            <td>{props.data.deaths} (+{props.data.dChanges})</td>
            
        </tr>
    )
}