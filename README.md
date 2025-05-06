# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.  

# Restaurant App  
  

## Ryhmän jäsenet  
- **Axel Nokireki**  
- **Georgii Afanasev/GeorgiiAf**  
- **Kreetz**  

## Sovelluksen idea ja kohderyhmä  
**Kohderyhmä:**  
- Nuoret aikuiset, mutta sovellus soveltuu kaikille ruoan tilaajille.  

**Sovelluksen tarkoitus:**  
- Tarjoaa käyttäjille mahdollisuuden tilata ruokaa, jättää arvosteluja ja seurata tilaushistoriaa.  
- Antaa ylläpitäjille (admin) työkalut ruokalistan hallintaan, tilausten käsittelyyn ja allergiatietojen asettamiseen.  

**Pääominaisuudet:**  
✅ **Asiakas:**  
- Rekisteröityminen & kirjautuminen  
- Ruokien selaus ja ostoskoriin lisäys  
- Tilauksen tekeminen ja maksaminen  
- Arvostelujen kirjoittaminen  
- Tilaushistorian tarkastelu  
- Kielen vaihto (suomi/englanti)  
- Teeman vaihto (vaalea/tumma tila)  

✅ **Admin:**  
- Ruokalistan hallinta (lisäys/muokkaus/poisto)  
- Ruokien kuvien lisääminen  
- Allergiatietojen asettaminen  
- Tilauksien hyväksyntä ja seuranta  

## Sovelluksen toiminnallisuudet  
### Core Features  
- **Käyttäjähallinta**  
  - Rekisteröityminen, kirjautuminen ja profiilin hallinta.  
- **Ruokalistan selaus**  
  - Ruokien suodatus kategorian mukaan.  
- **Ostoskorijärjestelmä**  
  - Ruokien lisäys/poisto, määrän muokkaus ja tilauksen lähetys.  
- **Kieli- ja teemavaihto**  
  - Vaihda sovelluksen kieltä (suomi/englanti)  
  - Vaihda väriteemaa (vaalea/tumma)  

### Advanced Features  
- **Arvostelut & rating-järjestelmä**  
  - Käyttäjät voivat antaa palautetta ja tähti-arvosanoja.  
- **Tilaushistoria**  
  - Käyttäjä näkee aikaisemmat tilaukset ja niiden tiedot.  
- **Admin Dashboard**  
  - Ylläpitäjä voi hallita ruokia, tilauksia.  


### Kuvakaappaukset  
![Kirjautumissivu](/public/login.png)  
![Ruokalistasivu](/public/menu.png)  

## Ohjeistus miten sovellus testataan  

### 1. VPN-yhteys vaaditaan!  
🔌 **Koulun VPN pitää olla päällä ennen testaamista:**  
- Ota yhteys osoitteeseen: [https://10.120.34.122/](https://10.120.34.122/)  

### 2. Testaa ominaisuuksia  

#### Asiakkaan toiminnot:  
1. **Kieli- ja teemavaihto**  
   - Vaihda kieltä asetusvalikosta (testaa molemmat kielet)  
   - Vaihda teemaa (tarkista että tumma/vaalea toimii)  
2. **Tilausprosessi**  
   - Lisää ruokia ostoskoriin  
   - Tee testitilaus
   - Kirjoita arvostelu tilaukselle 

#### Admin-toiminnot:  
1. **Ruokalistan hallinta**  
   - Lisää uusi ruoka kuvineen  
   - Muokkaa olemassa olevaa ruokaa 
