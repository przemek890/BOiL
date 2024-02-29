from datetime import timedelta, datetime

import numpy as np
import pandas as pd
import plotly.express as ex
from src.logic.Create import create_table


def formatuj_czas_na_date(czas):
    delta_czasu = timedelta(hours=czas)
    czas_poczatkowy = datetime(1980, 1, 1)
    czas_wynikowy = czas_poczatkowy + delta_czasu
    sformatowany_czas = czas_wynikowy.strftime("%Y-%m-%d %H:%M:%S")

    return sformatowany_czas

class Zadanie:
    def __init__(self,nazwa, czas, rezerwa, zadania_poprzedzające):
        self.nazwa = nazwa
        self.czas = czas
        self.rezerwa = rezerwa
        self.zadania_poprzedzające = np.array(zadania_poprzedzające)

    def printcp(self):
        str = "["
        for i in self.zadania_poprzedzające:
            str += i.nazwa+", "
        str+="]"
        return str

def Gantt(activities):
    table = create_table(activities)
    tw = pd.DataFrame({"Task":table["Czynność"],"Start":[formatuj_czas_na_date(i) for i in table["LS"]],"Finish":[formatuj_czas_na_date(i) for i in table["LF"]]})

    fig = ex.timeline(tw, x_start="Start", x_end="Finish", y="Task", color="Task")
    fig.update_yaxes(autorange="reversed")
    # fig.show()
    # print(tw)
    # print(table)

    return fig.to_json()






