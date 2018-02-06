# Teknisiä selityksiä

Tässä dokumentissa valotan työni teknisiä konsepteja sekä miten koko sovellus toimii. On merkitsemisen arvoista että tämä dokumentti on suomeksi (Johtuen siitä että se on osa hakemustani), kun taas koodissa kommentit ovat englanniksi.

## Web-applikaatio

### Eventit

Yleistoteutus on suoritettu Reactilla ja sen perustoimintoja kuten props- ja state-järjestelmiä käytetään useasti. Tässä projektissa olen tavallisesta poiketen rakentanut järjestelmän jossa eri komponentit "keskustelevat" toistensa kanssa.

Käytännössä kyseessä on browser-käyttöön tarkoitettu EventEmitteri, Node.js-tyyliin. Sen koodi tulee NPM-paketista [wolfy87-eventemitter](https://npmjs.com/wolfy87-eventemitter), ja tässä projektissa sitä on abstraktoitu hyvin kevyesti käytön helpottamiseksi ([client/system/dispatcher.js](client/system/dispatcher.js)).

Tämä tarkoittaa sitä että tietojen lähetys ei mene propsien tai callback-funktioiden kautta, vaan signaaleja ja lisätietoja voi lähettää komponenttien välillä hierarkiasta riippumatta. Tämä helpottaa ohjelmointia ja mahdollistaa suuremman vapauden designissa.

Event-pohjaisen konseptin ainoa huono puoli on se että eventit, niiden lähettäjät ja vastaanottajat on dokumentoitava jotenkin jotta ohjelmoija voi saada selvää mikä tekee mitäkin. Lista eventeistä tietoineen on alla.

| Eventti | Parametrit | Lähettäjä(t) | Vastaanottaja(t) | Tarkoitus |
| ------- | ---------- | ------------ | ---------------- | --------- |
| TOGGLE\_TABLE\_VIEW | | ControlToolbar.jsx | Map.jsx, WeatherTable.jsx, Main.jsx | Vaihtaa kartta- ja taulukkotilan välillä. |
| REQUEST_DIALOG | Paikan array-indeksi tai ei mitään | ControlToolbar.jsx, LocationInfo.jsx | ObservationDialog.jsx | Avaa dialogin säähavainnon kirjaamiseen. |
| LOCATION_SELECT | Paikan array-indeksi | ControlToolbar.jsx | Map.jsx | Muuttaa kartan keskusta valitun havaintopisteen perusteella. |
| MARKER_CLICKED | [ Paikan nimi, maa, kuva ] | ControlToolbar.jsx*, MapMarker.jsx | WeatherSidebar.jsx | Avaa ja sulkee sivupaneelin jossa havaintopisteen tiedot ovat. |
| SUBMIT\_STATE\_CHANGE | true/false (True = pois, false = päälle) | LocationPicker.jsx, TemperatureField.jsx | ObservationDialog.jsx | Vaihtaa Tallenna-napin tilaa. |
| REQUEST_ALERT | [ Otsikko tai ei mitään, sisältö ] | ObservationDialog.jsx | Alert.jsx | Näyttää geneerisen alertin jos jokin menee vikaan applikaatiossa. |
| REQUEST\_ERROR\_OVERLAY | [ Viesti, tarkemmat tiedot, koodi ] | apiHandler.js | ErrorOverlay.jsx | Näyttää dialogin jota ei voi sulkea. Tarkoitettu suuriin virheisiin. |
| NEW_DATA | Paikan nimi | apiHandler.js | WeatherTable.jsx, LocationInfo.jsx | Ilmoittaa että uutta tietoa on vastaanotettu API:sta. |

*: ControlToolbar.jsx lähettää eventin MARKER\_CLICKED (Ilman käyttäjän pyyntöä) eventin LOCATION\_SELECT ohella avatakseen sivupaneelin automaattisesti.

### Komponentit, tyylit sekä CSS

Applikaation komponenttistruktuuri on rakennettu yksittäisen komponentin luettavuuden maksimoimiseksi, mikä taas tarkoittaa suurempaa tiedostomäärää. Komponentin nimen on tarkoitus antaa jonkin sorttista osviittaa siitä mihin se on tarkoitettu ja mihin se kuuluu. Geneeriset nimet kuten **Tip.jsx** sekä **Alert.jsx** viittaavat monikäyttöiseen ja/tai pääasialliseen komponenttiin, kun taas tarkemmat nimet kuten **LocationPicker.jsx** sekä **TemperatureField.jsx** viittaavat komponentteihin jotka kuuluvat suuremman sisään.

Suurin osa komponenteista renderöidään ja näytetään vierailijalle sivun latautuessa, mutta jotkut ainoastaan renderöidään eikä niitä oteta esiin ennenkuin jokin eventti laukaistaan. Esimerkkejä tästä ovat **ObservationDialog.jsx** ja **WeatherSidebar.jsx**.

Vaikka suurin osa tyyleistä ja CSS:stä tulee Material-UI-järjestelmästä, osa on itse määriteltyä tätä applikaatiota varten. Tyylitiedot ja CSS löytyvät komponenteista itsestään. Syy tähän on organisaatio - on helppo muistaa mikä tyylielementti kuuluu mihinkin, jos tyylitiedot ovat komponentin sisällä.

Poikkeukset tähän sääntöön ovat Roboto-fontti, Material Icons-fontti sekä sivuston taustaväri. Sivuston taustavärin on peitettävä koko sivu (Komponentit eivät tätä mahdollista), ja fonttien on oltava käytettävissä joka paikassa. Täten nämä tyylitiedot ovat tiedostossa [client/assets/css/common.css](client/assets/css/common.css).

### Client-puolen turvallisuus ja syöttövalidaatio

Tieteellisen tarkkuuden varmistamiseksi tämä applikaatio suorittaa monivaiheisen ja tarkan syöttövalidaation ennenkuin data lähetetään serverille.

Tallenna-nappi pysyy poissa päältä havaintopistedialogin auetessa, eikä avaudu ennenkuin molemmat parametrit (Paikannimi ja lämpötila) on syötetty kenttiin. Tässä välissä voi totta kai tapahtua paljon, joten tässä metodit jotka olen ottanut käyttöön väärinkäytön estämiseksi.

Ensinnäkin tietojen validaatio tapahtuu verkkoselaimen paikallismuistin kautta. Jotta Tallenna-nappi alkaa toimimaan on sekä paikka- että lämpötilatietojen oltava paikallismuistissa. Kolme avainta tarvitaan tietojen lähettämiseksi - jos yksikin puuttuu tai se ei ole validi, tallentaminen poistetaan käytöstä ja käyttäjää pyydetään korjaamaan tiedot. Syy paikallismuistin käyttöön on lähinnä se että jos tämä tehtäisiin eventtien kautta, vastaanottajan pitäisi "ampua takaisin" mikä voi pahimmassa tapauksessa aiheuttaa loputtoman kierteen ja parhaimmassa tapauksessa olla vaikeasti ymmärrettävää.

Lämpötilan syöttökenttä on haavoittuvaisin komponentti koko dialogissa. Lähtökohtana on se että siihen voi syöttää ainoastaan numeroita (DOM-tason sääntö). Jos tätä elementtiä modifioidaan verkkoinspektorin kautta ja siihen syötetään viallista dataa, Tallenna-nappi poistetaan käytöstä ja sitä ei avata ennenkuin kenttään syötetään oikeanlaista dataa.

Ennen lähetystä API:lle sovellus tarkistaa vielä kerran että tiedot ovat paikallismuistissa ja että tiedot ovat valideja. Jos tiedot eivät ole valideja tai ne puuttuvat, lähetys keskeytyy ja käyttäjää pyydetään syöttämään tiedot uudelleen. Tällä estetään sekä paikallismuistin peukalointi että varaudutaan virheisiin tallennuksen aikana tai sen jälkeen.

## REST API

### Serveripuolen turvallisuus ja syöttövalidaatio

Koska kyseessä on suhteellisen yksinkertainen web-sovellus, vaatii API ainoastaan tunnistautumisen käyttäjänimen ja salasanan kautta (Basic authentication). Nämä voidaan määrittää tiedostossa [server/.env](server/.env.example).

**Huomautus:** Kehitystilassa (Kun NODE_ENV = development) API ei vaadi tunnistautumista yksinkertaisuuden vuoksi. Vasta produktiotilassa tunnistautuminen kytketään päälle.

Jos käyttäjä kaikesta huolimatta löytäisi API:n, suorittaa API saman syöttövalidaation kuin client-puolella ennen tallennusta tietokantaan (Vrt. havaintodialogia ([client/components/ObservationDialog.jsx](client/components/ObservationDialog.jsx), funktio checkAndSubmit(), viivat 47-62) sekä säätietojen tallennusta API:ssa ([server/routes/storeWeather.js](server/routes/storeWeather.js), viivat 11-20)).

RethinkDB-tietokantaa käytetään hard durability-tilassa (https://rethinkdb.com/docs/consistency/#settings). Lisäksi sille voidaan määrittää erillinen osoite serverin .env-konfiguraatiossa. Tämä tarkoittaa sitä, että se voidaan asettaa serverille joka on erillään API-serveristä, täten lisäten datan turvallisuustasoa. RethinkDB-serveriä voidaan myös käyttää cluster-tilassa, mutta sitä en ole tässä tehnyt.
