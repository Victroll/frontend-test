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
    }
    return state;
}