#!/bin/python3

import json
import redis
import settings as G

class Wrapper:
    """
    A pubsub wrapper that uses Redis to facilitate IPC. Assumes Redis is
    already running.

    :author:    Davor Risteski
    :version:   05.08.2019
    """

    def __init__(self, engine):
        self.client = redis.StrictRedis(
            host=G.REDIS_URL,
            port=G.REDIS_PORT,
            decode_responses=True
        )
        self.pubsub = self.client.pubsub()
        self.pubsub.subscribe(G.REDIS_RECEIVE)
        self.engine = engine

    def heartbeat(self):
        if(G.VERBOSE):
            print("Checking for new requests...")

        # Check for new requests. (Yields a list of new movies to parse.)
        message = self.pubsub.get_message()

        if(G.VERBOSE):
            print("Message received:", message)

        if(message != None):
            # Get contents of message
            request = message['data']

            if(request == None or type(request) != str):
                return

            if(request.startswith("REC:")):

                # Remove codeword and strip whitespaces.
                request = request[4:].strip()
                # To array about all commas.
                request = request.split(",")

                if(G.VERBOSE):
                    print("Generating a new set of recommendations.")
                    print("Working on:", end=" ")

                # For each request
                for mov in request:
                    # May have whitespaces.
                    movie = mov.strip()
                    if(G.VERBOSE):
                        print(movie, end=" ")
                    # Get recommendataions
                    result = self.engine.getRecommendation(movie, json=True)
                    # Push recommendations to redis
                    self.client.set(movie, result)
                    # Push message notifying that changes have taken place.
                    self.client.publish(G.REDIS_PUBLISH, movie)

                if(G.VERBOSE):
                    print()
                    print("Done...")

            else:
                print("Got a string request without codeword.")
                print("Did you mean to prefix with 'REC:'?")

