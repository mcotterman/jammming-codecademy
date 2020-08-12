import React from 'react';
import TrackList from '../TrackList/TrackList';
import './PlayList.css';

export class PlayList extends React.Component {
    constructor(props) {
        super(props);
        
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(event) {
        this.props.onNameChange(event.target.value);
    }

    render() {
        return (
            <div className="Playlist">
                <input defaultValue={this.props.name} onChange={this.handleNameChange} />
                <TrackList isRemoval={true} tracks={this.props.tracks} onRemove={this.props.onRemove} />
                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        );
    }
}

export default PlayList;