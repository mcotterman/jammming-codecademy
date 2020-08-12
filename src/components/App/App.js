import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchResults: [
                {
                    id:'S1',
                    name: 'Search Fun Track',
                    artist: 'Fun time jaboree',
                    album: 'All that fun'
                },
                {
                    id:'S2',
                    name: 'Search Not Fun Track',
                    artist: 'Not Fun time jaboree',
                    album: 'All that lame'
                },
                {
                    id:'S3',
                    name: 'Search Fancy Track',
                    artist: 'Fancy lads',
                    album: 'We are the fancy ones'
                }
            ],
            playlistName: 'New Playlist',
            playlistTracks: [
                {
                    id:'P1',
                    name: 'Playlist Fun Track',
                    artist: 'Fun time jaboree',
                    album: 'All that fun'
                },
                {
                    id:'P2',
                    name: 'Playlist Not Fun Track',
                    artist: 'Not Fun time jaboree',
                    album: 'All that lame'
                },
                {
                    id:'P3',
                    name: 'Playlist Fancy Track',
                    artist: 'Fancy lads',
                    album: 'We are the fancy ones'
                }
            ],
        }
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);

    }

    addTrack(track) {
        if(!this.state.playlistTracks.some(t => track.id === t.id)) {
            console.log('Adding track to playlist state via app', track);
            this.setState({playlistTracks: this.state.playlistTracks.concat(track)});
        } else {
            console.log('The track is already in the playlist');
        }
    }

    removeTrack(track) {
        console.log('Removing track from playlist state via app', track);
        this.setState({
            playlistTracks: this.state.playlistTracks.filter(t => !(track.id === t.id))
        });
    }

    updatePlaylistName(name) {
        if(name != this.state.playlistName) this.setState({playlistName: name});
    }

    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar />
                    <div className="App-playlist">
                        <SearchResults results={this.state.searchResults} onAdd={this.addTrack} />
                        <PlayList name={this.state.playlistName} tracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
