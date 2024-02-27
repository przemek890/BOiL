from src.logic.Create import create_activities, create_events, create_table
from src.logic.PlotGraph import Gplot
from tabulate import tabulate
import tkinter as tk
from src.view.Input import create_input_tab
from src.view.Window import start_note
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

    # UI - 1.0:
    root = tk.Tk()
    notebook, bookmarks = start_note(root)
    create_input_tab(notebook,bookmarks)
    root.mainloop()


if __name__ == "__main__":
    main()





