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
            request(`https://rest.bandsintown.com/artists/${what.join(' ')}/events?app_id=${keys.bands}`, (error, response, body) => {
                if (error) { console.log(error) }
                const jsonConcert = JSON.parse(body)
                console.log(typeof jsonConcert)
                if (jsonConcert.length > 0) {
                    console.log(`
Artist:  ${jsonConcert[0].lineup}
Venue:   ${jsonConcert[0].venue.name}
${jsonConcert[0].venue.city}, ${jsonConcert[0].venue.region && jsonConcert[0].venue.region + ', '}${jsonConcert[0].venue.country}
Date:    ${moment(jsonConcert[0].datetime).format(`ddd MM/DD/YYYY`)}`)
                }
            })
            break
        case `movie-this`:
            //if there's no title input, default to 'Mr nobody'
            const title = what.join('+') || 'mr+nobody'
            request(`http://www.omdbapi.com/?apikey=${keys.omdb}&t=${title}`, function (error, response, body) {
                // If error occured, print the error
                error && console.log('Error:', error);
                // If response isn't ok, print response
                response.statusCode !== 200 && console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                const json = JSON.parse(body);
                // If found, print movie info
                if (json.Response === 'True') {

                    console.log(`
Title: ${json.Title} 
Year: ${elseUnavailable(json.Year)}
IMDB Rating: ${elseUnavailable(json.imdbRating)}
Rotten Tomatoes Rating: ${elseUnavailable(
                            /* uses '&&' to ensure array index 1 exists before trying to read it's property, else javascript error*/
                            json.Ratings[1] && json.Ratings[1].Value)}
Country: ${elseUnavailable(json.Country)}
Language: ${elseUnavailable(json.Language)}
Plot: ${elseUnavailable(json.Plot)}
Actors: ${elseUnavailable(json.Actors)}`)
                }
                else {
                    console.log('Title not found')
                }
            });
            break
        case `spotify-this-song`:
            // If no song input, default to "The Sign" by Ace of Base.
            const trackSearch = what.join(' ') || 'The Sign Ace of Base'
            spotify.search({ type: 'track', query: trackSearch, limit: 1 }, function (error, data) {
                // If error, prints error  
                if (error) {
                    console.log('Error: ' + error);
                }
                // print track data
                else {
                    console.log(`
${data.tracks.items[0].name}
Artist: ${data.tracks.items[0].artists[0].name}
Album: ${data.tracks.items[0].album.name}
Preview: ${elseUnavailable(data.tracks.items[0].preview_url)}`)
                }
            })
            break
        case 'do-what-it-says':
            fs.readFile('random.txt', 'utf8', function (error, data) {
                // If there is an error, console log it
                error && console.log(error)
                // If there is no data, inform user
                if (data) {
                    //if the file doesn't say to do what is says, which is to do what is says, which is to do what it says, which is...
                    if (data.split(' ')[0] !== 'do-what-it-says') {
                        // Interperet command from text file
                        selectAction(data.split(' ')[0], data.split(' ').slice(1))
                    }
                    else {
                        // Don't reach the call stack limit
                        console.log("I would do anything for node, but I won't do that")
                    }

                } else {
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

//return string for any values not found
function elseUnavailable(value) {
    if (value) {
        return value
    }
    else {
        return 'unavailable'
    }
}