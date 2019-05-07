#!/bin/python3

"""
Package global variables.

:author:    Davor Risteski
:version:   05.07.2019
"""

"""Print a lot more logging to console."""
VERBOSE=False

"""The http url to use when connecting to Redis."""
REDIS_URL="127.0.0.1"

"""The port to use when connecting to Redis."""
REDIS_PORT=6379

"""Scope to use when receiving requests from Redis."""
REDIS_RECEIVE="movie_request"

"""Scope to use when transmiting results back to Redis. """
REDIS_PUBLISH="movie_result"

def __dump_settings():
    print("verbose: {}, r_http: {}, r_port {}, r_receive {}, r_publish {}"
          .format(VERBOSE, REDIS_URL, REDIS_PORT, REDIS_RECEIVE, REDIS_PUBLISH))
