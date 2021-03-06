import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createMap } from '../actions/actions';

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
            <section className='map'>
                <div id='map' style={{ height: 'inherit', width: 'inherit'}}>
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
        createMap: () => dispatch(createMap())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapView);