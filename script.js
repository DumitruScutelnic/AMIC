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
            nav_brand: "AMIC",
            nav_home: "Home",
            nav_about: "Chi Siamo",
            nav_activities: "Attività",
            nav_events: "Eventi",
            nav_partners: "Partner",
            hero_date: "31 Maggio 2026 | <a href=\"https://maps.google.com/?q=Parco+per+Fabio,+Cesena\" target=\"_blank\" style=\"color: inherit; text-decoration: underline;\">Parco per Fabio, Cesena</a>",
            hero_title: "DiasporaFest <br> Festival Internazionale dell'<span class=\"text-gradient\">Amicizia</span>",
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
            pe_section_title: "Post ed Eventi",
            pe_section_subtitle: "Scopri le nostre iniziative, gli eventi passati e i futuri appuntamenti.",
            post0_date: "31 Maggio 2026 | Parco per Fabio, Cesena",
            post0_title: "DiasporaFest 2026 - Festival Internazionale dell'Amicizia",
            post0_desc: "La nuova edizione del DiasporaFest! Una giornata all'insegna di cultura, gastronomia e tradizioni moldave con ospiti speciali.",
            post0_full: "<p>Siamo felicissimi di annunciare l'arrivo della nuova edizione del <strong>DiasporaFest - Festival Internazionale dell'Amicizia</strong>!</p><p>Il 31 Maggio 2026, presso il Parco per Fabio a Cesena, vi invitiamo a vivere un'esperienza unica che celebra le tradizioni, i sapori e la cultura della Repubblica di Moldova in un contesto di gioia e condivisione interculturale.</p><p>Cosa vi aspetta al Festival?</p><ul><li><strong>Spettacoli Musicali</strong>: Canti tradizionali e balli folkloristici eseguiti da artisti locali e della diaspora.</li><li><strong>Gastronomia Autentica</strong>: Stand gastronomici pronti a farvi assaporare la vera Mămăligă, sarmale, plăcinte e ottimi vini moldavi.</li><li><strong>Area Bimbi</strong>: Laboratori creativi e animazione dedicata ai più piccoli.</li><li><strong>Tornei Sportivi</strong>: Calcio, pallavolo e scacchi per celebrare l'amicizia anche nello sport.</li></ul><p>L'evento è organizzato dall'Associazione AMIC, con il patrocinio delle Istituzioni Locali e dell'Ambasciata della Repubblica di Moldova. Un ponte vibrante tra identità e integrazione che vi aspetta a braccia aperte!</p><p>👉 <strong>L'ingresso è libero e aperto a tutti!</strong> Segnate la data sul calendario, vi aspettiamo numerosi!</p>",
            post1_date: "18 aprile 2026, dalle ore 10:00 alle ore 12:00",
            post1_title: "Incontro di sensibilizzazione sullo screening mammografico",
            post1_desc: "Un importante incontro dedicato allo screening mammografico, aperto a tutte le donne del territorio per informazione e orientamento.",
            post1_full: "<p>L’Associazione AMIC informa con piacere che il giorno 18 aprile, dalle ore 10:00 alle ore 12:00, presso la sala riunioni dell’Ospedale di Cesenatico, si terrà un importante incontro di sensibilizzazione dedicato allo screening mammografico, in collaborazione con l’Associazione Romagnola Ricerca Tumori.</p><p>L’incontro è rivolto a tutte le donne del territorio, con un’attenzione particolare alle donne straniere presenti in Italia, comprese coloro che, per vari motivi, non riescono ad accedere facilmente ai percorsi di screening mammografico.</p><p>Sarà un momento prezioso di informazione, ascolto e orientamento, pensato per far conoscere meglio:</p><ul><li>che cos’è lo screening mammografico</li><li>perché è fondamentale per la prevenzione e la diagnosi precoce</li><li>quali possibilità esistono sul territorio</li><li>come accompagnare e sostenere le donne nell’accesso ai percorsi di tutela della salute</li></ul><p>L’invito è aperto a tutte le donne, senza distinzione, perché la prevenzione è un diritto fondamentale e la salute deve essere accessibile a tutte.</p><p>Come Associazione AMIC desideriamo promuovere una cultura della prevenzione, dell’inclusione e della vicinanza, affinché ogni donna possa sentirsi informata, accolta e sostenuta.</p><p>Vi aspettiamo numerose.<br>Prendersi cura di sé è un gesto di forza, consapevolezza e amore verso la propria vita.</p><p><strong>Associazione AMIC</strong><br>Insieme per la comunità, la salute e l’inclusione.</p>",
            post2_date: "Marzo 2026 | Opportunità gratuita",
            post2_title: "Percorso gratuito di orientamento al lavoro per donne",
            post2_desc: "Un percorso per donne e ragazze per costruire il proprio progetto di vita, ricercare opportunità professionali ed educazione finanziaria.",
            post2_full: "<p>L’Associazione AMIC, in collaborazione con Associazione Apeiron Cesena, invita tutte le donne straniere e le donne del territorio a partecipare ad un percorso gratuito di orientamento al lavoro, ricerca di opportunità professionali ed educazione finanziaria.</p><p>Il percorso è pensato in particolare per donne e ragazze che desiderano costruire il proprio progetto di vita, rafforzare la propria autonomia e ricevere un accompagnamento concreto per entrare o rientrare nel mondo del lavoro.</p><p>💡 Il corso è completamente gratuito ed è organizzato con il supporto della Regione Emilia-Romagna e delle realtà del territorio.</p><p>È un’occasione importante per:</p><ul><li>acquisire strumenti utili per la ricerca del lavoro</li><li>rafforzare la propria indipendenza economica</li><li>conoscere meglio le opportunità presenti sul territorio</li><li>creare una rete di sostegno tra donne</li></ul><p>📩 Per tutte le informazioni e per iscriversi è possibile consultare la locandina con i contatti.</p><p>Come associazione crediamo molto nella solidarietà tra donne e nella forza della comunità. Se conoscete donne o ragazze a cui potrebbe essere utile questo percorso, condividete questa opportunità.</p><p>Insieme possiamo creare più opportunità, più autonomia e più futuro per tutte.</p><p><strong>Associazione AMIC</strong></p>",
            pe_btn: "Scopri di più",
            btn_donate: "Sostienici",
            support_title: "Sostieni il DiasporaFest",
            support_desc: "Il tuo contributo ci aiuta a realizzare il festival e a promuovere l'integrazione e la cultura attraverso le nostre iniziative.",
            support_how: "Per donare tramite Bonifico Bancario:",
            support_label_name: "Intestatario",
            support_label_reason: "Causale",
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
            partner_5: "Associazione \"Dante Alighieri\", Cesena",
            partner_6: "Associazione LA SCACCHIERA DI ONNON",
            partner_7: "CSI CESENA",
            partner_8: "CSI FORLÌ",
            partner_9: "Trenino delle stelle",
            partner_10: "Consolato Generale della Repubblica di Moldavia a Milano",
            partner_11: "Progetto 11",
            partner_12: "L'Aquilone di Iqbal",
            footer_brand: "AMIC",
            footer_desc: "Organizzato da AMIC per promuovere l'amicizia, la cultura e le tradizioni moldave.",
            footer_contact: "Contatti",
            footer_phone: "Telefono: <a href=\"tel:+393473220558\" style=\"color: inherit; text-decoration: none;\">3473220558</a>",
            footer_legal: "Dati Legali",
            footer_assoc: "ASSOCIAZIONE AMIC APS CESENA",
            footer_hq: "Sede",
            footer_pres: "Presidente e Rappresentante Legale: Causnean Aliona",
            footer_address: "Via San Mauro 3388, 47522 Cesena (FC)",
            footer_copyright: "&copy; 2026 Associazione AMIC. Evento non-profit. Tutti i diritti riservati.",
            footer_terms: "Termini e Condizioni"
        },
        ro: {
            nav_brand: "AMIC",
            nav_home: "Acasă",
            nav_about: "Despre Noi",
            nav_activities: "Activități",
            nav_events: "Evenimente",
            nav_partners: "Parteneri",
            hero_date: "31 Mai 2026 | <a href=\"https://maps.google.com/?q=Parco+per+Fabio,+Cesena\" target=\"_blank\" style=\"color: inherit; text-decoration: underline;\">Parco per Fabio, Cesena</a>",
            hero_title: "DiasporaFest <br> Festivalul Internațional al <span class=\"text-gradient\">Prieteniei</span>",
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
            pe_section_title: "Postări și Evenimente",
            pe_section_subtitle: "Descoperă inițiativele noastre, evenimentele trecute și viitoarele întâlniri.",
            post0_date: "31 Mai 2026 | Parco per Fabio, Cesena",
            post0_title: "DiasporaFest 2026 - Festivalul Internațional al Prieteniei",
            post0_desc: "Noua ediție a DiasporaFest! O zi dedicată culturii, gastronomiei și tradițiilor moldovenești alături de invitați speciali.",
            post0_full: "<p>Suntem extrem de bucuroși să anunțăm sosirea noii ediții <strong>DiasporaFest - Festivalul Internațional al Prieteniei</strong>!</p><p>Pe 31 Mai 2026, la Parco per Fabio din Cesena, vă invităm să trăiți o experiență unică ce sărbătorește tradițiile, aromele și cultura Republicii Moldova într-un context de bucurie și schimb intercultural.</p><p>Ce vă așteaptă la Festival?</p><ul><li><strong>Spectacole Muzicale</strong>: Cântece tradiționale și dansuri folclorice interpretate de artiști locali și din diasporă.</li><li><strong>Gastronomie Autentică</strong>: Standuri gata să vă ofere adevărata Mămăligă, sarmale, plăcinte și vinuri moldovenești de excepție.</li><li><strong>Zona Copiilor</strong>: Ateliere creative și animație dedicată celor mici.</li><li><strong>Turnee Sportive</strong>: Fotbal, volei și șah pentru a celebra prietenia prin sport.</li></ul><p>Evenimentul este organizat de Asociația AMIC, cu patronajul Instituțiilor Locale și al Ambasadei Republicii Moldova. Un pod vibrant între identitate și integrare care vă așteaptă cu brațele deschise!</p><p>👉 <strong>Intrarea este liberă și deschisă tuturor!</strong> Notați data în calendar, vă așteptăm cu drag!</p>",
            post1_date: "18 aprilie 2026, între orele 10:00 – 12:00",
            post1_title: "Întâlnire de informare despre screeningul mamar",
            post1_desc: "O întâlnire importantă dedicată screeningului mamar, deschisă tuturor femeilor din teritoriu pentru informare și orientare.",
            post1_full: "<p>Asociația AMIC anunță cu plăcere că în data de 18 aprilie, între orele 10:00 și 12:00, în sala de ședințe a Spitalului din Cesenatico, va avea loc o întâlnire de informare dedicată screeningului mamar, organizată în colaborare cu Associazione Romagnola Ricerca Tumori.</p><p>Întâlnirea este adresată tuturor femeilor din teritoriu, cu o atenție specială pentru femeile străine care locuiesc în Italia, inclusiv pentru cele care, din diferite motive, nu reușesc să acceseze programele de screening mamar.</p><p>Va fi un moment important de informare, dialog și orientare, creat pentru a explica și a face cunoscut:</p><ul><li>ce este screeningul mamar</li><li>de ce este esențial pentru prevenție și diagnostic precoce</li><li>ce servicii există pe teritoriul nostru</li><li>cum pot fi sprijinite femeile în accesul la programele de protejare a sănătății</li></ul><p>Invitația este deschisă tuturor femeilor, fără nicio diferență, deoarece prevenția este un drept fundamental, iar sănătatea trebuie să fie accesibilă tuturor.</p><p>Prin această inițiativă, Asociația AMIC dorește să promoveze cultura prevenției, incluziunii și solidarității, astfel încât fiecare femeie să se simtă informată, în siguranță și sprijinită.</p><p>Vă așteptăm cu drag!<br>A avea grijă de propria sănătate este un gest de responsabilitate, conștientizare și iubire față de propria viață.</p><p><strong>Asociația AMIC</strong><br>Împreună pentru comunitate, sănătate și incluziune.</p>",
            post2_date: "Martie 2026 | Oportunitate gratuită",
            post2_title: "Curs gratuit de orientare profesională pentru femei",
            post2_desc: "Un curs pentru femei și fete pentru a-și construi propriul proiect de viață, căuta oportunități profesionale și educație financiară.",
            post2_full: "<p>Asociația AMIC, în colaborare cu Asociația Apeiron Cesena, invită toate femeile străine și femeile din teritoriu să participe la un curs gratuit de orientare în carieră, căutare de oportunități profesionale și educație financiară.</p><p>Cursul este conceput în special pentru femeile și fetele care doresc să-și construiască propriul proiect de viață, să-și consolideze autonomia și să primească un sprijin concret pentru a intra sau a reintra în câmpul muncii.</p><p>💡 Cursul este complet gratuit și este organizat cu sprijinul Regiunii Emilia-Romagna și al organizațiilor locale.</p><p>Este o oportunitate importantă pentru:</p><ul><li>a dobândi instrumente utile pentru căutarea unui loc de muncă</li><li>a vă consolida independența financiară</li><li>a cunoaște mai bine oportunitățile din zonă</li><li>a crea o rețea de sprijin între femei</li></ul><p>📩 Pentru toate informațiile și pentru a vă înscrie, puteți consulta afișul cu datele de contact.</p><p>Ca asociație, credem cu tărie în solidaritatea dintre femei și în forța comunității. Dacă cunoașteți femei sau fete cărora le-ar putea fi de folos acest parcurs, vă rugăm să împărtășiți această oportunitate.</p><p>Împreună putem crea mai multe oportunități, mai multă autonomie și mai mult viitor pentru toate.</p><p><strong>Asociația AMIC</strong></p>",
            pe_btn: "Descoperă mai mult",
            btn_donate: "Susține-ne",
            support_title: "Susține DiasporaFest",
            support_desc: "Contribuția ta ne ajută să realizăm festivalul și să promovăm integrarea și cultura prin inițiativele noastre.",
            support_how: "Pentru a dona prin Transfer Bancar:",
            support_label_name: "Beneficiar",
            support_label_reason: "Detalii Plată",
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
            partner_5: "Asociația \"Dante Alighieri\", Cesena",
            partner_6: "Asociația LA SCACCHIERA DI ONNON",
            partner_7: "CSI CESENA",
            partner_8: "CSI FORLÌ",
            partner_9: "Trenino delle stelle",
            partner_10: "Consulatul General al Republicii Moldova la Milano",
            partner_11: "Progetto 11",
            partner_12: "L'Aquilone di Iqbal",
            footer_brand: "AMIC",
            footer_desc: "Organizat de AMIC pentru a promova prietenia, cultura și tradițiile moldovenești.",
            footer_contact: "Contacte",
            footer_phone: "Telefon: <a href=\"tel:+393473220558\" style=\"color: inherit; text-decoration: none;\">+39 3473220558</a>",
            footer_legal: "Date Legale",
            footer_assoc: "ASOCIAȚIA AMIC APS CESENA",
            footer_hq: "Sediu",
            footer_pres: "Președinte și Reprezentant Legal: Causnean Aliona",
            footer_address: "Strada San Mauro 3388, 47522 Cesena (FC)",
            footer_copyright: "&copy; 2026 Asociația AMIC. Eveniment non-profit. Toate drepturile rezervate.",
            footer_terms: "Termeni și Condiții"
        },
        en: {
            nav_brand: "AMIC",
            nav_home: "Home",
            nav_about: "About Us",
            nav_activities: "Activities",
            nav_events: "Events",
            nav_partners: "Partners",
            hero_date: "May 31, 2026 | <a href=\"https://maps.google.com/?q=Parco+per+Fabio,+Cesena\" target=\"_blank\" style=\"color: inherit; text-decoration: underline;\">Parco per Fabio, Cesena</a>",
            hero_title: "DiasporaFest <br> International <span class=\"text-gradient\">Friendship</span> Festival",
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
            pe_section_title: "Posts & Events",
            pe_section_subtitle: "Discover our initiatives, past events, and future appointments.",
            post0_date: "May 31, 2026 | Parco per Fabio, Cesena",
            post0_title: "DiasporaFest 2026 - International Friendship Festival",
            post0_desc: "The new edition of DiasporaFest! A day filled with Moldovan culture, gastronomy, and traditions featuring special guests.",
            post0_full: "<p>We are thrilled to announce the arrival of the new edition of <strong>DiasporaFest - International Friendship Festival</strong>!</p><p>On May 31, 2026, at Parco per Fabio in Cesena, we invite you to experience a unique event celebrating the traditions, flavors, and culture of the Republic of Moldova in a context of joy and intercultural sharing.</p><p>What awaits you at the Festival?</p><ul><li><strong>Musical Performances</strong>: Traditional songs and folk dances performed by local and diaspora artists.</li><li><strong>Authentic Gastronomy</strong>: Food stalls ready to let you taste genuine Mămăligă, sarmale, plăcinte, and excellent Moldovan wines.</li><li><strong>Kids Area</strong>: Creative workshops and entertainment dedicated to children.</li><li><strong>Sports Tournaments</strong>: Football, volleyball, and chess to celebrate friendship through sport.</li></ul><p>The event is organized by the AMIC Association, with the patronage of Local Institutions and the Embassy of the Republic of Moldova. A vibrant bridge between identity and integration awaits you with open arms!</p><p>👉 <strong>Admission is free and open to everyone!</strong> Save the date, we look forward to seeing you there!</p>",
            post1_date: "April 18, 2026, from 10:00 AM to 12:00 PM",
            post1_title: "Breast Cancer Screening Awareness Meeting",
            post1_desc: "An important meeting dedicated to breast cancer screening, open to all women in the area for information and guidance.",
            post1_full: "<p>The AMIC Association is pleased to inform you that on April 18, from 10:00 AM to 12:00 PM, an important awareness meeting dedicated to breast cancer screening will be held in the meeting room of the Cesenatico Hospital, in collaboration with the Romagna Tumor Research Association.</p><p>The meeting is aimed at all women in the area, with special attention to foreign women living in Italy, including those who, for various reasons, cannot easily access breast screening programs.</p><p>It will be a valuable moment of information, listening, and guidance, designed to raise awareness about:</p><ul><li>what breast screening is</li><li>why it is fundamental for prevention and early diagnosis</li><li>what opportunities exist in the area</li><li>how to accompany and support women in accessing health protection pathways</li></ul><p>The invitation is open to all women, without distinction, because prevention is a fundamental right and health must be accessible to everyone.</p><p>As the AMIC Association, we wish to promote a culture of prevention, inclusion, and closeness, so that every woman can feel informed, welcomed, and supported.</p><p>We look forward to seeing many of you.<br>Taking care of oneself is a gesture of strength, awareness, and love for one's life.</p><p><strong>AMIC Association</strong><br>Together for the community, health, and inclusion.</p>",
            post2_date: "March 2026 | Free Opportunity",
            post2_title: "Free Career Guidance Course for Women",
            post2_desc: "A course for women and girls to build their life project, find professional opportunities, and gain financial education.",
            post2_full: "<p>The AMIC Association, in collaboration with the Apeiron Cesena Association, invites all foreign women and women from the area to participate in a free career guidance, professional opportunity search, and financial education course.</p><p>The course is designed in particular for women and girls who wish to build their life project, strengthen their autonomy, and receive concrete support to enter or re-enter the workforce.</p><p>💡 The course is completely free and is organized with the support of the Emilia-Romagna Region and local organizations.</p><p>It is an important opportunity to:</p><ul><li>acquire useful tools for job hunting</li><li>strengthen your financial independence</li><li>learn more about opportunities in the area</li><li>create a support network among women</li></ul><p>📩 For all information and to register, you can consult the flyer with the contact details.</p><p>As an association, we strongly believe in solidarity between women and the strength of the community. If you know women or girls who could benefit from this path, please share this opportunity.</p><p>Together we can create more opportunities, more autonomy, and more future for everyone.</p><p><strong>AMIC Association</strong></p>",
            pe_btn: "Discover more",
            btn_donate: "Support Us",
            support_title: "Support DiasporaFest",
            support_desc: "Your contribution helps us realize the festival and promote integration and culture through our initiatives.",
            support_how: "To donate via Bank Transfer:",
            support_label_name: "Beneficiary",
            support_label_reason: "Payment Details",
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
            partner_5: "\"Dante Alighieri\" Association, Cesena",
            partner_6: "LA SCACCHIERA DI ONNON Association",
            partner_7: "CSI CESENA",
            partner_8: "CSI FORLÌ",
            partner_9: "Trenino delle stelle",
            partner_10: "Consulate General of the Republic of Moldova in Milan",
            partner_11: "Progetto 11",
            partner_12: "L'Aquilone di Iqbal",
            footer_brand: "AMIC",
            footer_desc: "Organized by AMIC to promote Moldovan friendship, culture, and traditions.",
            footer_contact: "Contact",
            footer_phone: "Phone: <a href=\"tel:+393473220558\" style=\"color: inherit; text-decoration: none;\">+39 3473220558</a>",
            footer_legal: "Legal Data",
            footer_assoc: "AMIC APS CESENA ASSOCIATION",
            footer_hq: "Headquarters",
            footer_pres: "President & Legal Representative: Causnean Aliona",
            footer_address: "Via San Mauro 3388, 47522 Cesena (FC)",
            footer_copyright: "&copy; 2026 AMIC Association. Non-profit event. All rights reserved.",
            footer_terms: "Terms and Conditions"
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

    // --- Carousel Navigation ---
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const carouselContainer = document.getElementById('events-carousel');
    
    if (prevBtn && nextBtn && carouselContainer) {
        // Approximate width of one card + gap (800px + 32px)
        const scrollAmount = 832; 
        
        prevBtn.addEventListener('click', () => {
            carouselContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
        
        nextBtn.addEventListener('click', () => {
            carouselContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }

});
