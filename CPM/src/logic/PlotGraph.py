from networkx.drawing.nx_agraph import graphviz_layout
import networkx as nx
import matplotlib.pyplot as plt
import os
''''''''''''''
def Gplot(activities, events, table):
    G = nx.DiGraph()
    edge_colors = []

    for activity, values in activities.items():
        for value in values:
            start_event, end_event = events[activity][0]
            t = value[1]
            ES = table[table['Czynność'] == activity]['ES'].values[0]
            EF = table[table['Czynność'] == activity]['EF'].values[0]
            LS = table[table['Czynność'] == activity]['LS'].values[0]
            LF = table[table['Czynność'] == activity]['LF'].values[0]
            Rezerwa = table[table['Czynność'] == activity]['Rezerwa'].values[0]
            edge_label = f"{activity}[[{ES},{EF}],[{LS},{LF}]] Rezerwa = {Rezerwa}, t = {t}"
            G.add_edge(start_event, end_event, label=edge_label)
            if table[table['Czynność'] == activity]['Czynność krytyczna'].values[0] == 'tak':
                edge_colors.append('red')
            else:
                edge_colors.append('black')

    pos = graphviz_layout(G, prog='dot')
    labels = nx.get_edge_attributes(G, 'label')
    label_pos = {k: (v[0] - 5.0, v[1] + 15.0) for k, v in pos.items()}
    nx.draw(G, pos, with_labels=True, edge_color=edge_colors)
    nx.draw_networkx_edge_labels(G, label_pos, edge_labels=labels, font_size=4,
                                 font_weight='bold', font_color='green',
                                 bbox=dict(facecolor='none', alpha=0.5, edgecolor='none'))

    current_script_path = os.path.dirname(os.path.abspath(__file__))
    csv_file_path = os.path.join(current_script_path, "../../Data/")
    plt.savefig(csv_file_path + "graph.pdf")
    plt.show()


