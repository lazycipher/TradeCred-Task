import React from 'react'
import './style.css';

const Spinner = () => {
    return (
        <div className="container">
            <div className="spinner-box">
                <div className="configure-border-1">  
                    <div className="configure-core"></div>
                </div>  
                <div className="configure-border-2">
                    <div className="configure-core"></div>
                </div> 
            </div>
        </div>
    )
}

export default Spinner;
