import React from 'react';
import { connect } from 'react-redux';
import { toggleSubmenu, showCitiesView } from '../actions/actions';

class Header extends React.Component {
    render() {
        return (
            <section className='header'>
                <button id='goBack' onClick={ this.props.showCitiesView } 
                style={{ paddingLeft: '1rem'}} >
                    <i className="fas fa-caret-left"></i>
                </button>
                <button onClick={ this.props.toggle }>
                    <img src='./images/ico-filter.svg' alt='Submenu' />
                </button>
            </section>
        );
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        toggle: () => dispatch(toggleSubmenu()),
        showCitiesView: () => dispatch(showCitiesView())
    };
}

export default connect(
    null,
    mapDispatchToProps
)(Header);