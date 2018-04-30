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
        return this.props.data.map(element => {
            const subData = this.props.subtitleData[element] ? [...this.props.subtitleData[element]] : null;
            return <ListItem 
            key={ element } title={ element }
            imageURL={ urls[element] }
            subtitle={ subData ? `${subData.slice(0, -1).join(', ')}${subData.length > 1 ? ` y ${subData[subData.length - 1]}` : ''}` : ''} />;
        });
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
        data: store.mainView ? store.countries : store.stationsByCity[store.currentCity],
        urls: store.mainView ? store.imageURLByCountry : store.imageURLByStation,
        subtitleData: store.mainView ? store.citiesByCountry : []
    };
}

export default connect(
    mapStateToProps
)(List);