from src.logic.Create import create_activities, create_events, create_table
from src.logic.PlotGraph import Gplot
from tabulate import tabulate
from src.logic.Gantt import Gantt
''''''''''''''''''
def main():
    activities = create_activities()
    print("Activities: ", activities, end="\n\n")

    events = create_events()
    print("Events: ", events, end="\n\n")

    table = create_table(activities)
    print(tabulate(table, headers='keys', tablefmt='simple', numalign='center', stralign='center'),end="\n\n")

    # Gplot(activities,events,table)

    # jeszcze nie działa test
    # Gantt(activities)


if __name__ == "__main__":
    main()





