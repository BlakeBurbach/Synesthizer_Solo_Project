import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import ColorStream from './ColorStream';

const mapStateToProps = state => ({
    state
});

class ColorDisplay extends Component {

    render() {
        return (
            <div>
            <Card>
                <Paper>
                    <ColorStream />
                </Paper> 
            </Card>
            </div>
        )
    }
}

export default connect(mapStateToProps)(ColorDisplay);