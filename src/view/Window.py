import tkinter as tk
from tkinter import ttk
from src.view.Input import create_input_tab

''''''''''''''''''''''''
def start_note():
    root = tk.Tk()

    notebook = ttk.Notebook(root)

    create_input_tab(notebook)  # Utwórz zakładkę "Input.py" za pomocą funkcji z nowego modułu
    #tab1 = ttk.Frame(notebook)
    tab2 = ttk.Frame(notebook)
    tab3 = ttk.Frame(notebook)

    #notebook.add(tab1, text='Input.py')
    notebook.add(tab2, text='Graph')
    notebook.add(tab3, text='Ganttproject')

    notebook.pack(expand=True, fill='both')

    root.mainloop()