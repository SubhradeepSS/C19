import React from 'react'

export default class IndiaTotal extends React.Component {
    constructor() {
        super()
        this.state = {
            data: {},
            isLoading: true
        }
    }
    
    componentDidMount() {
        fetch("https://api.covidindiatracker.com/total.json")
            .then(resp => resp.json())
            .then(data => {
                const active = data["active"];
                const confirmed = data["confirmed"];
                const recovered = data["recovered"];
                const deaths = data["deaths"];
                const achanges = data["achanges"];
                const cchanges = data["cchanges"];
                const rchanges = data["rchanges"];
                const dchanges = data["dchanges"];

                this.setState({
                    data: {
                        active: active,
                        confirmed: confirmed,
                        recovered: recovered,
                        deaths: deaths,
                        achanges: achanges,
                        cchanges: cchanges,
                        rchanges: rchanges,
                        dchanges: dchanges
                    },
                    isLoading: false
                })

            })
    }
    render() {
        const display = this.state.isLoading 
                        ? <div><h1>Loading</h1></div> 
                        : <div><h1>India Summary</h1>
                                <p>
                                Active: {this.state.data.active} (+{this.state.data.achanges})<br/>
                                Recovered: {this.state.data.recovered} (+{this.state.data.rchanges})<br/>
                                Deaths: {this.state.data.deaths} (+{this.state.data.dchanges})<br/>
                                Confirmed: {this.state.data.confirmed} (+{this.state.data.cchanges})<br/>
                                </p> 
                            </div>

        return (
            <div>
                {display}
            </div>
        )
    }
}