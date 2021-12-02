import React from 'react';
import { connect } from 'react-redux';
import UserApi from '../API/UserApi';
import '../ComponentStyles/Authentification.css';
import { sha256 } from 'js-sha256';

class Authentification extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            authentify: false,
            password: "",
            login: "",
            registerLogin: "",
            registerPassword: "",
            registerPasswordConfirmed: ""
        }
    }

    componentDidUpdate() {
        if (this.props.user !== undefined && this.state.authentify === false) {
            this.setState({ authentify: true });
        }
    }

    componentDidMount() {
        if (this.props.user !== undefined) {
            this.setState({ authentify: true });
        }
    }

    async _tryToLogIn(event) {
        if (this.state.login !== ""
            && this.state.password !== "") {
            event.preventDefault();
            let hash = sha256.create();
            hash.update(this.state.password);
            const pwdHash = hash.hex();
            UserApi.loginUser(this.state.login, pwdHash).then((data) => {
                if (data.size === 1) {
                    this.props.dispatch({ type: 'user/LOGIN', user: data.data[0] });
                } else {
                    alert("Aucun utilisateur ne correspond à ces informations " + data.message);
                }
            })
        }
    }

    _tryToRegister(event) {
        //TODO : Gerer les mauvais input et virer les ALERT tout moches
        if (this.state.registerLogin !== ""
            && this.state.registerPassword !== ""
            && this.state.registerPassword === this.state.registerPasswordConfirmed) {

            event.preventDefault();
            
            let hash = sha256.create();
            hash.update(this.state.registerPassword);
            const pwdHash = hash.hex();

            UserApi.registerUser(this.state.registerLogin, pwdHash)
                .then(data => {
                    if (data.success) {
                        this.setState({ registerLogin: "", registerPassword: "", registerPasswordConfirmed: "" });
                        alert("Inscription réussie !");
                    } else {
                        alert("Une erreur s'est produite ... " + data.message);
                    }
                });
        }
        else {
            event.preventDefault();
            alert("Certains champs ne sont pas correctement remplis");
        }

    }

    render() {
        return (
            <div className="forms">
                <div className="register">
                    <div className="form">
                        <form className="login-form">
                            <span className="material-icons">Inscription</span>
                            <input className="login" type="text" placeholder="login" required
                                onInput={(event) => this.setState({ registerLogin: event.target.value })}
                                value={this.state.registerLogin}
                            />
                            <input type="password" placeholder="mot de passe" required
                                onInput={(event) => this.setState({ registerPassword: event.target.value })}
                                value={this.state.registerPassword}
                            />
                            <input type="password" placeholder="confirmation du mot de passe" required
                                onInput={(event) => this.setState({ registerPasswordConfirmed: event.target.value })}
                                value={this.state.registerPasswordConfirmed}
                            />
                            <button onClick={(event) => this._tryToRegister(event)}>S'inscrire</button>
                        </form>
                    </div>
                </div>

                <div className="login">
                    <div className="form">
                        <form className="login-form">
                            <span className="material-icons">Déjà inscrit ?</span>
                            <input className="login" type="text" placeholder="login" required
                                onInput={(event) => this.setState({ login: event.target.value })}
                                value={this.state.login}
                            />
                            <input type="password" placeholder="mot de passe" required
                                onInput={(event) => this.setState({ password: event.target.value })}
                                value={this.state.password}
                            />
                            <button onClick={(event) => this._tryToLogIn(event)}>Se connecter</button>
                        </form>
                    </div>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state
    return { user: user }
}

export default connect(mapStateToProps)(Authentification);