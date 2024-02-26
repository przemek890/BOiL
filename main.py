from src.Create import create_activities, create_events, create_table
from src.PlotGraph import Gplot
''''''''''''''''''
activities = create_activities()
print("Activities: ",activities,end="\n\n")

events = create_events()
print("Events: ",events,end="\n\n")

table = create_table(activities,events)
print(table)

Gplot(activities,events)


