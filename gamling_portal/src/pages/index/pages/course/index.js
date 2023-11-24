import { Link, useParams } from 'react-router-dom';
import './index.css';
import React, { useContext } from 'react';
import { CustomFancyButton, FancyButton } from '../../../../components/input';
import { SessionDataContext, UserDataContext } from '../../../../context';
import { useRefreshUserData } from '../../../../custom_hooks';

const coursesContent = [
    {
        title: 'Norsk',
        Content: () => {
            return (
                <>
                    <h3>
                        Kursbeskrivelse
                    </h3>
                    <p>
                        Dette kurset er skreddersydd for voksne i alderen 40-60 år som ønsker å styrke sine norskkunnskaper på en praktisk og relevant måte. Målet er å gi deltakerne en solid forståelse av det norske språket for å kunne kommunisere effektivt i ulike situasjoner.
                    </p>
                    <NormalDL>
                        <NormalDT>
                            Uke 1: Grunnleggende Norsk Kommunikasjon
                        </NormalDT>
                        <NormalDD>
                            <p>
                                Introduksjon til vanlige uttrykk og setninger for dagliglivet.
                            </p>
                            <p>
                                Kommunikasjon i butikker, restauranter, og sosiale settinger.
                            </p>
                        </NormalDD>
                        <NormalDT>
                            Uke 2: Arbeidslivsnorsk
                        </NormalDT>
                        <NormalDD>
                            <p>
                                Nødvendig vokabular og uttrykk for profesjonell kommunikasjon.
                            </p>
                            <p>
                                CV-skriving og jobbintervjuforberedelser.
                            </p>
                        </NormalDD>
                        <NormalDT>
                            Uke 3: Norsk Kultur og Samfunn
                        </NormalDT>
                        <NormalDD>
                            <p>
                                Forståelse av norske skikker, tradisjoner, og normer.
                            </p>
                            <p>
                                Diskusjoner om aktuelle hendelser og samfunnsanliggender.
                            </p>
                        </NormalDD>
                        <NormalDT>
                            Uke 4: Grammatikk og Setningsstruktur
                        </NormalDT>
                        <NormalDD>
                            <p>
                                Grunnleggende grammatikkregler og setningsstruktur.
                            </p>
                            <p>
                                Feilretting og praktiske øvelser for å forbedre skriftlig norsk.
                            </p>
                        </NormalDD>
                        <NormalDT>
                            Uke 5: Muntlig Kommunikasjon
                        </NormalDT>
                        <NormalDD>
                            <p>
                                Rollespill og praktiske øvelser for å styrke muntlige ferdigheter.
                            </p>
                            <p>
                                Telefon- og møteetikette på norsk.
                            </p>
                        </NormalDD>
                        <NormalDT>
                            Uke 6: Lesing og Skriving
                        </NormalDT>
                        <NormalDD>
                            <p>
                                Leseforståelse av enkle tekster og nyhetsartikler.
                            </p>
                            <p>
                                Kreativ skriving og oppgaver for å utvikle skriftlige ferdigheter.
                            </p>
                        </NormalDD>
                        <NormalDT>
                            Uke 7: Individuell Veiledning
                        </NormalDT>
                        <NormalDD>
                            <p>
                                Personlig tilbakemelding og veiledning for å møte individuelle behov.
                            </p>
                            <p>
                                Utvikling av personlige mål og en handlingsplan for videre læring.
                            </p>
                        </NormalDD>
                    </NormalDL>
                </>
            );
        },
    },
    {
        title: 'Datakunnskap',
        Content: () => {
            return (
                <>
                    <h3>
                        Kursbeskrivelse
                    </h3>
                    <p>
                        Dette kurset er skreddersydd for voksne i alderen 40-60 år som ønsker å styrke sine datakunnskaper og føle seg mer selvsikre i den stadig mer digitale verdenen. Enten du er nybegynner eller har noe grunnleggende kjennskap, vil kurset gi deg den nødvendige kompetansen for å navigere og kommunisere effektivt i dagens teknologirike samfunn.
                    </p>
                    <NormalDL>
                        <NormalDT className=''>
                            Uke 1: Introduksjon til Dataverdenen
                        </NormalDT>
                        <NormalDD>
                            Grunnleggende om datamaskiner og operativsystemer
                            Navigering på datamaskinen: Mapper, filer og desktoporganisering
                        </NormalDD>
                        <NormalDT>
                            Uke 2: Internett og Sikkerhet
                        </NormalDT>
                        <NormalDD>
                            Navigasjon på nettet: Søkemotorer, nettsteder, og nettlesere
                            - Grunnleggende om nettsikkerhet og personvern
                        </NormalDD>
                        <NormalDT>
                            Uke 3: E-post og Digitale Kommunikasjonsverktøy
                        </NormalDT>
                        <NormalDD>
                            - Opprettelse og administrasjon av e-postkontoer
                            - Effektiv bruk av e-post og digitale meldingsverktøy
                        </NormalDD>
                        <NormalDT>
                            Uke 4: Tekstbehandling og Produktivitetsverktøy
                        </NormalDT>
                        <NormalDD>
                            - Grunnleggende om tekstbehandling: Microsoft Word, Google Docs, etc.
                            - Introduksjon til digitale verktøy for kalenderadministrasjon og oppgavestyring
                        </NormalDD>
                        <NormalDT>
                            Uke 5: Sosiale Medier og Digitale Fellesskap
                        </NormalDT>
                        <NormalDD>
                            - Innføring i populære sosiale medieplattformer
                            - Forståelse av sosiale mediers rolle og hvordan man deltar trygt
                        </NormalDD>
                        <NormalDT>
                            Uke 6: Bilder, Video og Grunnleggende Redigering
                        </NormalDT>
                        <NormalDD>
                            - Håndtering av digitale bilder og videoer
                            - Enkel bilde- og videoredigering med tilgjengelige verktøy
                        </NormalDD>
                        <NormalDT>
                            Uke 7: Online Shopping og Banktjenester
                        </NormalDT>
                        <NormalDD>
                            - Sikkert og effektivt online shopping
                            - Digital banktjenester og sikker økonomisk atferd på nettet
                        </NormalDD>
                        <NormalDT>
                            Uke 8: Problemløsning og Vedlikehold
                        </NormalDT>
                        <NormalDD>
                            - Feilsøking: Vanlige dataproblemer og løsninger
                            - Grunnleggende vedlikehold av datamaskinen: oppdateringer, sikkerhetskopiering og antivirusprogrammer
                        </NormalDD>
                    </NormalDL>
                    <h2>
                        Avsluttende Prosjekt:
                    </h2>
                    <p>
                        Deltakerne vil bli oppfordret til å anvende det de har lært gjennom et praktisk prosjekt, for eksempel å opprette en enkel nettside, lage en digital presentasjon eller organisere og redigere digitale bilder.
                    </p>
                    <p>
                        Dette kurset gir en trygg og støttende læringsopplevelse, med fokus på praktiske ferdigheter som vil være nyttige i både personlig og profesjonell sammenheng. Ta det første skrittet mot digital mestring ved å delta i "Datakunnskap for Voksne 40-60"!
                    </p>
                </>
            );
        },
    },
    {
        title: 'Heimkunnskap',
        Content: () => {
            return (
                <>
                    <h3>
                        Kursbeskrivelse
                    </h3>
                    <NormalDL>
                        <NormalDT>
                            Uke 1: Matlaging og Kosthold:
                        </NormalDT>
                        <NormalDD>
                            <NormalDL>
                                <NormalDT>
                                    Introduksjon til Kjøkkenet:
                                </NormalDT>
                                <NormalDD>
                                    <p>
                                        Kjøkkenredskaper og deres bruk.
                                    </p>
                                    <p>
                                        Mattrygghet og hygiene på kjøkkenet.
                                    </p>
                                </NormalDD>
                                <NormalDT>
                                    Grunnleggende Matlagingsteknikker:
                                </NormalDT>
                                <NormalDD>
                                    <p>
                                        Steking, koking, baking, og grilling.
                                    </p>
                                    <p>
                                        Enkle oppskrifter for å praktisere teknikkene.
                                    </p>
                                </NormalDD>
                                <NormalDT>
                                    Balansert Kosthold:
                                </NormalDT>
                                <NormalDD>
                                    <p>
                                        Grunnleggende ernæringsprinsipper.
                                    </p>
                                    <p>
                                        Hvordan sammensette et balansert måltid.
                                    </p>
                                </NormalDD>
                            </NormalDL>
                        </NormalDD>
                        <NormalDT>
                            Uke 2: Husstell:
                        </NormalDT>
                        <NormalDD>
                            <NormalDL>
                                <NormalDT>
                                    Hjemmeorganisering:
                                </NormalDT>
                                <NormalDD>
                                    <p>
                                        Rengjøring og organisering av hjemmet.
                                    </p>
                                    <p>
                                        Effektive rutiner for å opprettholde orden.
                                    </p>
                                </NormalDD>
                                <NormalDT>
                                    Tøyvask og Vedlikehold:
                                </NormalDT>
                                <NormalDD>
                                    <p>
                                        Riktig bruk av vaskemaskin og tørketrommel.
                                    </p>
                                    <p>
                                        Plaggvedlikehold og reparasjon.
                                    </p>
                                </NormalDD>
                                <NormalDT>
                                    Innredning og Stil:
                                </NormalDT>
                                <NormalDD>
                                    <p>
                                        Grunnleggende prinsipper for interiørdesign.
                                    </p>
                                    <p>
                                        Budsjettvennlige måter å forbedre hjemmet på.
                                    </p>
                                </NormalDD>
                            </NormalDL>
                        </NormalDD>
                        <NormalDT>
                            Uke 3: Husholdningsferdigheter:
                        </NormalDT>
                        <NormalDD>
                            <NormalDL>
                                <NormalDT>
                                    Økonomistyring:
                                </NormalDT>
                                <NormalDD>
                                    <p>
                                        Budsjettlegging og regnskap for daglige utgifter.
                                    </p>
                                    <p>
                                        Tips for å spare penger i hjemmet.
                                    </p>
                                </NormalDD>
                                <NormalDT>
                                    Tidsstyring:
                                </NormalDT>
                                <NormalDD>
                                    <p>
                                        Effektive måter å organisere tid på.
                                    </p>
                                    <p>
                                        Planlegging av daglige oppgaver og aktiviteter.
                                    </p>
                                </NormalDD>
                                <NormalDT>
                                    Grunnleggende Reparasjoner:
                                </NormalDT>
                                <NormalDD>
                                    <p>
                                        Feilsøking og enkle reparasjoner i hjemmet.
                                    </p>
                                    <p>
                                        Hvordan håndtere vanlige problemer.
                                    </p>
                                </NormalDD>
                            </NormalDL>
                        </NormalDD>
                        <NormalDT>
                            Uke 4: Prosjektavslutning og Oppsummering:
                        </NormalDT>
                        <NormalDD>
                            <NormalDL>
                                <NormalDT>
                                    Prosjekt: Kreativ Matlaging:
                                </NormalDT>
                                <NormalDD>
                                    <p>
                                        Deltakerne skal lage et måltid ved å anvende de lærte teknikkene.
                                    </p>
                                </NormalDD>
                                <NormalDT>
                                    Refleksjon og Oppsummering:
                                </NormalDT>
                                <NormalDD>
                                    <p>
                                        Deltakerne deler erfaringer og hva de har lært.
                                    </p>
                                    <p>
                                        Mål for videre utvikling innen heimkunnskap.
                                    </p>
                                </NormalDD>
                            </NormalDL>
                        </NormalDD>
                    </NormalDL>
                </>
            );
        },
    },
    {
        title: 'Kroppsøving',
        Content: () => {
            return (
                <>
                    <h3>
                        Kursbeskrivelse
                    </h3>
                    <p>
                        Vårt 8-ukers treningskurs for voksne i alderen 40-60 år er utviklet av erfarne treningsinstruktører med spesialisering innen seniorfitness. Kurset kombinerer varierte treningsformer, inkludert styrketrening med vekter, kroppsvektøvelser, kondisjonstrening og avspenningsteknikker.
                    </p>
                    <NormalDL>
                        <NormalDT>
                            Uke 1-2: Introduksjon og evaluering
                        </NormalDT>
                        <NormalDD>
                            <p>
                                Grundig helsevurdering og målsetting
                            </p>
                            <p>
                                Innføring i riktig teknikk for styrkeøvelser
                            </p>
                            <p>
                                Lett kondisjonstrening for å øke hjerte- og lungesystemets aktivitet
                            </p>
                        </NormalDD>
                        <NormalDT>
                            Uke 3-4: Styrke og fleksibilitet
                        </NormalDT>
                        <NormalDD>
                            <p>
                                Fokus på styrketrening for å bygge muskelmasse og styrke beinbygningen
                            </p>
                            <p>
                                Introduksjon til fleksibilitetsøvelser for å forbedre bevegelsesområdet
                            </p>
                        </NormalDD>
                        <NormalDT>
                            Uke 5-6: Kondisjon og balanse
                        </NormalDT>
                        <NormalDD>
                            <p>
                                Økende intensitet i kondisjonstreningen for å forbedre hjerte- og lungekapasitet
                            </p>
                            <p>
                                Balanseøvelser for å styrke kjernemuskulaturen og redusere risikoen for fall
                            </p>
                        </NormalDD>
                        <NormalDT>
                            Uke 7-8: Helhetlig integrasjon og oppfølging
                        </NormalDT>
                        <NormalDD>
                            <p>
                                Sammensetning av alle elementene fra kurset i helhetlige treningsøkter
                            </p>
                            <p>
                                Evaluering av individuelle fremgang og justering av mål
                            </p>
                            <p>
                                Veiledning om hvordan opprettholde en aktiv livsstil etter kursets slutt
                            </p>
                        </NormalDD>
                    </NormalDL>
                </>
            );
        },
    },
];

function NormalDL({ children }) {
    return (
        <dl className='normal_dl'>
            {children}
        </dl>
    );
}

function NormalDT({ children }) {
    return (
        <dt className='normal_dt'>
            {children}
        </dt>
    );
}

function NormalDD({ children }) {
    return (
        <dd className='normal_dd'>
            {children}
        </dd>
    );
}

function CourseNav() {
    const { 0: userData } = useContext(UserDataContext);
    const { 0: sessionData } = useContext(SessionDataContext);
    const refreshUserData = useRefreshUserData();
    const { courseId: courseIdStr } = useParams();
    const courseId = Number(courseIdStr);
    const isLoggedIn = sessionData && sessionData.logged_in;
    let content;
    if (isLoggedIn === true) {
        const isJoinCourse = userData && userData.joined_courses.includes(courseId) === false;
        content = (
            <FancyButton primary={true} isDelete={isJoinCourse === false} onClick={() => {
                fetch(`/api/${isJoinCourse ? 'joincourse' : 'leavecourse'}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        course: courseId,
                    }),
                }).then((res) => {
                    if (res.status === 200) {
                        refreshUserData();
                    }
                });
            }}>
                {isJoinCourse ? 'Meld deg på kurset' : 'Meld deg av kurset'}
            </FancyButton>
        );
    } else {
        content = (
            <div id="course_not_logged_in">
                <p>
                    Du må være logget inn for å bli med i kurs.
                </p>
                <CustomFancyButton to='/login' element={Link} primary={true}>
                    Logg inn
                </CustomFancyButton>
            </div>
        );
    }
    return (
        <nav id='course_nav'>
            <div id='course_nav_content'>
                {content}
            </div>
        </nav>
    );
}

function Course() {
    const { courseId } = useParams();

    const content = coursesContent[courseId];

    return (
        <>
            <CourseNav />
            <section id="course">
                <h1>
                    {content.title}
                </h1>
                <FancyButton onClick={(e) => {
                    // Create blob link to download
                    const url = new URL('/api/coursereceipt', window.location.origin);
                    const searchParams = new URLSearchParams();
                    searchParams.append('course', courseId);
                    url.search = searchParams;
                    fetch(url.toString(), {
                        method: 'GET',
                    }).then((res) => {
                        res.blob().then((blob) => {
                            const downloadURL = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf'}));
                            const link = document.createElement('a');
                            link.href = downloadURL;
                            link.setAttribute(
                                'download',
                                'Kvittering',
                            );

                            // Append to html link element page
                            document.body.appendChild(link);

                            // Start download
                            link.click();

                            // Clean up and remove the link
                            link.parentNode.removeChild(link);
                        });
                    });
                }}>
                    Last ned kvittering
                </FancyButton>
                <div id="course_content">
                    {React.createElement(content.Content)}
                </div>
            </section>
        </>
    );
}

export default Course;