export default {
  app: {
    loading: "Latautuu...",
    modal: {
      button: "Lähetä",
      cancel: "Peruuta",
    },
    header: {
      home: "Home",
      menu: "Menu",
      language: "Kieli",
      feedback: "Palaute",
      cart: "Ostoskori",
      logout: "Kirjaudu ulos",
      login: "Kirjaudu",
      about: "About us",
      profile: "Profiili",
    },
    order: {
      create: "Tee tilaus",
      info: "Toimitustiedot",
      name: "Etunimi",
      surname: "Sukunimi",
      address: "Osoite",
      phone: "Puhelin",
      email: "Sähköposti",
      time: "Toimitusaika",
      id: "Tilausnumero",
      open: "Avoimet tilaukset",
      completed: "Valmistuneet tilaukset",
      noPrice: "ei hintaa",
      none: "Ei tilauksia",
      failedFetch: "Tilausten hakeminen epäonnistui",
      failedReservationFetch: "Varaus tuotteiden hakeminen epäonnistui",
      removedProduct: "Poistettu tuote",
      status: "Tila",
      history: "Historia",
      moreItems: "+${count} muuta",
      delivered: "Toimitettu",
      noHistory: "Ei tilaushistoriaa",
      choice: {
        time: "Valitse toimitusaika",
        fast: "Mahdollisimman pian",
        half: "30 minuutin päästä",
        hour: "1 tunnin päästä",
      },
      payment: {
        method: "Maksutapa",
        cash: "Käteisellä toimituksen yhteydessä",
        cashInfo: "Maksa kun tuotteet saapuvat perille",
        card: "Korttimaksu",
        cardInfo: "Visa, Mastercard, American Express",
        cardInput: "Syötä korttitiedot",
        mobilepayInfo: "Maksa helposti puhelimellasi",
        bank: "Pankkisiirto",
        bankInfo: "Tilisiirto pankkitilille",
        input: {
          number: "Kortin numero",
          effective: "(KK/VV)",
        },
      },
    },
    feedback: {
      commentPlaceholder: "Kirjoita kommentti...",
      selectOrder: "valitse tilaus",
      title: "Palaute",
      name: "Etunimi",
      surname: "Sukunimi",
      email: "Sähköposti",
      topic: "Mitä asianne koskee:",
      dropdown: {
        product: "Tuote",
        reservation: "Tilaus",
        general: "Yleistä",
        service: "Asiakaspalvelu",
      },
      rating: "Arvio:",
      comment: "Kommentti",
      commentInfo: "Teidän kommentti...",
      send: "Lähetä palaute",
    },
    login: {
      title: "Kirjaudu sisään",
      email: "Sähköposti",
      password: "Salasana",
      input: "Kirjaudu",
      forgot: "Unohduiko salasana?",
      reset: "Palauta",
      create: "Ei ole tiliä? Rekisteröidy tästä.",
      register: "Kirjaudu",
    },
    home: {
      info: {
        hours: "Aukioloajat",
        mofri: "Ma-Pe",
        saturday: "La",
        sunday: "Su",
        price: "Hinnasto",
        delivery: {
          title: "Toimitus",
          info1: "Toimitus 5€ alle 20€ tilauksille",
          info2: "Ilmainen toimitus yli 20€ tilauksista!",
        },
      },
      burgerSection: {
        order: "Tilaa nyt",
        welcome: "Tervetuloa Burger Palaceen!",
        goofy: `MAISTUVIMMAT BURGERIT KAUPUNGISSA 🔥 
          SYÖ KUIN KUNINGAS – VAIN BURGER PALACEISSA!`,
      },
    },
    dashboard: {
      welcome: "Tervetuloa takaisin!",
      info: "Omat tiedot",
      orders: "Tilaukseni",
      favorite: "Suosikit",
    },
    about: {
      title: "Meidän tarina",
      info1: `Burger Palace perustettiin vuonna 2020 intohimosta laadukkaisiin burgereihin. Alussa olimme pieni katukeittiö, 
        mutta rakkautemme ruokaan ja asiakaspalveluun kasvatti meistä yhden Suomen rakastetuimmista burgeribrändeistä.
        Tänään meillä on ravintoloita ympäri Suomea, ja jokainen niistä tarjoaa käsintehtyjä, mehukkaita burgereita parhaista raaka-aineista.`,
      contacts: "Yhteystiedot",
      email: "Sähköposti:",
      phone: "Puhelin:",
      key: "Avainhenkilöt",
    },
    cart: {
      cart: "Ostoskori",
      empty: "Ostoskori on tyhjä",
      piece: "kpl",
      delete: "Poista",
      products: "Tuotteet",
      delivery: "Toimitus",
      total: "Yhteensä",
      pay: "Maksa tilaus",
    },
    register: {
      register: "Rekisteröidy",
      question: "Onko sinulla jo tili?",
      login: "Kirjaudu sisään",
    },
    products: {
      allergy: "Allergiat",
      add: "Lisää koriin",
      empty: "Tuotetta ei löytynyt.",
      loading: "Ladataan tuotetta...",
      failedFetch: "Tuotteiden hakeminen epäonnistui"
    },
    menu: {
      card: {
        noToken:
          "Sinun täytyy kirjautua sisään lisätäksesi tuotteen koriin. Haluatko kirjautua sisään nyt?",
        add: "Lisää ostoskoriin",
      },
    },

    map: {
      title: "Liikennekartta",
      legend: {
        restaurant: "Ravintola",
        you: "Sinä",
        nearYou: "Pysäkit lähellä sinua",
        nearRestaurant: "Pysäkit lähellä ravintolaa"
      },
      restaurant: "Ravintola",
      restaurantLocation: "Helsingin keskusta",
      you: "Sijaintisi",
      yourLocation: "Nykyinen sijainti",
      distance: "Etäisyys",
      distanceFromRestaurant: "Etäisyys ravintolasta",
      stopsNearYou: "Pysäkit lähellä sinua",
      stopsNearRestaurant: "Pysäkit lähellä ravintolaa",
      more: "lisää",
      loading: "Ladataan karttaa ja tietoja...",
      error: "Tietojen hakeminen epäonnistui"
    },




  },
};
