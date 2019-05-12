#!/bin/python3

import os
import json
import pandas
import settings as G
from util import decorated_print as print
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.metrics.pairwise import linear_kernel, cosine_similarity

class Engine:
    """
    Represents a trained engine to use when classifying.

    :author:    Davor Risteski
    :version:   05.13.2019
    """

    def __init__(self):
        """
        Initializes the Engine (trains supporting classifiers).
        """
        csv = os.path.abspath( os.path.join(
            os.path.dirname(os.path.realpath(__file__)),
            "../pymovierec_data/movie10k.csv"
        ))

        if(G.VERBOSE):
            print("Current working dir:", os.getcwd())
            print("Script path:", os.path.dirname(os.path.realpath(__file__)))
            print("Resolved csv file:", csv)

        self.metadata = pandas.read_csv(csv, header=0, encoding="ISO-8859-1")
        self.metadata['review'] = self.metadata['review'].fillna('')
        self.metadata['soup']   = self.metadata['review'].astype(str) + ' ' + \
                                  self.metadata['keyword'].astype('U') + \
                                  self.metadata['theme'].astype('U')

        self.count        = CountVectorizer(stop_words='english')
        self.count_matrix = self.count.fit_transform( self.metadata['soup'] )
        self.cosine_sim2  = cosine_similarity( self.count_matrix, self.count_matrix )
        self.indices      = pandas.Series( self.metadata.index, index=self.metadata['movie'] ).drop_duplicates()

    def getRecommendation(self, movie, take = 3, json=False):
        """
        Retrieves a recommendation for a single movie.

        :movie:  The title of the movie to rank.
        :take:   The number of recommendations to return.
        :json:   True if return value should be in JSON format.
        :return: As many as take number of recommendations based on movie.
        """
        idx = self.indices[movie]
        scores = sorted(
            list(enumerate(self.cosine_sim2[idx])),
            key = lambda x: x[1],
            reverse=True
        )
        scores = scores[1:take]
        indices = [ i[0] for i in scores ]

        recommendations = self.metadata['movie'].iloc[indices]
        if(json):
            return recommendations.to_json(orient="index")
        else:
            return recommendations
