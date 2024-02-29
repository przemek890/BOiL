import os
from flask import Flask,jsonify
from src.logic.Create import create_activities, create_table, create_events
from src.logic.Gantt import Gantt
from flask import send_file
from src.logic.PlotGraph import Gplot
from flask_cors import CORS
''''''''
app = Flask(__name__)
CORS(app, resources={r"/get_Gantt": {"origins": "http://localhost:3000"}})
CORS(app, resources={r"/get_tableCPM": {"origins": "http://localhost:3000"}})
CORS(app, resources={r"/get_activities": {"origins": "http://localhost:3000"}})
CORS(app, resources={r"/get_events": {"origins": "http://localhost:3000"}})
CORS(app, resources={r"/get_graph": {"origins": "http://localhost:3000"}})

@app.route('/')
def home():
    return "Żyję więc jestem ~ Serwer"

@app.route('/get_activities', methods=['GET'])
def get_activities():
    current_script_path = os.path.dirname(os.path.abspath(__file__))
    csv_file_path = os.path.join(current_script_path, "../../../Data/csv", "Czynnosc_poprzedzajaca.csv")
    activities = create_activities(csv_file_path)
    activities = {k: [(i[0], int(i[1])) for i in v] for k, v in activities.items()}
    print(activities)
    return jsonify(activities)

@app.route('/get_events', methods=['GET'])
def get_events():
    current_script_path = os.path.dirname(os.path.abspath(__file__))
    csv_file_path = os.path.join(current_script_path, "../../../Data/csv", "Numeracja_zdarzen.csv")
    events = create_events(csv_file_path)
    events = {k: [(i[0], int(i[1])) for i in v] for k, v in events.items()}
    print(events)
    return jsonify(events)

@app.route('/get_tableCPM', methods=['GET'])
def get_tableCPM():
    current_script_path = os.path.dirname(os.path.abspath(__file__))
    csv_file_path = os.path.join(current_script_path, "../../../Data/csv", "Czynnosc_poprzedzajaca.csv")
    activities = create_activities(csv_file_path)
    table = create_table(activities)
    print(table)
    return jsonify(table.to_dict(orient='records'))

@app.route('/get_Gantt', methods=['GET'])
def get_Gantt():
    current_script_path = os.path.dirname(os.path.abspath(__file__))
    csv_file_path = os.path.join(current_script_path, "../../../Data/csv", "Czynnosc_poprzedzajaca.csv")
    activities = create_activities(csv_file_path)
    gannt = Gantt(activities)
    return gannt

@app.route('/get_graph', methods=['GET'])
def get_Graph():
    current_script_path_1 = os.path.dirname(os.path.abspath(__file__))
    csv_file_path_1 = os.path.join(current_script_path_1, "../../../Data/csv", "Czynnosc_poprzedzajaca.csv")
    activities = create_activities(csv_file_path_1)
    table = create_table(activities)

    current_script_path_2 = os.path.dirname(os.path.abspath(__file__))
    csv_file_path_2 = os.path.join(current_script_path_2, "../../../Data/csv", "Numeracja_zdarzen.csv")
    events = create_events(csv_file_path_2)
    Gplot(activities, events, table)
    return send_file(current_script_path_2 + "/../../../Data/graph.pdf", as_attachment=True)





