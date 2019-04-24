#!/bin/python3

# TODO: Restructure this file (actually this whole folder) into a respecable Python 3 module.

"""
Depends on:
    Python 3
    pip install argparse
"""

import argparse

def main():
    """
    Initialize the application...
    """
    parser = argparse.ArgumentParser(allow_abbrev=False)
    parser.add_argument("-s", "--sentiment",   help="A sentiment vector to use for classification", type=str, nargs=1, default="")
    argsv = parser.parse_args()

    if(argsv.sentiment != ""):
        # Parser gives back an array for typed args even if we only get 1 arg.
        array = argsv.sentiment
        # Extract the string value in the usual way.
        sentiment = array[0]
        print(sentiment)
    else:
        print("The Avengers")

main()
