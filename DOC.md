# Teknisiä selityksiä sovellusta

Tässä dokumentissa valotan työni teknisiä konsepteja sekä miten koko sovellus toimii.

## Web-applikaatio

### Eventit

Yleistoteutus on suoritettu Reactilla ja sen perustoimintoja kuten props- ja state-järjestelmiä käytetään useasti. Tässä projektissa olen tavallisesta poiketen rakentanut järjestelmän jossa eri komponentit "keskustelevat" toistensa kanssa.

Käytännössä kyseessä on browser-käyttöön tarkoitettu EventEmitteri, Node.js:n inspiraatiosta. Sen koodi tulee NPM-paketista **wolfy87-eventemitter**, ja tässä projektissa sitä on abstraktoitu hyvin kevyesti käytön helpottamiseksi (Funktiot `emit()` ja `emitOne()`).

Tämä tarkoittaa sitä että ohjelmoidessa ei tarvitse miettiä kuinka monta komponenttia ylöspäin jokin pitää propsien kautta lähettää, vaan signaaleja ja lisätietoja voi lähettää komponenttien välillä hierarkiasta riippumatta.

Event-pohjaisen konseptin ainoa huono puoli on se että eventit, niiden lähettäjät ja vastaanottaja on dokumentoitava jotenkin jotta ohjelmoija voi saada selvää mikä tekee mitäkin. Lista eventeistä tietoineen on alla.

**Huom:** Ainoastaan layout- ja komponettitiedostot lähettävät ja vastaanottavat eventtejä.

| Eventti | Lähettäjä(t) | Vastaanottaja(t) | Tarkoitus |
| ------- | ------------ | ---------------- | --------- |
| TOGGLE\_TABLE\_VIEW | ControlToolbar.jsx | Map.jsx, WeatherTable.jsx, Main.jsx | Vaihtaa kartta- ja taulukkotilan välillä. |
| REQUEST_DIALOG | ControlToolbar.jsx, LocationInfo.jsx | ObservationDialog.jsx | Avaa dialogin säähavainnon kirjaamiseen. |
| LOCATION_SELECT | ControlToolbar.jsx | Map.jsx | Muuttaa kartan keskusta valitun havaintopisteen perusteella. |
| MARKER_CLICKED | ControlToolbar.jsx*, Marker.jsx | WeatherSidebar.jsx | Avaa ja sulkee sivupaneelin jossa havaintopisteen tiedot ovat. |

*: ControlToolbar.jsx lähettää eventin MARKER\_CLICKED (Ilman käyttäjän pyyntöä) eventin LOCATION\_SELECT ohella avatakseen sivupaneelin automaattisesti.

### Tyylit ja CSS

Vaikka suurin osa tyyleistä ja CSS:stä tulee Material-UI-järjestelmästä, osa on itse määriteltyä tätä applikaatiota varten. Tyylitiedot ja CSS löytyvät komponenteista itsestään. Syy tähän on organisaatio - on helppo muistaa mikä tyylielementti kuuluu mihinkin, jos tyylitiedot ovat komponentin sisällä.

Poikkeukset tähän sääntöön ovat Roboto-fontti, Material Icons-fontti sekä sivuston taustaväri. Sivuston taustavärin on peitettävä koko sivu (Komponentit eivät tätä mahdollista), ja fonttien on oltava käytettävissä joka paikassa. Täten nämä tyylitiedot ovat tiedostossa client/assets/css/style.css.
