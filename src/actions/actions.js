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