import networkx as nx
import plotly.graph_objects as go
from src.logic.Create import create_table
import pandas as pd
import scipy


def Graph(activities, table): #events, table
    #wczytywanie danych

    #table
    # print(table) #dataframe
    df_sel = table[["Czynność", "ES", "EF", "Rezerwa", "Czynność krytyczna","t"]]
    # print(df_sel)
    tab_str = []
    tab_name = []
    for ind, ro in df_sel.iterrows():
        tab_str.append(f"Nazwa: {ro['Czynność']}\nES: {ro['ES']}\tEF: {ro['EF']}\nRezerwa: {ro['Rezerwa']}")
        tab_name.append(f"{ro['Czynność']} {ro['t']}")
    #ścieżka krytyczna
    critical = []
    for index, row in df_sel.iterrows():
        if(row['Czynność krytyczna']=="tak"):
            # print(True)
            critical.append(True)
        else:
            # print(False)
            critical.append(False)

    print(critical)


    #events
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

    da = pd.DataFrame({"PreviousNode": vaX,"NextNode": vaY})

    # generowanie ścieżek
    G = nx.DiGraph()
    for a,b in da.iterrows():
        G.add_edge(int(b['PreviousNode']), int(b['NextNode']))


    #
    # pos = nx.spring_layout(G)
    pos = nx.shell_layout(G)


    edge_x = []
    edge_y = []

    xtext = []
    ytext = []

    edge_trace1 = go.Scatter( x=[], y=[], mode='lines+text',
            line=dict(width=3), hoverinfo='none',
        )

    edge_trace2 = go.Scatter( x=[], y=[], mode='lines+text',
            line=dict(width=3), hoverinfo='none',
        )

    for i, edge in enumerate(G.edges().data()):
            x0, y0 = pos[edge[0]]
            x1, y1 = pos[edge[1]]

            if critical[i]:
                edge_trace1['x'] += tuple([x0,x1,None])
                edge_trace1['y'] += tuple([y0,y1,None])
                xtext.append((x0 + x1) / 2)
                ytext.append((y0 + y1) / 2)

            else:
                edge_trace2['x'] += tuple([x0,x1,None])
                edge_trace2['y'] += tuple([y0,y1,None])
                xtext.append((x0 + x1) / 2)
                ytext.append((y0 + y1) / 2)


    edge_trace1['marker'] = dict(
            color='rgb(255,0,0)',
        )

    edge_trace2['marker'] = dict(
            color='rgb(196, 153, 110)',
        )

    edge_trace = [edge_trace1, edge_trace2]

    #teskt do ścieżek
    eweights_trace = go.Scatter(x=xtext, y=ytext, mode='text',
                marker_size = 0.5,
                text=tab_name,
                textposition='top center',
                textfont=dict(color = 'rgb(255,255,255)'),
                hovertemplate=tab_str )



    #generowanie węzłów
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
    data = edge_trace + [eweights_trace] + [node_trace]

    fig = go.Figure(data=data,
                    layout=go.Layout(
                        showlegend=False,
                        hovermode='closest',
                        margin=dict(b=0, l=0, r=0, t=0),
                        xaxis=dict(showgrid=False, zeroline=False, showticklabels=False),
                        yaxis=dict(showgrid=False, zeroline=False, showticklabels=False),
                        template="plotly_dark")
                    )

    #strzałki
    # print(critical)
    ipom=0
    for edge in G.edges():
        if(critical[ipom]==True):
            col = 'rgb(255,0,0)'
        else:
            col = 'rgb(196, 153, 110)'
        x0, y0 = pos[edge[0]]
        x1, y1 = pos[edge[1]]
        fig.add_annotation(
            ax=x0, ay=y0, axref='x', ayref='y',
            x=x1, y=y1, xref='x', yref='y',
            showarrow=True,
            arrowhead=2,
            arrowsize=25,
            arrowwidth=0.1,
            arrowcolor=col,
            startstandoff=15,
            standoff=18
        )
        ipom += 1



    return fig.to_json()