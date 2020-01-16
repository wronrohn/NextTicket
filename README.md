
# Final Project

> Class:  CS-554-A
> Group:  1

> Authors:
> * P Athiban
> * Chunli Liu
> * Sumit Oberoi
> * Davor Risteski
> * Rohnit Shetty

> REPO: https://github.com/edgesdarkly/cs554finalproject

# Server

## Dependencies

* NodeJS v10.15.0
* Redis Server v5.0.4
* Python v3.7.3
* pandas
* numpy
* scipy
* scikit-learn
* argparse
* redis
* Additional NPM dependencies in `package.json`

For Linux and Mac systems `python`, `pip`, `python3`, and `pip3` are different commands. As this project depends on __Python 3__, all commands where `pip` or `python` are mentioned must use `python3` or `pip3` respectively.

In order to setup the server first navigate to the `server` directory using `cd ./server`, then issue the following commands:

```
npm install
npm run pip
npm run seed
```

__Note that `pip` and `npm` must be run separately as they depend on the end user's platform - as noted above `pip` must either be `pip3` or an alias for `pip3`.__

## Execution

In order to start the server first navigate to the `server` directory using `cd ./server`, then issue the following commands:

```
npm start
```

The server expects that a Redis process is already running and listening on the default port of `6379`. Additionally, in order to maintain cross platform compatibility the server will try to use the correct version of Python depending on the operating system. For Windows this is `py`, while for Linux and Mac this is `Python3`.

Note that the server will run on port 3001 by default.

# Client

## Dependencies

* NodeJS v10.15.0
* Additional NPM dependencies in `package.json`

## Execution

In order to setup and run the client first navigate to the `client` directory using `cd ./client`, then issue the following commands:

```
npm install
npm run build
npm start
```

The client expects that its complimentary server is already up and running before it is executed.

Note that the client will run on port 3000 by default.

# Contributions:

## Sumit Oberoi

Was tasked to worked on frontend. Ended up doing following:

* Built all the react components (except for Speech to text)
* Integrated APIs and Routing on Frontend
* Integrated Firebase Authentication for email and Google Login Scheme
* Worked with Athiban on CSS for the complete app
* Made base component for web to speech which was refined by Davor, Chunli and Rohnit
* Built search movies API
* Added Tota11y across the app
* Created App logo and other static assets except for movie and genre placeholder images for the app

### Athiban P:

Was tasked to work on creating API's. Did the following.

* Created APIs for all the functionalities.
* Setup Express server routes to serve all the APIs.
* Created a seed.js script to populate the Database (MongoDB).
* Worked on making the website responsive.
* Coordinated with Sumit to updated APIs as bugs came in.
* Created a python script to scrape images from https://www.allmovie.com/.
* Misc: Bug fixing, handling edge conditions and styling.

### Rohnit Shetty

Was tasked to integrate WebSpeech api. Did the following:

* Implemented webspeech api. Worked to refine it with Chunli and Davor.
* Added basic UI styling for forms.
* Helped add server sided api for watch lists.
* Performed misc. implementation tasks.
* Helped develop styling for client side app. 

## Davor Risteski

Tasked with working on server. Did the following:

* Rebuilt Python module into a persistent process with Redis pubsub.
* Setup recommendations route with separate Redis pubsub schema for Express.
* Setup synchronize/cache on login for Express.
* Setup image route that serves image placeholders for movies.
* Created and integrated User profile page.
* Refined webspeech with additional commands, fault tolerance, and tweaked behavior.
* Misc. Bug hunting, error checking, minor styling, and created placeholder images.

## Chunli Liu

Was tasked to integrate WebSpeech api. Did the following:

* Implemented webspeech api (shared responsibility with Rhonit). Worked to refine with Rhonit and Davor.
* Worked to streamline user interface.
* Performed extensive unit, route, and component testing for both server and client.
* Performed extensive integration testing.

# Works Cited & Consulted

Hill, Patrick. "React Second Lecture/Firebase Auth" Computer Science 554. Stevens Institute of Technology, New Jersey. 21 Feb. 2019. Example Project.
# NextTicket
