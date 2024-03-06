import pandas as pd
import os
''''''''''''''''''''
def create_activities(path):
    df = pd.read_csv(path)
    graf = {}
    for i in range(len(df)):
        czynnosc = df.iloc[i]['Czynnosc']
        czynnosc_poprzedzajaca = df.iloc[i]['Czynnosc_bezposrednio_poprzedzajaca']
        czas_trwania = df.iloc[i]['Czas_trwania']
        if czynnosc not in graf:
            graf[czynnosc] = []
            for poprzedzajaca in czynnosc_poprzedzajaca:
                graf[czynnosc].append((poprzedzajaca, czas_trwania))
    return graf
import numpy as np
import pandas as pd

def create_events(path):
    df = pd.read_csv(path)
    graf = {}
    for i in range(len(df)):
        czynnosc = df.iloc[i]['Czynnosc']
        poprzednik = int(df.iloc[i]['Poprzednik']) if isinstance(df.iloc[i]['Poprzednik'], np.int64) else df.iloc[i]['Poprzednik']
        nastepnik = int(df.iloc[i]['Nastepnik']) if isinstance(df.iloc[i]['Nastepnik'], np.int64) else df.iloc[i]['Nastepnik']
        if czynnosc not in graf:
            graf[czynnosc] = []
        graf[czynnosc].append((poprzednik, nastepnik))
    return graf

def create_table(activities):
    df = pd.DataFrame(columns=['Czynność', 't', 'ES', 'EF', 'LS', 'LF', 'Rezerwa', 'Czynność krytyczna'])
    EF_dict = {}
    LF_dict = {}
    for activity, values in activities.items():
        for value in values:
            t = value[1]
            if value[0] == '-':
                ES = 0
            else:
                ES = EF_dict[value[0]]
            EF = ES + t
            EF_dict[activity] = EF
            LF_dict[activity] = float('inf')
    LF_dict[activity] = EF
    for activity in reversed(list(activities.keys())):
        for value in activities[activity]:
            if value[0] != '-':
                LF = LF_dict[activity] - value[1]
                LF_dict[value[0]] = min(LF_dict[value[0]], LF)
    max_EF = max(EF_dict.values())
    for activity in LF_dict:
        if LF_dict[activity] == float('inf'):
            LF_dict[activity] = max_EF
    critical_path = []
    max_t = 0
    for activity, values in activities.items():
        for value in values:
            t = value[1]
            ES = EF_dict[value[0]] if value[0] != '-' else 0
            EF = ES + t
            LF = LF_dict[activity]
            LS = LF - t
            Rezerwa = LS - ES
            if Rezerwa == 0 and EF > max_t:
                max_t = EF
                critical_path.append(activity)
            Czynnosc_krytyczna = 'tak' if Rezerwa == 0 and activity in critical_path else 'nie'
            row = pd.DataFrame({'Czynność': [activity],'t': [t], 'ES': [ES], 'EF': [EF], 'LS': [LS], 'LF': [LF], 'Rezerwa': [Rezerwa], 'Czynność krytyczna': [Czynnosc_krytyczna]})
            df = pd.concat([df, row], ignore_index=True)
    df = df.loc[df.groupby('Czynność')['ES'].idxmax()]
    return df

