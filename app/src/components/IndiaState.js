import React, { Component } from 'react'
import StateTableRow from '../containers/StateTableRow'

export default class IndiaState extends Component {
    constructor() {
        super()
        this.state = { 
            data: [],
            isLoading: true
        }
    }
    
    componentDidMount() {
        fetch("https://api.covidindiatracker.com/state_data.json")
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    data: data,
                    isLoading: false
                })
            })
    }

    render(){
        if(this.state.isLoading)
            return (
                <div><h1>Loading</h1></div>
            )
        
        const stateRows = this.state.data.map(element => 
            <StateTableRow 
                data= {{
                    state: element.state,
                    active: element.active,
                    confirmed: element.confirmed,
                    deaths: element.deaths,
                    aChanges: element.aChanges,
                    cChanges: element.cChanges,
                    rChanges: element.rChanges,
                    dChanges: element.dChanges,
                }}
            />
        )

        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th scope="col">State / Union Territory</th>
                            <th scope="col">Active</th>
                            <th scope="col">Cured</th>
                            <th scope="col">Deaths</th>
                            <th scope="col">Confirmed</th>
                        </tr>
                        {stateRows}
                    </thead>
                </table>
            </div>
        )
    }
}