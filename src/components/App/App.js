import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';
import Spotify from '../../util/Spotify';

console.log(process.env);
class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchResults: [
                {
                    id:'S1',
                    name: 'Search Fun Track',
                    artists: [{name: 'Fartytown jambory'}],
                    album: 'All that fun',
                    uri: 'https://blah/s1'
                },
                {
                    id:'S2',
                    name: 'Search Not Fun Track',
                    artists: [{name: 'No fun fellas'}],
                    album: 'All that lame',
                    uri: 'https://blah/s2'
                },
                {
                    id:'S3',
                    name: 'Search Fancy Track',
                    artists: [{name: 'Fancy lads'}],
                    album: 'We are the fancy ones',
                    uri: 'https://blah/s3'
                }
            ],
            playlistName: 'New Playlist',
            playlistTracks: [
                {
                    id:'P1',
                    name: 'Playlist Fun Track',
                    artists: [{name: 'Fartytown jambory'}],
                    album: 'All that fun',
                    uri: 'https://blah/p1'
                },
                {
                    id:'P2',
                    name: 'Playlist Not Fun Track',
                    artists: [{name: 'No fun fellas'}],
                    album: 'All that lame',
                    uri: 'https://blah/p2'
                },
                {
                    id:'P3',
                    name: 'Playlist Fancy Track',
                    artists: [{name: 'Fancy lads'}],
                    album: 'We are the fancy ones',
                    uri: 'https://blah/p3'
                }
            ],
        }
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);

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
        if(name !== this.state.playlistName) this.setState({playlistName: name});
    }

    savePlaylist() {
        const playlist = {
            playlistName: this.state.playlistName,
            trackURIs: this.state.playlistTracks.map(t => t.uri)
        }

        console.log('Saving playlist', playlist);
    }

    search(term) {
        console.log(`Searching for ${term}`);
        Spotify.search(term).then(tracks => {
            console.log('In App.js then', typeof(tracks), Array.isArray(tracks), tracks);
            this.setState({searchResults: tracks});
        });
    }

    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar onSearch={this.search} />
                    <div className="App-playlist">
                        <SearchResults results={this.state.searchResults} onAdd={this.addTrack} />
                        <PlayList name={this.state.playlistName} tracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
