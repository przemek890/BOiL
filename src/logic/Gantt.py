from datetime import timedelta, datetime

import numpy as np
import pandas as pd
import plotly.express as ex
from src.logic.Create import create_table

def draw_arrow_between_jobs(fig, first_job_dict, second_job_dict):
    ## retrieve tick text and tick vals
    job_yaxis_mapping = dict(zip(fig.layout.yaxis.ticktext,fig.layout.yaxis.tickvals))
    jobs_delta = second_job_dict['Start'] - first_job_dict['Finish']
    ## horizontal line segment
    fig.add_shape(
        x0=first_job_dict['Finish'], y0=job_yaxis_mapping[first_job_dict['Task']],
        x1=first_job_dict['Finish'] + jobs_delta/2, y1=job_yaxis_mapping[first_job_dict['Task']],
        line=dict(color="blue", width=2)
    )
    ## vertical line segment
    fig.add_shape(
        x0=first_job_dict['Finish'] + jobs_delta/2, y0=job_yaxis_mapping[first_job_dict['Task']],
        x1=first_job_dict['Finish'] + jobs_delta/2, y1=job_yaxis_mapping[second_job_dict['Task']],
        line=dict(color="blue", width=2)
    )
    ## horizontal line segment
    fig.add_shape(
        x0=first_job_dict['Finish'] + jobs_delta/2, y0=job_yaxis_mapping[second_job_dict['Task']],
        x1=second_job_dict['Start'], y1=job_yaxis_mapping[second_job_dict['Task']],
        line=dict(color="blue", width=2)
    )
    ## draw an arrow
    fig.add_annotation(
        x=second_job_dict['Start'], y=job_yaxis_mapping[second_job_dict['Task']],
        xref="x",yref="y",
        showarrow=True,
        ax=-10,
        ay=0,
        arrowwidth=2,
        arrowcolor="blue",
        arrowhead=2,
    )
    return fig

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
    tw = pd.DataFrame({"Task":table["Czynność"],"Start":[formatuj_czas_na_date(i) for i in table["ES"]],"Finish":[formatuj_czas_na_date(i) for i in table["EF"]]})

    fig = ex.timeline(tw, x_start="Start", x_end="Finish", y="Task", color="Task", template="plotly_dark")
    fig.update_layout(paper_bgcolor='rgba(1,1,1,0.5)')
    fig.update_yaxes(autorange="reversed")
    fig.update_xaxes(visible=False)
    # fig.show()
    # print(tw)
    # print(table)

    return fig.to_json()






