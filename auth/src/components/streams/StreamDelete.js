import Modal from '../Modal';
import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';
import history from '../../history';

class StreamDelete extends React.Component {


    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }


    renderActions() {
        const id = this.props.match.params.id;
        return (
            <React.Fragment>
                <button onClick={()=> this.props.deleteStream(id)} className="ui negative button">Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent() {
        if (!this.props.streams) {
            return 'Are U Sure U Want To Delete This Stream...?'
        }
            return `Are U Sure U Want To Delete This Stream With TITLE:${this.props.streams.title}`
    }


    render() {
        return (
              <Modal
                    title="Delete Stream"
                    content={this.renderContent()}
                    action={this.renderActions()}
                    onDismiss={() => history.push('/')}
                />
        );
    }

}
const mapStateToProps = (state, ownProps) => {
    return { streams: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);