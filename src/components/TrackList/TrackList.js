import React from 'react';
import Track from '../Track/Track';
import './TrackList.css';

// Temporary track list
const fakeTracks = [
    {
        id:'1',
        name: 'Fun Track',
        artist: 'Fun time jaboree',
        album: 'All that fun'
    },
    {
        id:'2',
        name: 'Not Fun Track',
        artist: 'Not Fun time jaboree',
        album: 'All that lame'
    },
    {
        id:'3',
        name: 'Fancy Track',
        artist: 'Fancy lads',
        album: 'We are the fancy ones'
    }
];

export class TrackList extends React.Component {
    render() {
        const tracks = this.props.tracks || fakeTracks;
        return (
            <div className="TrackList">
                {tracks.map(track => <Track key={track.id} track={track} isRemoval={this.props.isRemoval} />)}
            </div>
        );
    }
}

export default TrackList;