from flask import Flask, request
import json
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.metrics.pairwise import linear_kernel, cosine_similarity
from flask import Response


app = Flask(__name__)

@app.route('/postdata', methods = ['POST'])
def postdata():

    data = request.json

    # Load Movies Metadata
    filePath = "movie10k.csv"
    metadata = pd.read_csv(filePath, header=0, encoding="ISO-8859-1")
    metadata['review'] = metadata['review'].fillna('')
    metadata['soup'] = metadata['review'].astype(str) + ' ' + metadata['keyword'].astype('U') + metadata['theme'].astype('U')

    count = CountVectorizer(stop_words='english')
    count_matrix = count.fit_transform(metadata['soup'])
    cosine_sim2 = cosine_similarity(count_matrix, count_matrix)

    indices = pd.Series(metadata.index, index=metadata['movie']).drop_duplicates()

    # input of movie name goes here
    title = data['movie']
    idx = indices[title]
    sim_scores = list(enumerate(cosine_sim2[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    sim_scores = sim_scores[1:11]
    movie_indices = [i[0] for i in sim_scores]

    dataSimilar = metadata['movie'].iloc[movie_indices]
    # print(dataSimilar) #debug: To view the recommended list with index

    recommendedMoviesJSON = dataSimilar.to_json( orient='index')

    # moviesRec = {
    #     "movie": d2["movie"],
    #     "recomendation": recommendedMoviesJSON
    # }
    # print(moviesRec)

    resp = Response(recommendedMoviesJSON, status=200, mimetype='application/json')
    resp.headers['Link'] = 'http://localhost:5000'
    return resp

if __name__ == '__main__':
    app.run(debug=True)