from src.CreateDataframe import create_activities, create_events
from src.PlotGraph import Gplot
''''''''''''''''''
activities = create_activities()
print(activities)

events = create_events()
print(events)

Gplot(activities,events)


