import type { Language } from '../../i18n/translations';
import type { CaseStudyExperience } from './caseStudyExperienceData';

/** Narrative fields localized per language. Structural assets stay on the base study. */
export type CaseStudyNarrative = {
    industry: string;
    title: string;
    summary: string;
    documentaryLabel: string;
    businessType: string;
    duration: string;
    services: string[];
    challenge: string;
    solution: string;
    transform: string;
    implementation: string;
    businessOutcome: string;
    results: string;
    before: string;
    after: string;
    coverAlt: string;
    futureImprovements: string[];
    themeLabel: string;
    metrics: { value: string; label: string }[];
    timeline: { phase: string; title: string; description: string }[];
    galleryTitles: { opening: string; desktop: string; mobile: string };
    testimonial: { quote: string; name: string; role: string };
};

const en: Record<string, CaseStudyNarrative> = {
    'demo-luxury-estate': {
        industry: 'Home Services',
        title: 'When beautiful work still felt hard to buy',
        summary:
            'A premium outdoor living brand had the craft. What they needed was a clearer path from first curiosity to a real conversation.',
        documentaryLabel: 'CLIENT STORY',
        businessType: 'Outdoor living & veranda brand',
        duration: 'About 14 weeks',
        services: ['Website', 'Marketing', 'Lead systems'],
        challenge:
            'People arrived interested, then waited. Follow-up depended on who was free that day. The team could feel demand, but not trust which inquiries were serious, or which campaigns were wasting money.',
        solution:
            'Instead of adding more ads, the decision was to rebuild the path itself: one clear website story, faster first response, and a single place where every inquiry could be seen and followed.',
        transform: 'From scattered follow-ups to one calm path from interest to conversation.',
        implementation:
            'The new site carried the brand the way a showroom should. Inquiries were answered quickly, routed to the right person, and connected to the tools the team already used, so nothing important sat unanswered overnight.',
        businessOutcome:
            'The team spent less time chasing cold leads, and more time speaking with people who were ready to talk about a real project.',
        results: 'Clearer demand. Faster replies. Less guessing about what was working.',
        before:
            'Strong craft online, but buyers often left without a reply, and the team never knew which interest was worth their evening.',
        after:
            'Every serious inquiry had a place to land, a person to meet it, and a story the brand could stand behind.',
        coverAlt: 'Jouwdroomoverkapping outdoor living website on desktop and mobile',
        futureImprovements: [
            'Learn which project types close fastest, and greet those buyers first',
            'Show seasonal collections without rebuilding the whole site',
            'Keep international buyers warm between the first message and the visit',
        ],
        themeLabel: 'Warm Craft',
        metrics: [
            { value: '+184%', label: 'Qualified inquiries' },
            { value: '3.2x', label: 'Return on spend' },
            { value: 'Hours to minutes', label: 'First response' },
        ],
        timeline: [
            {
                phase: 'Listen',
                title: 'Where buyers were getting stuck',
                description:
                    'We sat with the team and followed real inquiries, from the first click to the moment someone finally answered.',
            },
            {
                phase: 'Decide',
                title: 'One path, not more noise',
                description: 'The brief became simple: make the next step obvious, and make sure a human meets it quickly.',
            },
            {
                phase: 'Build',
                title: 'A site that felt like the work',
                description:
                    'The brand world, forms, and follow-up were rebuilt so interest no longer disappeared into a quiet inbox.',
            },
            {
                phase: 'Launch',
                title: 'Going live with the team',
                description: 'Campaigns and the new workflow went live together, with the sales floor ready, not surprised.',
            },
            {
                phase: 'Refine',
                title: 'Learning from real conversations',
                description: 'After launch, we adjusted messages and handoffs based on what buyers actually asked for.',
            },
        ],
        galleryTitles: {
            opening: 'The first impression',
            desktop: 'The story on the screen',
            mobile: 'The moment on the phone',
        },
        testimonial: {
            quote:
                'We stopped wondering who we had forgotten. The work finally matched how carefully we build for our customers.',
            name: 'Client perspective',
            role: 'Founder perspective',
        },
    },
    'demo-b2b-growth': {
        industry: 'Food & B2B',
        title: 'When growth felt busy, but not bankable',
        summary:
            'A premium halal wholesaler was generating attention. The harder question was which conversations were worth the sales team’s week.',
        documentaryLabel: 'CLIENT STORY',
        businessType: 'Premium halal wholesale',
        duration: 'About 11 weeks',
        services: ['Website', 'Marketing', 'Brand presence'],
        challenge:
            'Campaigns ran. Messages came in. But marketing and sales lived in different realities. Nobody could point to a channel and say, with confidence, “this is where the good conversations start.”',
        solution:
            'The change was not “more outreach.” It was a quieter system: a clear brand story for buyers who care about quality, and a shared view of which inquiries deserved a meeting.',
        transform: 'From noisy activity to meetings the sales team could trust.',
        implementation:
            'We reshaped the digital presence around proof and product pride, then connected paid channels and follow-up so promising buyers were not left waiting while weaker leads filled the calendar.',
        businessOutcome:
            'Fewer empty meetings, clearer handoffs, and a leadership view that finally connected spend to real commercial conversations.',
        results: 'Better meetings. Less noise. A shared picture of what was working.',
        before:
            'The team worked hard every week, yet still argued about whether the next meeting would be worth showing up for.',
        after: 'Sales walked into conversations already knowing why the buyer was there, and what they cared about.',
        coverAlt: 'Ayat Food wholesale website on desktop and mobile',
        futureImprovements: [
            'Stay closer to the buyers who already trust the quality',
            'Turn a strong call into a proposal without starting from a blank page',
            'See pipeline movement early enough to plan the week',
        ],
        themeLabel: 'Crimson Editorial',
        metrics: [
            { value: '+142%', label: 'Meetings booked' },
            { value: '-38%', label: 'Cost per conversation' },
            { value: 'Clearer', label: 'Sales handoff' },
        ],
        timeline: [
            {
                phase: 'Listen',
                title: 'What “a good lead” really meant',
                description:
                    'We listened to sales, not dashboards first, to learn which conversations were worth protecting.',
            },
            {
                phase: 'Decide',
                title: 'Protect the calendar',
                description: 'The model favored fewer, better meetings over a fuller inbox.',
            },
            {
                phase: 'Build',
                title: 'A brand buyers could take seriously',
                description: 'The site and follow-up were rebuilt so quality was visible before the first call.',
            },
            {
                phase: 'Launch',
                title: 'Turning attention into meetings',
                description:
                    'Channels went live with a shared view, so marketing and sales argued less about “what worked.”',
            },
            {
                phase: 'Refine',
                title: 'Keeping the signal clean',
                description: 'We tightened audiences and messages whenever a week filled with the wrong kind of noise.',
            },
        ],
        galleryTitles: {
            opening: 'The brand at first glance',
            desktop: 'Where buyers lean in',
            mobile: 'The path from the phone',
        },
        testimonial: {
            quote:
                'We finally stopped treating every inquiry as equal. The week got quieter, and the conversations got better.',
            name: 'Client perspective',
            role: 'Commercial perspective',
        },
    },
    'demo-property-dev': {
        industry: 'Retail & Showroom',
        title: 'When the showroom online felt smaller than the one in real life',
        summary:
            'A premium kitchen destination had the space, the craft, and the people. Online, too many visitors left before they felt ready to visit.',
        documentaryLabel: 'CLIENT STORY',
        businessType: 'Premium kitchen showroom',
        duration: 'About 16 weeks',
        services: ['Website', 'Marketing', 'Film'],
        challenge:
            'Interest was not the problem. Intent was. High-value buyers needed to feel the space before they booked, while low-intent forms still consumed the sales team’s mornings.',
        solution:
            'The work became a showroom experience on screen: cinematic storytelling, a clearer reason to visit, and a calmer way to separate curiosity from commitment.',
        transform: 'From brochure traffic to visitors who arrived ready to talk.',
        implementation:
            'Film, photography, and a guided inquiry path were built together, so the website felt like walking the floor, and the team only spent time on people who were close to choosing.',
        businessOutcome:
            'Stronger visit quality, a clearer sense of buyer readiness before the appointment, and a launch that felt like an opening, not a form campaign.',
        results: 'Better visits. Sharper focus for sales. A brand presence that matched the floor.',
        before: 'Beautiful kitchens in person, and an online journey that asked for a quote before it earned trust.',
        after: 'People arrived already imagining their kitchen in the space, and sales could meet them there.',
        coverAlt: 'Keuken Centrum kitchen showroom website on desktop and mobile',
        futureImprovements: [
            'Help buyers explore styles before they book the floor',
            'Keep warm visitors close between first click and first visit',
            'Let seasonal collections appear without rewriting the whole experience',
        ],
        themeLabel: 'Lime Showroom',
        metrics: [
            { value: '+210%', label: 'Ready inquiries' },
            { value: 'Higher', label: 'Visit quality' },
            { value: '+72%', label: 'Launch conversion' },
        ],
        timeline: [
            {
                phase: 'Listen',
                title: 'Why people left before visiting',
                description: 'We watched how buyers moved, and where the feeling of the showroom disappeared online.',
            },
            {
                phase: 'Decide',
                title: 'Earn the visit first',
                description: 'The priority became trust and desire, then a clean path to book time on the floor.',
            },
            {
                phase: 'Build',
                title: 'Bring the floor to the screen',
                description: 'Story, film, and inquiry flow were shaped as one experience, not three separate deliverables.',
            },
            {
                phase: 'Launch',
                title: 'Opening the new chapter',
                description:
                    'Campaigns and the new site went live as a single moment, with the team ready for better conversations.',
            },
            {
                phase: 'Refine',
                title: 'Protecting sales time',
                description: 'We kept tuning who reached the calendar, so mornings stayed for people close to choosing.',
            },
        ],
        galleryTitles: {
            opening: 'Walking in for the first time',
            desktop: 'The showroom on screen',
            mobile: 'Booking from the phone',
        },
        testimonial: {
            quote:
                'Online finally felt like us. People arrived warmer, and we stopped spending mornings on forms that were never going to visit.',
            name: 'Client perspective',
            role: 'Showroom perspective',
        },
    },
};

const nl: Record<string, CaseStudyNarrative> = {
    'demo-luxury-estate': {
        industry: 'Woningdiensten',
        title: 'Toen prachtig werk toch moeilijk te kopen voelde',
        summary:
            'Een premium outdoor living merk had het vakmanschap. Wat ze nodig hadden was een duidelijker pad van eerste nieuwsgierigheid naar een echt gesprek.',
        documentaryLabel: 'KLANTVERHAAL',
        businessType: 'Outdoor living & veranda merk',
        duration: 'Ongeveer 14 weken',
        services: ['Website', 'Marketing', 'Lead systemen'],
        challenge:
            'Mensen kwamen geïnteresseerd binnen, en wachtten daarna. Follow-up hing af van wie die dag beschikbaar was. Het team voelde vraag, maar vertrouwde niet welke aanvragen serieus waren, of welke campagnes geld verspilden.',
        solution:
            'In plaats van meer ads werd het pad zelf herbouwd: één duidelijk websiteverhaal, snellere eerste respons, en één plek waar elke aanvraag zichtbaar was en opgevolgd werd.',
        transform: 'Van verspreide follow-ups naar één rustig pad van interesse naar gesprek.',
        implementation:
            'De nieuwe site droeg het merk zoals een showroom hoort. Aanvragen werden snel beantwoord, naar de juiste persoon gestuurd, en gekoppeld aan tools die het team al gebruikte, zodat niets belangrijks ’s nachts onbeantwoord bleef.',
        businessOutcome:
            'Het team besteedde minder tijd aan koude leads, en meer tijd aan mensen die klaar waren om over een echt project te praten.',
        results: 'Duidelijkere vraag. Snellere antwoorden. Minder gissen over wat werkte.',
        before:
            'Sterk vakmanschap online, maar kopers vertrokken vaak zonder antwoord, en het team wist nooit welke interesse hun avond waard was.',
        after:
            'Elke serieuze aanvraag had een plek om te landen, iemand om hem te ontvangen, en een verhaal waar het merk achter kon staan.',
        coverAlt: 'Jouwdroomoverkapping outdoor living website op desktop en mobiel',
        futureImprovements: [
            'Leren welke projecttypes het snelst sluiten, en die kopers eerst begroeten',
            'Seizoenscollecties tonen zonder de hele site te herbouwen',
            'Internationale kopers warm houden tussen eerste bericht en bezoek',
        ],
        themeLabel: 'Warm Craft',
        metrics: [
            { value: '+184%', label: 'Gekwalificeerde aanvragen' },
            { value: '3.2x', label: 'Rendement op spend' },
            { value: 'Uren naar minuten', label: 'Eerste respons' },
        ],
        timeline: [
            {
                phase: 'Luisteren',
                title: 'Waar kopers vastliepen',
                description:
                    'We zaten bij het team en volgden echte aanvragen, van de eerste klik tot het moment dat iemand eindelijk antwoordde.',
            },
            {
                phase: 'Beslissen',
                title: 'Eén pad, geen extra ruis',
                description: 'De brief werd eenvoudig: maak de volgende stap duidelijk, en zorg dat een mens hem snel oppakt.',
            },
            {
                phase: 'Bouwen',
                title: 'Een site die als het werk voelde',
                description:
                    'Merkwereld, formulieren en follow-up werden herbouwd zodat interesse niet meer verdween in een stille inbox.',
            },
            {
                phase: 'Lanceren',
                title: 'Live gaan met het team',
                description: 'Campagnes en de nieuwe workflow gingen samen live, met de salesvloer klaar, niet verrast.',
            },
            {
                phase: 'Verfijnen',
                title: 'Leren van echte gesprekken',
                description: 'Na de launch pasten we berichten en overdrachten aan op wat kopers echt vroegen.',
            },
        ],
        galleryTitles: {
            opening: 'De eerste indruk',
            desktop: 'Het verhaal op het scherm',
            mobile: 'Het moment op de telefoon',
        },
        testimonial: {
            quote:
                'We stopten met ons afvragen wie we waren vergeten. Het werk paste eindelijk bij hoe zorgvuldig we voor klanten bouwen.',
            name: 'Klantperspectief',
            role: 'Oprichtersperspectief',
        },
    },
    'demo-b2b-growth': {
        industry: 'Food & B2B',
        title: 'Toen groei druk voelde, maar niet bankable',
        summary:
            'Een premium halal groothandel genereerde aandacht. De moeilijkere vraag was welke gesprekken de week van het salesteam waard waren.',
        documentaryLabel: 'KLANTVERHAAL',
        businessType: 'Premium halal groothandel',
        duration: 'Ongeveer 11 weken',
        services: ['Website', 'Marketing', 'Merkpresentie'],
        challenge:
            'Campagnes draaiden. Berichten kwamen binnen. Maar marketing en sales leefden in verschillende werkelijkheden. Niemand kon naar een kanaal wijzen en met vertrouwen zeggen: “hier beginnen de goede gesprekken.”',
        solution:
            'De verandering was niet “meer outreach.” Het was een stiller systeem: een helder merkverhaal voor kopers die kwaliteit belangrijk vinden, en een gedeeld beeld van welke aanvragen een meeting verdienden.',
        transform: 'Van rumoerige activiteit naar meetings die sales kon vertrouwen.',
        implementation:
            'We herschikten de digitale aanwezigheid rond bewijs en producttrots, en koppelden paid kanalen en follow-up zodat belovende kopers niet wachtten terwijl zwakkere leads de agenda vulden.',
        businessOutcome:
            'Minder lege meetings, duidelijkere overdrachten, en een leiderschapsbeeld dat spend eindelijk koppelde aan echte commerciële gesprekken.',
        results: 'Betere meetings. Minder ruis. Een gedeeld beeld van wat werkte.',
        before:
            'Het team werkte elke week hard, maar bleef discussiëren of de volgende meeting het komen waard was.',
        after: 'Sales ging gesprekken in terwijl ze al wisten waarom de koper er was, en waar die om gaf.',
        coverAlt: 'Ayat Food groothandel website op desktop en mobiel',
        futureImprovements: [
            'Dichter bij kopers blijven die de kwaliteit al vertrouwen',
            'Van een sterk gesprek naar een voorstel zonder vanaf nul te beginnen',
            'Pipelinebeweging vroeg genoeg zien om de week te plannen',
        ],
        themeLabel: 'Crimson Editorial',
        metrics: [
            { value: '+142%', label: 'Meetings geboekt' },
            { value: '-38%', label: 'Kosten per gesprek' },
            { value: 'Duidelijker', label: 'Sales overdracht' },
        ],
        timeline: [
            {
                phase: 'Luisteren',
                title: 'Wat “een goede lead” echt betekende',
                description:
                    'We luisterden eerst naar sales, niet naar dashboards, om te leren welke gesprekken bescherming verdienden.',
            },
            {
                phase: 'Beslissen',
                title: 'Bescherm de agenda',
                description: 'Het model koos voor minder, betere meetings boven een vollere inbox.',
            },
            {
                phase: 'Bouwen',
                title: 'Een merk dat kopers serieus namen',
                description: 'Site en follow-up werden herbouwd zodat kwaliteit zichtbaar was vóór het eerste gesprek.',
            },
            {
                phase: 'Lanceren',
                title: 'Aandacht omzetten in meetings',
                description:
                    'Kanalen gingen live met een gedeeld beeld, zodat marketing en sales minder ruzie maakten over “wat werkte.”',
            },
            {
                phase: 'Verfijnen',
                title: 'Het signaal schoon houden',
                description: 'We scherpten audiences en boodschappen aan wanneer een week zich vulde met de verkeerde ruis.',
            },
        ],
        galleryTitles: {
            opening: 'Het merk in één oogopslag',
            desktop: 'Waar kopers inzoomen',
            mobile: 'Het pad vanaf de telefoon',
        },
        testimonial: {
            quote:
                'We stopten eindelijk met elke aanvraag gelijk te behandelen. De week werd stiller, en de gesprekken beter.',
            name: 'Klantperspectief',
            role: 'Commercieel perspectief',
        },
    },
    'demo-property-dev': {
        industry: 'Retail & Showroom',
        title: 'Toen de online showroom kleiner voelde dan die in het echt',
        summary:
            'Een premium keukenbestemming had de ruimte, het vakmanschap en de mensen. Online vertrokken te veel bezoekers vóór ze klaar waren om te komen.',
        documentaryLabel: 'KLANTVERHAAL',
        businessType: 'Premium keukenshowroom',
        duration: 'Ongeveer 16 weken',
        services: ['Website', 'Marketing', 'Film'],
        challenge:
            'Interesse was niet het probleem. Intentie wel. Kopers met hoge waarde moesten de ruimte voelen vóór ze boekten, terwijl low-intent formulieren de ochtenden van sales bleven vullen.',
        solution:
            'Het werk werd een showroomervaring op het scherm: filmisch storytelling, een duidelijkere reden om te komen, en een kalmere manier om nieuwsgierigheid van commitment te scheiden.',
        transform: 'Van brochureverkeer naar bezoekers die klaar aankwamen om te praten.',
        implementation:
            'Film, fotografie en een begeleid aanvraagpad werden samen gebouwd, zodat de website voelde als over de vloer lopen, en het team alleen tijd besteedde aan mensen die dicht bij kiezen stonden.',
        businessOutcome:
            'Sterkere bezoekkwaliteit, een duidelijker gevoel van koper-readiness vóór de afspraak, en een launch die als een opening voelde, niet als een formuliercampagne.',
        results: 'Betere bezoeken. Scherpere focus voor sales. Een merkpresentie die bij de vloer paste.',
        before: 'Prachtige keukens in het echt, en een online reis die om een offerte vroeg vóór het vertrouwen verdiende.',
        after: 'Mensen kwamen al voorstellend hoe hun keuken in de ruimte stond, en sales kon hen daar ontmoeten.',
        coverAlt: 'Keuken Centrum keukenshowroom website op desktop en mobiel',
        futureImprovements: [
            'Kopers helpen stijlen te verkennen vóór ze de vloer boeken',
            'Warme bezoekers dichtbij houden tussen eerste klik en eerste bezoek',
            'Seizoenscollecties laten verschijnen zonder de hele ervaring te herschrijven',
        ],
        themeLabel: 'Lime Showroom',
        metrics: [
            { value: '+210%', label: 'Klaarstaande aanvragen' },
            { value: 'Hoger', label: 'Bezoekkwaliteit' },
            { value: '+72%', label: 'Launch conversie' },
        ],
        timeline: [
            {
                phase: 'Luisteren',
                title: 'Waarom mensen vertrokken vóór een bezoek',
                description: 'We keken hoe kopers bewogen, en waar het gevoel van de showroom online verdween.',
            },
            {
                phase: 'Beslissen',
                title: 'Verdien eerst het bezoek',
                description: 'De prioriteit werd vertrouwen en verlangen, daarna een schoon pad om tijd op de vloer te boeken.',
            },
            {
                phase: 'Bouwen',
                title: 'Breng de vloer naar het scherm',
                description: 'Verhaal, film en aanvraagflow werden als één ervaring gevormd, niet als drie losse deliverables.',
            },
            {
                phase: 'Lanceren',
                title: 'Het nieuwe hoofdstuk openen',
                description:
                    'Campagnes en de nieuwe site gingen live als één moment, met het team klaar voor betere gesprekken.',
            },
            {
                phase: 'Verfijnen',
                title: 'Sales tijd beschermen',
                description: 'We bleven tunen wie de agenda bereikte, zodat ochtenden voor mensen dicht bij kiezen bleven.',
            },
        ],
        galleryTitles: {
            opening: 'Voor het eerst binnenlopen',
            desktop: 'De showroom op het scherm',
            mobile: 'Boeken vanaf de telefoon',
        },
        testimonial: {
            quote:
                'Online voelde eindelijk als wij. Mensen kwamen warmer binnen, en we stopten met ochtenden kwijt te raken aan formulieren die nooit zouden komen.',
            name: 'Klantperspectief',
            role: 'Showroomperspectief',
        },
    },
};

const pt: Record<string, CaseStudyNarrative> = {
    'demo-luxury-estate': {
        industry: 'Serviços para casa',
        title: 'Quando um trabalho belo ainda parecia difícil de comprar',
        summary:
            'Uma marca premium de outdoor living tinha o ofício. O que precisava era um caminho mais claro da primeira curiosidade até uma conversa real.',
        documentaryLabel: 'HISTÓRIA DO CLIENTE',
        businessType: 'Marca de outdoor living e varandas',
        duration: 'Cerca de 14 semanas',
        services: ['Website', 'Marketing', 'Sistemas de leads'],
        challenge:
            'As pessoas chegavam interessadas e depois esperavam. O follow-up dependia de quem estava livre naquele dia. A equipa sentia procura, mas não confiava em quais pedidos eram sérios, nem em quais campanhas desperdiçavam dinheiro.',
        solution:
            'Em vez de mais anúncios, a decisão foi reconstruir o próprio percurso: uma história clara no site, resposta inicial mais rápida, e um único lugar onde cada pedido podia ser visto e seguido.',
        transform: 'De follow-ups dispersos para um caminho calmo do interesse à conversa.',
        implementation:
            'O novo site carregava a marca como um showroom deve. Os pedidos eram respondidos depressa, encaminhados à pessoa certa e ligados às ferramentas que a equipa já usava, para nada importante ficar sem resposta durante a noite.',
        businessOutcome:
            'A equipa passou menos tempo a perseguir leads frios e mais tempo a falar com pessoas prontas para discutir um projeto real.',
        results: 'Procura mais clara. Respostas mais rápidas. Menos adivinhação sobre o que estava a funcionar.',
        before:
            'Ofício forte online, mas os compradores partiam muitas vezes sem resposta, e a equipa nunca sabia que interesse valia a noite.',
        after:
            'Cada pedido sério tinha onde pousar, alguém para o receber, e uma história em que a marca podia confiar.',
        coverAlt: 'Website de outdoor living Jouwdroomoverkapping em desktop e mobile',
        futureImprovements: [
            'Perceber que tipos de projeto fecham mais depressa e saudar primeiro esses compradores',
            'Mostrar coleções sazonais sem reconstruir o site inteiro',
            'Manter compradores internacionais aquecidos entre a primeira mensagem e a visita',
        ],
        themeLabel: 'Warm Craft',
        metrics: [
            { value: '+184%', label: 'Pedidos qualificados' },
            { value: '3.2x', label: 'Retorno do investimento' },
            { value: 'Horas para minutos', label: 'Primeira resposta' },
        ],
        timeline: [
            {
                phase: 'Ouvir',
                title: 'Onde os compradores ficavam presos',
                description:
                    'Sentámo-nos com a equipa e seguimos pedidos reais, do primeiro clique ao momento em que alguém finalmente respondeu.',
            },
            {
                phase: 'Decidir',
                title: 'Um caminho, sem mais ruído',
                description: 'O brief ficou simples: tornar o próximo passo óbvio e garantir que um humano o encontra depressa.',
            },
            {
                phase: 'Construir',
                title: 'Um site que parecia o trabalho',
                description:
                    'O mundo da marca, os formulários e o follow-up foram reconstruídos para o interesse deixar de desaparecer numa inbox silenciosa.',
            },
            {
                phase: 'Lançar',
                title: 'Ir ao ar com a equipa',
                description: 'Campanhas e o novo fluxo entraram juntos, com a equipa comercial pronta, não surpresa.',
            },
            {
                phase: 'Refinar',
                title: 'Aprender com conversas reais',
                description: 'Depois do lançamento, ajustámos mensagens e handoffs com base no que os compradores pediam de facto.',
            },
        ],
        galleryTitles: {
            opening: 'A primeira impressão',
            desktop: 'A história no ecrã',
            mobile: 'O momento no telemóvel',
        },
        testimonial: {
            quote:
                'Deixámos de perguntar a quem tínhamos esquecido. O trabalho finalmente combinava com o cuidado com que construímos para os clientes.',
            name: 'Perspetiva do cliente',
            role: 'Perspetiva do fundador',
        },
    },
    'demo-b2b-growth': {
        industry: 'Food & B2B',
        title: 'Quando o crescimento parecia ocupado, mas não bancável',
        summary:
            'Um grossista halal premium gerava atenção. A pergunta mais difícil era que conversas valiam a semana da equipa comercial.',
        documentaryLabel: 'HISTÓRIA DO CLIENTE',
        businessType: 'Grossista halal premium',
        duration: 'Cerca de 11 semanas',
        services: ['Website', 'Marketing', 'Presença de marca'],
        challenge:
            'As campanhas corriam. As mensagens chegavam. Mas marketing e vendas viviam realidades diferentes. Ninguém apontava um canal e dizia, com confiança: “é aqui que começam as boas conversas.”',
        solution:
            'A mudança não foi “mais outreach.” Foi um sistema mais calmo: uma história de marca clara para compradores que valorizam qualidade, e uma visão partilhada de que pedidos mereciam reunião.',
        transform: 'De atividade ruidosa para reuniões em que a equipa comercial podia confiar.',
        implementation:
            'Reformámos a presença digital em torno de prova e orgulho de produto, depois ligámos canais pagos e follow-up para compradores promissórios não ficarem à espera enquanto leads fracos enchiam a agenda.',
        businessOutcome:
            'Menos reuniões vazias, handoffs mais claros, e uma visão de liderança que finalmente ligava investimento a conversas comerciais reais.',
        results: 'Melhores reuniões. Menos ruído. Uma imagem partilhada do que estava a funcionar.',
        before:
            'A equipa trabalhava duro todas as semanas, e ainda discutia se a próxima reunião valia a pena aparecer.',
        after: 'As vendas entravam nas conversas já a saber por que o comprador estava ali, e o que importava.',
        coverAlt: 'Website de grossista Ayat Food em desktop e mobile',
        futureImprovements: [
            'Ficar mais perto dos compradores que já confiam na qualidade',
            'Transformar uma boa chamada numa proposta sem começar do zero',
            'Ver o movimento do pipeline a tempo de planear a semana',
        ],
        themeLabel: 'Crimson Editorial',
        metrics: [
            { value: '+142%', label: 'Reuniões agendadas' },
            { value: '-38%', label: 'Custo por conversa' },
            { value: 'Mais claro', label: 'Handoff comercial' },
        ],
        timeline: [
            {
                phase: 'Ouvir',
                title: 'O que “um bom lead” significava de verdade',
                description:
                    'Ouvimos primeiro as vendas, não os dashboards, para aprender que conversas mereciam proteção.',
            },
            {
                phase: 'Decidir',
                title: 'Proteger a agenda',
                description: 'O modelo privilegiou menos reuniões, mas melhores, em vez de uma inbox mais cheia.',
            },
            {
                phase: 'Construir',
                title: 'Uma marca que os compradores levavam a sério',
                description: 'O site e o follow-up foram reconstruídos para a qualidade ser visível antes da primeira chamada.',
            },
            {
                phase: 'Lançar',
                title: 'Transformar atenção em reuniões',
                description:
                    'Os canais entraram ao ar com uma visão partilhada, para marketing e vendas discutirem menos sobre “o que funcionava.”',
            },
            {
                phase: 'Refinar',
                title: 'Manter o sinal limpo',
                description: 'Apertámos audiências e mensagens sempre que uma semana se enchia do tipo errado de ruído.',
            },
        ],
        galleryTitles: {
            opening: 'A marca à primeira vista',
            desktop: 'Onde os compradores se aproximam',
            mobile: 'O caminho a partir do telemóvel',
        },
        testimonial: {
            quote:
                'Finalmente deixámos de tratar cada pedido como igual. A semana ficou mais calma, e as conversas melhoraram.',
            name: 'Perspetiva do cliente',
            role: 'Perspetiva comercial',
        },
    },
    'demo-property-dev': {
        industry: 'Retail & Showroom',
        title: 'Quando o showroom online parecia mais pequeno do que o real',
        summary:
            'Um destino premium de cozinhas tinha o espaço, o ofício e as pessoas. Online, demasiados visitantes partiam antes de se sentirem prontos para visitar.',
        documentaryLabel: 'HISTÓRIA DO CLIENTE',
        businessType: 'Showroom premium de cozinhas',
        duration: 'Cerca de 16 semanas',
        services: ['Website', 'Marketing', 'Filme'],
        challenge:
            'O interesse não era o problema. A intenção era. Compradores de alto valor precisavam de sentir o espaço antes de marcar, enquanto formulários de baixa intenção ainda consumiam as manhãs da equipa comercial.',
        solution:
            'O trabalho tornou-se uma experiência de showroom no ecrã: storytelling cinematográfico, uma razão mais clara para visitar, e uma forma mais calma de separar curiosidade de compromisso.',
        transform: 'De tráfego de brochure para visitantes que chegavam prontos para falar.',
        implementation:
            'Filme, fotografia e um percurso de pedido guiado foram construídos juntos, para o website parecer caminhar pelo chão, e a equipa só gastar tempo com quem estava perto de escolher.',
        businessOutcome:
            'Melhor qualidade de visita, uma noção mais clara da prontidão do comprador antes da marcação, e um lançamento que parecia uma abertura, não uma campanha de formulários.',
        results: 'Melhores visitas. Foco mais afiado nas vendas. Uma presença de marca à altura do chão.',
        before: 'Cozinhas belas ao vivo, e uma jornada online que pedia orçamento antes de merecer confiança.',
        after: 'As pessoas chegavam já a imaginar a cozinha no espaço, e as vendas podiam encontrá-las ali.',
        coverAlt: 'Website do showroom Keuken Centrum em desktop e mobile',
        futureImprovements: [
            'Ajudar compradores a explorar estilos antes de marcar o chão',
            'Manter visitantes quentes entre o primeiro clique e a primeira visita',
            'Deixar coleções sazonais aparecerem sem reescrever toda a experiência',
        ],
        themeLabel: 'Lime Showroom',
        metrics: [
            { value: '+210%', label: 'Pedidos prontos' },
            { value: 'Maior', label: 'Qualidade da visita' },
            { value: '+72%', label: 'Conversão no lançamento' },
        ],
        timeline: [
            {
                phase: 'Ouvir',
                title: 'Porque partiam antes de visitar',
                description: 'Observámos como os compradores se moviam, e onde a sensação do showroom desaparecia online.',
            },
            {
                phase: 'Decidir',
                title: 'Ganhar a visita primeiro',
                description: 'A prioridade passou a ser confiança e desejo, depois um caminho limpo para marcar tempo no chão.',
            },
            {
                phase: 'Construir',
                title: 'Levar o chão ao ecrã',
                description: 'História, filme e fluxo de pedido foram moldados como uma experiência, não três entregas separadas.',
            },
            {
                phase: 'Lançar',
                title: 'Abrir o novo capítulo',
                description:
                    'Campanhas e o novo site entraram ao ar como um só momento, com a equipa pronta para melhores conversas.',
            },
            {
                phase: 'Refinar',
                title: 'Proteger o tempo de vendas',
                description: 'Continuámos a afinar quem chegava à agenda, para as manhãs ficarem para quem estava perto de escolher.',
            },
        ],
        galleryTitles: {
            opening: 'Entrar pela primeira vez',
            desktop: 'O showroom no ecrã',
            mobile: 'Marcar a partir do telemóvel',
        },
        testimonial: {
            quote:
                'Online finalmente parecia nós. As pessoas chegavam mais quentes, e deixámos de gastar manhãs em formulários que nunca iriam visitar.',
            name: 'Perspetiva do cliente',
            role: 'Perspetiva do showroom',
        },
    },
};

const id: Record<string, CaseStudyNarrative> = {
    'demo-luxury-estate': {
        industry: 'Layanan rumah',
        title: 'Ketika karya indah tetap terasa sulit dibeli',
        summary:
            'Merek outdoor living premium sudah punya keahlian. Yang dibutuhkan adalah jalur lebih jelas dari rasa ingin tahu pertama ke percakapan nyata.',
        documentaryLabel: 'CERITA KLIEN',
        businessType: 'Merek outdoor living & veranda',
        duration: 'Sekitar 14 minggu',
        services: ['Website', 'Marketing', 'Sistem lead'],
        challenge:
            'Orang datang dengan minat, lalu menunggu. Follow-up bergantung siapa yang bebas hari itu. Tim merasakan permintaan, tetapi tidak yakin mana yang serius, atau kampanye mana yang membuang uang.',
        solution:
            'Alih-alih menambah iklan, keputusan yang diambil adalah membangun ulang jalurnya sendiri: satu cerita website yang jelas, respons pertama lebih cepat, dan satu tempat di mana setiap permintaan bisa dilihat dan ditindaklanjuti.',
        transform: 'Dari follow-up yang tersebar menjadi satu jalur tenang dari minat ke percakapan.',
        implementation:
            'Situs baru membawa merek seperti showroom seharusnya. Permintaan dijawab cepat, diarahkan ke orang yang tepat, dan terhubung ke tools yang sudah dipakai tim, sehingga tidak ada yang penting tertinggal semalaman.',
        businessOutcome:
            'Tim menghabiskan lebih sedikit waktu mengejar lead dingin, dan lebih banyak waktu berbicara dengan orang yang siap membahas proyek nyata.',
        results: 'Permintaan lebih jelas. Balasan lebih cepat. Lebih sedikit menebak apa yang berhasil.',
        before:
            'Keahlian kuat online, tetapi pembeli sering pergi tanpa balasan, dan tim tidak pernah tahu minat mana yang layak di malam hari mereka.',
        after:
            'Setiap permintaan serius punya tempat untuk mendarat, orang yang menyambutnya, dan cerita yang bisa dipegang merek.',
        coverAlt: 'Website outdoor living Jouwdroomoverkapping di desktop dan mobile',
        futureImprovements: [
            'Belajar tipe proyek mana yang closing tercepat, dan sambut pembeli itu lebih dulu',
            'Tampilkan koleksi musiman tanpa membangun ulang seluruh situs',
            'Jaga pembeli internasional tetap hangat antara pesan pertama dan kunjungan',
        ],
        themeLabel: 'Warm Craft',
        metrics: [
            { value: '+184%', label: 'Permintaan berkualitas' },
            { value: '3.2x', label: 'Return on spend' },
            { value: 'Jam ke menit', label: 'Respons pertama' },
        ],
        timeline: [
            {
                phase: 'Dengar',
                title: 'Di mana pembeli terjebak',
                description:
                    'Kami duduk bersama tim dan mengikuti permintaan nyata, dari klik pertama hingga seseorang akhirnya menjawab.',
            },
            {
                phase: 'Putuskan',
                title: 'Satu jalur, bukan lebih banyak noise',
                description: 'Brief menjadi sederhana: buat langkah berikutnya jelas, dan pastikan manusia menemuinya dengan cepat.',
            },
            {
                phase: 'Bangun',
                title: 'Situs yang terasa seperti karyanya',
                description:
                    'Dunia merek, formulir, dan follow-up dibangun ulang agar minat tidak lagi hilang di inbox yang sunyi.',
            },
            {
                phase: 'Luncurkan',
                title: 'Go-live bersama tim',
                description: 'Kampanye dan alur kerja baru live bersama, dengan lantai sales siap, bukan terkejut.',
            },
            {
                phase: 'Perbaiki',
                title: 'Belajar dari percakapan nyata',
                description: 'Setelah launch, kami menyesuaikan pesan dan handoff berdasarkan apa yang benar-benar ditanyakan pembeli.',
            },
        ],
        galleryTitles: {
            opening: 'Kesan pertama',
            desktop: 'Cerita di layar',
            mobile: 'Momen di ponsel',
        },
        testimonial: {
            quote:
                'Kami berhenti bertanya-tanya siapa yang terlupakan. Pekerjaan akhirnya cocok dengan kehati-hatian kami membangun untuk pelanggan.',
            name: 'Perspektif klien',
            role: 'Perspektif founder',
        },
    },
    'demo-b2b-growth': {
        industry: 'Food & B2B',
        title: 'Ketika pertumbuhan terasa sibuk, tetapi belum bankable',
        summary:
            'Grosir halal premium sedang menghasilkan perhatian. Pertanyaan yang lebih sulit: percakapan mana yang layak mengisi minggu tim sales.',
        documentaryLabel: 'CERITA KLIEN',
        businessType: 'Grosir halal premium',
        duration: 'Sekitar 11 minggu',
        services: ['Website', 'Marketing', 'Kehadiran merek'],
        challenge:
            'Kampanye berjalan. Pesan masuk. Tetapi marketing dan sales hidup di realitas berbeda. Tidak ada yang bisa menunjuk satu kanal dan berkata dengan yakin, “di sinilah percakapan bagus dimulai.”',
        solution:
            'Perubahannya bukan “lebih banyak outreach.” Melainkan sistem yang lebih tenang: cerita merek yang jelas untuk pembeli yang peduli kualitas, dan pandangan bersama tentang permintaan mana yang layak dimeetingkan.',
        transform: 'Dari aktivitas yang berisik menjadi meeting yang bisa dipercaya tim sales.',
        implementation:
            'Kami membentuk ulang kehadiran digital di sekitar bukti dan kebanggaan produk, lalu menghubungkan kanal berbayar dan follow-up agar pembeli menjanjikan tidak menunggu sementara lead lemah mengisi kalender.',
        businessOutcome:
            'Lebih sedikit meeting kosong, handoff lebih jelas, dan pandangan leadership yang akhirnya menghubungkan spend ke percakapan komersial nyata.',
        results: 'Meeting lebih baik. Lebih sedikit noise. Gambaran bersama tentang apa yang berhasil.',
        before:
            'Tim bekerja keras setiap minggu, tetapi masih berdebat apakah meeting berikutnya layak didatangi.',
        after: 'Sales masuk percakapan sudah tahu mengapa pembeli ada di situ, dan apa yang mereka pedulikan.',
        coverAlt: 'Website grosir Ayat Food di desktop dan mobile',
        futureImprovements: [
            'Lebih dekat dengan pembeli yang sudah percaya pada kualitas',
            'Ubah panggilan kuat menjadi proposal tanpa mulai dari halaman kosong',
            'Lihat pergerakan pipeline cukup awal untuk merencanakan minggu',
        ],
        themeLabel: 'Crimson Editorial',
        metrics: [
            { value: '+142%', label: 'Meeting terjadwal' },
            { value: '-38%', label: 'Biaya per percakapan' },
            { value: 'Lebih jelas', label: 'Handoff sales' },
        ],
        timeline: [
            {
                phase: 'Dengar',
                title: 'Apa arti “lead bagus” sebenarnya',
                description:
                    'Kami mendengarkan sales dulu, bukan dashboard, untuk belajar percakapan mana yang layak dilindungi.',
            },
            {
                phase: 'Putuskan',
                title: 'Lindungi kalender',
                description: 'Modelnya memilih lebih sedikit meeting yang lebih baik daripada inbox yang lebih penuh.',
            },
            {
                phase: 'Bangun',
                title: 'Merek yang diambil serius pembeli',
                description: 'Situs dan follow-up dibangun ulang agar kualitas terlihat sebelum panggilan pertama.',
            },
            {
                phase: 'Luncurkan',
                title: 'Mengubah perhatian menjadi meeting',
                description:
                    'Kanal live dengan pandangan bersama, sehingga marketing dan sales lebih jarang berdebat soal “apa yang berhasil.”',
            },
            {
                phase: 'Perbaiki',
                title: 'Menjaga sinyal tetap bersih',
                description: 'Kami memperketat audiens dan pesan setiap kali seminggu penuh dengan noise yang salah.',
            },
        ],
        galleryTitles: {
            opening: 'Merek sekilas pertama',
            desktop: 'Tempat pembeli mendekat',
            mobile: 'Jalur dari ponsel',
        },
        testimonial: {
            quote:
                'Kami akhirnya berhenti memperlakukan setiap permintaan sama. Minggu jadi lebih tenang, dan percakapannya lebih baik.',
            name: 'Perspektif klien',
            role: 'Perspektif komersial',
        },
    },
    'demo-property-dev': {
        industry: 'Retail & Showroom',
        title: 'Ketika showroom online terasa lebih kecil dari yang nyata',
        summary:
            'Destinasi dapur premium punya ruang, keahlian, dan orang. Online, terlalu banyak pengunjung pergi sebelum siap berkunjung.',
        documentaryLabel: 'CERITA KLIEN',
        businessType: 'Showroom dapur premium',
        duration: 'Sekitar 16 minggu',
        services: ['Website', 'Marketing', 'Film'],
        challenge:
            'Minat bukan masalahnya. Niat yang jadi masalah. Pembeli bernilai tinggi perlu merasakan ruang sebelum booking, sementara formulir low-intent masih menghabiskan pagi tim sales.',
        solution:
            'Pekerjaannya menjadi pengalaman showroom di layar: storytelling sinematik, alasan lebih jelas untuk berkunjung, dan cara lebih tenang memisahkan rasa ingin tahu dari komitmen.',
        transform: 'Dari traffic brosur menjadi pengunjung yang datang siap berbicara.',
        implementation:
            'Film, fotografi, dan jalur permintaan terpandu dibangun bersama, sehingga website terasa seperti berjalan di lantai, dan tim hanya menghabiskan waktu untuk orang yang hampir memilih.',
        businessOutcome:
            'Kualitas kunjungan lebih kuat, rasa kesiapan pembeli lebih jelas sebelum janji, dan launch yang terasa seperti pembukaan, bukan kampanye formulir.',
        results: 'Kunjungan lebih baik. Fokus sales lebih tajam. Kehadiran merek yang cocok dengan lantai.',
        before: 'Dapur indah secara langsung, dan perjalanan online yang meminta quote sebelum pantas dipercaya.',
        after: 'Orang datang sudah membayangkan dapur mereka di ruang itu, dan sales bisa menemui mereka di sana.',
        coverAlt: 'Website showroom dapur Keuken Centrum di desktop dan mobile',
        futureImprovements: [
            'Bantu pembeli mengeksplorasi gaya sebelum booking lantai',
            'Jaga pengunjung hangat antara klik pertama dan kunjungan pertama',
            'Biarkan koleksi musiman muncul tanpa menulis ulang seluruh pengalaman',
        ],
        themeLabel: 'Lime Showroom',
        metrics: [
            { value: '+210%', label: 'Permintaan siap' },
            { value: 'Lebih tinggi', label: 'Kualitas kunjungan' },
            { value: '+72%', label: 'Konversi launch' },
        ],
        timeline: [
            {
                phase: 'Dengar',
                title: 'Mengapa orang pergi sebelum berkunjung',
                description: 'Kami mengamati bagaimana pembeli bergerak, dan di mana perasaan showroom menghilang online.',
            },
            {
                phase: 'Putuskan',
                title: 'Dapatkan kunjungan lebih dulu',
                description: 'Prioritas menjadi kepercayaan dan desire, lalu jalur bersih untuk booking waktu di lantai.',
            },
            {
                phase: 'Bangun',
                title: 'Bawa lantai ke layar',
                description: 'Cerita, film, dan alur permintaan dibentuk sebagai satu pengalaman, bukan tiga deliverable terpisah.',
            },
            {
                phase: 'Luncurkan',
                title: 'Membuka bab baru',
                description:
                    'Kampanye dan situs baru live sebagai satu momen, dengan tim siap untuk percakapan yang lebih baik.',
            },
            {
                phase: 'Perbaiki',
                title: 'Melindungi waktu sales',
                description: 'Kami terus menyesuaikan siapa yang sampai ke kalender, agar pagi tetap untuk orang yang hampir memilih.',
            },
        ],
        galleryTitles: {
            opening: 'Masuk untuk pertama kali',
            desktop: 'Showroom di layar',
            mobile: 'Booking dari ponsel',
        },
        testimonial: {
            quote:
                'Online akhirnya terasa seperti kami. Orang datang lebih hangat, dan kami berhenti menghabiskan pagi pada formulir yang tidak akan pernah berkunjung.',
            name: 'Perspektif klien',
            role: 'Perspektif showroom',
        },
    },
};

const LOCALES: Record<Language, Record<string, CaseStudyNarrative>> = { en, nl, pt, id };

export function localizeCaseStudy(study: CaseStudyExperience, lang: Language): CaseStudyExperience {
    const copy = LOCALES[lang]?.[study.id] ?? LOCALES.en[study.id];
    if (!copy) return study;

    const gallery = study.gallery.map((item) => {
        if (item.id === 'hero') return { ...item, title: copy.galleryTitles.opening };
        if (item.id === 'desktop') return { ...item, title: copy.galleryTitles.desktop };
        if (item.id === 'mobile') return { ...item, title: copy.galleryTitles.mobile };
        return item;
    });

    return {
        ...study,
        industry: copy.industry,
        title: copy.title,
        summary: copy.summary,
        documentaryLabel: copy.documentaryLabel,
        businessType: copy.businessType,
        duration: copy.duration,
        services: copy.services,
        challenge: copy.challenge,
        solution: copy.solution,
        transform: copy.transform,
        implementation: copy.implementation,
        businessOutcome: copy.businessOutcome,
        results: copy.results,
        before: copy.before,
        after: copy.after,
        coverAlt: copy.coverAlt,
        futureImprovements: copy.futureImprovements,
        theme: { ...study.theme, label: copy.themeLabel },
        metrics: copy.metrics,
        timeline: copy.timeline,
        gallery,
        testimonial: {
            ...study.testimonial,
            quote: copy.testimonial.quote,
            name: copy.testimonial.name,
            role: copy.testimonial.role,
        },
    };
}

export function localizeCaseStudies(studies: CaseStudyExperience[], lang: Language): CaseStudyExperience[] {
    return studies.map((study) => localizeCaseStudy(study, lang));
}
