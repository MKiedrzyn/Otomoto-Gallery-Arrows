# ⌨️ Otomoto: strzałki w podglądzie zdjęć

Rozszerzenie przeglądarki Chrome (i innych przeglądarek na Chromium), które pozwala przewijać zdjęcia w powiększonym podglądzie aukcji na **Otomoto** za pomocą **strzałek w lewo i w prawo** na klawiaturze.

![Demo](otomoto-gallery-arrows-demo.gif)<img width="1438" height="662" alt="bceda755-1bf1-4e25-bdd4-59ea6a9238d1" src="https://github.com/user-attachments/assets/bd3cfc34-e960-4c8a-abfb-7f7ac7121866" />


## 🔧 Funkcje

- Strzałka w prawo przechodzi do następnego zdjęcia, strzałka w lewo do poprzedniego.
- Działa tylko wtedy, gdy powiększony podgląd zdjęć jest otwarty.
- Nie przeszkadza przy pisaniu w polach tekstowych (wyszukiwarka, formularze).
- Nie reaguje na strzałki naciśnięte razem z `Shift`, `Ctrl`, `Alt` lub `Cmd`, więc skróty przeglądarki działają bez zmian.

## ⚙️ Jak to działa?

Skrypt `content.js` jest wstrzykiwany na stronach `otomoto.pl` i nasłuchuje zdarzeń `keydown`. Po naciśnięciu strzałki:

1. Sprawdza, czy użytkownik nie pisze w polu `input`, `textarea`, `select` lub w elemencie `contentEditable`.
2. Szuka na stronie powiększonego podglądu (`[data-testid="expanded-gallery"]`). Jeśli go nie ma, nic nie robi. Dzięki temu nie koliduje ze zwykłą galerią na stronie aukcji, która ma własne strzałki.
3. Wewnątrz podglądu znajduje przycisk „Następny obraz" lub „Poprzedni obraz" i symuluje kliknięcie.
4. Blokuje domyślną obsługę zdarzenia, żeby zdjęcie nie przewinęło się dwa razy, gdyby serwis kiedyś dodał własną obsługę klawiatury.

## 📂 Struktura plików

- `manifest.json` – manifest rozszerzenia zgodny ze specyfikacją Manifest V3.
- `content.js` – skrypt dodający obsługę klawiatury w podglądzie zdjęć.

## 🛠️ Wymagane uprawnienia

Rozszerzenie **nie wymaga żadnych specjalnych uprawnień** (`permissions`). Skrypt jest uruchamiany wyłącznie na tych adresach:

```
"matches": [
  "https://www.otomoto.pl/*",
  "https://otomoto.pl/*"
]
```

## 🚀 Instalacja (tryb deweloperski)

1. Pobierz repozytorium (**Code → Download ZIP**) i rozpakuj je.
2. Wejdź na `chrome://extensions/`.
3. Włącz tryb deweloperski (Developer Mode).
4. Kliknij "Załaduj rozszerzenie bez pakietu" (Load unpacked).
5. Wskaż folder zawierający pliki `manifest.json` i `content.js`.
6. Otwórz dowolną aukcję na Otomoto, kliknij zdjęcie, aby otworzyć powiększony podgląd, i przewijaj zdjęcia strzałkami.

## 📌 Uwagi

- Rozszerzenie opiera się na elementach strony Otomoto (`data-testid` oraz `aria-label`). Jeśli serwis zmieni swój kod, selektory w `content.js` (stałe `GALLERY` i `BUTTONS`) mogą wymagać aktualizacji.
- Po zainstalowaniu odśwież otwarte karty Otomoto, żeby skrypt się załadował.
- To nieoficjalne rozszerzenie, niepowiązane z Otomoto.
