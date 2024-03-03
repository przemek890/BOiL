import os
from flask import Flask,jsonify,send_file
from src.logic.Create import create_activities, create_table, create_events
from src.logic.Gantt import Gantt
from flask import send_file
from src.logic.PlotGraph import Gplot
from flask_cors import CORS
from flask import Flask, jsonify, request
import os
import pandas as pd
import io
''''''''
app = Flask(__name__)
CORS(app)

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

@app.route('/get_html', methods=['GET'])
def get_html():
    current_script_path = os.path.dirname(os.path.abspath(__file__))
    html_file_path = os.path.join(current_script_path, "../../view/my-new-app/src/component/Input/index.html")
    return send_file(html_file_path, mimetype='text/html')

@app.route('/get_css', methods=['GET'])
def get_css():
    current_script_path = os.path.dirname(os.path.abspath(__file__))
    css_file_path = os.path.join(current_script_path, "../../view/my-new-app/src/component/Input/style.css")
    return send_file(css_file_path, mimetype='text/css')

@app.route('/get_js', methods=['GET'])
def get_js():
    current_script_path = os.path.dirname(os.path.abspath(__file__))
    js_file_path = os.path.join(current_script_path, "../../view/my-new-app/src/component/Input/script.js")
    return send_file(js_file_path, mimetype='application/javascript')

# -----------------------------------------

@app.route('/get_csv_png', methods=['GET'])
def get_csv_png():
    current_script_path = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_script_path, "../../view/my-new-app/src/component/Input/images/csv.png")
    return send_file(file_path, mimetype='image/png')

@app.route('/get_excel_png', methods=['GET'])
def get_excel_png():
    current_script_path = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_script_path, "../../view/my-new-app/src/component/Input/images/excel.png")
    return send_file(file_path, mimetype='image/png')

@app.route('/get_export_png', methods=['GET'])
def get_export_png():
    current_script_path = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_script_path, "../../view/my-new-app/src/component/Input/images/export.png")
    return send_file(file_path, mimetype='image/png')

@app.route('/get_json_png', methods=['GET'])
def get_json_png():
    current_script_path = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_script_path, "../../view/my-new-app/src/component/Input/images/json.png")
    return send_file(file_path, mimetype='image/png')

@app.route('/get_pdf_png', methods=['GET'])
def get_pdf_png():
    current_script_path = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_script_path, "../../view/my-new-app/src/component/Input/images/pdf.png")
    return send_file(file_path, mimetype='image/png')

@app.route('/get_search_png', methods=['GET'])
def get_search_png():
    current_script_path = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(current_script_path, "../../view/my-new-app/src/component/Input/images/search.png")
    return send_file(file_path, mimetype='image/png')

@app.route('/save_table_to_csv/<table_name>', methods=['POST'])
def save_table_to_csv(table_name):
    data = request.get_json()['data']
    print(data)
    try:
        data_io = io.StringIO(data)
        df = pd.read_csv(data_io)
        if table_name == 'Czynnosc_poprzedzajaca':
            df.columns = ['ID', 'Czynnosc', 'Czynnosc_bezposrednio_poprzedzajaca', 'Czas_trwania']
            df['Czynnosc_bezposrednio_poprzedzajaca'] = df.groupby('Czynnosc')['Czynnosc_bezposrednio_poprzedzajaca'].transform(lambda x: ''.join(x))
            df = df.drop_duplicates(subset='Czynnosc')  # Zostaw tylko jeden rekord dla każdej Czynnosci
            df = df.drop(columns=['ID'])  # Usuń kolumnę ID
        elif table_name == 'Numeracja_zdarzen':
            df.columns = ['ID', 'Czynnosc', 'Poprzednik', 'Nastepnik']
            df = df.drop(columns=['ID'])  # Usuń kolumnę ID
    except ValueError as e:
        print(f"Error creating DataFrame: {e}")
        return jsonify({"message": "Błąd podczas tworzenia DataFrame."})

    current_script_path = os.path.dirname(os.path.abspath(__file__))
    path = os.path.join(current_script_path, "../../../Data/csv")

    csv_file_path = os.path.join(path, f"{table_name}.csv")

    df.to_csv(csv_file_path, index=False, mode='w')

    return jsonify({"message": "Pomyślnie zapisano."})





