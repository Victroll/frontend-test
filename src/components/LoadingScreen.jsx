import React from 'react';

class LoadingScreen extends React.Component {
    constructor() {
        super();

        this.preventEvents = this.preventEvents.bind(this);
    }

    preventEvents(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    render() {
        return (
            <div className='loading-screen' 
            onClick={ (e) => this.preventEvents(e) }
            onTouchMove={ (e) => this.preventEvents(e) } >
                <div className='minube-logo'></div>
                <div className='loading-screen-center'>
                    <div className='loading-logo-1'></div>
                    <div className='loading-logo-2'></div>
                    <div className='loading-logo-3'></div>
                    <div className='loading-logo-4'></div>
                    <div className='loading-logo-5'></div>
                </div>
            </div>
        );
    }
}

export default LoadingScreen;