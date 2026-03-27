import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Globe, ChevronDown, Mail } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const JOBS = [
    {
        title: 'Google Specialist',
        location: 'Remote',
        remote: true,
        description: {
            en: `We're looking for a results-driven Google Specialist to manage and optimise paid search campaigns for our real estate clients across the Netherlands, Belgium, and Portugal. You'll take full ownership of keyword strategy, bid management, ad copy, landing page alignment, and continuous performance analysis — all with the goal of generating high-quality, qualified leads for real estate agencies.

You'll work closely with our AI and marketing teams to integrate Google Ads data into our broader growth systems, helping clients get the most out of every euro spent.

What you'll do:
• Build, manage, and optimise Google Search and Display campaigns for multiple real estate clients
• Conduct in-depth keyword research and competitive analysis
• Write and A/B test ad copy to improve CTR and conversion rates
• Monitor and report on performance metrics (CPC, CPL, ROAS)
• Collaborate with our AI team to improve lead quality through smart targeting

What we expect:
• 2+ years of hands-on Google Ads experience, preferably in lead generation
• Strong analytical skills and comfort with data tools (Google Analytics, Looker Studio)
• Experience with real estate or high-ticket service campaigns is a strong plus
• Ability to work independently, manage multiple accounts, and meet deadlines remotely`,

            nl: `We zoeken een resultaatgerichte Google Specialist om betaalde zoekcampagnes te beheren en te optimaliseren voor onze vastgoedklanten in Nederland, België en Portugal. Je bent volledig verantwoordelijk voor de zoekwoordstrategie, bodstrategie, advertentieteksten, landingspagina-afstemming en continue prestatieanalyse — allemaal gericht op het genereren van hoogwaardige leads voor vastgoedkantoren.

Je werkt nauw samen met ons AI- en marketingteam om Google Ads-data te integreren in onze bredere groeisystemen, zodat klanten het maximale uit elk besteed euro halen.

Wat je gaat doen:
• Bouwen, beheren en optimaliseren van Google Search- en Displaycampagnes voor meerdere vastgoedklanten
• Uitvoeren van diepgaand zoekwoordonderzoek en concurrentieanalyse
• Schrijven en A/B-testen van advertentieteksten om CTR en conversies te verbeteren
• Monitoren en rapporteren van prestatie-indicatoren (CPC, CPL, ROAS)
• Samenwerken met ons AI-team om leadkwaliteit te verbeteren via slimme targeting

Wat wij verwachten:
• 2+ jaar praktijkervaring met Google Ads, bij voorkeur in leadgeneratie
• Sterke analytische vaardigheden en ervaring met data tools (Google Analytics, Looker Studio)
• Ervaring met vastgoed- of high-ticket servicecampagnes is een groot pluspunt
• Vermogen om zelfstandig te werken, meerdere accounts te beheren en deadlines te halen`,

            pt: `Procuramos um Google Specialist orientado para resultados para gerir e otimizar campanhas de pesquisa paga para os nossos clientes imobiliários nos Países Baixos, Bélgica e Portugal. Terás total responsabilidade pela estratégia de palavras-chave, gestão de lances, textos de anúncio, alinhamento de landing pages e análise contínua de desempenho — tudo com o objetivo de gerar leads qualificadas de alta qualidade para agências imobiliárias.

Trabalharás em estreita colaboração com as nossas equipas de IA e marketing para integrar dados do Google Ads nos nossos sistemas de crescimento, ajudando os clientes a tirar o máximo partido de cada euro investido.

O que vais fazer:
• Criar, gerir e otimizar campanhas Google Search e Display para múltiplos clientes imobiliários
• Realizar pesquisa aprofundada de palavras-chave e análise competitiva
• Escrever e testar A/B de textos publicitários para melhorar CTR e conversões
• Monitorizar e reportar métricas de desempenho (CPC, CPL, ROAS)
• Colaborar com a nossa equipa de IA para melhorar a qualidade dos leads através de targeting inteligente

O que esperamos:
• 2+ anos de experiência prática com Google Ads, de preferência em geração de leads
• Fortes competências analíticas e à vontade com ferramentas de dados (Google Analytics, Looker Studio)
• Experiência com campanhas imobiliárias ou de serviços de alto valor é uma grande vantagem
• Capacidade de trabalhar de forma autónoma, gerir múltiplas contas e cumprir prazos remotamente`,
        },
    },
    {
        title: 'Accountmanager',
        location: 'Lisbon, Portugal',
        remote: false,
        description: {
            en: `As an Accountmanager based in Lisbon, you'll be the primary point of contact for our Portuguese-speaking real estate clients. You'll guide new clients through onboarding, ensure their campaigns are delivering results, and proactively identify growth opportunities within existing accounts. You'll also play a key role in expanding our presence in the Portuguese market.

This is a client-facing, relationship-driven role. You need to be organised, communicative, and genuinely excited about helping real estate businesses grow through AI and marketing automation.

What you'll do:
• Onboard new clients and ensure a smooth start to their campaigns
• Conduct regular check-ins and performance reviews with clients
• Identify upsell and cross-sell opportunities within your account portfolio
• Collaborate with the marketing and AI teams to flag client needs and resolve issues
• Serve as the bridge between clients and our internal delivery team

What we expect:
• 2+ years in account management, client success, or B2B sales
• Fluent in Portuguese and English (Spanish is a plus)
• Strong communication, organisational, and problem-solving skills
• Based in or near Lisbon
• Affinity with digital marketing, AI, or the real estate sector is a strong advantage`,

            nl: `Als Accountmanager in Lissabon ben je het eerste aanspreekpunt voor onze Portugeestalige vastgoedklanten. Je begeleidt nieuwe klanten tijdens het onboarding-proces, zorgt dat hun campagnes resultaten opleveren en identificeert proactief groeikansen binnen bestaande accounts. Daarnaast speel je een sleutelrol in de verdere uitbreiding van onze aanwezigheid op de Portugese markt.

Dit is een klantgerichte, relatieopbouwende rol. Je bent georganiseerd, communicatief sterk en oprecht enthousiast over het helpen van vastgoedbedrijven groeien via AI en marketingautomatisering.

Wat je gaat doen:
• Nieuwe klanten onboarden en zorgen voor een vliegende start van hun campagnes
• Regelmatige check-ins en prestatiebesprekingen houden met klanten
• Upsell- en cross-sell-kansen identificeren binnen je accountportfolio
• Samenwerken met marketing- en AI-teams om klantbehoeften te signaleren en problemen op te lossen
• Fungeren als brug tussen klanten en ons interne delivery team

Wat wij verwachten:
• 2+ jaar ervaring in accountmanagement, klantsucces of B2B-sales
• Vloeiend in Portugees en Engels (Spaans is een pluspunt)
• Sterke communicatieve, organisatorische en probleemoplossende vaardigheden
• Woonachtig in of nabij Lissabon
• Affiniteit met digitale marketing, AI of de vastgoedsector is een groot voordeel`,

            pt: `Como Accountmanager em Lisboa, serás o principal ponto de contacto para os nossos clientes imobiliários de língua portuguesa. Vais guiar novos clientes pelo processo de integração, garantir que as suas campanhas estão a gerar resultados e identificar proativamente oportunidades de crescimento nas contas existentes. Terás também um papel fundamental na expansão da nossa presença no mercado português.

Este é um cargo orientado para o cliente e para o relacionamento. Precisas de ser organizado, comunicativo e genuinamente entusiasmado com o crescimento de negócios imobiliários através de IA e automatização de marketing.

O que vais fazer:
• Integrar novos clientes e garantir um arranque sem problemas das suas campanhas
• Realizar check-ins regulares e revisões de desempenho com os clientes
• Identificar oportunidades de upsell e cross-sell dentro do teu portefólio de contas
• Colaborar com as equipas de marketing e IA para sinalizar necessidades dos clientes e resolver problemas
• Servir de ponte entre os clientes e a nossa equipa interna de entrega

O que esperamos:
• 2+ anos em gestão de contas, sucesso do cliente ou vendas B2B
• Fluente em português e inglês (espanhol é uma vantagem)
• Fortes competências de comunicação, organização e resolução de problemas
• Residir em Lisboa ou nas proximidades
• Afinidade com marketing digital, IA ou o setor imobiliário é uma grande vantagem`,
        },
    },
    {
        title: 'Appointment Setter',
        location: 'Amsterdam, Netherlands',
        remote: false,
        description: {
            en: `We're looking for a motivated and persistent Appointment Setter based in Amsterdam to reach out to real estate professionals — agents, brokers, and agency owners — and schedule discovery calls for our sales team. You'll be on the front lines of our growth in the Dutch market, playing a crucial role in filling our pipeline with high-quality prospects.

This role is perfect for someone who thrives in a fast-paced environment, is comfortable with outbound outreach, and is motivated by clear targets and results.

What you'll do:
• Conduct outbound outreach via phone, email, and LinkedIn to real estate professionals
• Qualify prospects and schedule discovery calls for the sales team
• Maintain and update CRM records with accurate contact and activity data
• Follow up consistently with leads who didn't respond initially
• Report daily on outreach volume, connect rates, and meetings booked

What we expect:
• Experience in outbound sales, telemarketing, or lead generation (1+ year preferred)
• Native or fluent Dutch speaker; English is a plus
• Resilient, target-driven, and comfortable with high outreach volumes
• Strong communication skills and a professional phone manner
• Based in or near Amsterdam`,

            nl: `We zoeken een gemotiveerde en doorzettende Appointment Setter in Amsterdam om vastgoedprofessionals — makelaars, bemiddelaars en eigenaren van vastgoedkantoren — te benaderen en kennismakingsgesprekken in te plannen voor ons salesteam. Je staat op de frontlinie van onze groei in de Nederlandse markt en speelt een cruciale rol in het vullen van onze pipeline met hoogwaardige prospects.

Deze rol is perfect voor iemand die gedijt in een snelle omgeving, comfortabel is met outbound acquisitie en gemotiveerd wordt door duidelijke doelen en resultaten.

Wat je gaat doen:
• Outbound acquisitie uitvoeren via telefoon, e-mail en LinkedIn gericht op vastgoedprofessionals
• Prospects kwalificeren en kennismakingsgesprekken inplannen voor het salesteam
• CRM-gegevens bijhouden en updaten met nauwkeurige contact- en activiteitsdata
• Consequent opvolgen van leads die in eerste instantie niet reageerden
• Dagelijks rapporteren over outreachvolume, verbindingspercentages en ingeplande afspraken

Wat wij verwachten:
• Ervaring in outbound sales, telemarketing of leadgeneratie (1+ jaar voorkeur)
• Moedertaal of vloeiend Nederlands; Engels is een pluspunt
• Veerkrachtig, resultaatgericht en comfortabel met hoge outreachvolumes
• Sterke communicatieve vaardigheden en professionele telefoonhouding
• Woonachtig in of nabij Amsterdam`,

            pt: `Procuramos um Appointment Setter motivado e persistente, baseado em Amesterdão, para contactar profissionais do imobiliário — agentes, mediadores e proprietários de agências — e agendar chamadas de descoberta para a nossa equipa de vendas. Estarás na linha da frente do nosso crescimento no mercado holandês, desempenhando um papel crucial no preenchimento do nosso pipeline com prospects de alta qualidade.

Esta função é perfeita para alguém que prospera num ambiente dinâmico, se sente confortável com prospeção outbound e é motivado por objetivos claros e resultados concretos.

O que vais fazer:
• Realizar prospeção outbound por telefone, email e LinkedIn junto de profissionais do imobiliário
• Qualificar prospects e agendar chamadas de descoberta para a equipa de vendas
• Manter e atualizar registos no CRM com dados precisos de contacto e atividade
• Fazer follow-up consistente com leads que não responderam inicialmente
• Reportar diariamente sobre volume de contactos, taxas de ligação e reuniões agendadas

O que esperamos:
• Experiência em vendas outbound, telemarketing ou geração de leads (preferência 1+ ano)
• Falante nativo ou fluente de neerlandês; inglês é uma vantagem
• Resiliente, orientado para objetivos e confortável com altos volumes de prospeção
• Fortes competências de comunicação e postura telefónica profissional
• Residir em Amesterdão ou nas proximidades`,
        },
    },
    {
        title: 'Meta Advertising Specialist',
        location: 'Remote',
        remote: true,
        description: {
            en: `Join us as a Meta Advertising Specialist and take full ownership of paid social campaigns across Facebook and Instagram for our real estate clients. You'll be responsible for creating, testing, and scaling ad campaigns that consistently generate qualified leads — and you'll have access to our AI infrastructure to make those campaigns smarter over time.

You'll work in a collaborative, remote-first team that values autonomy, creativity, and performance. Real estate advertising moves fast, and we need someone who can keep up.

What you'll do:
• Create and manage Meta Ads campaigns (awareness, lead gen, retargeting) for real estate clients
• Develop audience strategies using custom audiences, lookalikes, and interest targeting
• Write ad copy and brief creative assets that convert
• Continuously test creatives, audiences, and offers to improve CPL and lead quality
• Set up and maintain Meta Pixel, Conversions API, and attribution tracking
• Deliver regular performance reports with actionable insights

What we expect:
• 2+ years of experience running Meta Ads campaigns (Facebook & Instagram)
• Proven track record in lead generation campaigns, preferably in real estate or high-ticket services
• Strong copywriting skills and creative instinct
• Familiarity with Meta Business Suite, Events Manager, and attribution
• Ability to work independently in a fully remote environment`,

            nl: `Word onze Meta Advertising Specialist en neem volledige verantwoordelijkheid voor betaalde sociale campagnes op Facebook en Instagram voor onze vastgoedklanten. Je bent verantwoordelijk voor het creëren, testen en opschalen van advertentiecampagnes die consistent gekwalificeerde leads genereren — en je hebt toegang tot onze AI-infrastructuur om die campagnes steeds slimmer te maken.

Je werkt in een collaboratief, remote-first team dat autonomie, creativiteit en prestaties waardeert. Vastgoedadvertenties gaan snel, en wij zoeken iemand die dat tempo kan bijhouden.

Wat je gaat doen:
• Creëren en beheren van Meta Ads-campagnes (awareness, leadgen, retargeting) voor vastgoedklanten
• Ontwikkelen van doelgroepstrategieën met custom audiences, lookalikes en interest targeting
• Schrijven van advertentieteksten en briefen van creatieve assets die converteren
• Continu testen van creatieven, doelgroepen en aanbiedingen om CPL en leadkwaliteit te verbeteren
• Opzetten en onderhouden van Meta Pixel, Conversions API en attributietracking
• Leveren van regelmatige prestatierapporten met concrete inzichten

Wat wij verwachten:
• 2+ jaar ervaring met Meta Ads-campagnes (Facebook & Instagram)
• Bewezen track record in leadgeneratiecampagnes, bij voorkeur in vastgoed of high-ticket diensten
• Sterke copywriting vaardigheden en creatief instinct
• Bekendheid met Meta Business Suite, Events Manager en attributie
• Vermogen om zelfstandig te werken in een volledig remote omgeving`,

            pt: `Junta-te a nós como Meta Advertising Specialist e assume a responsabilidade total pelas campanhas de social pago no Facebook e Instagram para os nossos clientes imobiliários. Serás responsável por criar, testar e escalar campanhas publicitárias que geram consistentemente leads qualificadas — e terás acesso à nossa infraestrutura de IA para tornar essas campanhas cada vez mais inteligentes.

Trabalharás numa equipa colaborativa e remote-first que valoriza autonomia, criatividade e desempenho. A publicidade imobiliária move-se rápido, e precisamos de alguém que consiga acompanhar esse ritmo.

O que vais fazer:
• Criar e gerir campanhas Meta Ads (awareness, lead gen, retargeting) para clientes imobiliários
• Desenvolver estratégias de audiência usando custom audiences, lookalikes e interest targeting
• Escrever textos publicitários e fazer briefing de assets criativos que convertem
• Testar continuamente criativos, audiências e ofertas para melhorar CPL e qualidade dos leads
• Configurar e manter Meta Pixel, Conversions API e tracking de atribuição
• Entregar relatórios de desempenho regulares com insights acionáveis

O que esperamos:
• 2+ anos de experiência a gerir campanhas Meta Ads (Facebook & Instagram)
• Historial comprovado em campanhas de geração de leads, de preferência em imobiliário ou serviços de alto valor
• Fortes competências de copywriting e instinto criativo
• Familiaridade com Meta Business Suite, Events Manager e atribuição
• Capacidade de trabalhar de forma independente num ambiente totalmente remoto`,
        },
    },
];

export const Careers = () => {
    const { t, lang } = useLanguage();
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <>
            <section className="relative pt-36 pb-20 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none select-none">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle, rgba(86,0,227,0.07) 1px, transparent 1px)',
                        backgroundSize: '36px 36px',
                    }} />
                    <motion.div
                        animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.12, 1] }}
                        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute top-10 right-[10%] w-[500px] h-[500px] rounded-full"
                        style={{ background: 'radial-gradient(circle, rgba(86,0,227,0.10) 0%, transparent 68%)' }}
                    />
                </div>

                <div className="max-w-[1300px] mx-auto px-6 relative text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55 }}
                        className="inline-flex items-center gap-2 bg-primary/8 text-primary rounded-full px-4 py-2 text-sm font-semibold mb-6"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        {t('careers.heroLabel')}
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.12, duration: 0.65 }}
                        className="text-5xl md:text-6xl font-bold text-slate-900 leading-[1.06] mb-6"
                    >
                        {t('careers.heroHeading')}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.26, duration: 0.6 }}
                        className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto"
                    >
                        {t('careers.heroSub')}
                    </motion.p>
                </div>
            </section>

            <section className="py-[60px] md:py-[80px] max-w-[900px] mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl md:text-3xl font-bold text-slate-900 mb-10"
                >
                    {t('careers.openings')}
                </motion.h2>

                <div className="space-y-4">
                    {JOBS.map((job, i) => {
                        const isOpen = openIndex === i;
                        const desc = job.description[lang as keyof typeof job.description] ?? job.description.en;
                        return (
                            <motion.div
                                key={job.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.07, duration: 0.5 }}
                                className={`bg-white rounded-[1.5rem] border border-slate-200 overflow-hidden transition-shadow ${isOpen ? 'shadow-md' : 'shadow-sm hover:shadow-md'}`}
                            >
                                <div className="p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                                    <div className="flex flex-col gap-2">
                                        <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                                        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                                            <span className="flex items-center gap-1.5">
                                                {job.remote
                                                    ? <Globe className="w-3.5 h-3.5" />
                                                    : <MapPin className="w-3.5 h-3.5" />}
                                                {job.location}
                                            </span>
                                            <span className="w-1 h-1 rounded-full bg-slate-300" />
                                            <span className="text-primary font-medium">
                                                {job.remote ? t('careers.remote') : t('careers.fullTime')}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setOpenIndex(isOpen ? null : i)}
                                        className="flex items-center gap-2 px-6 py-2.5 border border-primary text-primary hover:bg-primary hover:text-white rounded-full text-sm font-semibold transition-all flex-shrink-0"
                                    >
                                        {isOpen ? t('careers.closeInfo') : t('careers.moreInfo')}
                                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                </div>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        >
                                            <div className="px-7 pb-7 border-t border-slate-100 pt-6">
                                                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line mb-6">
                                                    {desc}
                                                </p>
                                                <a
                                                    href={`mailto:info@ukonnect.nl?subject=Application: ${job.title}`}
                                                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-hover text-white rounded-full text-sm font-semibold transition-all hover:-translate-y-0.5 shadow-sm shadow-primary/20"
                                                >
                                                    <Mail className="w-4 h-4" />
                                                    {t('careers.applyEmail')}
                                                </a>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </section>
        </>
    );
};
