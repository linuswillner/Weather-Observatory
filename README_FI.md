Jos haluat lukea tämän dokumentin englanniksi, klikkaa [tästä](README.md).

# reaktor-kesatyo-2018

Reaktorin kesätyön 2018 ennakkotehtävään tehty säähavaintosovellus.

Tämä README-tiedosto kertoo sovelluksesta yleisesti. Jos haluat tarkempaa tietoa siitä miten tekninen toteutus on suoritettu, katso [DOC.md](DOC.md).

## Struktuuri

```
|
├── bin/ - Kehityksessä käytettävät binääritiedostot
│   └── rethinkdb.exe - Kehitykseen tarkoitettu RethinkDB-binääri
|
├── client/ - Reactilla rakennettu web-applikaatio
│   ├── assets/ - Kuvat sekä CSS
│   ├── components/ - React-komponentit
|   ├── layouts/ - Applikaation layoutti
|   ├── system/ - Applikaation backend-koodi
│   ├── App.jsx - Applikaation perusta
│   ├── config.example.js - Client-puolen konfiguraatiotiedosto (Malli)
│   ├── index.html - HTML-dokumenttipohja applikaatiolle
│   └── index.jsx - Applikaation renderöinti
|
├── server/ - Expressillä toteutettu REST API tietosäilönä
│   ├── db/ - Tietokantamoottori
│   ├── routes/ - API-reitit
│   ├── .env.example - Prosessimuuttujat production-tilaa varten (Malli)
│   └── api.js - API-järjestelmän perusta
```

## Käynnistysskriptit

Ennen käynnistystä, tarkista että olet tehnyt seuraavat asiat:

- Kloonannut tämän repositorion komennolla **git clone https://github.com/linuswillner/Weather-Observatory**
- Asentanut dependencyt komennolla **npm install**
- Luonut tiedostot **server/.env** ja **client/config.js** niiden mallien pohjalta
- Luonut tietokannan komennolla **npm run dbcreate**

**npm start**: Käynnistää Webpackin dev-serverin jonka jälkeen applikaatio on näkyvissä osoitteessa http://localhost:8000.

**npm run start-api**: Käynnistää kehitystilaan tarkoitetun RethinkDB-serverin ja sen jälkeen REST API:n. Näitä voi tarkastella ja kokeilla esimerkiksi Postmanilla (https://getpostman.com) (API, http://localhost:8010) ja RethinkDB:n oman web-dashboardin kautta (http://localhost:8080).

**Huomautus:** On tärkeää että API:n käynnistys suoritetaan ennen web-applikaation käynnistystä, muutoin ohjelma ei näytä tietoja ennenkuin API pystyy vastaamaan.

## Käytettyjä teknologioita

Perustana on perinteinen React-applikaatio (React DOM, Babel, Webpack).

Projektin käyttöliittymä pohjautuu Googlen Material-designiin. Käyttöliittymä on toteutettu material-ui-komponenttikirjastolla (http://material-ui.com). Käyttöliittymässä on myös käytössä Bootstrapin grid-järjestelmä (https://npmjs.com/package/react-grid-system).

Styleguidena on käytössä Standard (https://standardjs.com) ja lintterinä ESLint (https://eslint.org).

Tietokantana toimii RethinkDB (https://rethinkdb.com) ja client-server-kommunikaatio on suoritettu Express.js:llä (https://expressjs.com).
