#!/bin/python3

"""
Package global variables.

:author:    Davor Risteski
:version:   05.07.2019
"""

"""Print a lot more logging to console."""
VERBOSE=False

"""The http url to use when connecting to Redis."""
REDIS_URL="http://localhost"

"""The port to use when connecting to Redis."""
REDIS_PORT=6379

"""Scope to use for Redis pub/sub."""
REDIS_SCOPE="movierec"

def __dump_settings():
    print("verbose: {}, r_http: {}, r_port {}, r_scope {}"
          .format(VERBOSE, REDIS_URL, REDIS_PORT, REDIS_SCOPE))
