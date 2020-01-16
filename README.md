
# Final Project

> Class:  CS-554-A
> Group:  1

> Authors:
> * P Athiban
> * Chunli Liu
> * Sumit Oberoi
> * Davor Risteski
> * Rohnit Shetty

> REPO: https://github.com/wronrohn/NextTicket/

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

# Works Cited & Consulted

Hill, Patrick. "React Second Lecture/Firebase Auth" Computer Science 554. Stevens Institute of Technology, New Jersey. 21 Feb. 2019. Example Project.

