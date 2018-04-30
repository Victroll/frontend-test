import React from 'react';
import { get } from 'axios';
import CitiesView from './CitiesView';
import Header from '../components/Header';
import Submenu from './Submenu';
import MapView from './MapView';
import { connect } from 'react-redux';
import { fetchData } from '../actions/actions';

class App extends React.Component {
    constructor(props) {
        super(props);  
        
        this.props.fetchData(this.props.data);
    }

    render() {
        return (
            <div>
                <Header />
                { this.props.mainView ? 
                    <CitiesView />
                    : <MapView />
                }
                <Submenu />
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
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