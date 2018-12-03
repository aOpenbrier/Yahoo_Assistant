# Yahoo Assistant  

##### New aritificial intelligence engine created for Yahoo. Everything you need in a personal assistant as long as it's one of these 3 things:

- #### Song information 
  Get Artist, Album, and a link to listen to a preview on Spotify for a song entered.

- #### Concert information:
  Get venue, location, and date for a concert of the musician/band entered.

- #### Movie information
  Get release year, IMDB Rating, Rotten Tomatoes rating, country of production, language, plot, and actors of the movie entered.

----------

## Installation

If you haven't already, install [Node.js](https://nodejs.org/en/download/)

Clone the repository to your computer. At Command Line Interface, navigate to the project folder and run the following to install the node packages:

 `````````shell
 npm i
 `````````

#### API Keys

You will need to provide your own API keys. In the root of you project folder Create a `.env` file and add the following code, inserting your own API Keys (without brackets [ ] )

 `````````
SPOTIFY_ID=[your-spotify-ID]
SPOTIFY_SECRET=[your-Spotify-secret]
OMDB_KEY=[your-OMDB-API-key]
BANDS_ID=[your-Bands-In-Town-ID]
 `````````

----------

## Functionality

#### Commands:
 - `concert-this`
 - `spotify-this-song`
 - `movie-this`

##### Use the commands with node at the Command Line Interface

 ```shell
 node heyyahoo.js concert-this britney spears
 node heyyahoo.js spotify-this-song slave 4 u
 node heyyahoo.js movie-this crossroads
 ```
##### Search results will be printed to screen
![screenshot](./images/screen1.jpg)
##### Results will also be logged to `log.txt`
![screenshot](./images/screen2.jpg)
##### There are default values if a search term is left blank
![screenshot](./images/screen3.jpg)
##### Message is printed when search term is not found:
![screenshot](./images/screen4.jpg)
##### Except for Spotify, because there is a song, album, or artist for anything you could possibly enter.
![screenshot](./images/screen5.jpg)
##### If no command is entered, list will be displayed
![screenshot](./images/screen6.jpg)

### Developer Option

#### Command:
`do-what-it-says`
##### Run a command from a text file `random.txt`
![screenshot](./images/screen7.jpg)
##### Avoids infinite loop if do-what-it-says is in text file
![screenshot](./images/screen8.jpg)


----------

## Project
A class assignment at UCI Coding Bootcamp focused on Node.js and Node Package Manager

#### Requirements:

##### Node Packages:
- [Request](https://www.npmjs.com/package/request)
- [DotEnv](https://www.npmjs.com/package/dotenv)
- [Moment](https://www.npmjs.com/package/moment)
- [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api) 

##### APIs:
- [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)
- [OMDB API](http://www.omdbapi.com)
- [Spotify](https://developer.spotify.com/)
