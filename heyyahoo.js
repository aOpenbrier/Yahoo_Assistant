// Node Packages 
require("dotenv").config();
const keys = require('./keys.js');
const Spotify = require('node-spotify-api')
const spotify = new Spotify(keys.spotify)
const moment = require('moment')
const fs = require('fs')
const request = require('request')

// Search Actions
function selectAction(which, what) {
    switch (which) {
        case `concert-this`:
            //TODO//
            // This will search the Bands in Town Artist Events API(`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:
            // Name of the venue
            // Venue location
            // Date of the Event(use moment to format this as "MM/DD/YYYY")
            break
        case `movie-this`:
            const title = what || process.argv.slice(3).join('+') || 'mr.nobody'
            request(`http://www.omdbapi.com/?apikey=${keys.omdb}&t=${title}`, function (error, response, body) {
                error && console.log('error:', error); // Print the error if one occurred
                response.statusCode !== 200 && console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                const json = JSON.parse(body);
                console.log(`Title: ${json.Title} 
Year: ${json.Year}
IMDB Rating: ${json.imdbRating}
Rotten Tomatoes Rating: ${json.Ratings[1].Value}
Country: ${json.Country}
Language: ${json.Language}
Plot: ${json.Plot}
Actors: ${json.Actors}`)
            });
            break
        case `spotify-this-song`:
            //TODO//
                //This will show the following information about the song in your terminal / bash window
                    //Artist(s)
                    //The song's name
                    //A preview link of the song from Spotify
                    //The album that the song is from
                //If no song is provided then your program will default to "The Sign" by Ace of Base.
            break
        case 'do-what-it-says':
            //TODO
                // Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
                // It should run`spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
            break
        default:
            //TODO//
                //log correct inputs options
            break
    }
}

selectAction(process.argv[2])