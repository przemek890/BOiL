import networkx as nx
import matplotlib.pyplot as plt
import os
''''''''''''''
def Gplot(activities,events):
    G = nx.DiGraph()

    for activity, values in activities.items():
        for value in values:
            start_event, end_event = events[activity][0]
            edge_label = f"{activity}({value[1]})"
            G.add_edge(start_event, end_event, label=edge_label)

    pos = nx.spring_layout(G)
    labels = nx.get_edge_attributes(G, 'label')
    nx.draw(G, pos, with_labels=True)
    nx.draw_networkx_edge_labels(G, pos, edge_labels=labels)
    plt.savefig(os.getcwd() + "/Data/graph.pdf")
    plt.show()