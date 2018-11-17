import React, { Component } from 'react';
import { confirm, cancel, decrypt } from './SpeakerConfirmActions';

class SpeakerConfirm extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(decrypt());
    }

    handleConfirm() {
        const { dispatch } = this.props;
        dispatch(confirm());
    }

    handleCancel() {
        const { dispatch } = this.props;
        dispatch(cancel());
    }

    render() {

        return (
            <div className='top-div'>
            <h1>Please Confirm or Cancel Your Talk</h1>
            <div>
                <button onClick={this.handleConfirm}>
                    Confrim
                </button>
                <button onClick={this.handleCancel}>
                    Cancel
                </button>
            </div>
                
            </div>
        )
    }
}

export default SpeakerConfirm