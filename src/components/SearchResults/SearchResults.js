import React from 'react';
import TrackList from '../TrackList/TrackList';
import './SearchResults.css'
import Track from '../Track/Track';

export class SearchResults extends React.Component {
    render() {
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                {this.props.results.length > 0 ? <TrackList tracks={this.props.results} isRemoval={false} onAdd={this.props.onAdd} /> : <h4 style={{paddingTop: '5px'}}>No Tracks</h4>}
            </div>
        );
    }
}

export default SearchResults;