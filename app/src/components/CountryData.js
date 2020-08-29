import React, { Component } from 'react'
import CountryTableRow from '../containers/CountryTableRow'

export default class IndiaState extends Component {
    constructor() {
        super()
        this.state = { 
            data: [],
            isLoading: true
        }
    }

    componentDidMount() {
        fetch("https://api.covid19api.com/summary")
            .then(resp => resp.json())
            .then(data => {
                this.setState({
                    data: data.Countries,
                    isLoading: false
                })
            })
    }

    render(){
        if(this.state.isLoading)
            return (
                <div>
                    <h1>Loading</h1>
                </div>
            )
        
        const stateRows = this.state.data.map(e => 
            <CountryTableRow 
                data= {{
                    country: e.Country,        
                    confirmed: e.TotalConfirmed,
                    cChanges: e.NewConfirmed,
                    deaths: e.TotalDeaths,
                    dChanges: e.NewDeaths,
                    recovered: e.TotalRecovered,
                    rChanges: e.NewRecovered
                }}
            />
        )

        return (
            <div>
                <h1>CountryWise Data</h1>
                <table style={{margin: 'auto'}}>
                    <thead>
                        <tr>
                            <th scope="col">Country</th>
                            <th scope="col">Confirmed</th>
                            <th scope="col">Recovered</th>
                            <th scope="col">Deaths</th>
                        </tr>
                        {stateRows}
                    </thead>
                </table>
            </div>
        )
    }
}