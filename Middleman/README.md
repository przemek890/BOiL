# Na początku wejdz do katalogu Middleman:

> cd ./Middleman
>

---

## Tworzenie środowiska wirtualnego venv:

## Windows:
- Utwórz środowisko wirtualne za pomocą polecenia: 
> python -m venv venv
- Aktywuj środowisko wirtualne za pomocą polecenia: 
> venv\Scripts\activate

## MacOS:
- Utwórz środowisko wirtualne za pomocą polecenia:
> python3 -m venv venv
- Aktywuj środowisko wirtualne za pomocą polecenia:
> source venv/bin/activate

---

## Instalacja pakietów zależnych:
> pip install -r requirements.txt
>

---
## Frontend:
- Instalacja modułów:
> cd ./src/view
> 
> npm install

- Uruchomienie aplikacji:
> npm start 

---

## Odpalenie serwera Flask:

## MacOS:
> python3 main.py

## Windows:
> python main.py

---

# Jak uruchomić bazę:

> docker build -t middleman_img .
> docker run -p 27017:27017 middleman_img

# Baza dostępna jest pod (np. poprzez MongoDB Compass):

> mongodb://root:root@localhost:27017/middleman

---

## Testy:
> Curl lub Postman

---

## Tablica Trello:
> https://trello.com/b/lR4rTwb9/boil
