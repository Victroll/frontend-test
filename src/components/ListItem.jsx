import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showCountry, showStation } from '../actions/actions';

class ListItem extends React.Component {
    render() {
        return (
            <li>
                <button style={{width: '100vw'}} onClick={ () => this.props.mainView ? 
                    this.props.showCountry(this.props.title) : 
                    this.props.showStation(this.props.title) }>
                    <img key={ `${this.props.title}ImgKey` }
                    src={ this.props.imageURL }
                    alt={ this.props.title} />
                    <div className='title-subtitle'>
                        <h1>{ this.props.title }</h1>
                        <h2>{ this.props.subtitle }</h2>
                    </div>
                </button>
                { !this.props.mainView &&
                <button className='heart-button' onClick={ () => console.log('Click') }>
                    <i className="far fa-heart"></i>
                </button>
                }
            </li>
        );
    }
}

ListItem.propType = {
    title:      PropTypes.string,
    imageURL:   PropTypes.string,
    cities:     PropTypes.string
}

const mapStateToProps = store => {
    return {
        mainView: store.mainView
    };
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        showCountry: country => dispatch(showCountry(country)),
        showStation: station => dispatch(showStation(station))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListItem);