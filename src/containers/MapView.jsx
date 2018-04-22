import React from 'react';
import PropTypes from 'prop-types';

class MapView extends React.Component {
    constructor(props) {
        super(props);

        this.refreshMarkers = this.refreshMarkers.bind(this);

        this.state = {
            markers: [],
            map: null
        };
    }

    componentDidMount() {
        const map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: {lat: this.props.dataByCity[this.props.city][0].latitude,
                    lng:  this.props.dataByCity[this.props.city][0].longitude},
            mapTypeId: 'roadmap',
            disableDefaultUI: true
        });

        this.setState({...this.state, map: map});
    }

    componentDidUpdate() {
        this.refreshMarkers(this.props.city);
    }

    refreshMarkers(cityName, refreshThis = null) {
        // Remove previous markers
        this.state.markers.forEach((marker) => marker.setMap(null));
    
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
    
        return newMarkers;
      }

    render() {
        return (
            <div id='map' style={{ height: '200px', width: '100%' }}>
            </div>
        );
    }
}

MapView.propType = {
    city:           PropTypes.string,
    dataByCity:     PropTypes.object
}

export default MapView;