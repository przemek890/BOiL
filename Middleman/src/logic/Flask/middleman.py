import numpy as np
from typing import Tuple
from scipy.optimize import linprog,OptimizeResult
from tabulate import tabulate
""""""""""""""""""""""""""""""""""""
def middleman_issue(supply: np.ndarray,
                    demand: np.ndarray,
                    purchase_costs: np.ndarray,
                    sale_prices: np.ndarray,
                    transport_costs: np.ndarray) -> \
        Tuple[np.ndarray, np.ndarray, float, float, float, float, float, OptimizeResult]:


    unit_income = sale_prices - np.expand_dims(purchase_costs, axis=1) - transport_costs

    c = unit_income.flatten()                                                                   # Spłaszczamy macierz dochodu jednostkowego do tablicy 1D

    A = np.zeros((supply.shape[0] + demand.shape[0], supply.shape[0] * demand.shape[0]))        # Tworzymy tablicę zer dla ograniczeń

    for i in range(supply.shape[0]):                                                            # Ustawiamy ograniczenia podaży
        A[i, i*demand.shape[0]:(i+1)*demand.shape[0]] = 1

    for i in range(demand.shape[0]):                                                            # Ustawiamy ograniczenia popytu
        A[i + supply.shape[0], i::demand.shape[0]] = 1

    b = np.concatenate([supply, demand])                                                        # Łączymy podaż i popyt w jedną tablicę 1D

    x0_bounds = (0, None)                                                                       # Ustawiamy granice dla zmiennych decyzyjnych

    bounds = [x0_bounds] * (supply.shape[0] * demand.shape[0])                                  # Tworzymy listę granic dla każdej zmiennej decyzyjnej

    res = linprog(-c, A_ub=A, b_ub=b, bounds=bounds, method='highs')                            # Rozwiązujemy problem programowania liniowego

    unit_income = sale_prices - np.expand_dims(purchase_costs, axis=1) - transport_costs

    # Macierz indywidualnych zysków
    print("Macierz indywidualnych zysków:")
    print(tabulate(unit_income, tablefmt="fancy_grid"))

    # Optymalny plan
    print("Optymalny plan:")
    plan_opt = res.x.reshape(supply.shape[0], demand.shape[0])
    print(tabulate(plan_opt, tablefmt="fancy_grid"))

    # Obliczamy i wyświetlamy całkowity koszt zakupu, całkowity koszt transportu, przychód i zysk
    total_purchase_cost = np.sum(res.x * np.repeat(purchase_costs, demand.shape[0]))
    total_transport_cost = np.sum(res.x * transport_costs.flatten())
    revenue = np.sum(res.x * np.tile(sale_prices, supply.shape[0]))
    profit = revenue - total_purchase_cost - total_transport_cost
    total_cost = total_transport_cost + total_purchase_cost

    print(tabulate([
        ["Całkowity koszt zakupu", total_purchase_cost],
        ["Całkowity koszt transportu", total_transport_cost],
        ["Całkowity koszt", total_cost],
        ["Przychód", revenue],
        ["Zysk", profit]
    ], headers=["", ""], tablefmt="fancy_grid"))

    return unit_income,plan_opt,total_purchase_cost,total_transport_cost,total_cost,revenue,profit,res
