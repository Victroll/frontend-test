import * as types from '../constants/actions';

export function showCity(city) {
    return {
        type: types.SHOW_CITY,
        city: city
    };
}

export function showCountry(country) {
    return {
        type: types.SHOW_COUNTRY,
        country: country
    };
}

export function showStation(station) {
    return {
        type: types.SHOW_STATION,
        station: station
    };
}

export function fetchData(data) {
    return {
        type: types.FETCH_DATA,
        data: data
    };
}

export function showMapView(city, map) {
    return {
        type: types.SHOW_MAP_VIEW,
        city: city,
        map: map
    }
}

export function showCitiesView() {
    return {
        type: types.SHOW_CITIES_VIEW
    };
}

export function createMap() {
    return {
        type: types.CREATE_MAP
    };
}

export function toggleSubmenu() {
    return {
        type: types.TOGGLE_SUBMENU
    };
}

export function toggleFav(station) {
    return {
        type: types.TOGGLE_FAV,
        station: station
    };
}

export function stopLoading() {
    return {
        type: types.STOP_LOADING
    };
}