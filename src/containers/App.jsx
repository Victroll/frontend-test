import React from 'react';
import { get } from 'axios';
import CitiesView from './CitiesView';
import Header from '../components/Header';
import Submenu from './Submenu';
import MapView from './MapView';
import { connect } from 'react-redux';
import { fetchData } from '../actions/actions';

const DATA_FETCH_URL =
'https://gist.githubusercontent.com/inakivb/943ed6b3a8bcc667c1e1147b7591e32f/raw/355b2d67aaea30fd322c7d1e1a8660480609d67a/stations.json';
const BASE_URL = 'https://imgs-akamai.mnstatic.com/';
const SECOND_URL = '.jpg?output-quality=75&output-format=progressive-jpeg&interpolation=lanczos-none&fit=around%7C';
const LAST_URL = '%3B*%2C*';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.goToMapView = this.goToMapView.bind(this);
        this.moveToStation = this.moveToStation.bind(this);

        this.state = {
            stationsData: [],
            citiesByCountry: {},
            stationsByCity: {},
            dataByCity: {},
            imageURLByCountry: {},
            imageURLByCity: {},
            imageURLByStation: {},
            mainView: true,
            cityShowing: '',
            currentLatLng: null,
            stationShowing: ''
        };  
        
        this.props.fetchData(this.props.data);
    }

    getHashCodeBy(stationsData, byWhat) {
        const data = {};

        stationsData.forEach(station => {
            if (station.picture_hashcode && !data[station[byWhat]])
                data[station[byWhat]] = station.picture_hashcode;
        });

        return data;
    }

    goToMapView(cityName) {
        this.setState({...this.state,
            mainView: false,
            cityShowing: cityName
        });
    }

    moveToStation(station) {
        const stat = this.state.stationsData.find(st => st.station_name === station);
        this.setState({...this.state,
            mainView: false,
            currentLatLng: {lat: parseFloat(stat.latitude), lng: parseFloat(stat.longitude)}
        });
    }

    render() {
        return (
            <div>
                <Header openMenu={ () => {} }/>
                { this.props.mainView ? 
                    <CitiesView 
                    onClick={ this.goToMapView } />
                    : 
                    <MapView 
                    city={ this.state.cityShowing }
                    dataByCity={ this.state.dataByCity }
                    latlng={ this.state.currentLatLng } />
                }
                <Submenu 
                data={ this.state.mainView ?
                    this.state.countries
                    :
                    this.state.stationsByCity[this.state.cityShowing]
                } />
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        stationShowing: store.stationShowing,
        cityShowing: store.cityShowing,
        mainView: store.mainView
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchData: (data) => dispatch(fetchData(data))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);