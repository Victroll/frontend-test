import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createMap, showCitiesView } from '../actions/actions';

class MapView extends React.Component {
    constructor(props) {
        super(props);

        this.selectFav = this.selectFav.bind(this);

        this.state = {
            map: null
        };

        this.markers = [];
    }

    componentDidMount() {
        this.props.createMap();
    }

    selectFav(data) {
        const newFavData = this.props.dataByCity[data.city_name].map((station) => {
            if (station.id === data.id)
            return {...station, fav: !station.fav}
            return station;
        });

        this.refreshMarkers(data.city_name, newFavData);

        this.setState({...this.state, 
            dataByCity: {...this.state.dataByCity,
            [data.city_name]: newFavData
            }
        });
    }

    render() {
        return (
            <section>
                <button id='goBack' onClick={ this.props.showCitiesView } ></button>
                <div id='map' style={{ height: '200px', width: '100%' }}>
                </div>
            </section>
        );
    }
}

MapView.propType = {
    currentCity:           PropTypes.string,
    latlng:         PropTypes.object,
    dataByCity:     PropTypes.object
}

const mapStateToProps = store => {
    return {
        currentCity: store.currentCity,
        latlng: store.currentLatlng
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        createMap: () => dispatch(createMap()),
        showCitiesView: () => dispatch(showCitiesView())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapView);