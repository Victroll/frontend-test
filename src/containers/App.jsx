import React from 'react';
import CitiesView from './CitiesView';
import Header from '../components/Header';
import Submenu from './Submenu';
import MapView from './MapView';
import LoadingScreen from '../components/LoadingScreen';
import { connect } from 'react-redux';
import { fetchData, stopLoading } from '../actions/actions';

class App extends React.Component {
    constructor(props) {
        super(props);  
        
        this.props.fetchData(this.props.data);

        setTimeout(this.props.stopLoading, 3000);
    }

    render() {
        const view = this.props.mainView ? <CitiesView /> : <MapView />;
        return (
            <div>
                { this.props.isLoading && <LoadingScreen /> }
                { !this.props.isLoading && <Header /> }
                { !this.props.isLoading && view }
                { !this.props.isLoading && <Submenu />}
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        mainView: store.mainView,
        isLoading: store.isLoading
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchData: (data) => dispatch(fetchData(data)),
        stopLoading: () => dispatch(stopLoading())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);