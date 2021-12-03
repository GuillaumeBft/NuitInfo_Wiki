import React from 'react';
import { connect } from 'react-redux';
import '../ComponentStyles/Home.css';
import RescueApi from '../API/RescueAPI';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: "",
            searchResult: undefined
        }
    }

    componentDidMount() {
        
    }

    _searchRescue(event, search) {
        event.preventDefault();
        RescueApi.findRescue(search)
        .then((data) => {
            if(data.success) {
                this.setState({searchResult: data});
            } else {
                alert("Error : " + data.message);
            }
        });
    }

    _displaySearchResult() {
        let results = [];
        
        if(this.state.searchResult !== undefined) {
            const data = this.state.searchResult.data;
            data.forEach(element => {
                results.push(
                    <div key={element.id}>
                        <h3>Titre : {element.title}</h3>
                    </div>
                );
            });
        }

        return results;
    }

    render() {
        return (
            <div className="home">
                <h3 className="searchTitle">Retrouver les sauvetages d'une personne : </h3>
                <form id="search-form">
                    <input type="text" placeholder="Nom ou prénom.." required
                        onInput={(event) => this.setState({search: event.target.value})} 
                        value={this.state.search} />
                    <button type="submit" onClick={(event) => this._searchRescue(event, this.state.search)}>
                        Trouver
                    </button>
                </form>
                {this._displaySearchResult()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state
    return { user: user }
}

export default connect(mapStateToProps)(Home);