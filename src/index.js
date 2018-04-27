import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';

const store = createStore(
    reducer,
    {
        currentCountry: 'España',
        currentCity: 'Madrid',
        currentStation: 'Atocha',
        currentLatlng: {},
        mainView: true,
        countries: []
    }
);

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>, 
    document.getElementById('root')
);
