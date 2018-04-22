import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '../components/ListItem';

class List extends React.Component {
    constructor(props) {
        super(props);

        this.generateListItems = this.generateListItems.bind(this);
    }

    generateListItems() {
        if(!this.props.data) return;
        return Object.keys(this.props.data).map(country => 
            <ListItem key={ country } title={ country } cities={ [...this.props.data].join(', ') }/>);
    }

    render() {
        const list = this.generateListItems();
        return (
            <div >
                <ul>
                    { list }
                </ul>
            </div>
        );
    }
}

List.propTypes = {
    data:   PropTypes.object
}


export default List;