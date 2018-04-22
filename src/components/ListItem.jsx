import React from 'react';
import PropTypes from 'prop-types';

class ListItem extends React.Component {
    render() {
        return (
            <li>
                <button onClick={ () => this.props.onClick(this.props.title) }>
                    <img key={ `${this.props.title}ImgKey` }
                    src={ this.props.imageURL }
                    alt={ this.props.title} />
                    <h1>{ this.props.title }</h1>
                    <h2>{ this.props.cities }</h2>
                </button>
            </li>
        );
    }
}

ListItem.propType = {
    title:      PropTypes.string,
    imageURL:   PropTypes.string,
    cities:     PropTypes.string,
    onClick:    PropTypes.string
}

export default ListItem;