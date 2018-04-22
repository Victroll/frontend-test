import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '../components/ListItem';

const BASE_URL = 'https://imgs-akamai.mnstatic.com/';
const SECOND_URL = '.jpg?output-quality=75&output-format=progressive-jpeg&interpolation=lanczos-none&fit=around%7C';
const LAST_URL = '%3B*%2C*';

class List extends React.Component {
    constructor(props) {
        super(props);

        this.generateListItems = this.generateListItems.bind(this);
    }

    generateListItems() {
        if(!this.props.data) return;
        return Object.keys(this.props.data).map(country => 
            <ListItem 
            key={ country } title={ country } cities={ [...this.props.data].join(', ') }
            imageURL />);
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