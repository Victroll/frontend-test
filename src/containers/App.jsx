import React from 'react';
import { get } from 'axios';

const DATA_FETCH_URL =
'https://gist.githubusercontent.com/inakivb/943ed6b3a8bcc667c1e1147b7591e32f/raw/355b2d67aaea30fd322c7d1e1a8660480609d67a/stations.json';

class App extends React.Component {
    constructor() {
        super();

        this.fetchData = this.fetchData.bind(this);

        this.state = {
            stationsData: []
        };

        // Fetch the stations data
        this.fetchData();
        
    }

    fetchData() {
        get(DATA_FETCH_URL)
            .then((response) => {
                this.setState({...this.state,
                    stationsData: response.data
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                Hello Front Test!
            </div>
        );
    }
}

export default App;