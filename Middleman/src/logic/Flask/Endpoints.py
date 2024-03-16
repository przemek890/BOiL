from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from src.logic.middleman import middleman_issue
""""""""""""""""""""""""""""""""""""""""""
app = Flask(__name__)
CORS(app)
""""""""""""""""""""""""
@app.route('/')
def home():
    return "Żyję więc jestem ~ Serwer"

@app.route('/calculate', methods=['POST'])
def calculate():
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

    return jsonify(response)

""""""""""""""""""""""""
if __name__ == '__main__':
    app.run(debug=True)
