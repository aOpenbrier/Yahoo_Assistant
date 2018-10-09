// Node Packages 
require("dotenv").config();
const keys = require('./keys.js');
const Spotify = require('node-spotify-api')
const spotify = new Spotify(keys.spotify)
const moment = require('moment')
const fs = require('fs')
const request = require('request')

// Interpret commands from CLI input
selectAction(process.argv[2], process.argv.slice(3))

// Search Actions
function selectAction(which, what) {
    // Remove quotation marks for standard input from CLI or txt file
    what = what.join(' ')  
    what = what.replace('"', '').replace("'", "")
    what = what.split(' ')
    
    switch (which) {
        case `concert-this`:
            // TODO
            //      This will search the Bands in Town Artist Events API(`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:
            //          Name of the venue
            //          Venue location
            //      Date of the Event(use moment to format this as "MM/DD/YYYY")
            break
        case `movie-this`:
            //if there's no title input, default to 'Mr nobody'
            const title = what.join('+') || 'mr+nobody'
            request(`http://www.omdbapi.com/?apikey=${keys.omdb}&t=${title}`, function (error, response, body) {
                // If error occured, print the error
                error && console.log('error:', error);
                // If response isn't ok, print response
                response.statusCode !== 200 && console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                const json = JSON.parse(body);
                // If found, print movie info
                if (json.Response === 'True'){

                    console.log(`Title: ${json.Title} 
Year: ${elseUnknown(json.Year)}
IMDB Rating: ${elseUnknown(json.imdbRating)}
Rotten Tomatoes Rating: ${elseUnknown(
/* uses '&&' to ensure array index 1 exists before trying to read it's property, else javascript error*/
json.Ratings[1] && json.Ratings[1].Value)}
Country: ${elseUnknown(json.Country)}
Language: ${elseUnknown(json.Language)}
Plot: ${elseUnknown(json.Plot)}
Actors: ${elseUnknown(json.Actors)}`)
                }
                else{
                    console.log('Title not found')
                }
            });
                break
        case `spotify-this-song`:
            // TODO
            //   This will show the following information about the song in your terminal / bash window
            //      Artist(s)
            //      The song's name
            //      A preview link of the song from Spotify
            //      The album that the song is from
            //   If no song is provided then your program will default to "The Sign" by Ace of Base.
            break
        case 'do-what-it-says':
            fs.readFile('random.txt', 'utf8', function (error, data) {
                // If there is an error, console log it
                error && console.log(error)
                // If there is no data, inform user
                if (data) {
                    //if the file doesn't say to do what is says, which is to do what is says, which is to do what it says, which is...
                    if (data.split(' ')[0] !== 'do-what-it-says'){
                        // Interperet command from text file
                        selectAction(data.split(' ')[0], data.split(' ').slice(1))
                    }
                    else {
                        // Don't reach the call stack limit
                        console.log("I would do anything for node, but I won't do that")
                    }
                    
                }else{
                    console.log('Cannot. File "random.txt" is empty')
                }

            })
            // TODO
            //      Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
            //      It should run`spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
            break
        default:
            //TODO
            //      print correct inputs options
            break
    }
}

function elseUnknown(info) {
    if (info) {
        return info
    }
    else{
        return 'unknown'
    }
}