import tkinter as tk
from tkinter import ttk
''''''''''''''''''''''''
def start_note():
    root = tk.Tk()

    notebook = ttk.Notebook(root)

    tab1 = ttk.Frame(notebook)
    tab2 = ttk.Frame(notebook)
    tab3 = ttk.Frame(notebook)

    notebook.add(tab1, text='Input')
    notebook.add(tab2, text='Graph')
    notebook.add(tab3, text='Ganttproject')

    notebook.pack(expand=True, fill='both')

#test commit
    root.mainloop()