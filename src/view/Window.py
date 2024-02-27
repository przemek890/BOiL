import tkinter as tk
from tkinter import ttk
from src.view.Input import create_input_tab

''''''''''''''''''''''''
def start_note(root):
    root.grid_columnconfigure(0, weight=1)
    root.grid_rowconfigure(0, weight=1)

    notebook = ttk.Notebook(root)

    tab1 = ttk.Frame(notebook)
    tab2 = ttk.Frame(notebook)
    tab3 = ttk.Frame(notebook)

    notebook.add(tab1, text='Input')
    notebook.add(tab2, text='Graph')
    notebook.add(tab3, text='Ganttproject')

    notebook.grid(sticky='nsew')

    return notebook, [tab1,tab2,tab3]

