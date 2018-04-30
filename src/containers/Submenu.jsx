import React from 'react';
import List from './List';
import { connect } from 'react-redux';
import { toggleSubmenu } from '../actions/actions';

class Submenu extends React.Component {
    render() {
        return(
            <section className={`list ${this.props.subClass}`}>
                <button className='submenu-header' onClick={ this.props.hideMenu }>
                    <h1>{ this.props.title }</h1>
                    <i className="fas fa-caret-down"></i>
                </button>
                <List />
            </section>
        );
    }
}

const mapStateToProps = store => {
    return {
        subClass: store.submenuSubclass,
        title: store.mainView ? 'Paises' : 'Estaciones'
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        hideMenu: () => dispatch(toggleSubmenu())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Submenu);