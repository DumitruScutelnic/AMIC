// script.js - DiasporaFest Interactivity

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Header Scroll Effect ---
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY >= 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 2. Mobile Menu Toggle ---
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show-menu');
            navToggle.classList.toggle('active');
            // If header isn't scrolled, ensure background gets applied
            if (!header.classList.contains('scrolled') && window.scrollY < 50) {
                 header.style.backgroundColor = navMenu.classList.contains('show-menu') ? 'var(--bg-white)' : 'transparent';
                 const logoTxt = document.querySelector('.logo');
                 logoTxt.style.color = navMenu.classList.contains('show-menu') ? 'var(--text-dark)' : 'var(--bg-white)';
            }
        });
    }

    // --- 3. Close Menu on Link Click ---
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
            navToggle.classList.remove('active');
            header.style.backgroundColor = '';
            document.querySelector('.logo').style.color = '';
        });
    });

    // --- 4. Scroll Active Link Highlight ---
    const sections = document.querySelectorAll('section[id]');

    function scrollActive() {
        const scrollY = window.scrollY;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100; // Offset for fixed header
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (navLink) {
                if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                    document.querySelector('.nav-menu a.active')?.classList.remove('active');
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }
    window.addEventListener('scroll', scrollActive);

    // --- 5. Language Switching Logic ---
    const translations = {
        it: {
            nav_brand: "DiasporaFest",
            nav_home: "Home",
            nav_about: "Chi Siamo",
            nav_activities: "Attività",
            nav_partners: "Partner",
            hero_date: "31 Maggio 2026 | Cesena",
            hero_title: "Festival Internazionale dell'<span class=\"text-gradient\">Amicizia</span>",
            hero_subtitle: "Un ponte vibrante tra identità, cultura e integrazione organizzato da AMIC.",
            btn_discover: "Scopri di più",
            btn_program: "Vedi il Programma",
            about_title: "Celebriamo la Nostra Identità",
            about_p1: "AMIC (Associazione dei Moldavi con Impatto Comunitario) presenta con orgoglio un festival internazionale dedicato alla promozione dell'amicizia e delle tradizioni moldave.",
            about_p2: "Il nostro evento riunisce comunità della diaspora e ospiti internazionali per celebrare una giornata ricca di cultura, arte e valori comuni. Vogliamo costruire uno spazio di dialogo e scambio culturale valorizzando il nostro patrimonio.",
            about_quote: "\"AMIC è una piattaforma per amicizia, cultura e tradizione.\"",
            stat_edition: "Edizione",
            stat_participants: "Partecipanti Attesi",
            stat_activities: "Spettacoli e Attività",
            activities_title: "Un Programma Ricco di Emozioni",
            activities_subtitle: "Una giornata articolata pensata per tutti i gusti e tutte le età.",
            act_culture_title: "Cultura e Spettacolo",
            act_culture_desc: "Esibizioni di musica e danza tradizionale, momenti interculturali e ospiti istituzionali. La tradizione prende vita sul palco.",
            act_sport_title: "Sport e Inclusione",
            act_sport_desc: "Tornei di calcio, pallavolo, scacchi e ping-pong. Lo sport unisce e crea nuove amicizie in un'atmosfera competitiva ma amichevole.",
            act_kids_title: "Area Kids",
            act_kids_desc: "Spazi dedicati ai bambini con animazione e laboratori creativi. Un'area sicura e divertente per i più piccoli.",
            act_food_title: "Food & Beverage",
            act_food_desc: "Stand con cucina tradizionale moldava e specialità romagnole. Scopri il gusto autentico della Mămăligă e delle sarmale.",
            partners_title: "Sostenuto Da",
            partners_subtitle: "Ringraziamo i nostri partner che rendono possibile questo evento.",
            partner_1: "Ambasciata della Repubblica di Moldavia",
            partner_2: "Istituzioni Culturali",
            partner_3: "ONG della Diaspora",
            partner_4: "Autorità Locali",
            footer_brand: "DiasporaFest",
            footer_desc: "Organizzato da AMIC per promuovere l'amicizia, la cultura e le tradizioni moldave.",
            footer_contact: "Contatti",
            footer_copyright: "&copy; 2026 Associazione AMIC. Evento non-profit. Tutti i diritti riservati."
        },
        ro: {
            nav_brand: "DiasporaFest",
            nav_home: "Acasă",
            nav_about: "Despre Noi",
            nav_activities: "Activități",
            nav_partners: "Parteneri",
            hero_date: "31 Mai 2026 | Cesena",
            hero_title: "Festivalul Internațional al <span class=\"text-gradient\">Prieteniei</span>",
            hero_subtitle: "Un pod vibrant între identitate, cultură și integrare organizat de AMIC.",
            btn_discover: "Descoperă mai mult",
            btn_program: "Vezi Programul",
            about_title: "Sărbătorim Identitatea Noastră",
            about_p1: "AMIC (Asociația Moldovenilor cu Impact Comunitar) prezintă cu mândrie un festival internațional dedicat promovării prieteniei și tradițiilor moldovenești.",
            about_p2: "Evenimentul nostru reunește comunități din diaspora și invitați internaționali pentru a celebra o zi plină de cultură, artă și valori comune. Vrem să construim un spațiu de dialog și schimb cultural valorificând patrimoniul nostru.",
            about_quote: "\"AMIC este o platformă pentru prietenie, cultură și tradiție.\"",
            stat_edition: "Ediția",
            stat_participants: "Participanți Așteptați",
            stat_activities: "Spectacole și Activități",
            activities_title: "Un Program Bogat în Emoții",
            activities_subtitle: "O zi articulată gândită pentru toate gusturile și toate vârstele.",
            act_culture_title: "Cultură și Spectacol",
            act_culture_desc: "Esibiții de muzică și dans tradițional, momente interculturale și oaspeți instituționali. Tradiția prinde viață pe scenă.",
            act_sport_title: "Sport și Incluziune",
            act_sport_desc: "Turnee de fotbal, volei, șah și tenis de masă. Sportul unește și creează noi prietenii într-o atmosferă competitivă, dar prietenoasă.",
            act_kids_title: "Zona Copiilor",
            act_kids_desc: "Spații dedicate copiilor cu animație și ateliere creative. O zonă sigură și distractivă pentru cei mai mici participanți.",
            act_food_title: "Mâncare și Băutură",
            act_food_desc: "Standuri cu bucătărie tradițională moldovenească și specialități romagnole. Descoperă gustul autentic al mămăligii și al sarmalelor.",
            partners_title: "Susținut De",
            partners_subtitle: "Mulțumim partenerilor noștri care fac acest eveniment posibil.",
            partner_1: "Ambasada Republicii Moldova",
            partner_2: "Instituții Culturale",
            partner_3: "ONG-uri din Diaspora",
            partner_4: "Autorități Locale",
            footer_brand: "DiasporaFest",
            footer_desc: "Organizat de AMIC pentru a promova prietenia, cultura și tradițiile moldovenești.",
            footer_contact: "Contacte",
            footer_copyright: "&copy; 2026 Asociația AMIC. Eveniment non-profit. Toate drepturile rezervate."
        },
        en: {
            nav_brand: "DiasporaFest",
            nav_home: "Home",
            nav_about: "About Us",
            nav_activities: "Activities",
            nav_partners: "Partners",
            hero_date: "May 31, 2026 | Cesena",
            hero_title: "International <span class=\"text-gradient\">Friendship</span> Festival",
            hero_subtitle: "A vibrant bridge between identity, culture, and integration organized by AMIC.",
            btn_discover: "Discover more",
            btn_program: "View Program",
            about_title: "Celebrating Our Identity",
            about_p1: "AMIC (Association of Moldovans with Community Impact) proudly presents an international festival dedicated to promoting Moldovan friendship and traditions.",
            about_p2: "Our event brings together diaspora communities and international guests to celebrate a day full of culture, art, and shared values. We aim to build a space for dialogue and cultural exchange by valuing our heritage.",
            about_quote: "\"AMIC is a platform for friendship, culture, and tradition.\"",
            stat_edition: "Edition",
            stat_participants: "Expected Participants",
            stat_activities: "Shows & Activities",
            activities_title: "A Program Rich in Emotions",
            activities_subtitle: "A well-structured day designed for all tastes and all ages.",
            act_culture_title: "Culture and Spectacle",
            act_culture_desc: "Exhibitions of traditional music and dance, intercultural moments, and institutional guests. Tradition comes to life on stage.",
            act_sport_title: "Sport and Inclusion",
            act_sport_desc: "Tournaments of football, volleyball, chess, and table tennis. Sport unites and creates new friendships in a competitive but friendly atmosphere.",
            act_kids_title: "Kids Area",
            act_kids_desc: "Spaces dedicated to children with animation and creative workshops. A safe and fun area for the youngest participants.",
            act_food_title: "Food & Beverage",
            act_food_desc: "Stalls with traditional Moldovan cuisine and Romangnole specialties. Discover the authentic taste of Mămăligă and sarmale.",
            partners_title: "Supported By",
            partners_subtitle: "We thank our partners who make this event possible.",
            partner_1: "Embassy of the Republic of Moldova",
            partner_2: "Cultural Institutions",
            partner_3: "Diaspora NGOs",
            partner_4: "Local Authorities",
            footer_brand: "DiasporaFest",
            footer_desc: "Organized by AMIC to promote Moldovan friendship, culture, and traditions.",
            footer_contact: "Contact",
            footer_copyright: "&copy; 2026 AMIC Association. Non-profit event. All rights reserved."
        }
    };

    const langBtn = document.getElementById('lang-btn');
    const langDropdown = document.querySelector('.lang-dropdown');
    const currentFlag = document.getElementById('current-flag');
    const currentLangText = document.getElementById('current-lang');
    const langOptions = document.querySelectorAll('.lang-option');

    const flags = {
        'it': '🇮🇹',
        'ro': '🇲🇩', // Or 🇷🇴
        'en': '🇬🇧'
    };

    // Toggle dropdown
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('active');
    });

    // Close dropdown on outside click
    document.addEventListener('click', () => {
        langDropdown.classList.remove('active');
    });

    // Handle language selection
    langOptions.forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.getAttribute('data-value');
            setLanguage(lang);
            langDropdown.classList.remove('active');
        });
    });

    // Initialize language
    const savedLang = localStorage.getItem('diasporaFestLang') || 'it';
    setLanguage(savedLang);

    function setLanguage(lang) {
        localStorage.setItem('diasporaFestLang', lang);
        document.documentElement.lang = lang; // Update document language
        
        // Update UI button
        if (flags[lang]) {
            currentFlag.textContent = flags[lang];
            currentLangText.textContent = lang.toUpperCase();
        }

        // Update Text for translated elements
        const elementsInfo = document.querySelectorAll('[data-i18n]');
        elementsInfo.forEach(el => {
            const translationKey = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][translationKey]) {
                el.innerHTML = translations[lang][translationKey];
            }
        });
    }

});
