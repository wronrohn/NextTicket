#!/bin/python3

import json
import redis
import settings as G
from util import decorated_print as print

class Wrapper:
    """
    A pubsub wrapper that uses Redis to facilitate IPC. Assumes Redis is
    already running.

    :author:    Davor Risteski
    :version:   05.13.2019
    """

    def __init__(self, engine):
        """
        Initializes the Wrapper by creating a Redis connection.

        :engine:    A ready recommendation engine to use.
        """
        self.client = redis.StrictRedis(
            host=G.REDIS_URL,
            port=G.REDIS_PORT,
            decode_responses=True
        )
        self.pubsub = self.client.pubsub()
        self.pubsub.subscribe(G.REDIS_RECEIVE)
        self.engine = engine

    def heartbeat(self):
        """
        Checks for new messages on the server.

        The application expects all requests to be given through the channel
        `movie_request` which is defined in the global settings. Requesting
        processes can ask for recommendations using a command like
        `client.publish(movie_request, 'REC: Sicario, Superman, Batman')`.

        Messages are expected to be in the form of
        `REC: <movie>, <movie>, ... <movie>` (without quotes).

        One or more movies can follow the codeword `REC:` the script is armored
        around white spaces and will (probably) not crash around unexpected
        input.

        Results are pushed back to redis using `client.set(<movie>, <recommendations>)`.

        After a result is generated the application will emit an event as
        `client.publish(movie_result, <movie>)` where the channel name `movie_result`
        is defined in the global settings.

        Responses may be retrieved from the Redis server using `client.get(<movie>)`.
        """
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

                print("Received request:", request)

                # To array about all commas.
                request = request.split(",")

                if(G.VERBOSE):
                    print("Generating a new set of recommendations.")
                    print("Working on:")

                # For each request
                for mov in request:
                    # May have whitespaces.
                    movie = mov.strip()
                    if(G.VERBOSE):
                        print("    ", movie)
                    try:
                        # Get recommendataions
                        result = self.engine.getRecommendation(movie, json=True)
                        # Push recommendations to redis
                        self.client.set(movie, result)
                        # Push message notifying that changes have taken place.
                        self.client.publish(G.REDIS_PUBLISH, movie)
                    except:
                        print("Could not generate a recommendation for:", movie)

                if(G.VERBOSE):
                    print()
                    print("Done...")

            else:
                print("Got a string request without codeword.")
                print("Did you mean to prefix with 'REC:'?")

