import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '../components/ListItem';
import { connect } from 'react-redux';

class List extends React.Component {
    constructor(props) {
        super(props);

        this.generateListItems = this.generateListItems.bind(this);
    }

    generateListItems() {
        if(!this.props.data) return;
        const urls = this.props.urls;
        return this.props.data.map(element => 
            <ListItem 
            key={ element } title={ element }
            imageURL={ urls[element] } />);
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
    data:       PropTypes.array,
    urls:       PropTypes.object
}

const mapStateToProps = store => {
    return {
        data: store.mainView ? store.countries : store.currentStations,
        urls: store.mainView ? store.imageURLByCountry : store.imageURLByStation
    };
}

export default connect(
    mapStateToProps
)(List);