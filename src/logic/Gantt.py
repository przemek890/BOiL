from datetime import timedelta, datetime

import numpy as np
import pandas as pd
import plotly.express as ex
import plotly.graph_objects as go

from src.logic.Create import create_table, create_activities

def formatuj_czas_na_date(czas):
    delta_czasu = timedelta(hours=czas)
    czas_poczatkowy = datetime(1980, 1, 1)
    czas_wynikowy = czas_poczatkowy + delta_czasu
    sformatowany_czas = czas_wynikowy.strftime("%Y-%m-%d %H:%M:%S")

    return sformatowany_czas

def Gantt(activities):
    table = create_table(activities)
    val = [x for x in activities.values()]
    cp = []
    for i in val:
        pom = []
        for j in i:
            pom.append(j[0])
        cp.append(pom)
    # act = pd.DataFrame({"Czynność":activities.keys(),"cp":cp})
    # print(act)
    table["Dependency"] = cp
    print(table)
    tw = pd.DataFrame({"Task":table["Czynność"],"Start":[formatuj_czas_na_date(i) for i in table["ES"]],"Finish":[formatuj_czas_na_date(i) for i in table["EF"]]})

    fig = ex.timeline(tw, x_start="Start", x_end="Finish", y="Task", color="Task", template="plotly_dark")
    fig.update_layout(paper_bgcolor='rgba(1,1,1,0.5)')
    fig.update_yaxes(autorange="reversed", automargin=True)
    fig.update_xaxes(visible=False)
    # print(colors)
    it = 0
    for i, row in table.iterrows():
        dependencies = row['Dependency']
        # color = fig["data"][i]["marker"]["color"]
        color = "red"
        if dependencies[0] != "-":
            for dependency in dependencies:
                dr = table[table["Czynność"] == dependency].iloc[0]
                fig.add_trace(go.Scatter(x=[formatuj_czas_na_date(dr['EF']), formatuj_czas_na_date(row['ES'])],
                                         y=[dr["Czynność"],  dr['Czynność']],
                                         mode="lines",
                                         line=dict(color=color, width=3),
                                         showlegend=False,
                                         hoverinfo='none'))
                fig.add_trace(go.Scatter(x=[formatuj_czas_na_date(row['ES']), formatuj_czas_na_date(row['ES'])],
                                         y=[dr["Czynność"],  row['Czynność']],
                                         mode="lines",
                                         line=dict(color=color, width=3),
                                         showlegend=False,
                                         hoverinfo='none'))
                fig.add_trace(go.Scatter(x=[formatuj_czas_na_date(row["ES"])],
                                         y=[row["Czynność"]],
                                         mode="markers",
                                         marker=dict(color="red", size=10),
                                         showlegend=False,
                                         hoverinfo='text',
                                         text=', '.join(dependencies) + f' -> {row["Czynność"]}'))
                fig.add_trace(go.Scatter(x=[formatuj_czas_na_date(dr["EF"])],
                                         y=[dr["Czynność"]],
                                         mode="markers",
                                         marker=dict(color="red", size=10, symbol="diamond"),
                                         showlegend=False,
                                         hoverinfo='none'))

    # fig.show()
    # print(tw)
    # print(table)

    return fig.to_json()






