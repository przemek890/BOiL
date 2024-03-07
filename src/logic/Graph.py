import networkx as nx
import plotly.graph_objects as go
from src.logic.Create import create_table
import pandas as pd

def Graph(activities):
    #wczytywanie danych
    ky =[]
    for a, b in activities.items():
        ky.append(a)

    val = [x for x in activities.values()]
    cp = []
    for i in val:
        pom = []
        for j in i:
            pom.append(j[0])
        cp.append(pom)

    da = pd.DataFrame({"Task": ky,"PreTask": cp})
    print(da)


    G = nx.Graph()
    G.add_edge(1, 2) #A
    G.add_edge(1, 3) #B
    G.add_edge(2, 4) #C
    G.add_edge(2, 5) #D
    G.add_edge(3, 5) #E
    G.add_edge(4, 5) #F
    G.add_edge(4, 6) #G
    G.add_edge(5, 6) #H

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

    # pom = []
    # pom2=[]
    # for indeks, wiersz in da.iterrows():
    #     pom.append(indeks+1)
    #     # print(wiersz[1])
    #     if(wiersz[1][0]!='-'):
    #         pom2.append(ord(wiersz[1][0])-64)
    #     else
    #
    #
    # print(pom)
    # print(pom2)

    # fig.add_trace(go.Scatter(x=[formatuj_czas_na_date(row["ES"])],
    #                                          y=[row["Czynność"]],
    #                                          mode="markers",
    #                                          marker=dict(color="red", size=10),
    #                                          showlegend=False,
    #                                          hoverinfo='text',
    #                                          text=', '.join(dependencies) + f' -> {row["Czynność"]}'))

    return fig.to_json()
    # G = nx.Graph()
    # G.add_edge(1, 2)
    # G.add_edge(2, 3)
    #
    # pos = nx.spring_layout(G)  # Ustawienie pozycji węzłów
    # check = nx.draw(G, pos, with_labels=True, node_size=700, node_color="skyblue", font_size=10, font_color="black", font_weight="bold", edge_color="gray")
    # plt.show()
    #
    #
    # return check.to_json()
    # return graph_data
  # graph_data = {"nodes": [{"id": str(node)} for node in G.nodes()],
    #                "edges": [{"from": str(edge[0]), "to": str(edge[1])} for edge in G.edges()]}