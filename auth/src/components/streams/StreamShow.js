import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends React.Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }


    render() {
        if (!this.props.streams) {
            return <div>Loading...</div>;
        }

        const { title, description } = this.props.streams;
        return (
            <div>
                <h1>{title}</h1>
                <h5>{description}</h5>

                <Link to='/' className="ui button info">Back</Link>
            </div>
        );
    }

}

const mapStateToProps = (state, ownProps) => {
    return { streams: state.streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow);