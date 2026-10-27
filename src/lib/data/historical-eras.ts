export interface HistoricalEntity {
  id: string;
  name: string; // e.g. "Imperiul Roman"
  englishName: string; // "Roman Empire"
  emblem: string; // e.g. "🦅"
  color: string; // Map fill hex
  borderColor?: string;
  ruler: string; // e.g. "Cezar August (Octavianus Augustus)"
  rulerTitle: string; // e.g. "Împărat (Princeps)"
  capital: string; // e.g. "Roma"
  governmentType: string; // e.g. "Principat imperial"
  summary: string;
  keyEvents: string[];
  territoryNumericCodes: string[]; // Numeric codes in TopoJSON
  modernCountriesIncluded: string[]; // Names of modern countries
}

export interface HistoricalEra {
  year: number;
  label: string; // e.g. "Anul 0 d.Hr."
  title: string; // e.g. "Pax Romana & Dinastia Han"
  period: "Antichitate" | "Evul Mediu" | "Epoca Modernă Timpurie" | "Epoca Națiunilor" | "Secolul XX" | "Prezent";
  description: string;
  entities: HistoricalEntity[];
}

export const HISTORICAL_ERAS: HistoricalEra[] = [
  {
    year: 0,
    label: "Anul 0 d.Hr.",
    title: "Pax Romana & Dinastia Han",
    period: "Antichitate",
    description:
      "Lumea antică este dominată de cele două mari superputeri ale emisferei nordice: Imperiul Roman sub Augustus la Marea Mediterană și Dinastia Han în Asia de Est, alături de Regatul Dac în Carpați și Imperiul Part în Orient.",
    entities: [
      {
        id: "roman-empire-0",
        name: "Imperiul Roman (Pax Romana)",
        englishName: "Roman Empire",
        emblem: "🦅",
        color: "#991B1B",
        borderColor: "#EF4444",
        ruler: "Cezar August (Octavianus Augustus)",
        rulerTitle: "Primul Împărat al Romei (Princeps)",
        capital: "Roma",
        governmentType: "Principat imperial autocratic",
        summary:
          "Sub conducerea primului împărat August, Roma atinge apogeul păcii interne (Pax Romana), transformând Mediterana în 'Mare Nostrum' și controlând de la Hispania și Galia până în Egipt și Levant.",
        keyEvents: [
          "27 î.Hr. - Sfârșitul Republicii Romane și proclamarea Principatului de către Octavian Augustus",
          "Crearea rețelei de drumuri romane și a legiunilor permanente",
          "Dezvoltarea dreptului roman și unificarea pieței mediteraneene",
        ],
        territoryNumericCodes: [
          "380", "250", "724", "620", "300", "826", "056", "528", "756",
          "040", "705", "191", "070", "688", "499", "807", "008", "100",
          "792", "760", "422", "376", "400", "818", "434", "788", "012",
          "504", "196"
        ],
        modernCountriesIncluded: [
          "Italia", "Franța", "Spania", "Portugalia", "Grecia", "Marea Britanie (Anglia/Țara Galilor)",
          "Belgia", "Olanda", "Elveția", "Austria", "Slovenia", "Croația", "Bosnia", "Serbia",
          "Bulgaria", "Turcia", "Siria", "Liban", "Israel", "Iordania", "Egipt", "Libia", "Tunisia", "Algeria", "Maroc"
        ],
      },
      {
        id: "dacian-kingdom-0",
        name: "Regatul Dac (Dacia)",
        englishName: "Dacian Kingdom",
        emblem: "🐺",
        color: "#D97706",
        borderColor: "#FBBF24",
        ruler: "Regii Daci (Tradiția Burebista & Decebal)",
        rulerTitle: "Rege al Dacilor",
        capital: "Sarmizegetusa Regia (Munții Orăștiei)",
        governmentType: "Monarhie aristocratică geto-dacă",
        summary:
          "Puternicul regat al dacilor domină arcul carpatic și bazinul Dunării de Jos. Cunoscut pentru cetățile fortificate de la Sarmizegetusa, bogățiile în aur și stindardul legendar Draco.",
        keyEvents: [
          "Marele regat unificat de Burebista",
          "Dezvoltarea cetăților dacice din Munții Orăștiei",
          "Conflictele și tratatele de frontieră cu garnizoanele romane de la Dunăre",
        ],
        territoryNumericCodes: ["642", "498"],
        modernCountriesIncluded: ["România", "Republica Moldova"],
      },
      {
        id: "han-dynasty-0",
        name: "Dinastia Han (Marele Han)",
        englishName: "Han Dynasty",
        emblem: "🐉",
        color: "#CA8A04",
        borderColor: "#FDE047",
        ruler: "Împăratul Ping / Regentul Wang Mang",
        rulerTitle: "Fiul Cerului (Huangdi)",
        capital: "Chang'an (Xi'an)",
        governmentType: "Imperiu birocratic confucianist",
        summary:
          "Una dintre marile epoci de aur ale civilizației chineze. A instituit Drumul Mătăsii, administrația mandarinilor și a stabilit identitatea națională a poporului Han.",
        keyEvents: [
          "Deschiderea Drumului Mătăsii conectând China de Imperiul Roman",
          "Invenția hârtiei și a seismografului",
          "Consolidarea Marelui Zid Chinezesc împotriva nomazilor Xiongnu",
        ],
        territoryNumericCodes: ["156", "408", "410", "704"],
        modernCountriesIncluded: ["China", "Coreea de Nord", "Coreea de Sud", "Vietnam (nord)"],
      },
      {
        id: "parthian-empire-0",
        name: "Imperiul Part (Dinastia Arsacidă)",
        englishName: "Parthian Empire",
        emblem: "🏹",
        color: "#1E3A8A",
        borderColor: "#60A5FA",
        ruler: "Phraates al IV-lea",
        rulerTitle: "Regele Regilor (Shahanshah)",
        capital: "Ctesifon",
        governmentType: "Monarhie feudală iraniană",
        summary:
          "Marele rival oriental al Romei. Războinici călări de elită (arcașii parți) și stăpânii arterelor comerciale dintre Asia Centrală și Mediterana.",
        keyEvents: [
          "Bătălia de la Carrhae (53 î.Hr.) și oprirea expansiunii romane spre est",
          "Controlul rutelor caravanelor pe Drumul Mătăsii",
        ],
        territoryNumericCodes: ["364", "368", "051", "031", "795", "004"],
        modernCountriesIncluded: ["Iran", "Irak", "Armenia", "Azerbaidjan", "Turkmenistan", "Afganistan"],
      },
      {
        id: "satavahana-india-0",
        name: "Regatele Satavahana & Indo-Sciții",
        englishName: "Satavahana Empire & Indo-Scythian Kingdoms",
        emblem: "☸️",
        color: "#C2410C",
        borderColor: "#FB923C",
        ruler: "Dinastia Satavahana",
        rulerTitle: "Maharaja",
        capital: "Pratishthana",
        governmentType: "Monarhie hindusă & budistă",
        summary:
          "Epocă înfloritoare de comerț maritim cu Roma și Egiptul prin porturile de pe coasta vestică a Indiei.",
        keyEvents: [
          "Dezvoltarea peșterilor Ajanta și a artei budiste",
          "Comerțul mirodeniilor și al pietrelor prețioase cu Marea Mediterană",
        ],
        territoryNumericCodes: ["356", "586", "050", "524", "144"],
        modernCountriesIncluded: ["India", "Pakistan", "Bangladesh", "Nepal", "Sri Lanka"],
      },
      {
        id: "germanic-tribes-0",
        name: "Germania Magna (Triburile Germanice)",
        englishName: "Germanic Tribes",
        emblem: "🛡️",
        color: "#166534",
        borderColor: "#4ADE80",
        ruler: "Căpeteniile Tribale (Arminius / Cheruscii)",
        rulerTitle: "Dux & Căpetenii de Război",
        capital: "Așezări tribale fortificate",
        governmentType: "Confederație tribală electivă",
        summary:
          "Pădurile vaste ale Europei Centrale locuite de triburi libere care au oprit expansiunea romană la râul Rin și Elba.",
        keyEvents: [
          "Anul 9 d.Hr. - Bătălia din Pădurea Teutoburgică (victoria lui Arminius asupra legiunilor romane)",
        ],
        territoryNumericCodes: ["276", "208", "578", "752", "616", "203", "703"],
        modernCountriesIncluded: ["Germania", "Danemarca", "Norvegia", "Suedia", "Polonia", "Cehia", "Slovacia"],
      },
      {
        id: "maya-preclassic-0",
        name: "Civilizația Maya (Preclasic Târziu)",
        englishName: "Maya Civilization",
        emblem: "🏛️",
        color: "#059669",
        borderColor: "#34D399",
        ruler: "Regii Cetăților Maya (Ajaw)",
        rulerTitle: "K'uhul Ajaw (Rege Divin)",
        capital: "El Mirador / Tikal",
        governmentType: "Orașe-state teocratice",
        summary:
          "Civilizație avansată din America Centrală, renumită pentru marile piramide, calendarul astronomic precis și scrierea hieroglifică.",
        keyEvents: [
          "Construcția marilor piramide din Bazinul Mirador",
          "Calcularea mișcărilor planetare și a solstițiilor",
        ],
        territoryNumericCodes: ["484", "320", "084", "340", "222"],
        modernCountriesIncluded: ["Mexic", "Guatemala", "Belize", "Honduras", "El Salvador"],
      },
    ],
  },
  {
    year: 500,
    label: "Anul 500 d.Hr.",
    title: "Evul Mediu Timpuriu & Moștenirea Romană",
    period: "Evul Mediu",
    description:
      "După prăbușirea Romei de Apus (476 d.Hr.), Europa Occidentală este împărțită între noile regate romano-barbare, în timp ce Constantinopolul strălucește ca Noua Romă a Răsăritului.",
    entities: [
      {
        id: "byzantine-500",
        name: "Imperiul Roman de Răsărit (Bizantin)",
        englishName: "Eastern Roman Empire (Byzantine)",
        emblem: "👑",
        color: "#701A75",
        borderColor: "#C026D3",
        ruler: "Anastasius I / Premiera lui Iustinian cel Mare",
        rulerTitle: "Basileus Romaion",
        capital: "Constantinopol",
        governmentType: "Monarhie imperială creștină",
        summary:
          "Păstrătorul direct al civilizației greco-romane. Constantinopolul este cel mai bogat și cel mai fortificat oraș din lumea creștină.",
        keyEvents: [
          "Reorganizarea financiară a imperiului sub Anastasius I",
          "Pregătirea marilor campanii de reconchistă ale lui Iustinian și a codului de legi Corpus Juris Civilis",
        ],
        territoryNumericCodes: ["300", "792", "818", "760", "422", "376", "400", "100", "196", "807", "008"],
        modernCountriesIncluded: ["Grecia", "Turcia", "Egipt", "Siria", "Liban", "Israel", "Iordania", "Bulgaria", "Cipru"],
      },
      {
        id: "franks-500",
        name: "Regatul Francilor (Dinastia Merovingiană)",
        englishName: "Frankish Kingdom",
        emblem: "⚜️",
        color: "#1D4ED8",
        borderColor: "#60A5FA",
        ruler: "Clovis I (fondatorul Regatului Franței)",
        rulerTitle: "Rex Francorum",
        capital: "Paris / Soissons",
        governmentType: "Monarhie feudală creștină",
        summary:
          "Clovis unifică triburile france și se convertește la creștinismul ortodox-catolic, punând bazele Franței medievale și ale viitorului Imperiu Carolingian.",
        keyEvents: [
          "496 d.Hr. - Botezul lui Clovis la Reims",
          "Înfrângerea vizigoților la Vouillé (507 d.Hr.) și extinderea stăpânirii france",
        ],
        territoryNumericCodes: ["250", "056", "528", "756"],
        modernCountriesIncluded: ["Franța", "Belgia", "Olanda", "Elveția"],
      },
      {
        id: "ostrogoths-500",
        name: "Regatul Ostrogoților din Italia",
        englishName: "Ostrogothic Kingdom",
        emblem: "🏛️",
        color: "#9A3412",
        borderColor: "#FB923C",
        ruler: "Teodoric cel Mare (Flavius Theodoricus)",
        rulerTitle: "Rex Italiae",
        capital: "Ravenna",
        governmentType: "Monarhie militară gotică cu administrație romană",
        summary:
          "Teodoric cel Mare conduce Italia cu toleranță religioasă și respect față de Senatul Roman, păstrând monumentele antice și restaurând pacea peninsulei.",
        keyEvents: [
          "Epoca de aur a Ravennei și construirea Mausoleului lui Teodoric",
          "Activitatea filosofului Boethius la curtea regală",
        ],
        territoryNumericCodes: ["380", "040", "705", "191", "070"],
        modernCountriesIncluded: ["Italia", "Austria", "Slovenia", "Croația", "Bosnia"],
      },
      {
        id: "visigoths-500",
        name: "Regatul Vizigoților (Hispania)",
        englishName: "Visigothic Kingdom",
        emblem: "⚔️",
        color: "#A16207",
        borderColor: "#FACC15",
        ruler: "Alaric al II-lea",
        rulerTitle: "Rex Visigothorum",
        capital: "Toledo",
        governmentType: "Monarhie nobiliară vizigotă",
        summary:
          "Vizigoții controlează Peninsula Iberică, adoptând Lex Romana Visigothorum și fuzionând cu populația hispano-romană.",
        keyEvents: [
          "Promulgarea Breviarului lui Alaric",
          "Stabilirea capitalei la Toledo",
        ],
        territoryNumericCodes: ["724", "620"],
        modernCountriesIncluded: ["Spania", "Portugalia"],
      },
      {
        id: "daco-roman-500",
        name: "Spațiul Carpato-Danubian (Etnogeneza Românească)",
        englishName: "Carpatho-Danubian Proto-Romanian Communities",
        emblem: "🏺",
        color: "#C59B27",
        borderColor: "#FDE047",
        ruler: "Cnezate & Uniuni Obștești Autohtone",
        rulerTitle: "Cneji și Juzi locali",
        capital: "Așezări autohtone (Cultura Ipotești-Cândești)",
        governmentType: "Obști sătești daco-romane sedentare",
        summary:
          "Perioada cristalizării limbii și a poporului român în bazinul carpato-dunărean, menținând creștinismul de rit latin și agricultura în ciuda valurilor migratoare.",
        keyEvents: [
          "Răspândirea creștinismului popular în limba latină",
          "Cultura arheologică Brateiu și Ipotești-Cândești",
        ],
        territoryNumericCodes: ["642", "498"],
        modernCountriesIncluded: ["România", "Republica Moldova"],
      },
      {
        id: "sasanian-500",
        name: "Imperiul Sasanid (A Doua Epocă Persană)",
        englishName: "Sasanian Empire",
        emblem: "🔥",
        color: "#0E7490",
        borderColor: "#22D3EE",
        ruler: "Kavadh I / Khosrow I cel Drept",
        rulerTitle: "Shahanshah (Regele Regilor)",
        capital: "Ctesifon",
        governmentType: "Monarhie absolută zoroastriană",
        summary:
          "Apogeul renașterii civilizației persane pre-islamice. Școlile de medicină din Gundeshapur și campaniile împotriva Bizanțului.",
        keyEvents: [
          "Reformele fiscale și administrative din Iran",
          "Construcția marelui arc Taq Kasra la Ctesifon",
        ],
        territoryNumericCodes: ["364", "368", "004", "031", "051", "268", "795"],
        modernCountriesIncluded: ["Iran", "Irak", "Afganistan", "Azerbaidjan", "Armenia", "Georgia", "Turkmenistan"],
      },
    ],
  },
  {
    year: 1000,
    label: "Anul 1000 d.Hr.",
    title: "Anul Milenar & Evul Mediu Clasic",
    period: "Evul Mediu",
    description:
      "Anul 1000 marchează încoronarea lui Ștefan I al Ungariei, apogeul Bizanțului sub Vasile al II-lea, creștinarea Rusiei Kievene și dominația Sfântului Imperiu Roman în Europa Centrală.",
    entities: [
      {
        id: "hre-1000",
        name: "Sfântul Imperiu Roman de Națiune Germană",
        englishName: "Holy Roman Empire",
        emblem: "🦅",
        color: "#831843",
        borderColor: "#F472B6",
        ruler: "Otto al III-lea (Dinastia Ottoniană)",
        rulerTitle: "Imperator Romanorum",
        capital: "Aachen / Roma (Curte itinerantă)",
        governmentType: "Imperiu electiv federal creștin",
        summary:
          "Otto al III-lea promovează 'Renovatio Imperii Romanorum' (Renașterea Imperiului Roman), căutând o uniune armonioasă între împărat, Papalitate și regatele europene.",
        keyEvents: [
          "Anul 1000: Pelerinajul împăratului Otto al III-lea la mormântul lui Carol cel Mare la Aachen",
          "Congresul de la Gniezno și recunoașterea regatului Poloniei sub Boleslau cel Viteaz",
        ],
        territoryNumericCodes: ["276", "040", "203", "756", "528", "056", "705"],
        modernCountriesIncluded: ["Germania", "Austria", "Cehia", "Elveția", "Olanda", "Belgia", "Slovenia"],
      },
      {
        id: "byzantine-1000",
        name: "Imperiul Bizantin (Apogeul Dinastiei Macedonene)",
        englishName: "Byzantine Empire",
        emblem: "👑",
        color: "#581C87",
        borderColor: "#A855F7",
        ruler: "Vasile al II-lea Bulgaroctonul",
        rulerTitle: "Autokrator & Basileus",
        capital: "Constantinopol",
        governmentType: "Monarhie imperială absolută",
        summary:
          "Bizanțul este la maxima sa extindere teritorială și forță militară din perioada medievală, securizând Balcanii, Marea Neagră și Anatolia.",
        keyEvents: [
          "Creștinarea Rusiei Kievene de către misionari bizantini (988 d.Hr.)",
          "Supunerea completă a primului țarat bulgar și stabilirea frontierei la Dunăre",
        ],
        territoryNumericCodes: ["300", "792", "100", "807", "688", "196"],
        modernCountriesIncluded: ["Grecia", "Turcia", "Bulgaria", "Macedonia de Nord", "Serbia", "Cipru"],
      },
      {
        id: "kievan-rus-1000",
        name: "Rusia Kieveană (Kievan Rus')",
        englishName: "Kievan Rus'",
        emblem: "🔱",
        color: "#1E40AF",
        borderColor: "#60A5FA",
        ruler: "Vladimir cel Mare (Sviatoslavici)",
        rulerTitle: "Marele Cneaz al Kievului",
        capital: "Kiev",
        governmentType: "Federație de cnezate slave sub hegemonia Kievului",
        summary:
          "Cel mai mare stat din Europa medievală ca suprafață. Prin adoptarea creștinismului ortodox în 988, Rusia Kieveană intră pe orbita culturală europeană.",
        keyEvents: [
          "988 d.Hr. - Creștinarea oficială a slavilor răsăriteni în apele Niprului",
          "Traseul comercial legendar 'De la varangi la greci'",
        ],
        territoryNumericCodes: ["804", "112", "643"],
        modernCountriesIncluded: ["Ucraina", "Belarus", "Rusia (partea europeană)"],
      },
      {
        id: "fatimid-caliphate-1000",
        name: "Califatul Fatimid",
        englishName: "Fatimid Caliphate",
        emblem: "☪️",
        color: "#15803D",
        borderColor: "#4ADE80",
        ruler: "Califul Al-Hakim bi-Amr Allah",
        rulerTitle: "Calif & Imam Șiit Ismaelit",
        capital: "Cairo (fondat în 969 d.Hr.)",
        governmentType: "Califat teocratic șiit",
        summary:
          "Fatimizii transformă noul oraș Cairo într-un centru global de știință, astronomie și comerț, înființând celebra universitate Al-Azhar.",
        keyEvents: [
          "Dezvoltarea Universității Al-Azhar din Cairo",
          "Comerțul extins din Oceanul Indian până în Mediterana",
        ],
        territoryNumericCodes: ["818", "434", "788", "760", "400", "376", "422"],
        modernCountriesIncluded: ["Egipt", "Libia", "Tunisia", "Siria", "Iordania", "Israel", "Liban"],
      },
      {
        id: "cordoba-1000",
        name: "Califatul de Cordoba (Al-Andalus)",
        englishName: "Caliphate of Córdoba",
        emblem: "🌙",
        color: "#047857",
        borderColor: "#34D399",
        ruler: "Almanzor (Al-Mansur) / Hisham al II-lea",
        rulerTitle: "Hajib & Calif Omeiad",
        capital: "Cordoba",
        governmentType: "Califat islamic iberic",
        summary:
          "Cordoba este cel mai populat și mai luminat oraș al Europei de Vest, cu mari biblioteci, iluminat stradal și coexistența celor trei mari religii.",
        keyEvents: [
          "Construcția Marii Moschei din Cordoba (Mezquita)",
          "Campaniile militare ale lui Almanzor în nordul iberic",
        ],
        territoryNumericCodes: ["724", "620"],
        modernCountriesIncluded: ["Spania", "Portugalia"],
      },
      {
        id: "romanian-principalities-1000",
        name: "Voievodatele Românești Timpurii (Gelu, Glad, Menumorut)",
        englishName: "Early Romanian Voivodeships",
        emblem: "🗡️",
        color: "#B45309",
        borderColor: "#FBBF24",
        ruler: "Voievozii Gelu, Glad, Menumorut & Cnejii Locali",
        rulerTitle: "Voievod (Dux)",
        capital: "Cetățile Dăbâca, Biharea, Cuvin",
        governmentType: "Formațiuni statale voievodale românești",
        summary:
          "Atestate în cronica Gesta Hungarorum, voievodatele românești din Transilvania și din spațiul extracarpatic organizează apărarea pământurilor și a credinței.",
        keyEvents: [
          "Rezistența voievodului Gelu 'quidam Blacus' în Podișul Transilvaniei",
          "Cetatea Biharea condusă de Menumorut",
        ],
        territoryNumericCodes: ["642", "498"],
        modernCountriesIncluded: ["România", "Republica Moldova"],
      },
      {
        id: "song-china-1000",
        name: "Dinastia Song (China de Nord)",
        englishName: "Song Dynasty",
        emblem: "🏮",
        color: "#D97706",
        borderColor: "#FDE047",
        ruler: "Împăratul Zhenzong",
        rulerTitle: "Împărat al Chinei",
        capital: "Kaifeng",
        governmentType: "Monarhie imperială birocratică",
        summary:
          "Revoluție economică și tehnologică timpurie: inventarea prafului de pușcă, a busolei magnetice și utilizarea pentru prima dată în istorie a banilor de hârtie.",
        keyEvents: [
          "Tratatul de la Shanyuan (1005 d.Hr.) cu nomazii Khitan Liao",
          "Creșterea spectaculoasă a agriculturii orezului și a metalurgiei",
        ],
        territoryNumericCodes: ["156"],
        modernCountriesIncluded: ["China"],
      },
    ],
  },
  {
    year: 1500,
    label: "Anul 1500 d.Hr.",
    title: "Renașterea & Epoca Marilor Descoperiri",
    period: "Epoca Modernă Timpurie",
    description:
      "În 1500, Columb a atins Lumea Nouă, Cabral a descoperit Brazilia, Vasco da Gama a ajuns în India, iar Imperiul Otoman amenință inima Europei apărată de Ștefan cel Mare.",
    entities: [
      {
        id: "ottoman-1500",
        name: "Imperiul Otoman (Sublima Poartă)",
        englishName: "Ottoman Empire",
        emblem: "☪️",
        color: "#15803D",
        borderColor: "#4ADE80",
        ruler: "Sultanul Baiazid al II-lea (Fiul lui Mahomed al II-lea Cuceritorul)",
        rulerTitle: "Padishah & Sultan",
        capital: "Constantinopol (Kostantiniyye)",
        governmentType: "Imperiu islamic autocratic",
        summary:
          "După cucerirea Constantinopolului (1453), otomanii devin o superputere militară cu armata de ieniceri și artilerie grea, exercitând presiune pe Marea Mediterană și Balcani.",
        keyEvents: [
          "Consolidarea dominației navale otomane în estul Mediteranei",
          "Războaiele de uzură de la Dunăre cu Țările Române și Regatul Ungariei",
        ],
        territoryNumericCodes: ["792", "300", "100", "688", "070", "807", "008", "760", "818", "368"],
        modernCountriesIncluded: ["Turcia", "Grecia", "Bulgaria", "Serbia", "Bosnia", "Macedonia de Nord", "Albania", "Siria", "Egipt", "Irak"],
      },
      {
        id: "romanian-stefan-1500",
        name: "Moldova lui Ștefan cel Mare & Țara Românească",
        englishName: "Moldavia under Stephen the Great & Wallachia",
        emblem: "🐂",
        color: "#B91C1C",
        borderColor: "#F87171",
        ruler: "Ștefan cel Mare și Sfânt (Athleta Christi)",
        rulerTitle: "Domnitor al Moldovei",
        capital: "Suceava / Târgoviște",
        governmentType: "Monarhie domnească feudală",
        summary:
          "Ștefan cel Mare domnește de 43 de ani în Moldova, ridicând mănăstiri fortificate (Voroneț, Putna) și apărând granița creștinătății împotriva otomanilor, tătarilor și polonezilor.",
        keyEvents: [
          "Construcția mănăstirilor unice cu fresce exterioare din Bucovina",
          "Tratate de pace de pe poziții de forță cu Sublima Poartă și Polonia",
        ],
        territoryNumericCodes: ["642", "498"],
        modernCountriesIncluded: ["România", "Republica Moldova"],
      },
      {
        id: "spanish-empire-1500",
        name: "Imperiul Spaniol (Monarhia Catolică)",
        englishName: "Spanish Empire",
        emblem: "👑",
        color: "#DC2626",
        borderColor: "#FCA5A5",
        ruler: "Isabela I de Castilia & Ferdinand al II-lea de Aragon",
        rulerTitle: "Los Reyes Católicos",
        capital: "Toledo / Madrid",
        governmentType: "Monarhie compusă dinastică catolică",
        summary:
          "Unirea Castiliei cu Aragonul, finalizarea Reconquistei (1492) și călătoriile lui Cristofor Columb deschid era celui dintâi imperiu mondial.",
        keyEvents: [
          "1492: Căderea Granadei și prima călătorie a lui Columb în America",
          "1494: Tratatul de la Tordesillas de împărțire a Lumii Noi cu Portugalia",
        ],
        territoryNumericCodes: ["724", "484", "192", "214", "630", "170"],
        modernCountriesIncluded: ["Spania", "Mexic", "Cuba", "Republica Dominicană", "Puerto Rico", "Columbia"],
      },
      {
        id: "portuguese-empire-1500",
        name: "Regatul Portugaliei (Epoca Aurului)",
        englishName: "Portuguese Empire",
        emblem: "🧭",
        color: "#065F46",
        borderColor: "#34D399",
        ruler: "Regele Manuel I cel Norocos",
        rulerTitle: "Rei de Portugal e dos Algarves",
        capital: "Lisabona",
        governmentType: "Monarhie maritimă mercantilistă",
        summary:
          "Epopeea nautică portugheză: navigatorii Pedro Álvares Cabral descoperă Brazilia în aprilie 1500, iar rutele mirodeniilor spre India aduc bogății imense Lisabonei.",
        keyEvents: [
          "Aprilie 1500: Descoperirea Braziliei de către flota lui Pedro Álvares Cabral",
          "Construcția Mănăstirii Jerónimos și stilul arhitectural Manuelin",
        ],
        territoryNumericCodes: ["620", "076"],
        modernCountriesIncluded: ["Portugalia", "Brazilia"],
      },
      {
        id: "poland-lithuania-1500",
        name: "Uniunea Polono-Lituaniană (Dinastia Jagiellonă)",
        englishName: "Crown of Poland and Grand Duchy of Lithuania",
        emblem: "🦅",
        color: "#9D174D",
        borderColor: "#F472B6",
        ruler: "Ioan Albert / Alexandru Jagiellon",
        rulerTitle: "Rege al Poloniei și Mare Duce al Lituaniei",
        capital: "Cracovia & Vilnius",
        governmentType: "Monarhie nobiliară (Democrația Nobililor)",
        summary:
          "Una dintre cele mai întinse și puternice entități ale Europei Centrale, întinzându-se de la Marea Baltică până aproape de Marea Neagră.",
        keyEvents: [
          "Influența Universității Jagiellone din Cracovia (unde a studiat Nicolaus Copernic)",
          "Echilibrarea puterilor între magnateria nobiliară și monarhie",
        ],
        territoryNumericCodes: ["616", "440", "112", "804", "428"],
        modernCountriesIncluded: ["Polonia", "Lituania", "Belarus", "Ucraina", "Letonia"],
      },
      {
        id: "russia-moscow-1500",
        name: "Marele Cnezat al Moscovei (Rusia lui Ivan al III-lea)",
        englishName: "Grand Duchy of Moscow",
        emblem: "⚔️",
        color: "#831843",
        borderColor: "#E11D48",
        ruler: "Ivan al III-lea cel Mare",
        rulerTitle: "Mare Cneaz al Întregii Rusii",
        capital: "Moscova",
        governmentType: "Autocrație ortodoxă în formare",
        summary:
          "Ivan al III-lea scutură jugul tătăresc al Hoardei de Aur, proclamă Moscova drept 'A Treia Romă' și reconstruiește Kremlinul cu arhitecți renascentiști italieni.",
        keyEvents: [
          "Oprirea de pe râul Ugra (1480) și eliberarea definitivă de sub suzeranitatea tătară",
          "Reconstrucția Catedralei Adormirii Maicii Domnului din Kremlin",
        ],
        territoryNumericCodes: ["643"],
        modernCountriesIncluded: ["Rusia"],
      },
      {
        id: "ming-china-1500",
        name: "Marele Imperiu Ming (China)",
        englishName: "Ming Dynasty",
        emblem: "🏮",
        color: "#CA8A04",
        borderColor: "#FDE047",
        ruler: "Împăratul Hongzhi (Epoca de Argint a Ming)",
        rulerTitle: "Împărat al Marelui Ming",
        capital: "Beijing (Orașul Interzis)",
        governmentType: "Monarhie birocratică imperială",
        summary:
          "China se bucură de stabilitate remarcabilă sub împăratul Hongzhi, un monarh drept și econom, cu orașul interzis din Beijing drept nucleu al universului confucianist.",
        keyEvents: [
          "Exportul masiv de porțelan alb-albastru și mătase către Europa și Lumea Islamică",
          "Extinderea și placarea cu cărămidă a Marelui Zid Chinezesc",
        ],
        territoryNumericCodes: ["156"],
        modernCountriesIncluded: ["China"],
      },
      {
        id: "inca-1500",
        name: "Imperiul Inca (Tawantinsuyu)",
        englishName: "Inca Empire",
        emblem: "☀️",
        color: "#D97706",
        borderColor: "#FBBF24",
        ruler: "Huayna Capac (Sapa Inca)",
        rulerTitle: "Copil al Soarelui (Inti)",
        capital: "Cusco",
        governmentType: "Imperiu teocratic andin centralizat",
        summary:
          "Cel mai mare imperiu precolumbian din America de Sud, stăpânind Munții Anzi printr-o rețea monumentală de drumuri suspendate (Qhapaq Ñan) și agricultură în terase.",
        keyEvents: [
          "Apogeul extinderii teritoriale de la Ecuador până în Chile central",
          "Sistemul de evidență statistică prin noduri colorate (Quipu)",
        ],
        territoryNumericCodes: ["604", "218", "068", "152"],
        modernCountriesIncluded: ["Peru", "Ecuador", "Bolivia", "Chile"],
      },
    ],
  },
  {
    year: 1800,
    label: "Anul 1800 d.Hr.",
    title: "Epoca Napoleoniană & Zorii Epocii Industriale",
    period: "Epoca Națiunilor",
    description:
      "În 1800, Napoleon Bonaparte a devenit Prim Consul al Franței, Marea Britanie a dominat mările în zorii revoluției industriale, iar ideile iluministe și republicane remodelează planeta.",
    entities: [
      {
        id: "france-napoleon-1800",
        name: "Republica Franceză (Epoca Consulatului lui Napoleon)",
        englishName: "French Republic (Napoleonic Era)",
        emblem: "🦅",
        color: "#1D4ED8",
        borderColor: "#93C5FD",
        ruler: "Napoleon Bonaparte",
        rulerTitle: "Prim Consul al Republicii",
        capital: "Paris",
        governmentType: "Republică autoritară consulară",
        summary:
          "După lovitura de stat din 18 Brumar (1799), Napoleon reorganizează statul francez, înființează Banca Franței, liceele de stat și elaborează celebrul Cod Civil (Codul Napoleon).",
        keyEvents: [
          "Bătălia de la Marengo (14 iunie 1800) și pacificarea nordului Italiei",
          "Redactarea Codului Civil Francez, piatra de temelie a legislației moderne europene",
        ],
        territoryNumericCodes: ["250", "056", "528", "756", "380"],
        modernCountriesIncluded: ["Franța", "Belgia", "Olanda", "Elveția", "Italia (nord/centru)"],
      },
      {
        id: "british-empire-1800",
        name: "Imperiul Britanic (Pax Britannica & Revoluția Industrială)",
        englishName: "British Empire",
        emblem: "👑",
        color: "#DC2626",
        borderColor: "#F87171",
        ruler: "Regele George al III-lea & William Pitt cel Tânăr",
        rulerTitle: "Rege al Marii Britanii / Prim-ministru",
        capital: "Londra",
        governmentType: "Monarhie constituțională parlamentară",
        summary:
          "Atelierul lumii. Motoarele cu abur ale lui Watt, minele de cărbune și flotele Royal Navy fac din Marea Britanie forța economică și maritimă globală supremă.",
        keyEvents: [
          "Actul de Unire din 1800 și crearea Regatului Unit al Marii Britanii și Irlandei",
          "Expansiunea Companiei Indiilor de Est pe subcontinentul indian",
        ],
        territoryNumericCodes: ["826", "372", "124", "036", "554", "356", "710"],
        modernCountriesIncluded: ["Marea Britanie", "Irlanda", "Canada", "Australia", "Noua Zeelandă", "India", "Africa de Sud"],
      },
      {
        id: "russian-empire-1800",
        name: "Imperiul Rus (Dinastia Romanov)",
        englishName: "Russian Empire",
        emblem: "🦅",
        color: "#1E3A5F",
        borderColor: "#60A5FA",
        ruler: "Țarul Pavel I / Alexandru I",
        rulerTitle: "Împărat și Autocrat al Tuturor Rusiilor",
        capital: "Sankt Petersburg",
        governmentType: "Autocrație țaristă absolutistă",
        summary:
          "Un colos eurasiatic ce se întinde de la Marea Baltică și Marea Neagră până în Alaska, cu o nobilime francofonă și o armată terestră masivă.",
        keyEvents: [
          "Campaniile mareșalului Suvorov în Italia și Alpi (1799)",
          "Modernizarea flotei la Marea Neagră după fondarea portului Odesa (1794)",
        ],
        territoryNumericCodes: ["643", "804", "112", "246", "233", "428", "440", "268", "051", "031"],
        modernCountriesIncluded: ["Rusia", "Ucraina", "Belarus", "Finlanda", "Estonia", "Letonia", "Lituania", "Georgia", "Armenia", "Azerbaidjan"],
      },
      {
        id: "habsburg-1800",
        name: "Monarhia Habsburgică (Imperiul Austriac)",
        englishName: "Habsburg Monarchy",
        emblem: "👑",
        color: "#CA8A04",
        borderColor: "#FBBF24",
        ruler: "Franz al II-lea (Împărat al Austriei)",
        rulerTitle: "Împărat al Austriei & Rege al Ungariei",
        capital: "Viena",
        governmentType: "Monarhie compusă dinastică habsburgică",
        summary:
          "Marea putere central-europeană ce reunește austrieci, maghiari, cehi, slovaci, croați și români din Transilvania și Bucovina.",
        keyEvents: [
          "Războaiele Coaliției împotriva expansiunii revoluționare franceze",
          "Viena drept capitală mondială a muzicii clasice (Haydn, Mozart, Beethoven)",
        ],
        territoryNumericCodes: ["040", "348", "203", "703", "191", "705"],
        modernCountriesIncluded: ["Austria", "Ungaria", "Cehia", "Slovacia", "Croația", "Slovenia"],
      },
      {
        id: "prussia-1800",
        name: "Regatul Prusiei",
        englishName: "Kingdom of Prussia",
        emblem: "⚔️",
        color: "#334155",
        borderColor: "#94A3B8",
        ruler: "Friedrich Wilhelm al III-lea & Regina Luise",
        rulerTitle: "Rege al Prusiei",
        capital: "Berlin",
        governmentType: "Monarhie militară prusacă",
        summary:
          "Stat militar disciplinat fondat pe moștenirea lui Frederic cel Mare, cu administrație eficientă și un sistem de învățământ de top.",
        keyEvents: [
          "Păstrarea neutralității în Primul Război al Coaliției înainte de marea confruntare cu Napoleon",
        ],
        territoryNumericCodes: ["276", "616"],
        modernCountriesIncluded: ["Germania (nord-est)", "Polonia (vest)"],
      },
      {
        id: "ottoman-1800",
        name: "Imperiul Otoman (Epoca Reformelor Nizam-i Djedid)",
        englishName: "Ottoman Empire",
        emblem: "☪️",
        color: "#059669",
        borderColor: "#34D399",
        ruler: "Sultanul Selim al III-lea",
        rulerTitle: "Padishah al Otomanilor",
        capital: "Istanbul",
        governmentType: "Monarhie imperială islamică",
        summary:
          "Sultanul iluminat Selim al III-lea încearcă modernizarea armatei după model occidental (Nizam-i Djedid), stârnind revolta ienicerilor conservatori.",
        keyEvents: [
          "Apărarea Acrei împotriva lui Napoleon în campania din Siria și Egipt (1799)",
          "Suzeranitatea asupra Țărilor Române (regimul domniilor fanariote)",
        ],
        territoryNumericCodes: ["792", "300", "100", "688", "642", "498", "760", "818", "368"],
        modernCountriesIncluded: ["Turcia", "Grecia", "Bulgaria", "Serbia", "România", "Republica Moldova", "Siria", "Egipt", "Irak"],
      },
      {
        id: "usa-1800",
        name: "Statele Unite ale Americii (Tânăra Republică)",
        englishName: "United States of America",
        emblem: "⭐",
        color: "#2563EB",
        borderColor: "#93C5FD",
        ruler: "John Adams / Thomas Jefferson",
        rulerTitle: "Președinte al Statelor Unite",
        capital: "Washington, D.C. (inaugurată în 1800)",
        governmentType: "Republică constituțională federală",
        summary:
          "În noiembrie 1800, guvernul american se mută în noua capitală Washington, D.C. și la Casa Albă, urmat de alegerea istorică a lui Thomas Jefferson.",
        keyEvents: [
          "Alegerile din 1800 ('Revoluția din 1800') și primul transfer pașnic de putere bipartid",
          "Mutarea Congresului la Capitoliu în Washington, D.C.",
        ],
        territoryNumericCodes: ["840"],
        modernCountriesIncluded: ["Statele Unite ale Americii"],
      },
      {
        id: "qing-1800",
        name: "Marele Imperiu Qing (China)",
        englishName: "Qing Dynasty",
        emblem: "🐉",
        color: "#EAB308",
        borderColor: "#FEF08A",
        ruler: "Împăratul Jiaqing (Dinastia Manchu)",
        rulerTitle: "Împărat al Marelui Qing",
        capital: "Beijing",
        governmentType: "Monarhie imperială manciuriană",
        summary:
          "Cel mai populat imperiu de pe Terra (peste 300 de milioane de locuitori), acoperind China istorică, Mongolia, Xinjiang, Tibet și Taiwan.",
        keyEvents: [
          "Confiscarea averii colosale a demnitarului corupt Heshen de către împăratul Jiaqing",
          "Creșterea tensiunilor comerciale cu comercianții britanici privind comerțul cu ceai și argint",
        ],
        territoryNumericCodes: ["156", "496", "158"],
        modernCountriesIncluded: ["China", "Mongolia", "Taiwan"],
      },
    ],
  },
  {
    year: 1914,
    label: "Anul 1914 d.Hr.",
    title: "Ajunul Marelui Război • Apogeul Marilor Imperii",
    period: "Secolul XX",
    description:
      "În vara anului 1914, asasinatul de la Sarajevo a declanșat Primul Război Mondial, punând capăt 'Belle Époque' și aruncând marile imperii europene într-un conflict cataclismic.",
    entities: [
      {
        id: "austro-hungarian-1914",
        name: "Imperiul Austro-Ungar (Monarhia Dualistă)",
        englishName: "Austro-Hungarian Empire",
        emblem: "🦅",
        color: "#D97706",
        borderColor: "#FBBF24",
        ruler: "Împăratul Franz Joseph I",
        rulerTitle: "Împărat al Austriei și Rege Apostolic al Ungariei",
        capital: "Viena & Budapesta",
        governmentType: "Monarhie dualistă constituțională",
        summary:
          "Un mozaic multietnic de 52 de milioane de locuitori sub sceptrul Casei de Habsburg. Asasinarea arhiducelui moștenitor Franz Ferdinand la Sarajevo pe 28 iunie 1914 a aprins flacăra războiului.",
        keyEvents: [
          "28 iunie 1914: Asasinatul de la Sarajevo comis de Gavrilo Princip",
          "28 iulie 1914: Declarația de război împotriva Regatului Serbiei și declanșarea conflagrației mondiale",
        ],
        territoryNumericCodes: ["040", "348", "203", "703", "191", "705", "070"],
        modernCountriesIncluded: [
          "Austria", "Ungaria", "Cehia", "Slovacia", "Croația", "Slovenia", "Bosnia și Herțegovina",
          "Părți din România (Transilvania, Banat, Bucovina)"
        ],
      },
      {
        id: "russian-empire-1914",
        name: "Imperiul Rus (Ultima Epocă Țaristă)",
        englishName: "Russian Empire",
        emblem: "🦅",
        color: "#1E3A8A",
        borderColor: "#60A5FA",
        ruler: "Țarul Nicolae al II-lea (Ultimul Romanov)",
        rulerTitle: "Împărat al Tuturor Rusiilor",
        capital: "Petrograd (Sankt Petersburg)",
        governmentType: "Autocrație țaristă cu Dumă consultativă",
        summary:
          "Aliat al Franței și Marii Britanii în Antanta, Imperiul Rus a mobilizat milioane de soldați pe frontul de răsărit, înainte ca războiul să conducă la Revoluțiile din 1917.",
        keyEvents: [
          "Mobilizarea generală din august 1914 în sprijinul Serbiei",
          "Bătăliile din Prusia Răsăriteană (Tannenberg) și campania din Galiția",
        ],
        territoryNumericCodes: [
          "643", "804", "112", "616", "246", "233", "428", "440", "498",
          "398", "860", "795", "417", "762", "268", "051", "031"
        ],
        modernCountriesIncluded: [
          "Rusia", "Ucraina", "Belarus", "Polonia (est/centru)", "Finlanda", "Estonia", "Letonia",
          "Lituania", "Republica Moldova (Basarabia)", "Kazahstan", "Uzbekistan", "Turkmenistan",
          "Kârgâzstan", "Tadjikistan", "Georgia", "Armenia", "Azerbaidjan"
        ],
      },
      {
        id: "german-empire-1914",
        name: "Imperiul German (Al Doilea Reich)",
        englishName: "German Empire",
        emblem: "⚔️",
        color: "#334155",
        borderColor: "#94A3B8",
        ruler: "Kaiserul Wilhelm al II-lea",
        rulerTitle: "Împărat German & Rege al Prusiei",
        capital: "Berlin",
        governmentType: "Monarhie constituțională imperială",
        summary:
          "Prima forță industrială și militară a Europei continentale. Purtătorul principal al Triplei Alianțe (Puterile Centrale) alături de Austro-Ungaria și Imperiul Otoman.",
        keyEvents: [
          "Planul Schlieffen și invadarea Belgiei în august 1914",
          "Bătălia de pe Marna și înghețarea frontului de vest în război de tranșee",
        ],
        territoryNumericCodes: ["276"],
        modernCountriesIncluded: ["Germania", "Alsacia-Lorena (Franța)", "Prusia Răsăriteană"],
      },
      {
        id: "romania-regat-1914",
        name: "Regatul României (Vechiul Regat • Neutralitatea)",
        englishName: "Kingdom of Romania",
        emblem: "👑",
        color: "#2563EB",
        borderColor: "#93C5FD",
        ruler: "Regele Carol I / Regele Ferdinand I Întregitorul",
        rulerTitle: "Rege al României",
        capital: "București",
        governmentType: "Monarhie parlamentară constituțională",
        summary:
          "În Consiliul de Coroană de la Sinaia din 3 august 1914, România a proclamat starea de neutralitate armată, pregătind intrarea ulterioară în război (1916) pentru realizarea Marii Uniri.",
        keyEvents: [
          "3 august 1914: Consiliul de Coroană de la Castelul Peleș decide neutralitatea",
          "10 octombrie 1914: Trecerea în neființă a regelui Carol I și urcarea pe tron a regelui Ferdinand I alături de Regina Maria",
        ],
        territoryNumericCodes: ["642"],
        modernCountriesIncluded: ["România (Muntenia, Moldova, Oltenia, Dobrogea)"],
      },
      {
        id: "british-empire-1914",
        name: "Imperiul Britanic (Cel mai mare imperiu din istorie)",
        englishName: "British Empire",
        emblem: "👑",
        color: "#DC2626",
        borderColor: "#F87171",
        ruler: "Regele George al V-lea & H. H. Asquith",
        rulerTitle: "Rege-Împărat",
        capital: "Londra",
        governmentType: "Monarhie parlamentară imperială",
        summary:
          "Imperiu pe care 'soarele nu apunea niciodată', controlând un sfert din suprafața terestră și din populația globului prin forța flotei navale.",
        keyEvents: [
          "4 august 1914: Intrarea Marii Britanii în război după încălcarea neutralității Belgiei",
          "Mobilizarea trupelor din dominioane (Canada, Australia, Noua Zeelandă, India)",
        ],
        territoryNumericCodes: ["826", "372", "124", "036", "554", "356", "586", "050", "818", "710", "566", "404"],
        modernCountriesIncluded: [
          "Marea Britanie", "Irlanda", "Canada", "Australia", "Noua Zeelandă", "India",
          "Pakistan", "Bangladesh", "Egipt", "Africa de Sud", "Nigeria", "Kenya"
        ],
      },
      {
        id: "french-third-republic-1914",
        name: "Republica Franceză (A Treia Republică & Imperiul Colonial)",
        englishName: "French Third Republic",
        emblem: "🇫🇷",
        color: "#1D4ED8",
        borderColor: "#60A5FA",
        ruler: "Raymond Poincaré & René Viviani",
        rulerTitle: "Președinte al Republicii Franceze",
        capital: "Paris",
        governmentType: "Republică parlamentară democratică",
        summary:
          "Franța intră în război unită sub lozinca 'Uniunii Sacre' (Union Sacrée) pentru a-și apăra teritoriul și a recupera Alsacia și Lorena pierdute în 1871.",
        keyEvents: [
          "Bătălia de pe Marna (septembrie 1914) și salvarea Parisului cu ajutorul 'taxiurilor de pe Marna'",
          "Construcția liniilor fortificate pe frontul de vest",
        ],
        territoryNumericCodes: ["250", "012", "504", "788", "704", "418", "116", "450", "686"],
        modernCountriesIncluded: ["Franța", "Algeria", "Maroc", "Tunisia", "Vietnam", "Laos", "Cambodgia", "Madagascar", "Senegal"],
      },
      {
        id: "ottoman-1914",
        name: "Imperiul Otoman (Sub Guvernul Junilor Turci)",
        englishName: "Ottoman Empire",
        emblem: "☪️",
        color: "#059669",
        borderColor: "#34D399",
        ruler: "Sultanul Mehmed al V-lea / Triumviratul Junilor Turci (Enver Pașa)",
        rulerTitle: "Padishah & Comitetul Unității și Progresului",
        capital: "Constantinopol",
        governmentType: "Monarhie constituțională militarizată",
        summary:
          "În octombrie 1914, flota otomano-germană bombardează porturile rusești din Marea Neagră, intrând în război alături de Puterile Centrale.",
        keyEvents: [
          "Închiderea strâmtorilor Bosfor și Dardanele pentru flotele Antantei",
          "Pregătirea legendarei campanii de la Gallipoli (1915)",
        ],
        territoryNumericCodes: ["792", "760", "368", "422", "400", "376", "887"],
        modernCountriesIncluded: ["Turcia", "Siria", "Irak", "Liban", "Iordania", "Israel", "Yemen"],
      },
      {
        id: "italy-1914",
        name: "Regatul Italiei",
        englishName: "Kingdom of Italy",
        emblem: "👑",
        color: "#15803D",
        borderColor: "#4ADE80",
        ruler: "Regele Victor Emanuel al III-lea & Antonio Salandra",
        rulerTitle: "Rege al Italiei",
        capital: "Roma",
        governmentType: "Monarhie constituțională",
        summary:
          "Deși membră a Triplei Alianțe, Italia și-a declarat neutralitatea în 1914, negociind ulterior cu Antanta (Tratatul de la Londra din 1915).",
        keyEvents: [
          "Declarația de neutralitate din august 1914",
          "Dezbaterile aprinse între neutraliști și intervenționiști conduși de D'Annunzio și Mussolini",
        ],
        territoryNumericCodes: ["380", "434", "706", "232"],
        modernCountriesIncluded: ["Italia", "Libia", "Somalia", "Eritreea"],
      },
      {
        id: "usa-1914",
        name: "Statele Unite ale Americii (Neutralitatea lui Wilson)",
        englishName: "United States of America",
        emblem: "⭐",
        color: "#3B82F6",
        borderColor: "#93C5FD",
        ruler: "Woodrow Wilson",
        rulerTitle: "Președinte al Statelor Unite",
        capital: "Washington, D.C.",
        governmentType: "Republică constituțională federală",
        summary:
          "Președintele Wilson a cerut americanilor să fie 'imparțiali în gândire și în acțiune', consolidând economia americană ca principal creditor al aliaților europeni.",
        keyEvents: [
          "Declarația de neutralitate oficială din 19 august 1914",
          "Deschiderea Canalului Panama (15 august 1914), revoluționând navigația globală",
        ],
        territoryNumericCodes: ["840", "608"],
        modernCountriesIncluded: ["Statele Unite ale Americii", "Filipine"],
      },
    ],
  },
  {
    year: 1945,
    label: "Anul 1945 d.Hr.",
    title: "Al Doilea Război Mondial & Zorii Războiului Rece",
    period: "Secolul XX",
    description:
      "1945 aduce victoria Națiunilor Unite asupra fascismului, conferințele de la Yalta și Potsdam, crearea ONU și împărțirea lumii în blocurile Războiului Rece conduse de SUA și URSS.",
    entities: [
      {
        id: "ussr-1945",
        name: "Uniunea Sovietică (URSS / USSR)",
        englishName: "Union of Soviet Socialist Republics",
        emblem: "☭",
        color: "#DC2626",
        borderColor: "#F87171",
        ruler: "Iosif Vissarionovici Stalin",
        rulerTitle: "Secretar General al PCUS & Generalisim",
        capital: "Moscova",
        governmentType: "Stat socialist unipartid totalitar",
        summary:
          "URSS iese din Al Doilea Război Mondial ca o superputere militară globală cu prezență în Europa Centrală și de Est, dobândind ulterior statutul de membru permanent al Consiliului de Securitate al ONU.",
        keyEvents: [
          "Mai 1945: Cucerirea Berlinului și capitularea Germaniei naziste",
          "Conferințele de la Ialta și Potsdam de configurare a sferelor de influență",
        ],
        territoryNumericCodes: [
          "643", "804", "112", "498", "398", "860", "795", "417", "762",
          "268", "051", "031", "233", "428", "440"
        ],
        modernCountriesIncluded: [
          "Rusia", "Ucraina", "Belarus", "Republica Moldova", "Kazahstan", "Uzbekistan",
          "Turkmenistan", "Kârgâzstan", "Tadjikistan", "Georgia", "Armenia", "Azerbaidjan",
          "Estonia", "Letonia", "Lituania"
        ],
      },
      {
        id: "yugoslavia-1945",
        name: "Iugoslavia (Iosip Broz Tito)",
        englishName: "Socialist Federal Republic of Yugoslavia",
        emblem: "⭐",
        color: "#2563EB",
        borderColor: "#60A5FA",
        ruler: "Mareșalul Iosip Broz Tito",
        rulerTitle: "Prim-ministru / Mareșal al Iugoslaviei",
        capital: "Belgrad",
        governmentType: "Republică socialistă federală",
        summary:
          "Eliberată în mare măsură prin forțele proprii ale partizanilor lui Tito, Iugoslavia a format o federație unică a slavilor de sud, devenind mai târziu lider al Mișcării de Nealiniere.",
        keyEvents: [
          "Noiembrie 1945: Proclamarea Republicii Federative Populare Iugoslavia",
          "Unificarea celor șase republici: Serbia, Croația, Slovenia, Bosnia, Muntenegru, Macedonia",
        ],
        territoryNumericCodes: ["688", "191", "705", "070", "499", "807"],
        modernCountriesIncluded: ["Serbia", "Croația", "Slovenia", "Bosnia și Herțegovina", "Muntenegru", "Macedonia de Nord", "Kosovo"],
      },
      {
        id: "czechoslovakia-1945",
        name: "Cehoslovacia (Restaurarea Postbelică)",
        englishName: "Third Czechoslovak Republic",
        emblem: "🇨🇿",
        color: "#0891B2",
        borderColor: "#22D3EE",
        ruler: "Edvard Beneš",
        rulerTitle: "Președinte al Republicii Cehoslovace",
        capital: "Praga",
        governmentType: "Republică democratică parlamentară (Frontul Național)",
        summary:
          "Restaurată după ocupația nazistă sub președinția lui Edvard Beneš, înainte de preluarea puterii de către comuniști în lovitura din februarie 1948.",
        keyEvents: [
          "Decretele Beneš privind reorganizarea postbelică a statului",
          "Refacerea alianței istorice dintre cehi și slovaci",
        ],
        territoryNumericCodes: ["203", "703"],
        modernCountriesIncluded: ["Cehia", "Slovacia"],
      },
      {
        id: "romania-1945",
        name: "România (Sfârșitul Monarhiei & Instalarea Regimului Groza)",
        englishName: "Kingdom of Romania (Transition to People's Republic)",
        emblem: "🇷🇴",
        color: "#B91C1C",
        borderColor: "#EF4444",
        ruler: "Regele Mihai I al României & Petru Groza",
        rulerTitle: "Rege al României (până în 1947) / Prim-ministru",
        capital: "București",
        governmentType: "Monarhie sub ocupație sovietică (Greva Regală)",
        summary:
          "România a participat activ la campania antifascistă în vest (Ungaria, Cehoslovacia, Austria). Pe 6 martie 1945, sub presiunea lui Vîșinski, se instalează guvernul Petru Groza.",
        keyEvents: [
          "Contribuția a peste 500.000 de soldați români la eliberarea Europei Centrale",
          "6 martie 1945: Impunerea guvernului condus de dr. Petru Groza",
          "8 noiembrie 1945: Marea manifestație promonarhistă de ziua Regelui Mihai I în Piața Palatului",
        ],
        territoryNumericCodes: ["642"],
        modernCountriesIncluded: ["România"],
      },
      {
        id: "divided-germany-1945",
        name: "Germania sub Ocupația Aliată (1945)",
        englishName: "Allied-Occupied Germany",
        emblem: "🛡️",
        color: "#475569",
        borderColor: "#94A3B8",
        ruler: "Consiliul Aliat de Control (SUA, Marea Britanie, URSS, Franța)",
        rulerTitle: "Comandanți Militari Supremi",
        capital: "Berlin (Sectorizat)",
        governmentType: "Administrație militarăcvadripartită",
        summary:
          "Germania este împărțită în patru zone de ocupație, iar Berlinul în patru sectoare. A pus bazele divizării ulterioare în Germania de Vest (RFG) și Germania de Est (RDG).",
        keyEvents: [
          "Iulie-August 1945: Conferința de la Potsdam (Trudeau/Attlee, Truman, Stalin)",
          "Începerea Proceselor de la Nürnberg împotriva criminalilor de război naziști",
        ],
        territoryNumericCodes: ["276"],
        modernCountriesIncluded: ["Germania"],
      },
      {
        id: "usa-1945",
        name: "Statele Unite ale Americii (Superputerea Atomică)",
        englishName: "United States of America",
        emblem: "🇺🇸",
        color: "#1D4ED8",
        borderColor: "#60A5FA",
        ruler: "Harry S. Truman",
        rulerTitle: "Președinte al Statelor Unite",
        capital: "Washington, D.C.",
        governmentType: "Republică prezidențială constituțională",
        summary:
          "SUA deține monopolul armei nucleare și jumătate din producția industrială a lumii, inițiind Planul Marshall pentru reconstrucția Europei democratice.",
        keyEvents: [
          "26 iunie 1945: Semnarea Cartei ONU la San Francisco",
          "Sfârșitul războiului din Pacific și reorganizarea financiară mondială la Bretton Woods",
        ],
        territoryNumericCodes: ["840"],
        modernCountriesIncluded: ["Statele Unite ale Americii"],
      },
      {
        id: "china-1945",
        name: "Republica Chineză (Guomindang & Războiul Civil)",
        englishName: "Republic of China",
        emblem: "🇹🇼",
        color: "#EA580C",
        borderColor: "#FB923C",
        ruler: "Chiang Kai-shek (Jiang Jieshi)",
        rulerTitle: "Generalisim & Președinte",
        capital: "Nanjing / Chongqing",
        governmentType: "Republică naționalistă autoritară",
        summary:
          "După predarea Japoniei, China redevine membru fondator al ONU cu drept de veto, înainte de reluarea războiului civil împotriva comuniștilor lui Mao Zedong.",
        keyEvents: [
          "Recuperarea Taiwanului și Manciuriei de la ocupația japoneză",
          "Negocierile de la Chongqing mediate de ambasadorul american George Marshall",
        ],
        territoryNumericCodes: ["156", "158"],
        modernCountriesIncluded: ["China", "Taiwan"],
      },
    ],
  },
  {
    year: 1991,
    label: "Anul 1991 d.Hr.",
    title: "Căderea Cortinei de Fier & Renașterea Democrațiilor",
    period: "Secolul XX",
    description:
      "În 1991, Uniunea Sovietică s-a dizolvat oficial de Crăciun, Războiul Rece a luat sfârșit, iar statele din Europa Centrală și de Est și-au adoptat noile constituții democratice.",
    entities: [
      {
        id: "post-soviet-1991",
        name: "Dizolvarea URSS & Comunitatea Statelor Independente (CSI)",
        englishName: "Dissolution of USSR & Emerging Republics",
        emblem: "🕊️",
        color: "#475569",
        borderColor: "#94A3B8",
        ruler: "Mihail Gorbaciov / Boris Elțîn",
        rulerTitle: "Președinte al URSS (până la 25 dec 1991) / Președinte al Rusiei",
        capital: "Moscova",
        governmentType: "Tranziție democratică / Confederație CSI",
        summary:
          "Pe 8 decembrie 1991, liderii Rusiei, Ucrainei și Belarusului au semnat Acordurile de la Belaveja, declarând încheiată existența Uniunii Sovietice. Steagul roșu a fost coborât de pe Kremlin pe 25 decembrie.",
        keyEvents: [
          "Acordurile de la Belaveja și crearea CSI",
          "Recunoașterea internațională a independenței celor 15 noi state suverane",
        ],
        territoryNumericCodes: ["643", "804", "112", "398", "860", "795", "417", "762", "268", "051", "031", "498"],
        modernCountriesIncluded: ["Rusia", "Ucraina", "Belarus", "Republica Moldova", "Kazahstan", "Uzbekistan", "Turkmenistan", "Kârgâzstan", "Tadjikistan", "Georgia", "Armenia", "Azerbaidjan"],
      },
      {
        id: "romania-1991",
        name: "România Democratică (Constituția din 1991)",
        englishName: "Democratic Romania",
        emblem: "🇷🇴",
        color: "#2563EB",
        borderColor: "#93C5FD",
        ruler: "Ion Iliescu & Petre Roman / Theodor Stolojan",
        rulerTitle: "Președinte al României / Prim-ministru",
        capital: "București",
        governmentType: "Republică semi-prezidențială democratică",
        summary:
          "Pe 8 decembrie 1991, poporul român a aprobat prin referendum noua Constituție a României, consfințind statul de drept, pluralismul politic și economia de piață liberă.",
        keyEvents: [
          "Referendumul constituțional din 8 decembrie 1991 și adoptarea Constituției",
          "Începerea negocierilor pentru Acordul European de asociere la CEE",
        ],
        territoryNumericCodes: ["642"],
        modernCountriesIncluded: ["România"],
      },
      {
        id: "germany-reunified-1991",
        name: "Germania Reunificată",
        englishName: "Federal Republic of Germany",
        emblem: "🇩🇪",
        color: "#1E293B",
        borderColor: "#FBBF24",
        ruler: "Helmut Kohl",
        rulerTitle: "Cancelar Federal",
        capital: "Bonn / Berlin",
        governmentType: "Republică parlamentară federală",
        summary:
          "După reunificarea istorică din 3 octombrie 1990, Germania devine motorul integrării europene care va culmina cu Tratatul de la Maastricht (1992).",
        keyEvents: [
          "20 iunie 1991: Votul istoric din Bundestag de mutare a capitalei și a parlamentului la Berlin",
        ],
        territoryNumericCodes: ["276"],
        modernCountriesIncluded: ["Germania"],
      },
    ],
  },
  {
    year: 2026,
    label: "Anul 2026 d.Hr.",
    title: "Lumea Contemporană & Sistemele Electorale",
    period: "Prezent",
    description:
      "Ordinea geopolitică actuală. Explorează sistemele politice, partidele de guvernământ, alegerile democratice (prezidențiale, parlamentare, locale, europarlamentare) și prezența la vot pe harta Equal Earth.",
    entities: [], // Empty means modern day view with full COUNTRIES catalog
  },
];

/**
 * Returns the closest historical era configuration for a given year.
 */
export function getClosestHistoricalEra(year: number): HistoricalEra {
  if (year >= 2026) {
    return HISTORICAL_ERAS[HISTORICAL_ERAS.length - 1];
  }
  let closest = HISTORICAL_ERAS[0];
  let minDiff = Math.abs(year - HISTORICAL_ERAS[0].year);

  for (const era of HISTORICAL_ERAS) {
    const diff = Math.abs(year - era.year);
    if (diff < minDiff) {
      minDiff = diff;
      closest = era;
    }
  }
  return closest;
}

/**
 * Returns the controlling historical entity for a given numeric territory code and year.
 * If none found or in modern era, returns undefined.
 */
export function getHistoricalEntityForTerritory(
  year: number,
  numericCode: string
): HistoricalEntity | undefined {
  if (year >= 2026) return undefined;
  const era = getClosestHistoricalEra(year);
  if (!era || era.entities.length === 0) return undefined;

  const normalized = String(parseInt(numericCode, 10));
  const padded = numericCode.padStart(3, "0");

  for (const entity of era.entities) {
    if (
      entity.territoryNumericCodes.includes(numericCode) ||
      entity.territoryNumericCodes.includes(padded) ||
      entity.territoryNumericCodes.includes(normalized)
    ) {
      return entity;
    }
  }
  return undefined;
}
