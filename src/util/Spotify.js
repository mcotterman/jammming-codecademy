const spotify = {
    redirectUrl: process.env.REACT_APP_SPOTIFYREURL,
    clientId: process.env.REACT_APP_SPOTIFYID
};
const user = {
    spotify: {}
};

class Spotify {
    static getAccessToken() {
        if(user.spotify.access_token && user.spotify.token_expires > new Date()) return user.spotify.access_token;
        const hashString = Spotify.parseHashFragment(window.location.hash);
        if(hashString.access_token && hashString.expires_in) {
            user.spotify=hashString;
            user.spotify.token_expires = new Date();
            user.spotify.token_expires.setSeconds(user.spotify.token_expires.getSeconds() + hashString.expires_in);
            window.history.replaceState(null, null, window.location.origin);
            return user.spotify.access_token;
        }
        const redirectUrl = `https://accounts.spotify.com/authorize?client_id=${spotify.clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${spotify.redirectUrl}`
        window.location = redirectUrl;
    }

    static parseHashFragment(frag) {
        const params = {};
        // console.log(frag);
        // console.log('split #', frag.slice(frag.indexOf('#')+1));
        // console.log('split &', frag.slice(frag.indexOf('#')+1).split('&'));
        frag.slice(frag.indexOf('#')+1).split('&').forEach(f => {
            // console.log(f);
            const v = f.split('=',2);
            params[v[0]] = v[1];
        });

        return params;
    }

    static search(term) {
        const token = Spotify.getAccessToken();
        // console.log('Got token: ', token);
        console.log('Starting fetch');
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {headers: {'Authorization': `Bearer ${token}`}})
        .then(response => {
            if(response.ok) {
                console.log('Fetch response ok!', response);
                return response.json();
            }
            console.log(new Error(`Error fetching data: ${response.status}`));
            return [];
        }).then(jsonResponse => {
            console.log('jsonResponse', jsonResponse);
                if(Array.isArray(jsonResponse.tracks.items) && jsonResponse.tracks.items.length > 0) {
                    return jsonResponse.tracks.items.map(track => {
                        console.log(track);
                        const artists = track.artists.map(artist => {return {name: artist.name}});
                        return {
                            id: track.id,
                            name: track.name,
                            artists: artists,
                            album: track.album.name,
                            uri: track.uri,
                            href: track.href
                        }
                    });
                } else {
                    console.log('No tracks in response');
                    return [];
                }
        });
    }
}

export default Spotify;