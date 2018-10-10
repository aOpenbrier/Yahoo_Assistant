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
            const bandName = what.join(' ') || 'The Who'
            request(`https://rest.bandsintown.com/artists/${bandName}/events?app_id=${keys.bands}`, (error, response, body) => {
                //If there is an error, print it
                error && console.log('Error: ' + error)
                // If response isn't ok, print code
                response.statusCode !== 200 && console.log('Status Code: ' + response.statusCode)
                const jsonConcert = JSON.parse(body)
                if (jsonConcert.length > 0) {
                    const concertOutput = `
~ ~ ~ ~ ~ ~ ~ ~
Artist:  ${jsonConcert[0].lineup}
Venue:   ${jsonConcert[0].venue.name}
         ${jsonConcert[0].venue.city}, ${jsonConcert[0].venue.region && jsonConcert[0].venue.region + ', '}${jsonConcert[0].venue.country}
Date:    ${moment(jsonConcert[0].datetime).format(`ddd MM/DD/YYYY`)}
`
                    console.log(concertOutput)
                    // log response to log.txt
                    fs.appendFile('log.txt', concertOutput, error => { error && console.log(error) })
                }
                else {
                    console.log(`
No concerts found for ${bandName}
                    `)
                }
            })
            break
        case `movie-this`:
            //if there's no title input, default to 'Mr nobody'
            const title = what.join('+') || 'mr+nobody'
            request(`http://www.omdbapi.com/?apikey=${keys.omdb}&t=${title}`, function (error, response, body) {
                // If error occured, print the error
                error && console.log('Error: ' + error);
                // If response isn't ok, print response
                response.statusCode !== 200 && console.log('Status Code: ' + response.statusCode)
                const json = JSON.parse(body);
                // If found, print movie info
                if (json.Response === 'True') {
                    const movieOutput = `
~ ~ ~ ~ ~ ~ ~ ~
Title: ${json.Title} 
Year: ${elseUnavailable(json.Year)}
IMDB Rating: ${elseUnavailable(json.imdbRating)}
Rotten Tomatoes Rating: ${elseUnavailable(
                            /* uses '&&' to ensure array index 1 exists before trying to read it's property, else javascript error*/
                            json.Ratings[1] && json.Ratings[1].Value)}
Country: ${elseUnavailable(json.Country)}
Language: ${elseUnavailable(json.Language)}
Plot: ${elseUnavailable(json.Plot)}
Actors: ${elseUnavailable(json.Actors)}
`
                    console.log(movieOutput)
                    fs.appendFile('log.txt', movieOutput, error => { error && console.log(error) })
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
                else {
                    console.log(data)
                    const spotifyOutput = `
~ ~ ~ ~ ~ ~ ~ ~
${data.tracks.items[0].name}
Artist: ${data.tracks.items[0].artists[0].name}
Album: ${data.tracks.items[0].album.name}
Preview: ${elseUnavailable(data.tracks.items[0].preview_url)}
`
                    // Print and log results
                    console.log(spotifyOutput)
                    fs.appendFile('log.txt', spotifyOutput, error => { error && console.log(error) })
                }
            })
            break
        case 'do-what-it-says':
            fs.readFile('random.txt', 'utf8', function (error, data) {
                // If there is an error, console log it
                error && console.log(error)
                // If there is no data, inform user
                if (data) {
                    //if the file doesn't say to do what it says, which is to do what is says, which is to do what it says, which is...
                    if (data.split(' ')[0] !== 'do-what-it-says') {
                        // Interperet command from text file
                        selectAction(data.split(' ')[0], data.split(' ').slice(1))
                    }
                    else {
                        // print message rather than infinite loop
                        console.log("I would do anything for node, but I won't do that")
                    }

                } else {
                    console.log('Cannot. File "random.txt" is empty')
                }

            })
            break
        default:
            console.log(`
Invalid input. Pass one of the following commands after the filename:
concert-this <insert artist name>
movie-this <insert movie title>
spotify-this-song <insert song title>
`)
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