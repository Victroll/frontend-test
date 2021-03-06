import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showMapView } from '../actions/actions';

class ImageButton extends React.Component {
    render() {
        return (
            <div className='image-button'>
                <button className={ this.props.className } 
                key={ `${this.props.name}Button` } 
                onClick={ () => this.props.showMapView(this.props.name) }>
                    { this.props.showName && <h2>{ this.props.name }</h2> }
                    <img key={ `${this.props.name}ImgKey` } 
                    src={ this.props.imageURL } 
                    alt={ this.props.name } />
                </button>
            </div>
        );
    }
}

ImageButton.propTypes = {
    name:       PropTypes.string,
    imageURL:   PropTypes.string,
    showName:   PropTypes.bool,
    className:  PropTypes.string
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        showMapView: (city) => dispatch(showMapView(city))
    };
}

export default connect(
    null,
    mapDispatchToProps
)(ImageButton);