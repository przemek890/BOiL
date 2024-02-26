import pandas as pd
import os
''''''''''''''''''''
def create_activities(path=os.getcwd() + '/Data/Datasets/Czynnosc_poprzedzajaca.csv'):
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

def create_events(path=os.getcwd() + '/Data/Datasets/Numeracja_zdarzen.csv'):
    df = pd.read_csv(path)
    graf = {}
    for i in range(len(df)):
        czynnosc = df.iloc[i]['Czynnosc']
        poprzednik = df.iloc[i]['Poprzednik']
        nastepnik = df.iloc[i]['Nastepnik']
        if czynnosc not in graf:
            graf[czynnosc] = []
        graf[czynnosc].append((poprzednik, nastepnik))
    return graf
