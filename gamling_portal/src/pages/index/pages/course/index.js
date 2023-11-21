import { useParams } from 'react-router-dom';
import './index.css';
import React, { useContext } from 'react';
import { FancyButton } from '../../../../components/input';

import { CheckmarkIcon } from '../../../../svg';

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
    const { courseName } = useParams()
    return (
        <nav id='course_nav'>
            <div id='course_nav_content'>
                <FancyButton primary={true} onClick={() => {
                    fetch('/api/joincourse', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            courseName: courseName,
                        }),
                    }).then((res) => {
                        if (res.status === 200) {
                            console.log("POG");
                        }
                    });
                }}>
                    Meld deg på kurset
                </FancyButton>
            </div>
        </nav>
    );
}

const coursesContent = {
    norwegian: {
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
    computerknowledge: {
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
    gym: {
        title: 'Kroppsøving',
        Content: () => {
            return (
                <>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Arnold_Schwarzenegger_1974.jpg/220px-Arnold_Schwarzenegger_1974.jpg" alt="arnold_n_word" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Arnold_Schwarzenegger_1974.jpg/220px-Arnold_Schwarzenegger_1974.jpg" alt="arnold_n_word" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Arnold_Schwarzenegger_1974.jpg/220px-Arnold_Schwarzenegger_1974.jpg" alt="arnold_n_word" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Arnold_Schwarzenegger_1974.jpg/220px-Arnold_Schwarzenegger_1974.jpg" alt="arnold_n_word" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Arnold_Schwarzenegger_1974.jpg/220px-Arnold_Schwarzenegger_1974.jpg" alt="arnold_n_word" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Arnold_Schwarzenegger_1974.jpg/220px-Arnold_Schwarzenegger_1974.jpg" alt="arnold_n_word" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Arnold_Schwarzenegger_1974.jpg/220px-Arnold_Schwarzenegger_1974.jpg" alt="arnold_n_word" />
                </>
            );
        },
    },
};

function Course() {
    const { courseName } = useParams();

    const content = coursesContent[courseName];

    return (
        <section id="course">
            <h1>
                {content.title}
            </h1>
            <div id="course_content">
                {React.createElement(content.Content)}
            </div>
        </section>
    );
}

export default Course;