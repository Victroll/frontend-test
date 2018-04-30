import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
    render() {
        return (
            <section className='header'>
                <button onClick={ this.props.openMenu }>
                    <img src='./images/ico-filter.svg' alt='Submenu' />
                </button>
            </section>
        );
    }
}

Header.propTypes = {
    openMenu:   PropTypes.func
}

export default Header;