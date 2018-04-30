import React from 'react';
import PropTypes from 'prop-types';
import ImageButton from '../components/ImageButton';
import { connect } from 'react-redux';

class CitiesView extends React.Component {
    constructor(props) {
        super(props);

        this.generateButtons = this.generateButtons.bind(this);
    }

    generateButtons() {
        if (!this.props.cities) return [];
        const urls = this.props.urls;
        return [...this.props.cities].map(city => {
            const imageURL = urls[city];
            return <ImageButton 
                    key={ `${city}ImageButton` } 
                    name={ city } 
                    imageURL={ imageURL } 
                    showName={ true } 
                    className=''
                    onClick={ this.props.onClick } />
        });
    }

    render() {
        const imageButtons = this.generateButtons();
        return (
            <section style={{ paddingTop: '3rem' }}>
                <h1 className='title'>Ciudades</h1>
                <div className='cities-view'>
                    { imageButtons }
                </div>
            </section>
        );
    }
}

CitiesView.propTypes = {
    cities:     PropTypes.any,
    urls:       PropTypes.object,
    onClick:    PropTypes.func
}

const mapStateToProps = store => {
    return {
        cities: store.citiesByCountry[store.currentCountry],
        urls: store.imageURLByCity
    };
}

export default connect(
    mapStateToProps
)(CitiesView);