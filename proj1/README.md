# ITS Projekt 1

- **Autor:** Martin Slezák (xsleza26)
- **Datum:** 2025-04-01

## Matice pokrytí artefaktů

Čísla testů jednoznačně identifikují scénář v souborech `.feature`.

| Page                     | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 |
|--------------------------|---|---|---|---|---|---|---|---|---|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|
| Booking - date & time    | x |   |   |   | x |   | x |   |   |    |    |    |    |    |    |    |    |    |    |    |    |    |    |    |
| Booking - customer info. | x | x | x | x | x | x | x |   |   |    |    |    |    |    |    |    |    |    |    |    |    |    |    |    |
| Booking - confirmation   | x |   |   |   |   | x | x |   |   |    |    |    |    |    |    |    |    |    |    |    |    |    |    |    |
| Appointment calendar     |   |   |   |   |   |   |   | x | x | x  | x  |    | x  | x  | x  |    |    |    |    |    |    |    |    |    |
| Appointment editor       |   |   |   |   |   |   |   |   |   | x  | x  | x  |    | x  | x  |    |    |    |    |    |    |    |    |    |
| Customer details         |   |   |   |   |   |   |   |   |   |    |    |    |    |    |    | x  | x  | x  | x  |    | x  | x  | x  | x  |
| Customer editor          |   |   |   |   |   |   |   |   |   |    |    |    |    |    |    |    |    | x  | x  | x  | x  | x  | x  | x  |

## Matice pokrytí aktivit

| Activities              | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 |
|-------------------------|---|---|---|---|---|---|---|---|---|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|
| Booking appointment     | x |   |   |   |   |   |   |   |   |    |    |    |    |    |    |    |    |    |    |    |    |    |    |    |
| Check required fields   | x | x | x |   |   |   |   |   |   |    | x  | x  |    |    |    |    |    |    | x  | x  |    | x  |    |    |
| Missing optional fields |   | x |   |   |   |   |   |   |   |    |    |    |    |    |    |    |    |    |    |    |    |    |    |    |
| Check max. length       |   |   |   | x |   |   |   |   |   |    |    |    |    |    |    |    |    |    |    |    |    |    |    |    |
| Preserving state        |   |   | x | x | x | x | x |   |   |    |    | x  |    |    |    |    |    |    |    | x  |    |    |    |    |
| Inform about action     | x |   |   |   |   |   |   |   |   |    | x  |    |    |    |    |    | x  |    | x  |    |    | x  |    |    |
| Inform about field err. |   |   | x | x |   |   |   |   |   |    |    | x  |    |    |    |    |    |    |    | x  |    |    |    |    |
| Updating language       |   |   |   |   |   |   | x |   |   |    |    |    |    |    |    |    |    |    |    |    |    |    |    |    |
| Open details            |   |   |   |   |   |   |   | x |   |    |    |    |    |    |    | x  |    |    | x  |    |    |    | x  | x  |
| Open editor             |   |   |   |   |   |   |   |   |   | x  |    |    |    |    |    |    |    | x  |    |    |    |    |    |    |
| Open creator editor     |   |   |   |   |   |   |   |   |   |    |    |    |    |    | x  |    |    |    |    |    | x  |    |    |    |
| Item created/updated    |   |   |   |   |   |   |   |   |   |    | x  |    |    |    |    |    |    |    | x  |    |    | x  |    |    |
| Item deleted            |   |   |   |   |   |   |   |   | x |    |    |    |    |    |    |    | x  |    |    |    |    |    |    |    |
| Action confirmation     | x |   |   |   |   |   |   |   | x |    |    |    |    |    |    |    | x  |    |    |    |    |    |    |    |
| Cancel editor           |   |   |   |   |   |   |   |   |   |    |    |    |    | x  |    |    |    |    |    |    |    |    | x  | x  |
| Close pop-up            |   |   |   |   |   |   |   |   |   |    |    |    | x  |    |    |    |    |    |    |    |    |    |    |    |


## Matice Feature-Test

| Feature file        | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 |
|---------------------|---|---|---|---|---|---|---|---|---|----|----|----|----|----|----|----|----|----|----|----|----|----|----|----|
| booking.feature     | x | x | x | x | x | x | x |   |   |    |    |    |    |    |    |    |    |    |    |    |    |    |    |    |
| appointment.feature |   |   |   |   |   |   |   | x | x | x  | x  | x  | x  | x  | x  |    |    |    |    |    |    |    |    |    |
| customer.feature    |   |   |   |   |   |   |   |   |   |    |    |    |    |    |    | x  | x  | x  | x  | x  | x  | x  | x  | x  |
