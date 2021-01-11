import React from 'react';
import Spinner from '../assets/spinner.gif';

const fullPageLoader = () => {
    return(
        <div className="fp-container">
            <img width={200} height={200} src={Spinner} className="fp-loader" alt="loading"/>
            <h2>Loading</h2>
        </div>
    )
}

export default fullPageLoader