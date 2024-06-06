from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from pymongo import MongoClient
from bson import json_util
from middleman import middleman_issue
import json
import os

""""""""""""""""""""""""""""""""""""""""""
app = Flask(__name__)
CORS(app)

mongo_uri = os.getenv("MONGO_URI")
client = MongoClient(mongo_uri)

db = client["middleman"]
collection = db['CollectData']
""""""""""""""""""""""""
@app.route('/')
def home():
    return "Żyję więc jestem ~ Serwer"

@app.route('/calculate', methods=['POST'])
def calculate():
    """
    input - dane wprowadzone przez użytkownika w aplikacji
    output - dane wyliczone na podstawie inputu
    :return: Informacja o tym że dane wejściowe, jak i te wyliczone zostały zapisane w bazie Mongo
    """
    data = request.get_json()

    supply = np.array(data['supply'])
    demand = np.array(data['demand'])
    purchase_costs = np.array(data['purchase_costs'])
    sale_prices = np.array(data['sale_prices'])
    transport_costs = np.array(data['transport_costs'])

    unit_income, plan_opt, total_purchase_cost, total_transport_cost, total_cost, revenue,profit, res = middleman_issue(supply,demand,purchase_costs,sale_prices,transport_costs)

    response = {
        "unit_income": unit_income.tolist(),
        "optimal_plan": res.x.reshape(supply.shape[0], demand.shape[0]).tolist(),
        "total_purchase_cost": total_purchase_cost,
        "total_transport_cost": total_transport_cost,
        "total_cost": total_transport_cost + total_purchase_cost,
        "revenue": revenue,
        "profit": profit
    }

    document = {
        "input": data,
        "output": response
    }

    # collection.delete_many({})     # Usuń wszystkie dokumenty z kolekcji (by dodany był tym jedynym)

    collection.insert_one(document)

    response["message"] = "Dane wejściowe i wyjściowe zostały zapisane w bazie Mongo."

    return jsonify(response)



@app.route('/get_doc', methods=['GET'])
def getdata():
    """
    :return: Zwraca ostatnio dodany rekord do bazy (starsze rekordy są zapisywane dla celów archiwizacji)
    """
    document = collection.find_one(sort=[('_id', -1)])  # Pobierz ostatni dokument z kolekcji
    if document:
        return json.loads(json_util.dumps(document))    # Zwróć dokument jako odpowiedź JSON
    else:
        return jsonify({"message": "Database is empty."})

""""""""""""""""""""""""

