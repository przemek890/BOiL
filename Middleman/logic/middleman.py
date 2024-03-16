import numpy as np
from scipy.optimize import linprog

# Definiujemy podaż, popyt, koszty zakupu, ceny sprzedaży i koszty transportu
supply = np.array([45, 25])
demand = np.array([30, 30])
purchase_costs = np.array([6, 7])
sale_prices = np.array([12, 13])
transport_costs = np.array([[7, 4],
                            [3, 5]])

# Obliczamy dochód jednostkowy dla każdej trasy
unit_income = sale_prices - np.expand_dims(purchase_costs, axis=1) - transport_costs

# Spłaszczamy macierz dochodu jednostkowego do tablicy 1D
c = unit_income.flatten()

# Tworzymy tablicę zer dla ograniczeń
A = np.zeros((supply.shape[0] + demand.shape[0], supply.shape[0] * demand.shape[0]))

# Ustawiamy ograniczenia podaży
for i in range(supply.shape[0]):
    A[i, i*demand.shape[0]:(i+1)*demand.shape[0]] = 1

# Ustawiamy ograniczenia popytu
for i in range(demand.shape[0]):
    A[i + supply.shape[0], i::demand.shape[0]] = 1

# Łączymy podaż i popyt w jedną tablicę 1D
b = np.concatenate([supply, demand])

# Ustawiamy granice dla zmiennych decyzyjnych
x0_bounds = (0, None)

# Tworzymy listę granic dla każdej zmiennej decyzyjnej
bounds = [x0_bounds] * (supply.shape[0] * demand.shape[0])

# Rozwiązujemy problem programowania liniowego
res = linprog(-c, A_ub=A, b_ub=b, bounds=bounds, method='highs')

unit_income = sale_prices - np.expand_dims(purchase_costs, axis=1) - transport_costs

# Wyświetlamy macierz indywidualnych zysków
print("Macierz indywidualnych zysków:")
print(unit_income)


# Wyświetlamy optymalny plan
print("Optymalny plan:")
print(res.x.reshape(supply.shape[0], demand.shape[0]))

# Obliczamy i wyświetlamy całkowity koszt zakupu, całkowity koszt transportu, przychód i zysk
total_purchase_cost = np.sum(res.x * np.repeat(purchase_costs, demand.shape[0]))
total_transport_cost = np.sum(res.x * transport_costs.flatten())
revenue = np.sum(res.x * np.tile(sale_prices, supply.shape[0]))
profit = revenue - total_purchase_cost - total_transport_cost
print(f"Całkowity koszt zakupu: {total_purchase_cost}")
print(f"Całkowity koszt transportu: {total_transport_cost}")
print(f"Całkowity koszt: {total_transport_cost + total_purchase_cost}")
print(f"Przychód: {revenue}")
print(f"Zysk: {profit}")
