import React from 'react';
import PropTypes from 'prop-types';
import ImageButton from '../components/ImageButton';

class CitiesView extends React.Component {
    constructor(props) {
        super(props);

        this.generateButtons = this.generateButtons.bind(this);

        this.state = {
            imageButtons: []
        };
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
            <div>
                { imageButtons }
            </div>
        );
    }
}

CitiesView.propTypes = {
    cities:     PropTypes.any,
    country:    PropTypes.string,
    dataByCity: PropTypes.object,
    urls:       PropTypes.object,
    onClick:    PropTypes.func
}

export default CitiesView;