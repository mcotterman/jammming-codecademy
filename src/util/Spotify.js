import Cookies from 'js-cookie';

const user ={};

// I got sick of having to get a new token every time, so added cookies for the Spotify info
const spotifyInfo = Cookies.getJSON('spotifyInfo');
if(typeof(spotifyInfo) != 'undefined' && typeof(spotifyInfo.apiInfo) != 'undefined'  && typeof(spotifyInfo.apiInfo.access_token) != 'undefined') {
    user.spotify = spotifyInfo;
    user.spotify.apiInfo.token_expires = parseInt(user.spotify.apiInfo.token_expires);
} else {
    user.spotify = {
        userId: null,
        displayName: null,
        apiInfo: {
            access_token: null
        },
    }
}

console.log(user);

const spotify = {
    redirectUrl: process.env.REACT_APP_SPOTIFYREURL,
    clientId: process.env.REACT_APP_SPOTIFYID
};


class Spotify {
    static getAccessToken(action=null) {
        console.log('Access Token:', user.spotify.apiInfo.access_token, 'Expires:', user.spotify.apiInfo.token_expires, 'Is not expired: ', user.spotify.apiInfo.token_expires > new Date())
        if(user.spotify.apiInfo.access_token != null && user.spotify.apiInfo.token_expires > Date.now()) {
            // console.log('The existing token I found:', user.spotify.apiInfo.access_token);
            return user.spotify.apiInfo.access_token;
        }
        const hashString = Spotify.parseHashFragment(window.location.hash);
        if(hashString.access_token && hashString.expires_in) {
            user.spotify.apiInfo=hashString;
            user.spotify.apiInfo.token_expires = parseInt(Date.now()) + ((parseInt(hashString.expires_in) - 1) * 1000);
            Spotify.setCookie();
            window.history.replaceState(null, null, window.location.origin);
            // console.log('The new token I got:', user.spotify.apiInfo.access_token);
            return user.spotify.apiInfo.access_token;
        }
        console.log('No token found! Grabbing a new one.');
        let actionParam = '';
        const redirectUrl = `https://accounts.spotify.com/authorize?client_id=${spotify.clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${spotify.redirectUrl}`;
        window.location = redirectUrl;
    }



    static getApi(url) {
        const token = Spotify.getAccessToken();
        // console.log('Got token', token);
        return fetch(url, {headers: {'Authorization': `Bearer ${token}`}})
        .then(response => {
            if(response.ok) {
                console.log('Fetch response ok!', response);
                return response.json();
            }
            console.log(new Error(`Error fetching data: ${response.status}`));
        });
    }

    static postApi(url, body) {
        const token = Spotify.getAccessToken();
        // console.log('Got token', token);
        return fetch(url, {
            headers: {'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify(body)
        })
        .then(response => {
            if(response.ok && response.status === '201') {
                console.log('Fetch response ok!', response);
                return response.json();
            }
            console.log(new Error(`Error fetching data: ${response.status}`));
        });
    }

    static setCookie() {
        console.log('Setting cookie', user.spotify);
        Cookies.set('spotifyInfo', user.spotify);
    }

    static getUserId() {
        if(user.spotify.userId != null) return new Promise(resolve => resolve(user.spotify.userId));
        // if(user.spotify.userId != null) return user.spotify.userId;
        return Spotify.getApi('https://api.spotify.com/v1/me')
        .then(userInfo => {
            console.log(userInfo);
            if(userInfo.id) {
                user.spotify.userId = userInfo.id;
                user.spotify.displayName = userInfo.display_name;
                Spotify.setCookie();
            }
        });
        // return user.spotify.userId;
    }

    static parseHashFragment(frag) {
        const params = {};
        frag.slice(frag.indexOf('#')+1).split('&').forEach(f => {
            // console.log(f);
            const v = f.split('=',2);
            params[v[0]] = v[1];
        });

        return params;
    }

    static savePlaylist(name, tracks) {
        return Spotify.createPlaylist(name).then(playlist => {
            console.log('Playlist may have been created', playlist);
            if(playlist.id) {
                const trackUris = tracks.map(track => track.uri);
                console.log('Starting API call to send tracks to playlist');
                return Spotify.postApi(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {uris: trackUris})
                .then(response => response.snapshot_id ? true : false );
            }
        });
        
    }

    static createPlaylist(name) {
        console.log('Starting call to create playlist');
        console.log(Spotify.getUserId())
        return Spotify.getUserId()
        .then(userId => {
            if(userId) {
                console.log('Sending create playlist API call');
                return Spotify.postApi(`https://api.spotify.com/v1/users/${userId}/playlists`, {name: name});
            } else {
                console.log(new Error('Failed to get Spotify User ID'));
            }
        })
        .then(playlist => {
            if(typeof(playlist.id) != 'undefined') {
                console.log(`Playlist ${name} created!`);
                return playlist;
            } else {
                console.log(new Error('Failed to create play list'));
            }
        });
    }

    static search(term) {
        return Spotify.getApi(`https://api.spotify.com/v1/search?type=track&q=${term}`).then(jsonResponse => {
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

Spotify.getUserId(); //Get connected to Spotify to avoid a weird issue with search without authorization first

export default Spotify;