import React from 'react';
import { connect } from 'react-redux';
import { search } from '../../../nodejs-express-api/src/routes/UserRoutes';
import '../ComponentStyles/Authentification.css';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: undefined
        }
    }

    componentDidMount() {
        
    }

    _searchRescue(event, search) {

    }

    render() {
        return (
            <form id="search-form">
                <input type="text" placeholder="Recherche.." required
                    onInput={(event) => this.setState({search: event.target.value})} 
                    value={this.state.search} />
                <button type="submit" onClick={(event) => this._searchRescue(event, this.state.search)}>
                    Trouver
                </button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state
    return { user: user }
}

export default connect(mapStateToProps)(Home);