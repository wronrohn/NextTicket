
# Final Project

> Class:  CS-554-A
> Group:  1

> Authors:
> * P Athiban
> * Chunli Liu
> * Sumit Oberoi
> * Davor Risteski
> * Rohnit Shetty

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

The following commands can be used to install dependencies for the server:

```
npm install
pip install -r requirements.txt
```

__Note that `pip` and `npm` must be run separately as they depend on the end user's platform - as noted above `pip` must either be `pip3` or an alias for `pip3`.__

## Compilation

The following commands can be used to compile and run the server:

```
npm start
```

The server expects that a Redis process is already running and listening on the default port of `6379`. Additionally, in order to maintain cross platform compatibility the server will try to use the correct version of Python depending on the operating system. For Windows this is `py`, while for Linux and Mac this is `Python3`.

# Client

## Dependencies

* NodeJS v10.15.0
* Additional NPM dependencies in `package.json`

## Compilation

The following commands can be used to install dependencies and run the client:

```
npm install
npm run build
npm start
```

The client expects that its complimentary server is already up and running before it is executed.

## Contributions:

Sumit Oberoi

Was tasked to worked on frontend. Ended up doing following
1. Made all the react components (except for Speech to text)
2. Integrated Firebase Authentication for email and Google Login Scheme
3. Worked with Athiban on CSS for the complete app
4. Made base component for web to speech which was refined by Davor, Chunli and Rohnit
5. Made search movies API
6. Added Tota11y across the app
7. Create App logo and other static assets except for movie and genre placeholder images for the app

# Works Cited & Consulted

Hill, Patrick. "React Second Lecture/Firebase Auth" Computer Science 554. Stevens Institute of Technology, New Jersey. 21 Feb. 2019. Example Project.
