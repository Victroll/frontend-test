import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createMap } from '../actions/actions';

class MapView extends React.Component {
    constructor(props) {
        super(props);

        this.refreshMarkers = this.refreshMarkers.bind(this);
        this.selectFav = this.selectFav.bind(this);

        this.state = {
            map: null
        };

        this.markers = [];
    }

    componentDidMount() {
        this.props.createMap();
    }

    shouldComponentUpdate(nextProps) {
        return this.props.currentLatlng.lat !== nextProps.currentLatlng.lat ||
            this.props.currentLatlng.lng !== nextProps.currentLatlng.lng;
    }

    componentDidUpdate(prevProps) {
        this.state.map.panTo(this.props.latlng);
        this.refreshMarkers(this.props.city);
        // if (this.props.latlng)
        //     this.state.map.panTo(this.props.latlng);
    }

    refreshMarkers(cityName, refreshThis = null) {
        // Remove previous markers
        this.markers.forEach((marker) => marker.setMap(null));

        // Create new markers
        const newMarkers = [];

        if (refreshThis)
            refreshThis.forEach((data) => {
            const marker = new window.google.maps.Marker({
                map: this.state.map,
                position: {lat: data.latitude, lng: data.longitude},
                icon: data.fav ? './images/heart.svg' : ''
            });
            marker.addListener('click', (e) => this.selectFav(data));
            newMarkers.push(marker);
            });
        else
            this.props.dataByCity[cityName].forEach((data) => {
            const marker = new window.google.maps.Marker({
                map: this.state.map,
                animation: window.google.maps.Animation.DROP,
                position: {lat: data.latitude, lng: data.longitude},
                icon: data.fav ? './images/heart.svg' : ''
            });
            marker.addListener('click', (e) => this.selectFav(data));
            newMarkers.push(marker);
            });

        this.markers = newMarkers;
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
            <div id='map' style={{ height: '200px', width: '100%' }}>
            </div>
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
        createMap: () => dispatch(createMap())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapView);