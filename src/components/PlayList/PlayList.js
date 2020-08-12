import React from 'react';
import TrackList from '../TrackList/TrackList';
import './PlayList.css';

export class PlayList extends React.Component {
    render() {
        return (
            <div className="Playlist">
                <input defaultValue="New Playlist" />
                <TrackList isRemoval={true} tracks={this.props.tracks} />
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        );
    }
}

export default PlayList;