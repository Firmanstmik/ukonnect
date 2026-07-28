import type { Language } from '../../i18n/translations';

type RichBodyParts = {
    intro: string;
    marketing: string;
    connectorOne: string;
    aiSystems: string;
    connectorTwo: string;
    webDevelopment: string;
    outro: string;
};

type TrustItemCopy = {
    label: string;
    value: string;
    signal: string;
};

type PersonPanelCopy = {
    title: string;
    tag: string;
    body: string;
};

type SceneCopy = {
    title: string;
    label: string;
    detail: string;
    note: string;
    tagline: string;
    alt: string;
};

type JourneyStepCopy = {
    title: string;
    micro: string;
    tag: string;
};

type RoomCopy = {
    title: string;
    blurb: string;
};

type CultureItemCopy = {
    title: string;
    label: string;
    detail: string;
    note: string;
};

type PillarCopy = {
    title: string;
    body: string;
};

export type CompanyStoryCopy = {
    opening: {
        liveEyebrow: string;
        titlePre: string;
        titleHighlight: string;
        bodyParts: RichBodyParts;
        pills: string[];
        amsterdamBadge: string;
        amsterdamNote: string;
        documentaryOpening: string;
        captionBadge1: string;
        captionBadge2: string;
        captionTitlePre: string;
        captionTitleHighlight: string;
        captionBody: string;
        studioFloor: string;
        liveBuildCyclesNote: string;
        teamAlt: string;
    };
    trust: {
        signalsLabel: string;
        items: TrustItemCopy[];
    };
    peoplePanels: PersonPanelCopy[];
    behind: {
        documentary: string;
        chapter: string;
        chapterNumber: string;
        titlePre: string;
        titleHighlight: string;
        bodyParts: RichBodyParts;
        pills: string[];
        aiCam: string;
        ukonnectOs: string;
        sceneReader: string;
        live: string;
        liveLoop: string;
        capturedInAmsterdam: string;
        sceneLabel: string;
        sceneCountTemplate: string;
    };
    scenes: SceneCopy[];
    journeyHeading: {
        eyebrow: string;
        title: string;
        subtitle: string;
    };
    journeyChrome: {
        consoleLabel: string;
        liveNode: string;
        aiRender: string;
        phaseLabelTemplate: string;
        teamPrefix: string;
        eachPhaseNote: string;
        viewAriaPrefix: string;
        imageAltPrefix: string;
    };
    journey: JourneyStepCopy[];
    officeHeading: {
        eyebrow: string;
        title: string;
        subtitle: string;
    };
    officeChrome: {
        configuratorLabel: string;
        floorMapLabel: string;
        selectRoom: string;
        exploreAriaPrefix: string;
        roomLabelPrefix: string;
        countTemplate: string;
        floorPlanAlt: string;
        floatingCardAltPrefix: string;
        dockCardAltSeparator: string;
        teamPrefix: string;
    };
    rooms: RoomCopy[];
    cultureHeading: {
        eyebrow: string;
        title: string;
        subtitle: string;
    };
    cultureChrome: {
        wayLabel: string;
        wayNote: string;
        imageAltPrefix: string;
    };
    culture: CultureItemCopy[];
    leadershipHeading: {
        eyebrow: string;
        title: string;
        subtitle: string;
    };
    leadership: {
        founderLabel: string;
        founderName: string;
        companyLabel: string;
        companyLine: string;
        portraitAlt: string;
        statementLabel: string;
        headlinePre: string;
        headlineHighlight: string;
        quote: string;
        pillars: PillarCopy[];
        openFormAria: string;
    };
    cta: {
        eyebrow: string;
        titlePre: string;
        titleHighlight: string;
    };
};

const en: CompanyStoryCopy = {
    opening: {
        liveEyebrow: 'Built by People. Powered by AI.',
        titlePre: 'The people behind',
        titleHighlight: 'the systems.',
        bodyParts: {
            intro: 'The in-house team behind your AI Growth System.',
            marketing: 'Marketing',
            connectorOne: ', ',
            aiSystems: 'AI Systems',
            connectorTwo: ', and ',
            webDevelopment: 'Web Development',
            outro: ' delivered under one roof, from strategy through automation to measurable pipeline growth.',
        },
        pills: ['MARKETING', 'AI SYSTEMS', 'WEB'],
        amsterdamBadge: 'AMSTERDAM',
        amsterdamNote: 'Shot during live build cycles on the studio floor. Proof of how Ukonnect ships, not how we pitch.',
        documentaryOpening: 'DOCUMENTARY OPENING',
        captionBadge1: 'DOCUMENTARY 00',
        captionBadge2: 'LIVE PORTRAIT',
        captionTitlePre: 'Operators +',
        captionTitleHighlight: 'intelligence.',
        captionBody: 'Marketing, AI Systems, and Web Development. One in-house team behind your connected growth engine.',
        studioFloor: 'STUDIO FLOOR',
        liveBuildCyclesNote: 'Shot on the studio floor during live build cycles. Proof of how Ukonnect ships, not how we pitch.',
        teamAlt: 'The Ukonnect team, together',
    },
    trust: {
        signalsLabel: 'TRUST SIGNALS',
        items: [
            { label: 'Based in', value: 'Amsterdam', signal: 'NL HQ' },
            { label: 'Delivery', value: 'In-house team', signal: 'NO OUTSOURCE' },
            { label: 'Focus', value: 'AI Growth System', signal: 'MKT, AI, WEB' },
        ],
    },
    peoplePanels: [
        {
            title: 'Marketing',
            tag: 'GOOGLE, META, FUNNELS',
            body: 'Paid advertising on Meta and Google, conversion funnels, and lead generation strategy that attract high-intent prospects.',
        },
        {
            title: 'AI Systems',
            tag: 'AUTOMATION, CRM, AGENTS',
            body: 'AI lead generation, sales automation, marketing automation, and integrations that connect CRM, ads, and analytics into one system.',
        },
        {
            title: 'Web Development',
            tag: 'SITES, LANDING, TRACKING',
            body: 'Conversion websites, high-performance landing pages, and tracking infrastructure that turn traffic into measurable leads.',
        },
    ],
    behind: {
        documentary: 'DOCUMENTARY',
        chapter: 'CHAPTER',
        chapterNumber: '01',
        titlePre: 'Behind the',
        titleHighlight: 'Systems',
        bodyParts: {
            intro: 'Captured in Amsterdam. The same ',
            marketing: 'Marketing',
            connectorOne: ', ',
            aiSystems: 'AI Systems',
            connectorTwo: ', and ',
            webDevelopment: 'Web Development',
            outro: ' teams you see in Our services, explored scene by scene.',
        },
        pills: ['MARKETING', 'AI SYSTEMS', 'WEB'],
        aiCam: 'AI CAM',
        ukonnectOs: 'UKONNECT OS',
        sceneReader: 'SCENE READER',
        live: 'LIVE',
        liveLoop: 'LIVE LOOP',
        capturedInAmsterdam: 'CAPTURED IN AMSTERDAM',
        sceneLabel: 'SCENE',
        sceneCountTemplate: '{current} OF {total}',
    },
    scenes: [
        {
            title: 'Desk-side build review',
            label: 'AI Systems',
            detail: 'Integrations, CRM syncs, and agent workflows reviewed at the desk before automation goes live in a client environment.',
            note: 'The same AI Systems capability from Our services: validating logic, routing edge cases, and tuning workflows while dashboards show live signal.',
            tagline: 'AI SYSTEMS, WORKFLOWS, CRM',
            alt: 'Ukonnect team reviewing AI integrations and automation workflows at a desk',
        },
        {
            title: 'Direction gets aligned in the room',
            label: 'Marketing',
            detail: 'Google Ads, Meta campaigns, and funnel strategy aligned in one room before creative, budget, and targeting move forward.',
            note: 'Marketing delivery in practice: paid advertising, conversion funnels, and lead generation strategy decided together, not in silos.',
            tagline: 'MARKETING, PAID ADS, FUNNELS',
            alt: 'Ukonnect marketing team reviewing campaign direction around a boardroom table',
        },
        {
            title: 'The sprint takes shape before the sprint starts',
            label: 'Funnel planning',
            detail: 'Landing page structure, conversion paths, and campaign priorities locked before web build and paid media launch together.',
            note: 'Where Marketing and Web Development meet: funnels, messaging, and page architecture planned as one connected system.',
            tagline: 'FUNNELS, LANDING PAGES, STRATEGY',
            alt: 'Ukonnect team planning conversion funnels and landing pages around a laptop and whiteboard',
        },
        {
            title: 'Questions are resolved in front of the system',
            label: 'Web delivery',
            detail: 'Conversion websites, tracking setup, and landing page performance reviewed live with the client before launch.',
            note: 'Web Development in the room: sites, analytics, and conversion decisions resolved in front of the actual build, not a slide deck.',
            tagline: 'WEB, TRACKING, CONVERSION',
            alt: 'Ukonnect web team presenting a conversion site and tracking setup in a workshop',
        },
    ],
    journeyHeading: {
        eyebrow: 'How We Work',
        title: 'An interactive journey, not a static timeline.',
        subtitle: 'Five delivery phases across Marketing, AI Systems, and Web Development in one console.',
    },
    journeyChrome: {
        consoleLabel: 'UKONNECT GROWTH ENGINE',
        liveNode: 'LIVE NODE',
        aiRender: '16:10 AI RENDER',
        phaseLabelTemplate: 'PHASE {index}',
        teamPrefix: 'Team',
        eachPhaseNote: 'Each phase connects Marketing, AI Systems, and Web Development inside one growth engine.',
        viewAriaPrefix: 'View',
        imageAltPrefix: 'Ukonnect team',
    },
    journey: [
        { title: 'Discover', micro: 'Lead gen audit + growth strategy mapping', tag: 'SCAN' },
        { title: 'Design', micro: 'AI system architecture + conversion UX blueprint', tag: 'BLUEPRINT' },
        { title: 'Build', micro: 'Sites, automations, CRM integrations + QA', tag: 'COMPILE' },
        { title: 'Launch', micro: 'Campaign rollout, site launch + tracking live', tag: 'DEPLOY' },
        { title: 'Scale', micro: 'Performance optimization + pipeline growth loops', tag: 'MULTIPLY' },
    ],
    officeHeading: {
        eyebrow: 'Office Experience',
        title: 'An editorial view of where systems get built.',
        subtitle: 'Five studio rooms mapped to Marketing, AI Systems, and Web Development delivery.',
    },
    officeChrome: {
        configuratorLabel: 'STUDIO CONFIGURATOR',
        floorMapLabel: 'Amsterdam, Live floor map',
        selectRoom: 'SELECT ROOM',
        exploreAriaPrefix: 'Explore',
        roomLabelPrefix: 'ROOM',
        countTemplate: '{current} / {total}',
        floorPlanAlt: 'Ukonnect studio floor plan',
        floatingCardAltPrefix: 'Ukonnect',
        dockCardAltSeparator: ', ',
        teamPrefix: 'TEAM',
    },
    rooms: [
        { title: 'AI Lab', blurb: 'AI Systems: automation, agents, and CRM workflows.' },
        { title: 'Strategy Room', blurb: 'Marketing: paid ads, funnels, and lead gen strategy.' },
        { title: 'Creative Studio', blurb: 'Web Development: conversion sites and landing pages.' },
        { title: 'Automation Hub', blurb: 'AI Integrations & Workflows monitored in production.' },
        { title: 'Client Success', blurb: 'Performance optimization and pipeline growth reviews.' },
    ],
    cultureHeading: {
        eyebrow: 'Culture',
        title: 'Ownership, innovation, execution, curiosity, growth.',
        subtitle: 'Five values, one editorial wall. Hover any frame to read how it shows up in the work.',
    },
    cultureChrome: {
        wayLabel: 'THE UKONNECT WAY',
        wayNote: 'Not a poster on the wall. This is how the studio actually operates, every day.',
        imageAltPrefix: 'Ukonnect culture',
    },
    culture: [
        {
            title: 'Ownership',
            label: 'Deep work',
            detail: 'Everyone owns outcomes end-to-end, not tickets waiting in a queue.',
            note: 'Accountability visible in the room during focused build sessions, not on a slide.',
        },
        {
            title: 'Innovation',
            label: 'Momentum',
            detail: 'New ideas get tested against production standards, not pitch decks.',
            note: 'The energy in the studio when experiments move fast, but still survive real operations.',
        },
        {
            title: 'Execution',
            label: 'Alignment',
            detail: 'Direction is resolved in the room before execution starts to fragment.',
            note: 'A working meeting with proximity and eye contact that feels candid, not performative.',
        },
        {
            title: 'Curiosity',
            label: 'Mentorship',
            detail: 'Knowledge moves sideways across the team, not only top-down.',
            note: 'Side-by-side review moments where questions are welcomed in front of the system.',
        },
        {
            title: 'Growth',
            label: 'Together',
            detail: 'Progress is a team rhythm: strategy, build, and delivery in one operating cadence.',
            note: 'A company portrait that reads as culture evidence from a real team in motion.',
        },
    ],
    leadershipHeading: {
        eyebrow: 'Leadership',
        title: 'Built to outlast trends.',
        subtitle: 'A founder manifest inside one editorial panel: portrait, conviction, and operating pillars.',
    },
    leadership: {
        founderLabel: 'FOUNDER',
        founderName: 'Raffy',
        companyLabel: 'UKONNECT',
        companyLine: 'Marketing, AI Systems, Web',
        portraitAlt: 'Raffy, Ukonnect leadership',
        statementLabel: 'FOUNDER STATEMENT',
        headlinePre: 'We build long-term systems,',
        headlineHighlight: 'not short-term hype.',
        quote: 'Turn AI into a reliable growth advantage for real businesses, with clarity, craftsmanship, and accountability.',
        pillars: [
            {
                title: 'Marketing',
                body: 'Paid advertising, conversion funnels, and lead generation strategy that fills the pipeline with high-intent prospects.',
            },
            {
                title: 'AI Systems',
                body: 'AI automation, CRM integrations, and agent workflows that qualify leads and nurture prospects around the clock.',
            },
            {
                title: 'Web Development',
                body: 'Conversion websites, landing pages, and tracking setup that turn traffic into measurable leads and attribution.',
            },
        ],
        openFormAria: 'Open strategy call form',
    },
    cta: {
        eyebrow: 'Strategy session',
        titlePre: 'Let’s build your next',
        titleHighlight: 'AI Growth System.',
    },
};

const nl: CompanyStoryCopy = {
    opening: {
        liveEyebrow: 'Gebouwd door mensen. Versterkt door AI.',
        titlePre: 'De mensen achter',
        titleHighlight: 'de systemen.',
        bodyParts: {
            intro: 'Het in-house team achter jouw AI Growth System.',
            marketing: 'Marketing',
            connectorOne: ', ',
            aiSystems: 'AI Systems',
            connectorTwo: ', en ',
            webDevelopment: 'Web Development',
            outro: ' geleverd onder één dak, van strategie via automatisering naar meetbare pipelinegroei.',
        },
        pills: ['MARKETING', 'AI SYSTEMS', 'WEB'],
        amsterdamBadge: 'AMSTERDAM',
        amsterdamNote: 'Gefilmd tijdens live build cycles op de studio floor. Bewijs van hoe Ukonnect levert, niet hoe we pitchen.',
        documentaryOpening: 'DOCUMENTARY OPENING',
        captionBadge1: 'DOCUMENTARY 00',
        captionBadge2: 'LIVE PORTRAIT',
        captionTitlePre: 'Operators +',
        captionTitleHighlight: 'intelligentie.',
        captionBody: 'Marketing, AI Systems en Web Development. Eén in-house team achter jouw verbonden groeimotor.',
        studioFloor: 'STUDIO FLOOR',
        liveBuildCyclesNote: 'Opgenomen op de studio floor tijdens live build cycles. Bewijs van hoe Ukonnect levert, niet hoe we pitchen.',
        teamAlt: 'Het Ukonnect team, samen',
    },
    trust: {
        signalsLabel: 'TRUST SIGNALS',
        items: [
            { label: 'Gevestigd in', value: 'Amsterdam', signal: 'NL HQ' },
            { label: 'Delivery', value: 'In-house team', signal: 'NO OUTSOURCE' },
            { label: 'Focus', value: 'AI Growth System', signal: 'MKT, AI, WEB' },
        ],
    },
    peoplePanels: [
        {
            title: 'Marketing',
            tag: 'GOOGLE, META, FUNNELS',
            body: 'Paid advertising op Meta en Google, conversion funnels en leadgeneratiestrategie die high-intent prospects aantrekt.',
        },
        {
            title: 'AI Systems',
            tag: 'AUTOMATION, CRM, AGENTS',
            body: 'AI leadgeneratie, sales automation, marketing automation en integraties die CRM, ads en analytics verbinden tot één systeem.',
        },
        {
            title: 'Web Development',
            tag: 'SITES, LANDING, TRACKING',
            body: 'Conversion websites, high-performance landing pages en trackinginfrastructuur die verkeer omzetten in meetbare leads.',
        },
    ],
    behind: {
        documentary: 'DOCUMENTARY',
        chapter: 'CHAPTER',
        chapterNumber: '01',
        titlePre: 'Achter de',
        titleHighlight: 'Systemen',
        bodyParts: {
            intro: 'Vastgelegd in Amsterdam. Dezelfde ',
            marketing: 'Marketing',
            connectorOne: ', ',
            aiSystems: 'AI Systems',
            connectorTwo: ', en ',
            webDevelopment: 'Web Development',
            outro: ' teams die je ziet in Our services, scene voor scene verkend.',
        },
        pills: ['MARKETING', 'AI SYSTEMS', 'WEB'],
        aiCam: 'AI CAM',
        ukonnectOs: 'UKONNECT OS',
        sceneReader: 'SCENE READER',
        live: 'LIVE',
        liveLoop: 'LIVE LOOP',
        capturedInAmsterdam: 'CAPTURED IN AMSTERDAM',
        sceneLabel: 'SCENE',
        sceneCountTemplate: '{current} VAN {total}',
    },
    scenes: [
        {
            title: 'Build review aan het bureau',
            label: 'AI Systems',
            detail: 'Integraties, CRM-syncs en agent workflows worden aan het bureau beoordeeld voordat automatisering live gaat in een klantomgeving.',
            note: 'Dezelfde AI Systems-capaciteit uit Our services: logica valideren, edge cases routeren en workflows tunen terwijl dashboards live signalen tonen.',
            tagline: 'AI SYSTEMS, WORKFLOWS, CRM',
            alt: 'Ukonnect team dat AI-integraties en automation workflows aan een bureau reviewt',
        },
        {
            title: 'De richting wordt in de ruimte uitgelijnd',
            label: 'Marketing',
            detail: 'Google Ads, Meta-campagnes en funnelstrategie worden in één ruimte afgestemd voordat creative, budget en targeting verdergaan.',
            note: 'Marketing delivery in de praktijk: paid advertising, conversion funnels en leadgeneratiestrategie worden samen besloten, niet in silo’s.',
            tagline: 'MARKETING, PAID ADS, FUNNELS',
            alt: 'Ukonnect marketingteam dat campagnerichting bespreekt rond een boardroomtafel',
        },
        {
            title: 'De sprint krijgt vorm voordat de sprint start',
            label: 'Funnel planning',
            detail: 'Landing page-structuur, conversiepaden en campagneprioriteiten worden vastgezet voordat web build en paid media samen live gaan.',
            note: 'Waar Marketing en Web Development samenkomen: funnels, messaging en page architecture gepland als één verbonden systeem.',
            tagline: 'FUNNELS, LANDING PAGES, STRATEGY',
            alt: 'Ukonnect team dat conversion funnels en landing pages plant rond een laptop en whiteboard',
        },
        {
            title: 'Vragen worden voor het systeem opgelost',
            label: 'Web delivery',
            detail: 'Conversion websites, tracking setup en landing page performance worden live met de klant beoordeeld vóór de launch.',
            note: 'Web Development in de ruimte: sites, analytics en conversiebeslissingen worden opgelost voor de echte build, niet voor een slide deck.',
            tagline: 'WEB, TRACKING, CONVERSION',
            alt: 'Ukonnect webteam dat een conversion site en tracking setup presenteert in een workshop',
        },
    ],
    journeyHeading: {
        eyebrow: 'How We Work',
        title: 'Een interactieve reis, geen statische tijdlijn.',
        subtitle: 'Vijf deliveryfases over Marketing, AI Systems en Web Development in één console.',
    },
    journeyChrome: {
        consoleLabel: 'UKONNECT GROWTH ENGINE',
        liveNode: 'LIVE NODE',
        aiRender: '16:10 AI RENDER',
        phaseLabelTemplate: 'PHASE {index}',
        teamPrefix: 'Team',
        eachPhaseNote: 'Elke fase verbindt Marketing, AI Systems en Web Development binnen één growth engine.',
        viewAriaPrefix: 'Bekijk',
        imageAltPrefix: 'Ukonnect team',
    },
    journey: [
        { title: 'Discover', micro: 'Lead gen-audit + mapping van groeistrategie', tag: 'SCAN' },
        { title: 'Design', micro: 'AI-systeemarchitectuur + conversion UX blueprint', tag: 'BLUEPRINT' },
        { title: 'Build', micro: 'Sites, automations, CRM-integraties + QA', tag: 'COMPILE' },
        { title: 'Launch', micro: 'Campagne-uitrol, site launch + tracking live', tag: 'DEPLOY' },
        { title: 'Scale', micro: 'Performance-optimalisatie + pipeline growth loops', tag: 'MULTIPLY' },
    ],
    officeHeading: {
        eyebrow: 'Office Experience',
        title: 'Een redactioneel beeld van waar systemen worden gebouwd.',
        subtitle: 'Vijf studioruimtes gekoppeld aan delivery in Marketing, AI Systems en Web Development.',
    },
    officeChrome: {
        configuratorLabel: 'STUDIO CONFIGURATOR',
        floorMapLabel: 'Amsterdam, Live floor map',
        selectRoom: 'SELECT ROOM',
        exploreAriaPrefix: 'Verken',
        roomLabelPrefix: 'ROOM',
        countTemplate: '{current} / {total}',
        floorPlanAlt: 'Ukonnect studio floor plan',
        floatingCardAltPrefix: 'Ukonnect',
        dockCardAltSeparator: ', ',
        teamPrefix: 'TEAM',
    },
    rooms: [
        { title: 'AI Lab', blurb: 'AI Systems: automatisering, agents en CRM-workflows.' },
        { title: 'Strategy Room', blurb: 'Marketing: paid ads, funnels en leadgenstrategie.' },
        { title: 'Creative Studio', blurb: 'Web Development: conversion sites en landing pages.' },
        { title: 'Automation Hub', blurb: 'AI-integraties en workflows die in productie worden gemonitord.' },
        { title: 'Client Success', blurb: 'Reviews voor performance-optimalisatie en pipelinegroei.' },
    ],
    cultureHeading: {
        eyebrow: 'Culture',
        title: 'Ownership, innovatie, executie, nieuwsgierigheid, groei.',
        subtitle: 'Vijf waarden, één redactionele wand. Hover op elk frame om te lezen hoe het zichtbaar wordt in het werk.',
    },
    cultureChrome: {
        wayLabel: 'THE UKONNECT WAY',
        wayNote: 'Geen poster aan de muur. Zo werkt de studio echt, elke dag.',
        imageAltPrefix: 'Ukonnect cultuur',
    },
    culture: [
        {
            title: 'Ownership',
            label: 'Deep work',
            detail: 'Iedereen bezit outcomes van begin tot eind, niet tickets die in een wachtrij blijven staan.',
            note: 'Verantwoordelijkheid die zichtbaar wordt in de ruimte tijdens gefocuste buildsessies, niet op een slide.',
        },
        {
            title: 'Innovatie',
            label: 'Momentum',
            detail: 'Nieuwe ideeën worden getest tegen productiestandaarden, niet tegen pitchdecks.',
            note: 'De energie in de studio wanneer experimenten snel bewegen en toch echte operaties overleven.',
        },
        {
            title: 'Execution',
            label: 'Alignment',
            detail: 'Richting wordt in de ruimte opgelost voordat executie begint te fragmenteren.',
            note: 'Een werkmeeting met nabijheid en oogcontact die open voelt, niet performatief.',
        },
        {
            title: 'Curiosity',
            label: 'Mentorship',
            detail: 'Kennis beweegt horizontaal door het team, niet alleen top-down.',
            note: 'Momenten van side-by-side review waarin vragen welkom zijn, recht voor het systeem.',
        },
        {
            title: 'Growth',
            label: 'Together',
            detail: 'Vooruitgang is een teamritme: strategie, build en delivery in één operationeel tempo.',
            note: 'Een bedrijfsportret dat cultuur laat zien als bewijs van een echt team in beweging.',
        },
    ],
    leadershipHeading: {
        eyebrow: 'Leadership',
        title: 'Gebouwd om trends te overleven.',
        subtitle: 'Een founder manifest in één redactioneel paneel: portret, overtuiging en operating pillars.',
    },
    leadership: {
        founderLabel: 'FOUNDER',
        founderName: 'Raffy',
        companyLabel: 'UKONNECT',
        companyLine: 'Marketing, AI Systems, Web',
        portraitAlt: 'Raffy, Ukonnect leadership',
        statementLabel: 'FOUNDER STATEMENT',
        headlinePre: 'Wij bouwen systemen voor de lange termijn,',
        headlineHighlight: 'geen hype voor de korte termijn.',
        quote: 'Maak van AI een betrouwbaar groeivoordeel voor echte bedrijven, met helderheid, vakmanschap en verantwoordelijkheid.',
        pillars: [
            {
                title: 'Marketing',
                body: 'Paid advertising, conversion funnels en leadgeneratiestrategie die de pipeline vullen met high-intent prospects.',
            },
            {
                title: 'AI Systems',
                body: 'AI-automatisering, CRM-integraties en agent workflows die leads kwalificeren en prospects dag en nacht nurturen.',
            },
            {
                title: 'Web Development',
                body: 'Conversion websites, landing pages en tracking setup die verkeer omzetten in meetbare leads en attributie.',
            },
        ],
        openFormAria: 'Open strategy call form',
    },
    cta: {
        eyebrow: 'Strategy session',
        titlePre: 'Laten we jouw volgende',
        titleHighlight: 'AI Growth System bouwen.',
    },
};

const pt: CompanyStoryCopy = {
    opening: {
        liveEyebrow: 'Construído por pessoas. Potenciado por AI.',
        titlePre: 'As pessoas por trás',
        titleHighlight: 'dos sistemas.',
        bodyParts: {
            intro: 'A equipa in-house por trás do seu AI Growth System.',
            marketing: 'Marketing',
            connectorOne: ', ',
            aiSystems: 'AI Systems',
            connectorTwo: ', e ',
            webDevelopment: 'Web Development',
            outro: ' entregue sob o mesmo teto, da estratégia à automação até ao crescimento mensurável do pipeline.',
        },
        pills: ['MARKETING', 'AI SYSTEMS', 'WEB'],
        amsterdamBadge: 'AMSTERDAM',
        amsterdamNote: 'Filmado durante live build cycles no studio floor. Prova de como a Ukonnect entrega, não de como faz pitch.',
        documentaryOpening: 'DOCUMENTARY OPENING',
        captionBadge1: 'DOCUMENTARY 00',
        captionBadge2: 'LIVE PORTRAIT',
        captionTitlePre: 'Operators +',
        captionTitleHighlight: 'inteligência.',
        captionBody: 'Marketing, AI Systems e Web Development. Uma equipa in-house por trás do seu motor de crescimento conectado.',
        studioFloor: 'STUDIO FLOOR',
        liveBuildCyclesNote: 'Captado no studio floor durante live build cycles. Prova de como a Ukonnect entrega, não de como faz pitch.',
        teamAlt: 'A equipa Ukonnect, junta',
    },
    trust: {
        signalsLabel: 'TRUST SIGNALS',
        items: [
            { label: 'Base em', value: 'Amsterdam', signal: 'NL HQ' },
            { label: 'Entrega', value: 'Equipa in-house', signal: 'NO OUTSOURCE' },
            { label: 'Foco', value: 'AI Growth System', signal: 'MKT, AI, WEB' },
        ],
    },
    peoplePanels: [
        {
            title: 'Marketing',
            tag: 'GOOGLE, META, FUNNELS',
            body: 'Paid advertising no Meta e no Google, conversion funnels, e estratégia de lead generation que atrai prospects com alta intenção.',
        },
        {
            title: 'AI Systems',
            tag: 'AUTOMATION, CRM, AGENTS',
            body: 'AI lead generation, sales automation, marketing automation e integrações que ligam CRM, ads e analytics num só sistema.',
        },
        {
            title: 'Web Development',
            tag: 'SITES, LANDING, TRACKING',
            body: 'Websites de conversão, landing pages de alta performance e infraestrutura de tracking que transformam tráfego em leads mensuráveis.',
        },
    ],
    behind: {
        documentary: 'DOCUMENTARY',
        chapter: 'CHAPTER',
        chapterNumber: '01',
        titlePre: 'Por trás dos',
        titleHighlight: 'Sistemas',
        bodyParts: {
            intro: 'Captado em Amsterdam. As mesmas equipas de ',
            marketing: 'Marketing',
            connectorOne: ', ',
            aiSystems: 'AI Systems',
            connectorTwo: ', e ',
            webDevelopment: 'Web Development',
            outro: ' que vê em Our services, exploradas cena a cena.',
        },
        pills: ['MARKETING', 'AI SYSTEMS', 'WEB'],
        aiCam: 'AI CAM',
        ukonnectOs: 'UKONNECT OS',
        sceneReader: 'SCENE READER',
        live: 'LIVE',
        liveLoop: 'LIVE LOOP',
        capturedInAmsterdam: 'CAPTURED IN AMSTERDAM',
        sceneLabel: 'SCENE',
        sceneCountTemplate: '{current} DE {total}',
    },
    scenes: [
        {
            title: 'Revisão de build ao lado da secretária',
            label: 'AI Systems',
            detail: 'Integrações, sincronizações de CRM e agent workflows revistos na secretária antes de a automação entrar em produção no ambiente do cliente.',
            note: 'A mesma capacidade de AI Systems de Our services: validar lógica, tratar edge cases e afinar workflows enquanto os dashboards mostram sinal ao vivo.',
            tagline: 'AI SYSTEMS, WORKFLOWS, CRM',
            alt: 'Equipa Ukonnect a rever integrações de AI e workflows de automação numa secretária',
        },
        {
            title: 'A direção alinha-se dentro da sala',
            label: 'Marketing',
            detail: 'Google Ads, campanhas Meta e estratégia de funnel alinhadas numa só sala antes de avançarem criativo, orçamento e targeting.',
            note: 'Marketing delivery na prática: paid advertising, conversion funnels e estratégia de lead generation decididas em conjunto, não em silos.',
            tagline: 'MARKETING, PAID ADS, FUNNELS',
            alt: 'Equipa de marketing da Ukonnect a rever direção de campanha em volta de uma mesa de boardroom',
        },
        {
            title: 'O sprint ganha forma antes de começar',
            label: 'Planeamento de funnel',
            detail: 'Estrutura de landing page, caminhos de conversão e prioridades de campanha fechados antes de o web build e os paid media arrancarem juntos.',
            note: 'Onde Marketing e Web Development se encontram: funnels, messaging e page architecture planeados como um sistema conectado.',
            tagline: 'FUNNELS, LANDING PAGES, STRATEGY',
            alt: 'Equipa Ukonnect a planear funnels de conversão e landing pages junto de um portátil e um quadro',
        },
        {
            title: 'As questões resolvem-se em frente ao sistema',
            label: 'Web delivery',
            detail: 'Websites de conversão, tracking setup e performance de landing pages revistos ao vivo com o cliente antes do lançamento.',
            note: 'Web Development na sala: sites, analytics e decisões de conversão resolvidas em frente ao build real, não a um slide deck.',
            tagline: 'WEB, TRACKING, CONVERSION',
            alt: 'Equipa web da Ukonnect a apresentar um site de conversão e tracking setup num workshop',
        },
    ],
    journeyHeading: {
        eyebrow: 'How We Work',
        title: 'Uma jornada interativa, não uma timeline estática.',
        subtitle: 'Cinco fases de entrega em Marketing, AI Systems e Web Development dentro de uma só consola.',
    },
    journeyChrome: {
        consoleLabel: 'UKONNECT GROWTH ENGINE',
        liveNode: 'LIVE NODE',
        aiRender: '16:10 AI RENDER',
        phaseLabelTemplate: 'PHASE {index}',
        teamPrefix: 'Equipa',
        eachPhaseNote: 'Cada fase liga Marketing, AI Systems e Web Development dentro de um só growth engine.',
        viewAriaPrefix: 'Ver',
        imageAltPrefix: 'Equipa Ukonnect',
    },
    journey: [
        { title: 'Discover', micro: 'Auditoria de lead gen + mapeamento da estratégia de crescimento', tag: 'SCAN' },
        { title: 'Design', micro: 'Arquitetura de sistema AI + blueprint de conversion UX', tag: 'BLUEPRINT' },
        { title: 'Build', micro: 'Sites, automations, integrações CRM + QA', tag: 'COMPILE' },
        { title: 'Launch', micro: 'Rollout de campanhas, lançamento do site + tracking live', tag: 'DEPLOY' },
        { title: 'Scale', micro: 'Otimização de performance + loops de crescimento do pipeline', tag: 'MULTIPLY' },
    ],
    officeHeading: {
        eyebrow: 'Office Experience',
        title: 'Uma perspetiva editorial de onde os sistemas são construídos.',
        subtitle: 'Cinco salas do estúdio mapeadas para a entrega de Marketing, AI Systems e Web Development.',
    },
    officeChrome: {
        configuratorLabel: 'STUDIO CONFIGURATOR',
        floorMapLabel: 'Amsterdam, Live floor map',
        selectRoom: 'SELECT ROOM',
        exploreAriaPrefix: 'Explorar',
        roomLabelPrefix: 'ROOM',
        countTemplate: '{current} / {total}',
        floorPlanAlt: 'Ukonnect studio floor plan',
        floatingCardAltPrefix: 'Ukonnect',
        dockCardAltSeparator: ', ',
        teamPrefix: 'TEAM',
    },
    rooms: [
        { title: 'AI Lab', blurb: 'AI Systems: automação, agents e workflows de CRM.' },
        { title: 'Strategy Room', blurb: 'Marketing: paid ads, funnels e estratégia de lead gen.' },
        { title: 'Creative Studio', blurb: 'Web Development: sites de conversão e landing pages.' },
        { title: 'Automation Hub', blurb: 'Integrações AI e workflows monitorizados em produção.' },
        { title: 'Client Success', blurb: 'Revisões de otimização de performance e crescimento de pipeline.' },
    ],
    cultureHeading: {
        eyebrow: 'Culture',
        title: 'Ownership, inovação, execução, curiosidade, crescimento.',
        subtitle: 'Cinco valores, uma parede editorial. Passe por qualquer frame para ler como aparece no trabalho.',
    },
    cultureChrome: {
        wayLabel: 'THE UKONNECT WAY',
        wayNote: 'Não é um poster na parede. É assim que o estúdio realmente opera, todos os dias.',
        imageAltPrefix: 'Cultura Ukonnect',
    },
    culture: [
        {
            title: 'Ownership',
            label: 'Deep work',
            detail: 'Toda a gente assume outcomes de ponta a ponta, não tickets à espera numa fila.',
            note: 'Responsabilidade visível na sala durante sessões de build focadas, não num slide.',
        },
        {
            title: 'Inovação',
            label: 'Momentum',
            detail: 'Novas ideias são testadas contra padrões de produção, não contra pitch decks.',
            note: 'A energia no estúdio quando as experiências avançam rápido e ainda assim sobrevivem à operação real.',
        },
        {
            title: 'Execução',
            label: 'Alignment',
            detail: 'A direção resolve-se na sala antes de a execução começar a fragmentar-se.',
            note: 'Uma reunião de trabalho com proximidade e contacto visual que soa honesta, não performativa.',
        },
        {
            title: 'Curiosidade',
            label: 'Mentorship',
            detail: 'O conhecimento move-se lateralmente pela equipa, não apenas de cima para baixo.',
            note: 'Momentos de revisão lado a lado em que as perguntas são bem-vindas diante do sistema.',
        },
        {
            title: 'Growth',
            label: 'Together',
            detail: 'O progresso é um ritmo de equipa: estratégia, build e entrega numa só cadência operacional.',
            note: 'Um retrato da empresa que funciona como prova de cultura de uma equipa real em movimento.',
        },
    ],
    leadershipHeading: {
        eyebrow: 'Leadership',
        title: 'Construído para durar para além das tendências.',
        subtitle: 'Um manifesto do fundador dentro de um painel editorial: retrato, convicção e pilares operacionais.',
    },
    leadership: {
        founderLabel: 'FOUNDER',
        founderName: 'Raffy',
        companyLabel: 'UKONNECT',
        companyLine: 'Marketing, AI Systems, Web',
        portraitAlt: 'Raffy, Ukonnect leadership',
        statementLabel: 'FOUNDER STATEMENT',
        headlinePre: 'Construímos sistemas de longo prazo,',
        headlineHighlight: 'não hype de curto prazo.',
        quote: 'Transformar AI numa vantagem de crescimento fiável para empresas reais, com clareza, craft e accountability.',
        pillars: [
            {
                title: 'Marketing',
                body: 'Paid advertising, conversion funnels e estratégia de lead generation que enchem o pipeline com prospects de alta intenção.',
            },
            {
                title: 'AI Systems',
                body: 'Automação com AI, integrações CRM e agent workflows que qualificam leads e nutrem prospects continuamente.',
            },
            {
                title: 'Web Development',
                body: 'Websites de conversão, landing pages e tracking setup que transformam tráfego em leads mensuráveis e atribuição.',
            },
        ],
        openFormAria: 'Open strategy call form',
    },
    cta: {
        eyebrow: 'Strategy session',
        titlePre: 'Vamos construir o seu próximo',
        titleHighlight: 'AI Growth System.',
    },
};

const id: CompanyStoryCopy = {
    opening: {
        liveEyebrow: 'Dibangun oleh manusia. Diperkuat oleh AI.',
        titlePre: 'Orang-orang di balik',
        titleHighlight: 'sistem.',
        bodyParts: {
            intro: 'Tim in-house di balik AI Growth System Anda.',
            marketing: 'Marketing',
            connectorOne: ', ',
            aiSystems: 'AI Systems',
            connectorTwo: ', dan ',
            webDevelopment: 'Web Development',
            outro: ' yang dikirim di bawah satu atap, dari strategi lewat automasi hingga pertumbuhan pipeline yang terukur.',
        },
        pills: ['MARKETING', 'AI SYSTEMS', 'WEB'],
        amsterdamBadge: 'AMSTERDAM',
        amsterdamNote: 'Direkam selama live build cycles di studio floor. Bukti cara Ukonnect mengirimkan hasil, bukan cara kami pitching.',
        documentaryOpening: 'DOCUMENTARY OPENING',
        captionBadge1: 'DOCUMENTARY 00',
        captionBadge2: 'LIVE PORTRAIT',
        captionTitlePre: 'Operators +',
        captionTitleHighlight: 'inteligensi.',
        captionBody: 'Marketing, AI Systems, dan Web Development. Satu tim in-house di balik growth engine Anda yang terhubung.',
        studioFloor: 'STUDIO FLOOR',
        liveBuildCyclesNote: 'Diambil di studio floor selama live build cycles. Bukti cara Ukonnect mengirimkan hasil, bukan cara kami pitching.',
        teamAlt: 'Tim Ukonnect, bersama',
    },
    trust: {
        signalsLabel: 'TRUST SIGNALS',
        items: [
            { label: 'Berbasis di', value: 'Amsterdam', signal: 'NL HQ' },
            { label: 'Delivery', value: 'Tim in-house', signal: 'NO OUTSOURCE' },
            { label: 'Fokus', value: 'AI Growth System', signal: 'MKT, AI, WEB' },
        ],
    },
    peoplePanels: [
        {
            title: 'Marketing',
            tag: 'GOOGLE, META, FUNNELS',
            body: 'Paid advertising di Meta dan Google, conversion funnels, dan strategi lead generation yang menarik prospect dengan intent tinggi.',
        },
        {
            title: 'AI Systems',
            tag: 'AUTOMATION, CRM, AGENTS',
            body: 'AI lead generation, sales automation, marketing automation, dan integrasi yang menghubungkan CRM, ads, dan analytics menjadi satu sistem.',
        },
        {
            title: 'Web Development',
            tag: 'SITES, LANDING, TRACKING',
            body: 'Website konversi, landing page berperforma tinggi, dan infrastruktur tracking yang mengubah traffic menjadi lead yang terukur.',
        },
    ],
    behind: {
        documentary: 'DOCUMENTARY',
        chapter: 'CHAPTER',
        chapterNumber: '01',
        titlePre: 'Di balik',
        titleHighlight: 'Sistem',
        bodyParts: {
            intro: 'Diambil di Amsterdam. Tim ',
            marketing: 'Marketing',
            connectorOne: ', ',
            aiSystems: 'AI Systems',
            connectorTwo: ', dan ',
            webDevelopment: 'Web Development',
            outro: ' yang sama seperti di Our services, dijelajahi scene demi scene.',
        },
        pills: ['MARKETING', 'AI SYSTEMS', 'WEB'],
        aiCam: 'AI CAM',
        ukonnectOs: 'UKONNECT OS',
        sceneReader: 'SCENE READER',
        live: 'LIVE',
        liveLoop: 'LIVE LOOP',
        capturedInAmsterdam: 'CAPTURED IN AMSTERDAM',
        sceneLabel: 'SCENE',
        sceneCountTemplate: '{current} DARI {total}',
    },
    scenes: [
        {
            title: 'Review build di sisi meja',
            label: 'AI Systems',
            detail: 'Integrasi, sinkronisasi CRM, dan agent workflows ditinjau di meja sebelum automasi live di environment klien.',
            note: 'Kapabilitas AI Systems yang sama dari Our services: memvalidasi logika, menangani edge case, dan menyetel workflow saat dashboard menampilkan sinyal live.',
            tagline: 'AI SYSTEMS, WORKFLOWS, CRM',
            alt: 'Tim Ukonnect meninjau integrasi AI dan workflow automasi di sebuah meja',
        },
        {
            title: 'Arah diselaraskan di dalam ruangan',
            label: 'Marketing',
            detail: 'Google Ads, kampanye Meta, dan strategi funnel disejajarkan di satu ruangan sebelum creative, budget, dan targeting bergerak maju.',
            note: 'Marketing delivery dalam praktik: paid advertising, conversion funnels, dan strategi lead generation diputuskan bersama, bukan dalam silo.',
            tagline: 'MARKETING, PAID ADS, FUNNELS',
            alt: 'Tim marketing Ukonnect meninjau arah kampanye di sekitar meja boardroom',
        },
        {
            title: 'Sprint terbentuk sebelum sprint dimulai',
            label: 'Perencanaan funnel',
            detail: 'Struktur landing page, jalur konversi, dan prioritas kampanye dikunci sebelum web build dan paid media launch bersama.',
            note: 'Tempat Marketing dan Web Development bertemu: funnels, messaging, dan page architecture direncanakan sebagai satu sistem yang terhubung.',
            tagline: 'FUNNELS, LANDING PAGES, STRATEGY',
            alt: 'Tim Ukonnect merencanakan conversion funnels dan landing pages di sekitar laptop dan whiteboard',
        },
        {
            title: 'Pertanyaan diselesaikan di depan sistem',
            label: 'Web delivery',
            detail: 'Website konversi, tracking setup, dan performa landing page ditinjau live bersama klien sebelum launch.',
            note: 'Web Development di ruangan: site, analytics, dan keputusan konversi diselesaikan di depan build yang sebenarnya, bukan slide deck.',
            tagline: 'WEB, TRACKING, CONVERSION',
            alt: 'Tim web Ukonnect mempresentasikan site konversi dan tracking setup dalam workshop',
        },
    ],
    journeyHeading: {
        eyebrow: 'How We Work',
        title: 'Perjalanan interaktif, bukan timeline statis.',
        subtitle: 'Lima fase delivery lintas Marketing, AI Systems, dan Web Development di dalam satu console.',
    },
    journeyChrome: {
        consoleLabel: 'UKONNECT GROWTH ENGINE',
        liveNode: 'LIVE NODE',
        aiRender: '16:10 AI RENDER',
        phaseLabelTemplate: 'PHASE {index}',
        teamPrefix: 'Team',
        eachPhaseNote: 'Setiap fase menghubungkan Marketing, AI Systems, dan Web Development di dalam satu growth engine.',
        viewAriaPrefix: 'Lihat',
        imageAltPrefix: 'Tim Ukonnect',
    },
    journey: [
        { title: 'Discover', micro: 'Audit lead gen + pemetaan strategi pertumbuhan', tag: 'SCAN' },
        { title: 'Design', micro: 'Arsitektur sistem AI + blueprint conversion UX', tag: 'BLUEPRINT' },
        { title: 'Build', micro: 'Site, automations, integrasi CRM + QA', tag: 'COMPILE' },
        { title: 'Launch', micro: 'Rollout kampanye, site launch + tracking live', tag: 'DEPLOY' },
        { title: 'Scale', micro: 'Optimasi performa + loop pertumbuhan pipeline', tag: 'MULTIPLY' },
    ],
    officeHeading: {
        eyebrow: 'Office Experience',
        title: 'Pandangan editorial tentang tempat sistem dibangun.',
        subtitle: 'Lima ruang studio yang dipetakan ke delivery Marketing, AI Systems, dan Web Development.',
    },
    officeChrome: {
        configuratorLabel: 'STUDIO CONFIGURATOR',
        floorMapLabel: 'Amsterdam, Live floor map',
        selectRoom: 'SELECT ROOM',
        exploreAriaPrefix: 'Jelajahi',
        roomLabelPrefix: 'ROOM',
        countTemplate: '{current} / {total}',
        floorPlanAlt: 'Ukonnect studio floor plan',
        floatingCardAltPrefix: 'Ukonnect',
        dockCardAltSeparator: ', ',
        teamPrefix: 'TEAM',
    },
    rooms: [
        { title: 'AI Lab', blurb: 'AI Systems: automasi, agents, dan workflow CRM.' },
        { title: 'Strategy Room', blurb: 'Marketing: paid ads, funnels, dan strategi lead gen.' },
        { title: 'Creative Studio', blurb: 'Web Development: site konversi dan landing pages.' },
        { title: 'Automation Hub', blurb: 'Integrasi AI dan workflows yang dimonitor di production.' },
        { title: 'Client Success', blurb: 'Review optimasi performa dan pertumbuhan pipeline.' },
    ],
    cultureHeading: {
        eyebrow: 'Culture',
        title: 'Ownership, inovasi, eksekusi, rasa ingin tahu, pertumbuhan.',
        subtitle: 'Lima nilai, satu dinding editorial. Hover frame mana saja untuk membaca bagaimana itu muncul dalam pekerjaan.',
    },
    cultureChrome: {
        wayLabel: 'THE UKONNECT WAY',
        wayNote: 'Bukan poster di dinding. Inilah cara studio benar-benar beroperasi, setiap hari.',
        imageAltPrefix: 'Budaya Ukonnect',
    },
    culture: [
        {
            title: 'Ownership',
            label: 'Deep work',
            detail: 'Setiap orang memiliki outcome dari awal sampai akhir, bukan tiket yang menunggu di antrean.',
            note: 'Akuntabilitas yang terlihat di ruangan selama sesi build yang fokus, bukan di slide.',
        },
        {
            title: 'Inovasi',
            label: 'Momentum',
            detail: 'Ide baru diuji terhadap standar production, bukan pitch deck.',
            note: 'Energi di studio ketika eksperimen bergerak cepat, tetapi tetap bertahan dalam operasi nyata.',
        },
        {
            title: 'Eksekusi',
            label: 'Alignment',
            detail: 'Arah diselesaikan di ruangan sebelum eksekusi mulai terpecah.',
            note: 'Meeting kerja dengan kedekatan dan kontak mata yang terasa jujur, bukan performatif.',
        },
        {
            title: 'Curiosity',
            label: 'Mentorship',
            detail: 'Pengetahuan bergerak menyamping di seluruh tim, bukan hanya dari atas ke bawah.',
            note: 'Momen review berdampingan, ketika pertanyaan disambut di depan sistem.',
        },
        {
            title: 'Growth',
            label: 'Together',
            detail: 'Kemajuan adalah ritme tim: strategi, build, dan delivery dalam satu cadence operasional.',
            note: 'Potret perusahaan yang terbaca sebagai bukti budaya dari tim nyata yang sedang bergerak.',
        },
    ],
    leadershipHeading: {
        eyebrow: 'Leadership',
        title: 'Dibangun untuk melampaui tren.',
        subtitle: 'Manifesto founder di dalam satu panel editorial: potret, keyakinan, dan operating pillars.',
    },
    leadership: {
        founderLabel: 'FOUNDER',
        founderName: 'Raffy',
        companyLabel: 'UKONNECT',
        companyLine: 'Marketing, AI Systems, Web',
        portraitAlt: 'Raffy, Ukonnect leadership',
        statementLabel: 'FOUNDER STATEMENT',
        headlinePre: 'Kami membangun sistem jangka panjang,',
        headlineHighlight: 'bukan hype jangka pendek.',
        quote: 'Ubah AI menjadi keunggulan pertumbuhan yang andal untuk bisnis nyata, dengan kejelasan, craftsmanship, dan accountability.',
        pillars: [
            {
                title: 'Marketing',
                body: 'Paid advertising, conversion funnels, dan strategi lead generation yang mengisi pipeline dengan prospect berintent tinggi.',
            },
            {
                title: 'AI Systems',
                body: 'Automasi AI, integrasi CRM, dan agent workflows yang mengkualifikasi lead dan menumbuhkan prospect sepanjang waktu.',
            },
            {
                title: 'Web Development',
                body: 'Website konversi, landing pages, dan tracking setup yang mengubah traffic menjadi lead dan attribution yang terukur.',
            },
        ],
        openFormAria: 'Open strategy call form',
    },
    cta: {
        eyebrow: 'Strategy session',
        titlePre: 'Mari bangun',
        titleHighlight: 'AI Growth System Anda berikutnya.',
    },
};

const LOCALES: Record<Language, CompanyStoryCopy> = { en, nl, pt, id };

export function getCompanyStoryCopy(lang: Language): CompanyStoryCopy {
    return LOCALES[lang] ?? LOCALES.en;
}
