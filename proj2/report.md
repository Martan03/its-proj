# ITS Projekt 1

- **Autor:** Martin Slezák (xsleza26)
- **Datum:** 2025-04-29

## Přidání testů

Žádné testy nebyly upraveny, byly však přidány testy zobrazení chybové hlášky
v případě, že API response není v pořádku.

Jedná se o testy:
| Test name                                        | Cypress file      | Line  |
|--------------------------------------------------|-------------------|-------|
| Error message on booking API error (25)          | booking.cy.js     |  129  |
| Error message on save customer API error (26)    | customer.cy.js    |  177  |
| Error message on save appointment API error (27) | appointment.cy.js |  160  |

## Tabulka mapování BDD scénářů na zdrojové kódy

| Scenario file       | Line | Cypress file      | Line |
|---------------------|------|-------------------|------|
| booking.feature     |   4  | booking.cy.js     |  21  |
| booking.feature     |  13  | booking.cy.js     |  35  |
| booking.feature     |  19  | booking.cy.js     |  47  |
| booking.feature     |  26  | booking.cy.js     |  60  |
| booking.feature     |  33  | booking.cy.js     |  79  |
| booking.feature     |  39  | booking.cy.js     |  94  |
| booking.feature     |  45  | booking.cy.js     | 111  |
| appointment.feature |   4  | appointment.cy.js |  24  |
| appointment.feature |  10  | appointment.cy.js |  31  |
| appointment.feature |  18  | appointment.cy.js |  57  |
| appointment.feature |  24  | appointment.cy.js |  71  |
| appointment.feature |  34  | appointment.cy.js |  99  |
| appointment.feature |  41  | appointment.cy.js | 120  |
| appointment.feature |  47  | appointment.cy.js | 128  |
| appointment.feature |  53  | appointment.cy.js | 141  |
| customer.feature    |   4  | customer.cy.js    |  26  |
| customer.feature    |  10  | customer.cy.js    |  39  |
| customer.feature    |  18  | customer.cy.js    |  62  |
| customer.feature    |  23  | customer.cy.js    |  75  |
| customer.feature    |  32  | customer.cy.js    | 101  |
| customer.feature    |  39  | customer.cy.js    | 122  |
| customer.feature    |  45  | customer.cy.js    | 130  |
| customer.feature    |  53  | customer.cy.js    | 157  |
| customer.feature    |  59  | customer.cy.js    | 167  |
