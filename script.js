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
            post0_full: `
<div class="post-hero-content">
    <p style="font-size: 1.1rem; color: var(--secondary); font-weight: bold; text-transform: uppercase;">In occasione della Festa Internazionale dei Bambini — ingresso gratuito per tutti / intrare liberă.</p>
    
    <h3 style="margin-top: 2rem; color: var(--primary);">👥 Chi Siamo / Organizatori</h3>
    <div style="background: var(--bg-light); padding: 1.5rem; border-radius: var(--radius); margin-bottom: 2rem;">
        <p><strong>Organizzatore principale:</strong><br>
        AMIC APS – Associazione dei Moldavi con Impatto Comunitario, Cesena (FC)<br>
        Președinte: Aliona Causnean | 📧 <a href="mailto:amicimpact@gmail.com">amicimpact@gmail.com</a> | 📞 +39 347 3220558<br>
        🌐 <a href="https://associazione-amic.it" target="_blank">associazione-amic.it</a></p>
        
        <p style="margin-top: 1rem;"><strong>Partner ufficiale:</strong><br>
        ASD Cimbrișor – Verona (15 ani de activitate, 10+ concerte ed eventi)<br>
        Președinte: Lucia Zupcu</p>
        
        <p style="margin-top: 1rem;"><strong>Partner artistici:</strong><br>
        Ansamblul Busuioc (Padova) & Ansamblul Vatra (Torino)</p>
        
        <p style="margin-top: 1rem;"><strong>Partner istituzionali:</strong><br>
        Ambasciata della Repubblica di Moldova in Italia, Comune di Cesena</p>
    </div>

    <h3 style="color: var(--primary);">🕒 Il Programma Completo (Programul)</h3>
    <div class="program-timeline" style="margin-bottom: 2rem;">
        <style>
            .pg-item { display: flex; padding: 1rem 0; border-bottom: 1px solid #eee; }
            .pg-time { min-width: 130px; font-weight: bold; color: var(--secondary); }
            .pg-desc { flex: 1; }
            @media(max-width: 600px) { .pg-item { flex-direction: column; } .pg-time { margin-bottom: 0.5rem; } }
            details { background: #f9f9f9; padding: 1rem; margin-bottom: 0.5rem; border-radius: 4px; border-left: 4px solid var(--secondary); }
            summary { font-weight: bold; cursor: pointer; color: var(--primary); outline: none; }
            details[open] summary ~ * { animation: fadeIn 0.3s ease-in-out; }
            .social-share { display: flex; gap: 1rem; margin-top: 1rem; flex-wrap: wrap; }
            .share-btn { padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; text-decoration: none; color: white; display: inline-block; }
        </style>
        <div class="pg-item"><div class="pg-time">07:00 – 09:00</div><div class="pg-desc">Arrivo staff, allestimento, posizionamento food truck</div></div>
        <div class="pg-item"><div class="pg-time">09:00 – 11:00</div><div class="pg-desc">Liturgia / momento spirituale – accoglienza partecipanti</div></div>
        <div class="pg-item"><div class="pg-time">11:00 – 12:00</div><div class="pg-desc"><strong>Apertura ufficiale</strong> – saluti istituzionali, presentazione organizzatori e partner</div></div>
        <div class="pg-item"><div class="pg-time">11:00 – 17:00</div><div class="pg-desc"><strong>Area Bambini</strong>: animazione, laboratori creativi, pittura sul viso, spettacolo magia e clown, "Premio Il Sorriso dell'Amicizia"</div></div>
        <div class="pg-item"><div class="pg-time">11:30 – 18:00</div><div class="pg-desc"><strong>Tornei sportivi – Cupa Prieteniei</strong>: calcio, pallavolo, scacchi, lotta libera</div></div>
        <div class="pg-item"><div class="pg-time">11:00 – 22:30</div><div class="pg-desc"><strong>Area Food</strong> attiva – cucina moldava, romena e italiana. Picnic familii.</div></div>
        <div class="pg-item"><div class="pg-time">12:00 – 14:00</div><div class="pg-desc">Musica soft e ambient</div></div>
        <div class="pg-item"><div class="pg-time">12:30</div><div class="pg-desc"><strong>Lancio del libro</strong>: <em>"Apa care îşi bea mâinile / L'acqua che si beve le mani"</em> – Radmila Popovici</div></div>
        <div class="pg-item"><div class="pg-time">15:00 – 18:00</div><div class="pg-desc"><strong>Spettacoli folcloristici</strong>: Ansamblul Cimbrișor (Verona), Ansamblul Busuioc (Padova), Ansamblul Vatra (Torino)</div></div>
        <div class="pg-item"><div class="pg-time">18:00 – 19:00</div><div class="pg-desc">Pausa tecnica</div></div>
        <div class="pg-item"><div class="pg-time">19:00 – 22:00</div><div class="pg-desc">🎤 <strong>Concerto serale</strong> – Ion Paladi (artista della Repubblica di Moldova) + Chef Basarabean (band musicale tradizionale)</div></div>
        <div class="pg-item"><div class="pg-time">22:30 – 23:00</div><div class="pg-desc">Saluti finali, ringraziamenti, invito all'edizione 2027</div></div>
        <div class="pg-item"><div class="pg-time">23:00 – 01:00</div><div class="pg-desc">Smontaggio e pulizia</div></div>
    </div>

    <h3 style="color: var(--primary);">💖 Donazione Volontaria (Donație Benevolă)</h3>
    <p>Il festival è <strong>completamente gratuito per tutti</strong>. Per aiutarci a coprire i costi non finanziati (sicurezza, affitto suolo, igienizzazione), verrà proposta una <strong>donazione volontaria di 5–10€</strong>. L'eventuale surplus sarà donato a un'associazione di beneficenza in Repubblica di Moldova.</p>

    <h3 style="color: var(--primary); margin-top: 2rem;">📍 Mappa e Indicazioni (Cum ajungi?)</h3>
    <div style="border-radius: var(--radius); overflow: hidden; margin-bottom: 2rem; margin-top: 1rem;">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2861.9772879502283!2d12.234694415510619!3d44.14819777910777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132ca5accad0b7eb%3A0x8fc898af4be15560!2sParco%20per%20Fabio!5e0!3m2!1sit!2sit!4v1683294326123!5m2!1sit!2sit" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>

    <h3 style="color: var(--primary);">🤔 FAQ - Domande Frequenti</h3>
    <details>
        <summary>Come arrivo al Parco per Fabio?</summary>
        <p style="margin-top:0.5rem">Il parco si trova a Cesena. Usa la mappa per attivare il navigatore sul tuo smartphone.</p>
    </details>
    <details>
        <summary>C'è parcheggio?</summary>
        <p style="margin-top:0.5rem">Sì, sono disponibili vari parcheggi gratuiti nelle vie limitrofe al parco. Arriva presto!</p>
    </details>
    <details>
        <summary>Posso portare i bambini?</summary>
        <p style="margin-top:0.5rem">Certo! L'intero evento è pensato per le famiglie e ci sarà una vasta <strong>Area Bambini</strong>.</p>
    </details>
    <details>
        <summary>Cum mă pot înscrie la turneele sportive?</summary>
        <p style="margin-top:0.5rem">Per partecipare ai tornei sportivi (Cupa Prieteniei) contatta l'organizzazione la mattina dell'evento.</p>
    </details>

    <div style="margin-top: 3rem; text-align: center; padding: 2rem; background: var(--primary); color: white; border-radius: var(--radius); box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
        <p style="font-size: 1.2rem; font-weight: bold; margin-bottom: 2rem;">Condividi l'evento e porta la tua famiglia!</p>
        <a href="https://forms.gle/5xVYXEEYi9rVX4yVA" target="_blank" style="display: inline-block; background: var(--bg-white); color: var(--primary); padding: 1rem 2rem; border-radius: 30px; font-weight: bold; text-decoration: none; margin-bottom: 2rem; transition: transform 0.2s;">📝 COMPILA IL FORM DI PREISCRIZIONE</a>
        
        <div style="font-size: 0.9rem; opacity: 0.9;">
            #DiasporaFest2026 #AMIC #MoldovaInItalia #FestivalulPrieteniei #CesenaEvents #DiasporaMoldova
        </div>
        
        <div class="social-share" style="justify-content: center; margin-top: 1.5rem;">
            <a href="https://www.facebook.com/sharer/sharer.php?u=https://associazione-amic.it" target="_blank" class="share-btn" style="background: #1877F2;">📘 Condividi su Facebook</a>
            <a href="https://api.whatsapp.com/send?text=Vieni%20al%20DiasporaFest%202026!%20Scopri%20di%20pi%C3%B9%20su%20https://associazione-amic.it" target="_blank" class="share-btn" style="background: #25D366;">🟢 Invia su WhatsApp</a>
        </div>
    </div>
</div>`,
            post1_date: "18 aprile 2026, dalle ore 10:00 alle ore 12:00",
            post1_title: "Incontro di sensibilizzazione sullo screening mammografico",
            post1_desc: "Un importante incontro dedicato allo screening mammografico, aperto a tutte le donne del territorio per informazione e orientamento.",
            post1_full: "<p style=\"color: var(--secondary); font-weight: bold; text-transform: uppercase; margin-bottom: 1rem;\">ORGANIZZATO DA: ARRT e ASL ROMAGNA</p><p>L’Associazione AMIC informa con piacere che il giorno 18 aprile, dalle ore 10:00 alle ore 12:00, presso la sala riunioni dell’Ospedale di Cesenatico, si terrà un importante incontro di sensibilizzazione dedicato allo screening mammografico, in collaborazione con l’Associazione Romagnola Ricerca Tumori.</p><p>L’incontro è rivolto a tutte le donne del territorio, con un’attenzione particolare alle donne straniere presenti in Italia, comprese coloro che, per vari motivi, non riescono ad accedere facilmente ai percorsi di screening mammografico.</p><p>Sarà un momento prezioso di informazione, ascolto e orientamento, pensato per far conoscere meglio:</p><ul><li>che cos’è lo screening mammografico</li><li>perché è fondamentale per la prevenzione e la diagnosi precoce</li><li>quali possibilità esistono sul territorio</li><li>come accompagnare e sostenere le donne nell’accesso ai percorsi di tutela della salute</li></ul><p>L’invito è aperto a tutte le donne, senza distinzione, perché la prevenzione è un diritto fondamentale e la salute deve essere accessibile a tutte.</p><p>Come Associazione AMIC desideriamo promuovere una cultura della prevenzione, dell’inclusione e della vicinanza, affinché ogni donna possa sentirsi informata, accolta e sostenuta.</p><p>Vi aspettiamo numerose.<br>Prendersi cura di sé è un gesto di forza, consapevolezza e amore verso la propria vita.</p><p><strong>Associazione AMIC</strong><br>Insieme per la comunità, la salute e l’inclusione.</p>",
            post2_date: "Marzo 2026 | Opportunità gratuita",
            post2_title: "Percorso gratuito di orientamento al lavoro per donne",
            post2_full: "<p style=\"color: var(--secondary); font-weight: bold; text-transform: uppercase; margin-bottom: 1rem;\">ORGANIZZATO DA: Apeiron</p><p>L’Associazione AMIC, in collaborazione con Associazione Apeiron Cesena, invita tutte le donne straniere e le donne del territorio a partecipare ad un percorso gratuito di orientamento al lavoro, ricerca di opportunità professionali ed educazione finanziaria.</p><p>Il percorso è pensato in particolare per donne e ragazze che desiderano costruire il proprio progetto di vita, rafforzare la propria autonomia e ricevere un accompagnamento concreto per entrare o rientrare nel mondo del lavoro.</p><p>💡 Il corso è completamente gratuito ed è organizzato con il supporto della Regione Emilia-Romagna e delle realtà del territorio.</p><p>È un’occasione importante per:</p><ul><li>acquisire strumenti utili per la ricerca del lavoro</li><li>rafforzare la propria indipendenza economica</li><li>conoscere meglio le opportunità presenti sul territorio</li><li>creare una rete di sostegno tra donne</li></ul><p>📩 Per tutte le informazioni e per iscriversi è possibile consultare la locandina con i contatti.</p><p>Come associazione crediamo molto nella solidarietà tra donne e nella forza della comunità. Se conoscete donne o ragazze a cui potrebbe essere utile questo percorso, condividete questa opportunità.</p><p>Insieme possiamo creare più opportunità, più autonomia e più futuro per tutte.</p><p><strong>Associazione AMIC</strong></p>",
            post3_date: "2 maggio 2026, Ore 16:00",
            post3_title: "Evento culturale dedicato a Radmila Popovici",
            post3_full: "<p>L’Associazione Moldavi con Impatto Comunitario (AMIC) è lieta di invitarvi a un evento culturale speciale a Cesena, dedicato alla poetessa Radmila Popovici.</p><p>📅 2 maggio 2026<br>🕓 Ore 16:00<br>📍 Spazio Cesuola, Via Ponte Abbadesse 451, Cesena</p><p>📚 Durante l’incontro saranno presentati i volumi:</p><ul><li>📘 &ldquo;L’acqua che si beve le mani&rdquo;</li><li>📙 &ldquo;Nonna Liuba la sapientissima&rdquo;</li></ul><p>Sarà un pomeriggio di poesia, dialogo ed emozione, un’occasione per incontrarsi, conoscersi e costruire ponti tra culture.</p><p>📖 In questa occasione, AMIC donerà un kit di libri alla Biblioteca Malatestiana, contribuendo ad arricchire la sezione in lingua romena, in collaborazione con il Comune di Cesena.</p><p>🌍 Evento aperto a tutta la comunità.<br>Vi aspettiamo con grande piacere! 💛</p>",
            post4_date: "25 aprile 2026, Ore 14:30",
            post4_title: "Festa della Liberazione a Cesena - Comunità e Inclusione",
            post4_desc: "Un incontro speciale ai Giardini di Serravalle per celebrare la Festa della Liberazione uniti da cultura, tradizioni e condivisione.",
            post4_full: "<p>✨🌍 <strong>Cesena si incontra, Cesena si unisce</strong> 🌍✨</p><p>Sabato 25 aprile, alle ore 14:30, i Giardini di Serravalle a Cesena si trasformeranno in un luogo speciale, dove culture, tradizioni e persone si incontrano per celebrare insieme la Festa della Liberazione.</p><p>Sarà una giornata dedicata alla libertà, alla comunità e alla bellezza delle diversità che diventano ricchezza.<br>🌿 Un momento in cui tutte le comunità, tutte le culture e tutte le famiglie si raduneranno nello stesso spazio, unite dallo stesso valore: essere liberi, insieme.</p><p>🎶 Musica, colori, tradizioni e sorrisi accompagneranno questo pomeriggio speciale.</p><p>👨&zwj;👩&zwj;👧&zwj;👦 Un evento aperto a tutti, grandi e piccoli, dove ogni presenza conta e ogni cultura racconta una storia.</p><p>💛 Perché la libertà è ancora più forte quando viene condivisa.</p><p>📍 <strong>Dove:</strong> Giardini di Serravalle, Cesena<br>🕒 <strong>Quando:</strong> Sabato 25 aprile, ore 14:30</p><p>Vi aspettiamo per celebrare insieme, con il cuore aperto e lo spirito della comunità.</p><p><em>#25Aprile #Cesena #FestaDellaLiberazione #Comunità #Insieme #Inclusione #Tradizioni #Unità</em></p>",
            pe_btn: "Scopri di più",
            btn_donate: "Sostienici",
            hero_btn_register: "Iscriviti Online",
            card_btn_register: "Iscriviti Ora",
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
            partner_7: "Il Gelatino",
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
            footer_terms: "Termini e Condizioni",
            organizer_label: "Organizzato da:",
            footer_affiliated: "Affiliata a Arci"
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
            post0_full: `
<div class="post-hero-content">
    <p style="font-size: 1.1rem; color: var(--secondary); font-weight: bold; text-transform: uppercase;">Cu ocazia Zilei Internaționale a Copilului — intrare liberă pentru toți.</p>
    
    <h3 style="margin-top: 2rem; color: var(--primary);">👥 Cine Suntem / Organizatori</h3>
    <div style="background: var(--bg-light); padding: 1.5rem; border-radius: var(--radius); margin-bottom: 2rem;">
        <p><strong>Organizator principal:</strong><br>
        AMIC APS – Asociația Moldovenilor cu Impact Comunitar, Cesena (FC)<br>
        Președinte: Aliona Causnean | 📧 <a href="mailto:amicimpact@gmail.com">amicimpact@gmail.com</a> | 📞 +39 347 3220558<br>
        🌐 <a href="https://associazione-amic.it" target="_blank">associazione-amic.it</a></p>
        
        <p style="margin-top: 1rem;"><strong>Partener oficial:</strong><br>
        ASD Cimbrișor – Verona (15 ani de activitate, peste 10 concerte și evenimente)<br>
        Președinte: Lucia Zupcu</p>
        
        <p style="margin-top: 1rem;"><strong>Parteneri artistici:</strong><br>
        Ansamblul Busuioc (Padova) & Ansamblul Vatra (Torino)</p>
        
        <p style="margin-top: 1rem;"><strong>Parteneri instituționali:</strong><br>
        Ambasada Republicii Moldova în Italia, Primăria Comunei Cesena</p>
    </div>

    <h3 style="color: var(--primary);">🕒 Programul Complet</h3>
    <div class="program-timeline" style="margin-bottom: 2rem;">
        <style>
            .pg-item { display: flex; padding: 1rem 0; border-bottom: 1px solid #eee; }
            .pg-time { min-width: 130px; font-weight: bold; color: var(--secondary); }
            .pg-desc { flex: 1; }
            @media(max-width: 600px) { .pg-item { flex-direction: column; } .pg-time { margin-bottom: 0.5rem; } }
            details { background: #f9f9f9; padding: 1rem; margin-bottom: 0.5rem; border-radius: 4px; border-left: 4px solid var(--secondary); }
            summary { font-weight: bold; cursor: pointer; color: var(--primary); outline: none; }
            details[open] summary ~ * { animation: fadeIn 0.3s ease-in-out; }
            .social-share { display: flex; gap: 1rem; margin-top: 1rem; flex-wrap: wrap; }
            .share-btn { padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; text-decoration: none; color: white; display: inline-block; }
        </style>
        <div class="pg-item"><div class="pg-time">07:00 – 09:00</div><div class="pg-desc">Sosirea staff-ului, amenajare, poziționare food truck</div></div>
        <div class="pg-item"><div class="pg-time">09:00 – 11:00</div><div class="pg-desc">Liturghie / moment spiritual – primirea participanților</div></div>
        <div class="pg-item"><div class="pg-time">11:00 – 12:00</div><div class="pg-desc"><strong>Deschidere oficială</strong> – saluturi instituționale, prezentarea organizatorilor și partenerilor</div></div>
        <div class="pg-item"><div class="pg-time">11:00 – 17:00</div><div class="pg-desc"><strong>Zona Copiilor</strong>: animație, ateliere creative, face painting, spectacol de magie și clovni, "Premiul Zâmbetul Prieteniei"</div></div>
        <div class="pg-item"><div class="pg-time">11:30 – 18:00</div><div class="pg-desc"><strong>Turnee sportive – Cupa Prieteniei</strong>: fotbal, volei, șah, lupte libere</div></div>
        <div class="pg-item"><div class="pg-time">11:00 – 22:30</div><div class="pg-desc"><strong>Zona Food</strong> activă – bucătărie moldovenească, românească și italiană. Picnic în familie.</div></div>
        <div class="pg-item"><div class="pg-time">12:00 – 14:00</div><div class="pg-desc">Muzică de fundal și relaxare</div></div>
        <div class="pg-item"><div class="pg-time">12:30</div><div class="pg-desc"><strong>Lansare de carte</strong>: <em>"Apa care îşi bea mâinile / L'acqua che si beve le mani"</em> – Radmila Popovici</div></div>
        <div class="pg-item"><div class="pg-time">15:00 – 18:00</div><div class="pg-desc"><strong>Spectacole folclorice</strong>: Ansamblul Cimbrișor (Verona), Ansamblul Busuioc (Padova), Ansamblul Vatra (Torino)</div></div>
        <div class="pg-item"><div class="pg-time">18:00 – 19:00</div><div class="pg-desc">Pauză tehnică</div></div>
        <div class="pg-item"><div class="pg-time">19:00 – 22:00</div><div class="pg-desc">🎤 <strong>Concert de seară</strong> – Ion Paladi (Artist al Poporului din Republica Moldova) + Chef Basarabean (taraf tradițional)</div></div>
        <div class="pg-item"><div class="pg-time">22:30 – 23:00</div><div class="pg-desc">Saluturi finale, mulțumiri, invitație pentru ediția din 2027</div></div>
        <div class="pg-item"><div class="pg-time">23:00 – 01:00</div><div class="pg-desc">Demontare și curățenie</div></div>
    </div>

    <h3 style="color: var(--primary);">💖 Donație Benevolă</h3>
    <p>Festivalul este <strong>absolut gratuit pentru toți</strong>. Pentru a ne ajuta să acoperim costurile logistice nefinanțate (securitate, chirie teren, igienizare), vă propunem o <strong>donație benevolă de 5–10€</strong>. Orice surplus va fi donat unei asociații de caritate din Republica Moldova. Vă mulțumim din suflet!</p>

    <h3 style="color: var(--primary); margin-top: 2rem;">📍 Hartă și Indicații (Cum ajungi?)</h3>
    <div style="border-radius: var(--radius); overflow: hidden; margin-bottom: 2rem; margin-top: 1rem;">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2861.9772879502283!2d12.234694415510619!3d44.14819777910777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132ca5accad0b7eb%3A0x8fc898af4be15560!2sParco%20per%20Fabio!5e0!3m2!1sit!2sit!4v1683294326123!5m2!1sit!2sit" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>

    <h3 style="color: var(--primary);">🤔 FAQ - Întrebări Frecvente</h3>
    <details>
        <summary>Cum ajung la Parco per Fabio?</summary>
        <p style="margin-top:0.5rem">Parcul este în Cesena. Folosește harta de mai sus pentru a activa navigația pe telefon. Există stații de autobuz în apropiere cu legătură spre centru.</p>
    </details>
    <details>
        <summary>Există parcare?</summary>
        <p style="margin-top:0.5rem">Da, sunt disponibile parcări gratuite pe străzile din jurul parcului. Vă recomandăm să veniți devreme!</p>
    </details>
    <details>
        <summary>Pot veni cu copiii?</summary>
        <p style="margin-top:0.5rem">Absolut! Întregul eveniment este gândit pentru familii și va exista o <strong>Zonă a Copiilor</strong> amenajată special.</p>
    </details>
    <details>
        <summary>Cum mă pot înscrie la turneele sportive?</summary>
        <p style="margin-top:0.5rem">Pentru a participa la „Cupa Prieteniei” vă rugăm să completați formularul de înregistrare sau să contactați organizatorii direct la fața locului dimineața devreme.</p>
    </details>

    <div style="margin-top: 3rem; text-align: center; padding: 2rem; background: var(--primary); color: white; border-radius: var(--radius); box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
        <p style="font-size: 1.2rem; font-weight: bold; margin-bottom: 2rem;">Distribuie evenimentul și vino cu familia!</p>
        <a href="https://forms.gle/5xVYXEEYi9rVX4yVA" target="_blank" style="display: inline-block; background: var(--bg-white); color: var(--primary); padding: 1rem 2rem; border-radius: 30px; font-weight: bold; text-decoration: none; margin-bottom: 2rem; transition: transform 0.2s;">📝 COMPLETEAZĂ FORMULARUL DE ÎNREGISTRARE</a>
        
        <div style="font-size: 0.9rem; opacity: 0.9;">
            #DiasporaFest2026 #AMIC #MoldovaInItalia #FestivalulPrieteniei #CesenaEvents #DiasporaMoldova
        </div>
        
        <div class="social-share" style="justify-content: center; margin-top: 1.5rem;">
            <a href="https://www.facebook.com/sharer/sharer.php?u=https://associazione-amic.it" target="_blank" class="share-btn" style="background: #1877F2;">📘 Distribuie pe Facebook</a>
            <a href="https://api.whatsapp.com/send?text=Te%20a%C8%99tept%20la%20DiasporaFest%202026!%20Detalii%20pe%20https://associazione-amic.it" target="_blank" class="share-btn" style="background: #25D366;">🟢 Trimite pe WhatsApp</a>
        </div>
    </div>
</div>`,
            post1_date: "18 aprilie 2026, între orele 10:00 – 12:00",
            post1_title: "Întâlnire de informare despre screeningul mamar",
            post1_desc: "O întâlnire importantă dedicată screeningului mamar, deschisă tuturor femeilor din teritoriu pentru informare și orientare.",
            post1_full: "<p style=\"color: var(--secondary); font-weight: bold; text-transform: uppercase; margin-bottom: 1rem;\">ORGANIZAT DE: ARRT și ASL ROMAGNA</p><p>Asociația AMIC anunță cu plăcere că în data de 18 aprilie, între orele 10:00 și 12:00, în sala de ședințe a Spitalului din Cesenatico, va avea loc o întâlnire de informare dedicată screeningului mamar, organizată în colaborare cu Associazione Romagnola Ricerca Tumori.</p><p>Întâlnirea este adresată tuturor femeilor din teritoriu, cu o atenție specială pentru femeile străine care locuiesc în Italia, inclusiv pentru cele care, din diferite motive, nu reușesc să acceseze programele de screening mamar.</p><p>Va fi un moment important de informare, dialog și orientare, creat pentru a explica și a face cunoscut:</p><ul><li>ce este screeningul mamar</li><li>de ce este esențial pentru prevenție și diagnostic precoce</li><li>ce servicii există pe teritoriul nostru</li><li>cum pot fi sprijinite femeile în accesul la programele de protejare a sănătății</li></ul><p>Invitația este deschisă tuturor femeilor, fără nicio diferență, deoarece prevenția este un drept fundamental, iar sănătatea trebuie să fie accesibilă tuturor. </p><p>Prin această inițiativă, Asociația AMIC dorește să promoveze cultura prevenției, incluziunii și solidarității, astfel încât fiecare femeie să se simtă informată, în siguranță și sprijinită.</p><p>Vă așteptăm cu drag!<br>A avea grijă de propria sănătate este un gest de responsabilitate, conștientizare și iubire față de propria viață.</p><p><strong>Asociația AMIC</strong><br>Împreună pentru comunitate, sănătate și incluziune.</p>",
            post2_date: "Martie 2026 | Oportunitate gratuită",
            post2_title: "Curs gratuit de orientare profesională pentru femei",
            post2_full: "<p style=\"color: var(--secondary); font-weight: bold; text-transform: uppercase; margin-bottom: 1rem;\">ORGANIZAT DE: Apeiron</p><p>Asociația AMIC, în colaborare cu Asociația Apeiron Cesena, invită toate femeile străine și femeile din teritoriu să participe la un curs gratuit de orientare în carieră, căutare de oportunități profesionale și educație financiară.</p><p>Cursul este conceput în special pentru femeile și fetele care doresc să-și construiască propriul proiect de viață, să-și consolideze autonomia și să primească un sprijin concret pentru a intra sau a reintra în câmpul muncii.</p><p>💡 Cursul este complet gratuit și este organizat cu sprijinul Regiunii Emilia-Romagna și al organizațiilor locale.</p><p>Este o oportunitate importantă pentru:</p><ul><li>a dobândi instrumente utile pentru căutarea unui loc de muncă</li><li>a vă consolida independența financiară</li><li>a cunoaște mai bine oportunitățile din zonă</li><li>a crea o rețea de sprijin între femei</li></ul><p>📩 Pentru toate informațiile și pentru a vă înscrie, puteți consulta afișul cu datele de contact.</p><p>Ca asociație, credem cu tărie în solidaritatea dintre femei și în forța comunității. Dacă cunoașteți femei sau fete cărora le-ar putea fi de folos acest parcurs, vă rugăm să împărtășiți această oportunitate.</p><p>Împreună putem crea mai multe oportunități, mai multă autonomie și mai mult viitor pentru toate.</p><p><strong>Asociația AMIC</strong></p>",
            post3_date: "2 mai 2026, Ora 16:00",
            post3_title: "Eveniment cultural dedicat poetei Radmila Popovici",
            post3_full: "<p>Asociația Moldovenilor cu Impact Comunitar (AMIC) are deosebita plăcere de a vă invita la un eveniment cultural special în Cesena, dedicat poetei Radmila Popovici.</p><p>📅 2 mai 2026<br>🕓 Ora 16:00<br>📍 Spazio Cesuola, Via Ponte Abbadesse 451, Cesena</p><p>📚 În cadrul evenimentului vor fi prezentate volumele:</p><ul><li>📘 „Apa care își bea mâinile”</li><li>📙 „Bunica Liuba atotștiutoarea”</li></ul><p>Va fi o după-amiază de poezie, dialog și emoție, un prilej de întâlnire și apropiere între oameni și culturi.</p><p>📖 Cu această ocazie, AMIC va dona un set de cărți către Biblioteca Malatestiana, contribuind la îmbogățirea secțiunii de limbă română, în colaborare cu Primăria Cesena.</p><p>🌍 Eveniment deschis întregii comunități.<br>Vă așteptăm cu drag! 💛</p>",
            post4_date: "25 aprilie 2026, Ora 14:30",
            post4_title: "Ziua Eliberării la Cesena – Comunitate și Incluziune",
            post4_desc: "O întâlnire specială în Grădinile Serravalle pentru a sărbători Ziua Eliberării uniți prin cultură, tradiții și împărtășire.",
            post4_full: "<p>✨🌍 <strong>Cesena se întâlnește, Cesena se unește</strong> 🌍✨</p><p>Sâmbătă, 25 aprilie, la ora 14:30, Grădinile Serravalle din Cesena se vor transforma într-un loc special, unde culturile, tradițiile și oamenii se întâlnesc pentru a sărbători împreună Ziua Eliberării (Festa della Liberazione).</p><p>Va fi o zi dedicată libertății, comunității și frumuseții diversității care devine bogăție.<br>🌿 Un moment în care toate comunitățile, toate culturile și toate familiile se vor aduna în același spațiu, unite de aceeași valoare: să fim liberi, împreună.</p><p>🎶 Muzica, culorile, tradițiile și zâmbetele vor însoți această după-amiază specială.</p><p>👨&zwj;👩&zwj;👧&zwj;👦 Un eveniment deschis tuturor, mari și mici, unde fiecare prezență contează și fiecare cultură spune o poveste.</p><p>💛 Pentru că libertatea este și mai puternică atunci când este împărtășită.</p><p>📍 <strong>Unde:</strong> Giardini di Serravalle, Cesena<br>🕒 <strong>Când:</strong> Sâmbătă 25 aprilie, ora 14:30</p><p>Vă așteptăm să sărbătorim împreună, cu inima deschisă și spirit comunitar.</p><p><em>#25Aprile #Cesena #FestaDellaLiberazione #Comunità #Insieme #Inclusione #Tradizioni #Unità</em></p>",
            pe_btn: "Descoperă mai mult",
            btn_donate: "Susține-ne",
            hero_btn_register: "Înregistrează-te Online",
            card_btn_register: "Înscrie-te Acum",
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
            partner_7: "Il Gelatino",
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
            footer_terms: "Termeni și Condiții",
            organizer_label: "Organizat de:",
            footer_affiliated: "Afiliată la Arci"
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
            post0_full: `
<div class="post-hero-content">
    <p style="font-size: 1.1rem; color: var(--secondary); font-weight: bold; text-transform: uppercase;">In celebration of International Children's Day — free entry for everyone.</p>
    
    <h3 style="margin-top: 2rem; color: var(--primary);">👥 Who We Are / Organizers</h3>
    <div style="background: var(--bg-light); padding: 1.5rem; border-radius: var(--radius); margin-bottom: 2rem;">
        <p><strong>Main Organizer:</strong><br>
        AMIC APS – Association of Moldovans with Community Impact, Cesena (FC)<br>
        President: Aliona Causnean | 📧 <a href="mailto:amicimpact@gmail.com">amicimpact@gmail.com</a> | 📞 +39 347 3220558<br>
        🌐 <a href="https://associazione-amic.it" target="_blank">associazione-amic.it</a></p>
        
        <p style="margin-top: 1rem;"><strong>Official Partner:</strong><br>
        ASD Cimbrișor – Verona (15 years of activity, 10+ concerts and events)<br>
        President: Lucia Zupcu</p>
        
        <p style="margin-top: 1rem;"><strong>Artistic Partners:</strong><br>
        Ansamblul Busuioc (Padova) & Ansamblul Vatra (Torino)</p>
        
        <p style="margin-top: 1rem;"><strong>Institutional Partners:</strong><br>
        Embassy of the Republic of Moldova in Italy, Municipality of Cesena</p>
    </div>

    <h3 style="color: var(--primary);">🕒 Full Program</h3>
    <div class="program-timeline" style="margin-bottom: 2rem;">
        <style>
            .pg-item { display: flex; padding: 1rem 0; border-bottom: 1px solid #eee; }
            .pg-time { min-width: 130px; font-weight: bold; color: var(--secondary); }
            .pg-desc { flex: 1; }
            @media(max-width: 600px) { .pg-item { flex-direction: column; } .pg-time { margin-bottom: 0.5rem; } }
            details { background: #f9f9f9; padding: 1rem; margin-bottom: 0.5rem; border-radius: 4px; border-left: 4px solid var(--secondary); }
            summary { font-weight: bold; cursor: pointer; color: var(--primary); outline: none; }
            details[open] summary ~ * { animation: fadeIn 0.3s ease-in-out; }
            .social-share { display: flex; gap: 1rem; margin-top: 1rem; flex-wrap: wrap; }
            .share-btn { padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.9rem; text-decoration: none; color: white; display: inline-block; }
        </style>
        <div class="pg-item"><div class="pg-time">07:00 – 09:00</div><div class="pg-desc">Staff arrival, setup, food truck positioning</div></div>
        <div class="pg-item"><div class="pg-time">09:00 – 11:00</div><div class="pg-desc">Liturgy / spiritual moment – welcoming participants</div></div>
        <div class="pg-item"><div class="pg-time">11:00 – 12:00</div><div class="pg-desc"><strong>Official Opening</strong> – institutional greetings, presentation of organizers and partners</div></div>
        <div class="pg-item"><div class="pg-time">11:00 – 17:00</div><div class="pg-desc"><strong>Kids Area</strong>: entertainment, creative workshops, face painting, magic show and clowns, "Friendship Smile Award"</div></div>
        <div class="pg-item"><div class="pg-time">11:30 – 18:00</div><div class="pg-desc"><strong>Sports Tournaments – Friendship Cup</strong>: football, volleyball, chess, freestyle wrestling</div></div>
        <div class="pg-item"><div class="pg-time">11:00 – 22:30</div><div class="pg-desc"><strong>Active Food Area</strong> – Moldovan, Romanian, and Italian cuisine. Family picnic.</div></div>
        <div class="pg-item"><div class="pg-time">12:00 – 14:00</div><div class="pg-desc">Soft and ambient music</div></div>
        <div class="pg-item"><div class="pg-time">12:30</div><div class="pg-desc"><strong>Book Launch</strong>: <em>"Apa care îşi bea mâinile / L'acqua che si beve le mani"</em> – Radmila Popovici</div></div>
        <div class="pg-item"><div class="pg-time">15:00 – 18:00</div><div class="pg-desc"><strong>Folklore Shows</strong>: Ansamblul Cimbrișor (Verona), Ansamblul Busuioc (Padova), Ansamblul Vatra (Torino)</div></div>
        <div class="pg-item"><div class="pg-time">18:00 – 19:00</div><div class="pg-desc">Technical break</div></div>
        <div class="pg-item"><div class="pg-time">19:00 – 22:00</div><div class="pg-desc">🎤 <strong>Evening Concert</strong> – Ion Paladi (People's Artist of the Republic of Moldova) + Chef Basarabean (traditional music band)</div></div>
        <div class="pg-item"><div class="pg-time">22:30 – 23:00</div><div class="pg-desc">Final greetings, thanks, invitation to the 2027 edition</div></div>
        <div class="pg-item"><div class="pg-time">23:00 – 01:00</div><div class="pg-desc">Dismantling and cleaning</div></div>
    </div>

    <h3 style="color: var(--primary);">💖 Voluntary Donation</h3>
    <p>The festival is <strong>completely free for everyone</strong>. To help us cover unfunded logistical costs (security, land rental, sanitization), we propose a <strong>voluntary donation of 5–10€</strong>. Any surplus will be donated to a charity association in the Republic of Moldova. Thank you!</p>

    <h3 style="color: var(--primary); margin-top: 2rem;">📍 Map and Directions</h3>
    <div style="border-radius: var(--radius); overflow: hidden; margin-bottom: 2rem; margin-top: 1rem;">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2861.9772879502283!2d12.234694415510619!3d44.14819777910777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132ca5accad0b7eb%3A0x8fc898af4be15560!2sParco%20per%20Fabio!5e0!3m2!1sit!2sit!4v1683294326123!5m2!1sit!2sit" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>

    <h3 style="color: var(--primary);">🤔 FAQ - Frequently Asked Questions</h3>
    <details>
        <summary>How do I get to Parco per Fabio?</summary>
        <p style="margin-top:0.5rem">The park is in Cesena. Use the map above to activate navigation on your phone. There are bus stops nearby connecting from the center.</p>
    </details>
    <details>
        <summary>Is there parking?</summary>
        <p style="margin-top:0.5rem">Yes, there are various free parking lots available in the streets around the park. We recommend arriving early!</p>
    </details>
    <details>
        <summary>Can I bring children?</summary>
        <p style="margin-top:0.5rem">Absolutely! The entire event is designed for families and there will be a large <strong>Kids Area</strong> set up.</p>
    </details>
    <details>
        <summary>How can I register for the sports tournaments?</summary>
        <p style="margin-top:0.5rem">To participate in the "Friendship Cup" please fill out the registration form or contact the organizers directly on-site early in the morning.</p>
    </details>

    <div style="margin-top: 3rem; text-align: center; padding: 2rem; background: var(--primary); color: white; border-radius: var(--radius); box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
        <p style="font-size: 1.2rem; font-weight: bold; margin-bottom: 2rem;">Share the event and bring your family!</p>
        <a href="https://forms.gle/5xVYXEEYi9rVX4yVA" target="_blank" style="display: inline-block; background: var(--bg-white); color: var(--primary); padding: 1rem 2rem; border-radius: 30px; font-weight: bold; text-decoration: none; margin-bottom: 2rem; transition: transform 0.2s;">📝 FILL OUT THE PRE-REGISTRATION FORM</a>
        
        <div style="font-size: 0.9rem; opacity: 0.9;">
            #DiasporaFest2026 #AMIC #MoldovaInItalia #FestivalulPrieteniei #CesenaEvents #DiasporaMoldova
        </div>
        
        <div class="social-share" style="justify-content: center; margin-top: 1.5rem;">
            <a href="https://www.facebook.com/sharer/sharer.php?u=https://associazione-amic.it" target="_blank" class="share-btn" style="background: #1877F2;">📘 Share on Facebook</a>
            <a href="https://api.whatsapp.com/send?text=Come%20to%20DiasporaFest%202026!%20Details%20at%20https://associazione-amic.it" target="_blank" class="share-btn" style="background: #25D366;">🟢 Send on WhatsApp</a>
        </div>
    </div>
</div>`,
            post1_date: "April 18, 2026, from 10:00 AM to 12:00 PM",
            post1_title: "Breast Cancer Screening Awareness Meeting",
            post1_desc: "An important meeting dedicated to breast cancer screening, open to all women in the area for information and guidance.",
            post1_full: "<p style=\"color: var(--secondary); font-weight: bold; text-transform: uppercase; margin-bottom: 1rem;\">ORGANIZED BY: ARRT and ASL ROMAGNA</p><p>The AMIC Association is pleased to inform you that on April 18, from 10:00 AM to 12:00 PM, an important awareness meeting dedicated to breast cancer screening will be held in the meeting room of the Cesenatico Hospital, in collaboration with the Romagna Tumor Research Association.</p><p>The meeting is aimed at all women in the area, with special attention to foreign women living in Italy, including those who, for various reasons, cannot easily access breast screening programs.</p><p>It will be a valuable moment of information, listening, and guidance, designed to raise awareness about:</p><ul><li>what breast screening is</li><li>why it is fundamental for prevention and early diagnosis</li><li>what opportunities exist in the area</li><li>how to accompany and support women in accessing health protection pathways</li></ul><p>The invitation is open to all women, without distinction, because prevention is a fundamental right and health must be accessible to everyone.</p><p>As the AMIC Association, we wish to promote a culture of prevention, inclusion, and closeness, so that every woman can feel informed, welcomed, and supported.</p><p>We look forward to seeing many of you.<br>Taking care of oneself is a gesture of strength, awareness, and love for one's life.</p><p><strong>AMIC Association</strong><br>Together for the community, health, and inclusion.</p>",
            post2_date: "March 2026 | Free Opportunity",
            post2_title: "Free Career Guidance Course for Women",
            post2_full: "<p style=\"color: var(--secondary); font-weight: bold; text-transform: uppercase; margin-bottom: 1rem;\">ORGANIZED BY: Apeiron</p><p>The AMIC Association, in collaboration with the Apeiron Cesena Association, invites all foreign women and women from the area to participate in a free career guidance, professional opportunity search, and financial education course.</p><p>The course is designed in particular for women and girls who wish to build their life project, strengthen their autonomy, and receive concrete support to enter or re-enter the workforce.</p><p>💡 The course is completely free and is organized with the support of the Emilia-Romagna Region and local organizations.</p><p>It is an important opportunity to:</p><ul><li>acquire useful tools for job hunting</li><li>strengthen your financial independence</li><li>learn more about opportunities in the area</li><li>create a support network among women</li></ul><p>📩 For all information and to register, you can consult the flyer with the contact details.</p><p>As an association, we strongly believe in solidarity between women and the strength of the community. If you know women or girls who could benefit from this path, please share this opportunity.</p><p>Together we can create more opportunities, more autonomy, and more future for everyone.</p><p><strong>AMIC Association</strong></p>",
            post3_date: "May 2, 2026, 4:00 PM",
            post3_title: "Cultural event dedicated to Radmila Popovici",
            post3_full: "<p>The Moldovans with Community Impact Association (AMIC) is pleased to invite you to a special cultural event in Cesena, dedicated to the poet Radmila Popovici.</p><p>📅 May 2, 2026<br>🕓 4:00 PM<br>📍 Spazio Cesuola, Via Ponte Abbadesse 451, Cesena</p><p>📚 During the meeting, the following volumes will be presented:</p><ul><li>📘 \"The water that drinks its hands\"</li><li>📙 \"Grandma Liuba the all-knowing\"</li></ul><p>It will be an afternoon of poetry, dialogue, and emotion, an opportunity to meet, get to know each other, and build bridges between cultures.</p><p>📖 On this occasion, AMIC will donate a set of books to the Malatestiana Library, contributing to enriching the Romanian language section, in collaboration with the Municipality of Cesena.</p><p>🌍 Event open to the whole community.<br>We look forward to seeing you! 💛</p>",
            post4_date: "April 25, 2026, 2:30 PM",
            post4_title: "Liberation Day in Cesena - Community and Inclusion",
            post4_desc: "A special meeting at the Serravalle Gardens to celebrate Liberation Day united by culture, traditions, and sharing.",
            post4_full: "<p>✨🌍 <strong>Cesena meets, Cesena unites</strong> 🌍✨</p><p>On Saturday, April 25, at 2:30 PM, the Serravalle Gardens in Cesena will transform into a special place, where cultures, traditions, and people meet to celebrate Liberation Day together.</p><p>It will be a day dedicated to freedom, community, and the beauty of diversity that becomes wealth.<br>🌿 A moment when all communities, cultures, and families will gather in the same space, united by the same value: being free, together.</p><p>🎶 Music, colors, traditions, and smiles will accompany this special afternoon.</p><p>👨&zwj;👩&zwj;👧&zwj;👦 An event open to all, adults and children, where every presence counts and every culture tells a story.</p><p>💛 Because freedom is even stronger when shared.</p><p>📍 <strong>Where:</strong> Giardini di Serravalle, Cesena<br>🕒 <strong>When:</strong> Saturday, April 25, 2:30 PM</p><p>We wait for you to celebrate together, with an open heart and the spirit of community.</p><p><em>#25Aprile #Cesena #FestaDellaLiberazione #Comunità #Insieme #Inclusione #Tradizioni #Unità</em></p>",
            pe_btn: "Discover more",
            btn_donate: "Support Us",
            hero_btn_register: "Register Online",
            card_btn_register: "Register Now",
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
            partner_7: "Il Gelatino",
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
            footer_terms: "Terms and Conditions",
            organizer_label: "Organized by:",
            footer_affiliated: "Affiliated with Arci"
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
