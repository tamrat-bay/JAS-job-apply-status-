import React, { Component } from 'react';
import './MoreDetails.css';

export default class MoreDetails extends Component {
    render() {
        //? All the apply data is here 
        console.log(this.props.data);
        
        return (
            <div className="MoreDetails" >
                 <h4 onClick = {this.props.close}>Close Window</h4>
                <h2>More MoreDetails</h2>

            </div>
        )
    }
}
