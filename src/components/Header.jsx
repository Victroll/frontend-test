import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
    render() {
        return (
            <button onClick={ this.props.openMenu }>
                <img src='./images/ico-filter.svg' />
            </button>
        );
    }
}

Header.propTypes = {
    openMenu:   PropTypes.func
}

export default Header;