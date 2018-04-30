import React from 'react';
import List from './List';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleSubmenu } from '../actions/actions';

class Submenu extends React.Component {
    render() {
        return(
            <div className={`list ${this.props.subClass}`}>
                <button onClick={ this.props.hideMenu }>
                    <h1>{ this.props.title }</h1>
                    <span>&#9660;</span>
                </button>
                <List />
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        subClass: store.submenuSubclass
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