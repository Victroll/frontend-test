import * as types from './constants/actions';

const BASE_URL = 'https://imgs-akamai.mnstatic.com/';
const SECOND_URL = '.jpg?output-quality=75&output-format=progressive-jpeg&interpolation=lanczos-none&fit=around%7C';
const LAST_URL = '%3B*%2C*';

export default function(state, action) {
    var newMarkers = [];
    var newState = {};
    switch(action.type) {
        case types.SHOW_CITY:
            return {...state,
                currentCity: action.city
            };
        case types.SHOW_COUNTRY:
            return {...state,
                currentCountry: action.country
            };
        case types.FETCH_DATA:
            // Get an array of countries
            const countries = getCountries(action.data)
            // Get hashes from each country
            const imageURLByCountry = getImageURLBy(action.data, 'country_name');
            // Get hashes from each city
            const imageURLByCity = getImageURLBy(action.data, 'city_name');
            // Get hashes from each station
            const imageURLByStation = getImageURLBy(action.data, 'station_name');
            // Get cities ordered by country
            const citiesByCountry = getCitiyesByCountry(action.data); 
            // Get data ordered by city
            const dataByCity = getDataByCity(action.data);
            // Get stations by city
            const stationsByCity = getStationsByCity(action.data);
            // Get stations fav data
            const stationsFav = getFavList(action.data);

            return {...state,
                countries: countries,
                imageURLByCountry: imageURLByCountry,
                imageURLByCity: imageURLByCity,
                imageURLByStation: imageURLByStation,
                stationsData: action.data,
                citiesByCountry: citiesByCountry,
                stationsByCity: stationsByCity,
                dataByCity: dataByCity,
                stationsFav: stationsFav
            };
        case types.STOP_LOADING:
            return {...state,
                isLoading: false
            };
        case types.CREATE_MAP:
            const map = new window.google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: state.currentLatlng,
                mapTypeId: 'roadmap',
                disableDefaultUI: true
            });
            newMarkers = refreshMarkers(state.markers, state.currentCity, state, map);

            return {...state,
                map: map,
                markers: newMarkers
            };
        case types.SHOW_STATION:
            const station = state.stationsData.find(st => st.station_name === action.station)
            const newLatlng = {
                lat: parseFloat(station.latitude),
                lng: parseFloat(station.longitude)
            };

            state.map.panTo(newLatlng);

            return {...state,
                currentStation: action.station,
                currentLatlng: newLatlng
            };
        case types.SHOW_MAP_VIEW:
            return {...state,
                mainView: false,
                currentCity: action.city,
                currentLatlng: {
                    lat: state.dataByCity[action.city][0].latitude,
                    lng: state.dataByCity[action.city][0].longitude
                }
            };
        case types.SHOW_CITIES_VIEW:
            return {...state,
                mainView: true
            };
        case types.TOGGLE_SUBMENU:
            return {...state,
                submenuSubclass: state.isSubmenuShowing ? 'close' : 'open',
                isSubmenuShowing: !state.isSubmenuShowing
            };
        case types.TOGGLE_FAV:
            newState = {...state,
                stationsFav: {...state.stationsFav,
                    [action.station]: !state.stationsFav[action.station]
                }
            };

            toggleFavMarker(newState.markers, newState, action.station);

            // Save in local storage
            window.localStorage.setItem('minube_stationFavs', JSON.stringify(newState.stationsFav));

            return newState;
        default:
            return state;
    }
}

function getFavList(stationsData) {
    const data = {};
    // Get local storage
    const localFavs = JSON.parse(window.localStorage.getItem('minube_stationFavs'));

    if (localFavs) return localFavs
    
    stationsData.forEach(station => data[station.station_name] = false);

    return data;
}

function toggleFavMarker(markers, state, station) {
    const index = markers.reduce((last, marker, index) => {
        let ret = last;
        if (marker.station === station)
            ret = index;
        return ret;
    }, -1);

    const position = {
        lat: markers[index].position.lat(),
        lng: markers[index].position.lng()
    };

    const marker = new window.google.maps.Marker({
        map: state.map,
        animation: window.google.maps.Animation.DROP,
        position: position,
        icon: state.stationsFav[station] ? './images/heart.svg' : '',
        station: station
    });

    markers[index].setMap(null);
    markers.splice(index, 1);
    markers.push(marker);
}

function refreshMarkers(markers, cityName, state, map = null) {
    // Remove previous markers
    markers.forEach((marker) => marker.setMap(null));

    // Create new markers
    const newMarkers = [];

    state.dataByCity[cityName].forEach((data) => {
        const marker = new window.google.maps.Marker({
            map: map ? map : state.map,
            animation: window.google.maps.Animation.DROP,
            position: {lat: data.latitude, lng: data.longitude},
            icon: state.stationsFav[data.station_name] ? './images/heart.svg' : '',
            station: data.station_name
        });
        newMarkers.push(marker);
    });

    return newMarkers;
}

function getCountries(stationsData) {
    const data = new Set();

    stationsData.forEach(station => {
        data.add(station.country_name);
    });

    return [...data];
}

function getImageURLBy(stationsData, byWhat) {
    const data = {};
    const size = byWhat === 'country_name' || byWhat === 'station_name' ? '50%3A50&crop=50%3A50' : '100%3A150&crop=100%3A150';

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

function getCitiyesByCountry(stationsData) {
    const data = {};

    stationsData.forEach(station => {
        if (!data[station.country_name])
            data[station.country_name] = new Set();
        data[station.country_name].add(station.city_name);
    });

    return data;
}

function getDataByCity(stationsData) {
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

function getStationsByCity(stationsData) {
    const data = {};

    stationsData.forEach(station => {
        if (!data[station.city_name])
            data[station.city_name] = [];
        
        data[station.city_name].push(station.station_name);
    });

    return data;
}