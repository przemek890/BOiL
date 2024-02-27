from src.logic.Create import create_activities, create_events, create_table
from src.logic.PlotGraph import Gplot
from src.view.Window import start_note
from tabulate import tabulate
''''''''''''''''''
# Czynności poprzedzające:
activities = create_activities()
print("Activities: ",activities,end="\n\n")

# Numeracja zdarzeń:
events = create_events()
print("Events: ",events,end="\n\n")

# Tablica metody CPM:
table = create_table(activities)
print(tabulate(table, headers='keys', tablefmt='simple', numalign='center', stralign='center'))

# Poglądowy graf - pdf:
Gplot(activities,events,table)

# UI - 1.0:
start_note()
