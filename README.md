# reaktor-kesatyo-2018

Reaktorin kesätyön 2018 ennakkotehtävä

## Struktuuri

```
|
├── bin/ - Kehityksessä käytettävät binääritiedostot
│   ├── rethinkdb.exe - Kehitykseen tarkoitettu RethinkDB-binääri
|
├── client/ - Reactilla rakennettu web-applikaatio
│   ├── assets/ - Kuvat sekä CSS
│   ├── components/ - React-komponentit
|   ├── layouts/ - Applikaation layoutti
|   ├── system/ - Applikaation backend-koodi
│   ├── App.jsx - Applikaation perusta
│   ├── config.example.js - Client-puolen konfiguraatiotiedoston pohja
│   ├── index.html - HTML-dokumenttipohja applikaatiolle
│   ├── index.jsx - Applikaation renderöinti
|
├── server/ - Expressillä toteutettu REST API tietosäilönä
│   ├── db/ - Tietokantamoottori
│   ├── routes/ - API-reitit
│   ├── .env.example - Prosessimuuttujat production-tilaa varten (Pohja)
│   ├── api.js - API-järjestelmän perusta
```

## Käynnistysskriptit

Olettaen että olet jo kloonannut tämän repositorion (**git clone https://github.com/linuswillner/reaktor-kesatyo-2018**) sekä luonut tiedostot **server/.env** ja **client/config.js** mallien pohjalta:

**npm start**: Käynnistää Webpackin dev-serverin jonka jälkeen applikaatio on näkyvissä osoitteessa http://localhost:8000.

**npm run start-api**: Käynnistää kehitystilaan tarkoitetun RethinkDB-serverin ja sen jälkeen REST API:n. Näitä voi tarkastella ja kokeilla esimerkiksi Postmanilla (https://getpostman.com) (API, http://localhost:8010) ja RethinkDB:n oman web-dashboardin kautta (http://localhost:8080).

**Huom:** On tärkeää että API:n käynnistys suoritetaan ennen web-applikaation käynnistystä, muutoin ohjelma ei näytä tietoja ennenkuin API pystyy vastaamaan!

## Muuta tietoa

Projektin käyttöliittymä pohjautuu Googlen Material-designiin, joka on toteutettu material-ui-komponenttikirjastolla (http://material-ui.com).

Käyttöliittymässä on myös käytössä Bootstrapin grid-järjestelmä (react-grid-system).

Styleguidena on käytössä Standard (https://standardjs.com) ja lintterinä ESLint (https://eslint.org).

Tietokantana toimii RethinkDB (https://rethinkdb.com) ja tiedot siirretään sivulta serveripuolelle Express.js:llä (https://expressjs.com/).
