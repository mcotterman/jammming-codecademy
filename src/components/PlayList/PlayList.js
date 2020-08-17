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
                <input id='playlistName' defaultValue={this.props.name} onChange={this.handleNameChange} />
                {this.props.tracks.length > 0 ? <TrackList isRemoval={true} tracks={this.props.tracks} onRemove={this.props.onRemove} /> : <h4 style={{paddingTop: '5px'}}>No Tracks</h4>}
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        );
    }
}

export default PlayList;