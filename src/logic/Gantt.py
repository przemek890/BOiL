from datetime import timedelta, datetime

import pandas as pd
import plotly.express as ex
from src.logic.Create import create_table


def formatuj_czas_na_date(czas):
    delta_czasu = timedelta(hours=czas)
    czas_poczatkowy = datetime(1980, 1, 1)
    czas_wynikowy = czas_poczatkowy + delta_czasu
    sformatowany_czas = czas_wynikowy.strftime("%Y-%m-%d %H:%M:%S")

    return sformatowany_czas

def Gantt(activities):
    table = create_table(activities)
    data = table["Czynność"].apply(lambda x: activities.get(x,"-"))
    data2 = []
    for i in data:
        pom = []
        for j in i:
            pom.append(j[0])
        data2.append(pom)
    table["Czynność poprzedzająca"] = data2
    def time_start(cp):
        if cp[0] == "-":
            return 0
        else:
            cs = 0
            for i in cp:
                cs += (table.loc[table["Czynność"] == i, "t"].values[0] + table.loc[table["Czynność"] == i, "Rezerwa"].values[0])
            return cs

    table["t_start"] = table["Czynność poprzedzająca"].apply(time_start)
    table["t_end"] = table["t_start"] + table["t"]
    tw = pd.DataFrame({"Task":table["Czynność"], "Start": table["t_start"], "Finish": table["t_end"]})
    tw["Start"] = tw["Start"].apply(formatuj_czas_na_date)
    tw["Finish"] = tw["Finish"].apply(formatuj_czas_na_date)

    fig = ex.timeline(tw, x_start="Start", x_end="Finish", y="Task", color="Task")
    fig.update_yaxes(autorange="reversed")
    # fig.show()
    print(tw)
    print(table)

    return fig.to_json()






