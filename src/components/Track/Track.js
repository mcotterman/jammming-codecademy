import React from 'react';
import './Track.css';

export class Track extends React.Component {
    renderAction() {
        return this.props.isRemoval ? '-' : '+';
    }

    render() {
        const track = this.props.track;
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{track.name}</h3>
                    <p>{track.artist} | {track.album}</p>
                </div>
            <button className="Track-action">{this.renderAction()}</button>
            </div>
        );
    }
}

export default Track;