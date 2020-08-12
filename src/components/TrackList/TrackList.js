import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';

export class TrackList extends React.Component {
    render() {
        return (
            <div className="TrackList">
                {this.props.tracks.map(track => <Track key={track.id} track={track} isRemoval={this.props.isRemoval} />)}
            </div>
        );
    }
}

export default TrackList;