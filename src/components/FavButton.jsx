import React from 'react';
import { toggleFav } from '../actions/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FavButton extends React.Component {
    render() {
        return (
            <button className='heart-button' onClick={ () => this.props.toggleFav(this.props.station) }>
                {this.props.isFav ?
                <i className="fas fa-heart"></i>
                : <i className="far fa-heart"></i> }
            </button>
        );
    }
}

FavButton.propType = {
    station: PropTypes.string
}

const mapStateToProps = (store, props) => {
    return {
        isFav: store.stationsFav[props.station]
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        toggleFav: (station) => dispatch(toggleFav(station))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FavButton);