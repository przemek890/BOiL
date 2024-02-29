import requests
import json
''''''''''''''
#### Pózniej sie przeniesie do Postmana czy czegos podobnego :P ####

def get_activities_test():
    response = requests.get('http://localhost:5000/get_activities')

    if response.status_code == 200:
        data = response.json()
        print(json.dumps(data, indent=4))
    else:
        print(f'Error: {response.status_code}')

def get_events_test():
    response = requests.get('http://localhost:5000/get_events')

    if response.status_code == 200:
        data = response.json()
        print(json.dumps(data, indent=4))
    else:
        print(f'Error: {response.status_code}')

def get_tableCPM_test():
    response = requests.get('http://localhost:5000/get_tableCPM')

    if response.status_code == 200:
        data = response.json()
        print(json.dumps(data, indent=4))
    else:
        print(f'Error: {response.status_code}')

def get_Gantt_test():
    response = requests.get('http://localhost:5000/get_Gantt')

    if response.status_code == 200:
        data = response.json()
        print(json.dumps(data, indent=4))
    else:
        print(f'Error: {response.status_code}')

def get_Graph_test():
    response = requests.get('http://localhost:5000/get_graph')

    if response.status_code == 200:
        data = response.json()
        print(json.dumps(data, indent=4))
    else:
        print(f'Error: {response.status_code}')
