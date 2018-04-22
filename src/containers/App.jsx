import React from 'react';
import { get } from 'axios';
import CitiesView from './CitiesView';
import Header from '../components/Header';
import Submenu from './Submenu';
import MapView from './MapView';

const DATA_FETCH_URL =
'https://gist.githubusercontent.com/inakivb/943ed6b3a8bcc667c1e1147b7591e32f/raw/355b2d67aaea30fd322c7d1e1a8660480609d67a/stations.json';
const BASE_URL = 'https://imgs-akamai.mnstatic.com/';
const SECOND_URL = '.jpg?output-quality=75&output-format=progressive-jpeg&interpolation=lanczos-none&fit=around%7C';
const LAST_URL = '%3B*%2C*';

class App extends React.Component {
    constructor() {
        super();

        this.fetchData = this.fetchData.bind(this);
        this.getCitiyesByCountry = this.getCitiyesByCountry.bind(this);
        this.getDataByCity = this.getDataByCity.bind(this);
        this.getHashCodeBy = this.getHashCodeBy.bind(this);
        this.getImageURLBy = this.getImageURLBy.bind(this);

        this.state = {
            stationsData: [],
            citiesByCountry: {},
            dataByCity: {},
            imageURLByCountry: {},
            imageURLByCity: {},
            currentView: 'country'
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
                // Get hashes from each country
                const imageURLByCountry = this.getImageURLBy(response.data, 'country_name');
                // Get hashes from each city
                const imageURLByCity = this.getImageURLBy(response.data, 'city_name');

                this.setState({...this.state,
                    stationsData: response.data,
                    citiesByCountry: citiesByCountry,
                    dataByCity: dataByCity,
                    imageURLByCountry: imageURLByCountry,
                    imageURLByCity: imageURLByCity
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    getImageURLBy(stationsData, byWhat) {
        const data = {};
        const size = byWhat === 'country_name' ? '50%3A50&crop=50%3A50' : '100%3A150&crop=100%3A150';

        stationsData.forEach(station => {
            if (station.picture_hashcode && !data[station[byWhat]]) {
                const hashCode = station.picture_hashcode;
                const imageURL = hashCode ? 
                `${BASE_URL}${hashCode.substring(0, 2)}/${hashCode.substring(2, 4)}/${hashCode}${SECOND_URL}${size}${LAST_URL}`
                : '';
                data[station[byWhat]] = imageURL;
            }
        });

        return data;
    }

    getHashCodeBy(stationsData, byWhat) {
        const data = {};

        stationsData.forEach(station => {
            if (station.picture_hashcode && !data[station[byWhat]])
                data[station[byWhat]] = station.picture_hashcode;
        });

        return data;
    }

    getDataByCity(stationsData) {
        const data = {};

        stationsData.forEach(station => {
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
                <Header openMenu={ () => {} }/>
                {/* <CitiesView 
                country={ 'España' }
                cities={ this.state.citiesByCountry['España'] } 
                dataByCity={this.state.dataByCity }
                urls={ this.state.imageURLByCity } /> */}
                <MapView />
                <Submenu 
                data={ this.state.citiesByCountry }
                urls={ this.state.imageURLByCountry } />
            </div>
        );
    }
}

export default App;