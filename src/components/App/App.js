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
            playListName: 'My Playlist',
            playListTracks: [
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

    }

    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar />
                    <div className="App-playlist">
                        <SearchResults results={this.state.searchResults} />
                        <PlayList name={this.state.playListName} tracks={this.state.playListTracks} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
