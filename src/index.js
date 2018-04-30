import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import { get } from 'axios';
import './themes/index.css';

const DATA_FETCH_URL =
'https://gist.githubusercontent.com/inakivb/943ed6b3a8bcc667c1e1147b7591e32f/raw/355b2d67aaea30fd322c7d1e1a8660480609d67a/stations.json';

const store = createStore(
    reducer,
    {
        currentCountry: 'España',
        currentCity: 'Madrid',
        currentStation: 'Atocha',
        currentLatlng: {},
        mainView: true,
        countries: [],
        imageURLByCountry: {},
        imageURLByCity: {},
        imageURLByStation: {},
        stationsData: [],
        citiesByCountry: {},
        stationsByCity: {},
        dataByCity: {},
        markers: [],
        map: null,
        submenuSubclass: '',
        isSubmenuShowing: false
    }
);

(function fetchData(){
    get(DATA_FETCH_URL)
        .then((response) => {
            ReactDOM.render(
                <Provider store={ store }>
                    <App data={ response.data }/>
                </Provider>, 
                document.getElementById('root')
            );
        })
        .catch((error) => {
            console.log(error);
        });
})();
