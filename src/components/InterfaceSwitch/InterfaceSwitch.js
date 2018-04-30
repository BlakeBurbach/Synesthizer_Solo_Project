import React, { Component } from 'react';
import Switch from 'material-ui/Switch';

class InterfaceSwitch extends Component {
    state = {
        checked: false
    }
    handleChange  = event => {
        this.setState({checked: event.target.checked})
    }   
    render() {
        return (
            <div>
                <Switch 
                checked={this.state.checked}
                onChange={this.handleChange}
                value="checked"
                color="primary"/>
            </div>
        )
    }
}

export default InterfaceSwitch;