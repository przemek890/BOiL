import networkx as nx
import plotly.graph_objects as go
from src.logic.Create import create_table
import pandas as pd


def Graph(activities):
    #wczytywanie danych
    print(activities)

    val = [x for x in activities.values()]
    vaX = []
    vaY = []
    for i in val:
        pom = []
        pom2= []
        for j in i:
            pom.append(j[0])
            pom2.append(j[1])
        vaX.append(pom[0])
        vaY.append(pom2[0])
    print(vaX)
    print(vaY)
    da = pd.DataFrame({"PreviousNode": vaX,"NextNode": vaY})
    print(da)

    G = nx.Graph()
    for a,b in da.iterrows():
        G.add_edge(int(b['PreviousNode']), int(b['NextNode']))
        # print(b['PreviousNode'], b['NextNode'])



    # G.add_edge(1, 2) #A
    # G.add_edge(1, 3) #B
    # G.add_edge(2, 4) #C
    # G.add_edge(2, 5) #D
    # G.add_edge(3, 5) #E
    # G.add_edge(4, 5) #F
    # G.add_edge(4, 6) #G
    # G.add_edge(5, 6) #H

    #
    pos = nx.spring_layout(G)

    edge_x = []
    edge_y = []

    for edge in G.edges():
        x0, y0 = pos[edge[0]]
        x1, y1 = pos[edge[1]]
        edge_x += [x0, x1, None]
        edge_y += [y0, y1, None]

    #
    edge_trace = go.Scatter(
        x=edge_x, y=edge_y,
        line=dict(width=0.5, color='#888'),
        hoverinfo='none',
        mode='lines')

    node_x = []
    node_y = []

    for node in G.nodes():
        x, y = pos[node]
        node_x.append(x)
        node_y.append(y)

    node_labels = [str(node) for node in G.nodes()]

    node_trace = go.Scatter(
        x=node_x, y=node_y,
        mode='markers+text',  # Dodanie etykiet
        text=node_labels,  # Tekst etykiet
        textposition='middle center',  # Pozycja tekstu względem węzłów
        hoverinfo='text',
        marker=dict(
            showscale=False,
            colorscale='YlGnBu',
            size=40,
        )
    )


    fig = go.Figure(data=[edge_trace, node_trace],
                    layout=go.Layout(
                        showlegend=False,
                        hovermode='closest',
                        margin=dict(b=0, l=0, r=0, t=0),
                        xaxis=dict(showgrid=False, zeroline=False, showticklabels=False),
                        yaxis=dict(showgrid=False, zeroline=False, showticklabels=False))
                    )



    # fig.add_trace(go.Scatter(x=[formatuj_czas_na_date(row["ES"])],
    #                                          y=[row["Czynność"]],
    #                                          mode="markers",
    #                                          marker=dict(color="red", size=10),
    #                                          showlegend=False,
    #                                          hoverinfo='text',
    #                                          text=', '.join(dependencies) + f' -> {row["Czynność"]}'))

    return fig.to_json()
 #if '-' to (1,x), gdzie x = 2 na początku
    # pomX = []
    # pomx1=2
    # pomY=[]
    # pomy1=2
    # for indeks, wiersz in da.iterrows():
    #     if(wiersz[1][0]=='-'):
    #         pomX.append(1)
    #         pomY.append(pomy1)
    #         pomy1+=1
    #     elif(wiersz[1][0]>='A' or wiersz[1][0]<='Z'):
    #         pomX.append(pomx1)
    #         pomx1+=1
    #     pom.append(indeks+1)
        # if(wiersz[1][0]!='-'):
        #     pom2.append(ord(wiersz[1][0])-64)
        # else
    # print(pomX)
    # print(pom2)