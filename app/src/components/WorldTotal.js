import React from 'react';

const url = "https://covid-19india-api.herokuapp.com/global";
const cors = "https://cors-anywhere.herokuapp.com/";

export default class WorldTotal extends React.Component {
    constructor() {
        super()
        this.state = {
            data: {},
            isLoading: true
        }
    }
    
    componentDidMount() {
        fetch(cors + url)
            .then(resp => resp.json())
            .then(data => {
                const stats = data.data;
                const confirmed_cases = stats.confirmed_cases;
                const active_cases = stats.active_cases;
                const recovered_cases = stats.recovered_cases;
                const death_cases = stats.death_cases;
                const active_rate = stats.active_rate;
                const death_rate = stats.death_rate;
                const recovered_rate = stats.recovered_rate;

                this.setState({
                    data: {
                        active: active_cases,
                        confirmed: confirmed_cases,
                        recovered: recovered_cases,
                        deaths: death_cases,
                        active_rate: active_rate,
                        death_rate: death_rate,
                        recovered_rate: recovered_rate
                    },
                    isLoading: false
                })

            })
    }
    render() {
        const display = this.state.isLoading 
                        ? <div><h1>Loading</h1></div> 
                        : <div><h1>World Summary</h1>
                                <p>
                                Active: {this.state.data.active} (@{this.state.data.active_rate}), 
                                Recovered: {this.state.data.recovered} (@{this.state.data.recovered_rate}), 
                                Deaths: {this.state.data.deaths} (@{this.state.data.death_rate}), 
                                Confirmed: {this.state.data.confirmed}
                                </p> 
                            </div>

        return (
            <div>
                {display}
            </div>
        )
    }
}