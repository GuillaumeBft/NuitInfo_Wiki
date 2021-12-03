import React from 'react';
import { connect } from 'react-redux';
import '../../ComponentStyles/TrashGame.css';
import 'Canvas.js';

class TrashGame extends React.Component {
    render() {
        return (
            <div>
                <h1>Trash Game</h1>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state
    return { user: user }
}

export default connect(mapStateToProps)(TrashGame);