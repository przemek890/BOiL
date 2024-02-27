import tkinter as tk
from tkinter import ttk

def create_input_tab(notebook, bookmarks):
    bookmarks[0].grid_columnconfigure(0, weight=1)
    bookmarks[0].grid_rowconfigure(0, weight=1)

    text_field = tk.Text(bookmarks[0])
    text_field.insert('end', '''Test''')
    text_field.grid(sticky='nsew')

    notebook.add(bookmarks[0], text='Input')