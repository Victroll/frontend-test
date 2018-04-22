import React from 'react';

class MapView extends React.Component {
    componentDidMount() {
        const map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: {lat: 37.090, lng: -95.712},
            mapTypeId: 'roadmap',
            disableDefaultUI: true
        });
    }

    render() {
        return (
            <div id='map' style={{ height: '200px', width: '100%' }}>
            </div>
        );
    }
}

export default MapView;