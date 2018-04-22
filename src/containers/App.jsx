import React from 'react';
import { get } from 'axios';
import CitiesView from './CitiesView';

const DATA_FETCH_URL =
'https://gist.githubusercontent.com/inakivb/943ed6b3a8bcc667c1e1147b7591e32f/raw/355b2d67aaea30fd322c7d1e1a8660480609d67a/stations.json';

class App extends React.Component {
    constructor() {
        super();

        this.fetchData = this.fetchData.bind(this);
        this.getCitiyesByCountry = this.getCitiyesByCountry.bind(this);
        this.getDataByCity = this.getDataByCity.bind(this);

        this.state = {
            stationsData: [],
            citiesByCountry: {},
            dataByCity: {}
        };

        // Fetch the stations data
        this.fetchData();
        
    }

    fetchData() {
        get(DATA_FETCH_URL)
            .then((response) => {
                // Get cities ordered by country
                const citiesByCountry = this.getCitiyesByCountry(response.data); 
                // Get data ordered by city
                const dataByCity = this.getDataByCity(response.data);

                this.setState({...this.state,
                    stationsData: response.data,
                    citiesByCountry: citiesByCountry,
                    dataByCity: dataByCity
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getDataByCity(stationsData) {
        const data = {};
        stationsData.forEach((station) => {
        if (!data[station.city_name])
            data[station.city_name] = [];
      
        const newStation = {...station, 
            latitude: parseFloat(station.latitude),
            longitude: parseFloat(station.longitude),
            fav: false
        };

        data[station.city_name].push(newStation);
        });

        // Reorder cities stations by popularity
        Object.keys(data).forEach((city) =>
            data[city].sort((a, b) => b.popularity - a.popularity)
        );

        return data;
    }

    getCitiyesByCountry(stationsData) {
        const data = {};

        stationsData.forEach(station => {
            if (!data[station.country_name])
                data[station.country_name] = new Set();
            data[station.country_name].add(station.city_name);
        });

        return data;
    }

    render() {
        return (
            <div>
                <CitiesView 
                country={ 'España' }
                cities={ this.state.citiesByCountry['España'] } 
                dataByCity={this.state.dataByCity } />
            </div>
        );
    }
}

export default App;