import tkinter as tk
from tkinter import ttk

def create_input_tab(notebook):


    tab1 = ttk.Frame(notebook)


    # Tutaj dodaj elementy interfejsu użytkownika dla zakładki "Input"
    # Na przykład:
    label = tk.Label(tab1, text="To jest zakładka Input")
    label.pack()

    tab1.pack()

    return tab1