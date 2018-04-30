import React from 'react';
import { connect } from 'react-redux';
import { toggleSubmenu } from '../actions/actions';

class Header extends React.Component {
    render() {
        return (
            <section className='header'>
                <button onClick={ this.props.toggle }>
                    <img src='./images/ico-filter.svg' alt='Submenu' />
                </button>
            </section>
        );
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        toggle: () => dispatch(toggleSubmenu())
    };
}

export default connect(
    null,
    mapDispatchToProps
)(Header);