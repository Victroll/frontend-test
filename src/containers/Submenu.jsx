import React from 'react';
import List from './List';
import PropTypes from 'prop-types';

class Submenu extends React.Component {
    render() {
        return(
            <div className='list'>
                <button onClick={ () => {} }>
                    <h1>{ this.props.title }</h1>
                </button>
                <List urls={ this.props.urls } />
            </div>
        );
    }
}

Submenu.propTypes = {
    urls:       PropTypes.object
}

export default Submenu;