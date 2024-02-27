from src.logic.Create import create_activities, create_events, create_table
from src.logic.PlotGraph import Gplot
from tabulate import tabulate
from src.view.Window import start_note
''''''''''''''''''
activities = create_activities()
print("Activities: ",activities,end="\n\n")

events = create_events()
print("Events: ",events,end="\n\n")

table = create_table(activities)
print(tabulate(table, headers='keys', tablefmt='simple', numalign='center', stralign='center'))

#Gplot(activities,events,table)

  #jeszcze nie działa

# Gantt(activities)

# UI - 1.0: w pliku view
start_note()
