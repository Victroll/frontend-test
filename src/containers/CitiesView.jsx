import React from 'react';
import PropTypes from 'prop-types';
import ImageButton from '../components/ImageButton';

const BASE_URL = 'https://imgs-akamai.mnstatic.com/';
const SECOND_URL = '.jpg?output-quality=75&output-format=progressive-jpeg&interpolation=lanczos-none&fit=around%7C';
const LAST_URL = '%3B*%2C*';

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
        const dbc = this.props.dataByCity;
        return [...this.props.cities].map(city => {
            // Some cities may don't have any image, so we should find one
            const cityWithHashCode = dbc[city].find((cityData) => cityData.picture_hashcode !== null);
            const hashCode = cityWithHashCode ? cityWithHashCode.picture_hashcode : null;
            const imageURL = hashCode ? 
                `${BASE_URL}${hashCode.substring(0, 2)}/${hashCode.substring(2, 4)}/${hashCode}${SECOND_URL}50%3A50&crop=50%3A50${LAST_URL}`
                : '';
            return <ImageButton key={ `${city}ImageButton` } name={ city } imageURL={ imageURL } showName={ true } className=''/>
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
    dataByCity: PropTypes.object
}

export default CitiesView;