import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.auth2.init({
                clientId: '319447961389-h8t1kf34r07ggmt8732a9fgukdprqlot.apps.googleusercontent.com',
                Scope: 'email'
            })
                .then(() => {
                    this.auth = window.gapi.auth2.getAuthInstance();
                    this.onAuthChange(this.auth.isSignedIn.get());
                    this.auth.isSignedIn.listen(this.onAuthChange);
                });
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        }
        else {
            this.props.signOut();
        }
    };



    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        }
        else if (this.props.isSignedIn) {
            return (
                <div>
                    <button onClick={this.onSignOutClick} className="ui red goggle button">
                        <i className="google icon" />
                        SignOut
                    </button>
                </div>
            );
        }

        else {
            return (
                <div>
                    <button onClick={this.onSignInClick} className=" ui green google button">
                        <i className="google icon" />
                        SigneIn With Google
                </button>
                </div>
            );
        }
    }



    render() {
        return <div>{this.renderAuthButton()}</div>
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);