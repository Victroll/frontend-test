import * as types from './constants/actions';

export default function(state, action) {
    switch(action.type) {
        case types.SHOW_CITY:
            return {...state,
                currentCity: action.city
            };
        case types.SHOW_COUNTRY:
            return {...state,
                currentCountry: action.country
            };
        case types.SHOW_STATION:
            return {...state,
                currentStation: action.station
            };
        case types.FETCH_DATA:
        const countries = getCountries(action.data)
        return {...state,
            countries: countries
        };
    }
    return state;
}

function getCountries(stationsData) {
    const data = new Set();

    stationsData.forEach(station => {
        data.add(station.country_name);
    });

    return [...data];
}