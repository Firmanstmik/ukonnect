/**
 * Case Study Experience — structured demo data.
 * Visual covers: AI-enhanced client project heroes (desktop + mobile).
 * Metrics/copy remain illustrative until founder verification.
 */

import coverJouwdroom from '../../assets/case-studies/case-study-jouwdroom-cover.webp';
import mobileJouwdroom from '../../assets/case-studies/case-study-jouwdroom-mobile.webp';
import coverAyat from '../../assets/case-studies/case-study-ayatfood-cover.webp';
import mobileAyat from '../../assets/case-studies/case-study-ayatfood-mobile.webp';
import coverKeuken from '../../assets/case-studies/case-study-keuken-cover.webp';
import mobileKeuken from '../../assets/case-studies/case-study-keuken-mobile.webp';

export const CASE_STUDY_DATA_PENDING_VERIFICATION = true;

export type CaseStudyMetric = {
    value: string;
    label: string;
};

export type CaseStudyGalleryItem = {
    id: string;
    type: 'hero' | 'desktop' | 'mobile' | 'dashboard' | 'analytics' | 'workflow';
    title: string;
    overlay: 'Illustrative Preview' | 'Placeholder Screenshot' | 'Demo Case Study';
    imageSrc: string;
    objectPosition?: string;
};

function buildCaseStudyGallery(
    cover: string,
    mobile: string,
    labels: {
        hero: string;
        desktop: string;
        mobile: string;
        dashboard: string;
        analytics: string;
        workflow: string;
    },
): CaseStudyGalleryItem[] {
    return [
        {
            id: 'hero',
            type: 'hero',
            title: labels.hero,
            overlay: 'Illustrative Preview',
            imageSrc: cover,
            objectPosition: 'center 10%',
        },
        {
            id: 'desktop',
            type: 'desktop',
            title: labels.desktop,
            overlay: 'Illustrative Preview',
            imageSrc: cover,
            objectPosition: 'center 24%',
        },
        {
            id: 'mobile',
            type: 'mobile',
            title: labels.mobile,
            overlay: 'Illustrative Preview',
            imageSrc: mobile,
            objectPosition: 'center top',
        },
        {
            id: 'dashboard',
            type: 'dashboard',
            title: labels.dashboard,
            overlay: 'Illustrative Preview',
            imageSrc: cover,
            objectPosition: 'center 52%',
        },
        {
            id: 'analytics',
            type: 'analytics',
            title: labels.analytics,
            overlay: 'Illustrative Preview',
            imageSrc: cover,
            objectPosition: 'center 72%',
        },
        {
            id: 'workflow',
            type: 'workflow',
            title: labels.workflow,
            overlay: 'Illustrative Preview',
            imageSrc: mobile,
            objectPosition: 'center 38%',
        },
    ];
}

export type CaseStudyTimelineStep = {
    phase: string;
    title: string;
    description: string;
};

export type CaseStudyTestimonial = {
    quote: string;
    name: string;
    role: string;
    company: string;
    initials: string;
};

export type CaseStudyTheme = {
    from: string;
    to: string;
    glow: string;
    mesh: string;
    label: string;
};

export type CaseStudyExperience = {
    id: string;
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
    coverImage: string;
    mobileCoverImage: string;
    coverAlt: string;
    clientName: string;
    technologies: string[];
    futureImprovements: string[];
    theme: CaseStudyTheme;
    metrics: CaseStudyMetric[];
    timeline: CaseStudyTimelineStep[];
    gallery: CaseStudyGalleryItem[];
    testimonial: CaseStudyTestimonial;
};

export const CASE_STUDY_EXPERIENCES: CaseStudyExperience[] = [
    {
        id: 'demo-luxury-estate',
        industry: 'Home Services',
        clientName: 'Jouwdroomoverkapping',
        title: 'Premium Web & Lead System for Outdoor Living',
        summary: 'Cinematic configurator experience, lead capture, and conversion architecture for a high-end pergola brand.',
        documentaryLabel: 'LIVE CLIENT',
        businessType: 'Outdoor living & veranda brand · Demo',
        duration: '14 weeks · Illustrative',
        services: ['Web Development', 'Marketing', 'AI Systems'],
        challenge:
            'Inbound demand was inconsistent. High-intent buyers waited too long for follow-up, and the sales team lacked visibility into which channels produced qualified viewings.',
        solution:
            'Ukonnect designed an AI-assisted lead engine with automated qualification, routing, and nurture sequences tied directly into the CRM and booking workflow.',
        transform: 'Connected ads, AI qualification, and CRM into one living pipeline.',
        implementation:
            'We rebuilt the acquisition funnel, deployed AI agents for first-response qualification, synced Meta and Google campaigns to HubSpot, and launched a conversion-focused landing experience with live tracking.',
        businessOutcome:
            'The operating model shifted from reactive follow-up to a predictable pipeline rhythm with clearer attribution across every stage of the buyer journey.',
        results: 'More qualified viewings, faster response, clearer path from click to appointment.',
        before: 'Fragmented lead flow, manual qualification, slow response.',
        after: 'Unified pipeline with automated nurture and live attribution.',
        coverImage: coverJouwdroom,
        mobileCoverImage: mobileJouwdroom,
        coverAlt: 'Jouwdroomoverkapping premium outdoor living website — desktop and mobile',
        technologies: ['HubSpot', 'Meta Ads', 'Google Ads', 'n8n', 'Custom AI Agents', 'GA4'],
        futureImprovements: [
            'Predictive lead scoring based on historical close patterns',
            'Dynamic ad creative generation from listing inventory',
            'WhatsApp nurture sequences for international buyers',
        ],
        theme: {
            from: '#ef7a17',
            to: '#ff9a44',
            glow: 'rgba(239,122,23,0.28)',
            mesh: 'from-[#ef7a17]/35 via-[#032038]/20 to-[#0f172a]',
            label: 'Warm Craft',
        },
        metrics: [
            { value: '+184%', label: 'Qualified Leads' },
            { value: '3.2x', label: 'ROI' },
            { value: '98%', label: 'Automation Rate' },
        ],
        timeline: [
            {
                phase: 'Discovery',
                title: 'Pipeline audit & buyer journey mapping',
                description: 'Mapped acquisition channels, CRM gaps, and response-time bottlenecks across the sales floor.',
            },
            {
                phase: 'Strategy',
                title: 'Growth architecture & funnel blueprint',
                description: 'Defined qualification logic, CRM stages, and the media-to-meeting conversion model.',
            },
            {
                phase: 'Implementation',
                title: 'AI agents, CRM sync & landing rebuild',
                description: 'Deployed automation layers, rebuilt the conversion site, and connected live tracking.',
            },
            {
                phase: 'Launch',
                title: 'Campaign rollout & team onboarding',
                description: 'Activated paid channels, trained the sales team on the new workflow, and went live with dashboards.',
            },
            {
                phase: 'Optimization',
                title: 'Performance loops & nurture refinement',
                description: 'Iterated on qualification prompts, ad creative, and booking conversion based on live data.',
            },
        ],
        gallery: buildCaseStudyGallery(coverJouwdroom, mobileJouwdroom, {
            hero: 'Campaign Hero',
            desktop: 'Landing Page',
            mobile: 'Mobile Experience',
            dashboard: 'Pipeline Dashboard',
            analytics: 'Attribution Analytics',
            workflow: 'AI Workflow Map',
        }),
        testimonial: {
            quote:
                'Placeholder testimonial. The new system gave our team a clearer rhythm from inquiry to viewing, with far less manual chasing.',
            name: 'Demo Client',
            role: 'Managing Director · Placeholder',
            company: 'Confidential Estate Group',
            initials: 'DC',
        },
    },
    {
        id: 'demo-b2b-growth',
        industry: 'Food & B2B',
        clientName: 'Ayat Food',
        title: 'Premium B2B Growth Engine for Halal Wholesale',
        summary: 'Dark editorial brand world, product storytelling, and lead qualification for a premium meat wholesaler.',
        documentaryLabel: 'CLIENT STORY',
        businessType: 'Premium halal wholesale · Demo',
        duration: '11 weeks · Illustrative',
        services: ['Web Development', 'Marketing', 'Branding'],
        challenge:
            'Outbound and paid acquisition were disconnected from CRM reality. The team could not see which campaigns produced revenue-ready conversations.',
        solution:
            'Ukonnect built a meeting-generation engine with AI qualification, paid media orchestration, and automated follow-up tied to pipeline stages.',
        transform: 'Orchestrated media, scoring, and CRM into one meeting engine.',
        implementation:
            'We launched LinkedIn and Google campaigns, implemented AI lead scoring, connected CRM sync, and created a premium service landing experience with proof-led messaging.',
        businessOutcome:
            'Illustrative outcome: a more predictable meeting pipeline with cleaner handoff between marketing and sales.',
        results: 'Stronger meeting volume, lower cost per conversation, clearer attribution.',
        before: 'Manual outreach, inconsistent CRM, opaque campaign quality.',
        after: 'Integrated engine with AI scoring and live pipeline intelligence.',
        coverImage: coverAyat,
        mobileCoverImage: mobileAyat,
        coverAlt: 'Ayat Food premium halal wholesale website — desktop and mobile',
        technologies: ['LinkedIn Ads', 'Google Ads', 'HubSpot', 'Slack', 'Custom AI Agents', 'Zapier'],
        futureImprovements: [
            'Account-based nurture for enterprise targets',
            'Proposal automation triggered by qualified calls',
            'Revenue forecasting from pipeline velocity',
        ],
        theme: {
            from: '#b91c1c',
            to: '#f59e0b',
            glow: 'rgba(185,28,28,0.24)',
            mesh: 'from-[#b91c1c]/32 via-[#7f1d1d]/18 to-[#0f172a]',
            label: 'Crimson Editorial',
        },
        metrics: [
            { value: '+142%', label: 'Meetings Booked' },
            { value: '-38%', label: 'Cost per Lead' },
            { value: '2.8x', label: 'Pipeline Velocity' },
        ],
        timeline: [
            {
                phase: 'Discovery',
                title: 'Revenue motion audit',
                description: 'Reviewed campaign history, CRM stages, and sales follow-up behavior.',
            },
            {
                phase: 'Strategy',
                title: 'Meeting-generation model',
                description: 'Designed the qualification framework and channel mix for advisory buyers.',
            },
            {
                phase: 'Implementation',
                title: 'CRM sync & AI routing',
                description: 'Built automation layers, campaign structure, and the new conversion site.',
            },
            {
                phase: 'Launch',
                title: 'Paid media activation',
                description: 'Rolled out campaigns with live dashboards for the leadership team.',
            },
            {
                phase: 'Optimization',
                title: 'Nurture and scoring refinement',
                description: 'Tuned AI prompts, audience segments, and meeting conversion paths.',
            },
        ],
        gallery: buildCaseStudyGallery(coverAyat, mobileAyat, {
            hero: 'Growth Console',
            desktop: 'Service Landing',
            mobile: 'Mobile Funnel',
            dashboard: 'Meeting Dashboard',
            analytics: 'Channel Analytics',
            workflow: 'Qualification Workflow',
        }),
        testimonial: {
            quote:
                'Placeholder testimonial. We finally had one place to see which campaigns were creating real conversations instead of noise.',
            name: 'Demo Client',
            role: 'Commercial Director · Placeholder',
            company: 'Confidential Advisory Group',
            initials: 'CA',
        },
    },
    {
        id: 'demo-property-dev',
        industry: 'Retail & Showroom',
        clientName: 'Keuken Centrum',
        title: 'Showroom Conversion System for Premium Kitchens',
        summary: 'Cinematic showroom storytelling, video-led hero, and quote funnel for a premium kitchen destination.',
        documentaryLabel: 'LIVE PROJECT',
        businessType: 'Premium kitchen showroom · Demo',
        duration: '16 weeks · Illustrative',
        services: ['Web Development', 'Marketing', 'Videography'],
        challenge:
            'Launch campaigns generated interest but weak qualification. Sales teams spent too much time on low-intent inquiries while high-value buyers slipped through.',
        solution:
            'Ukonnect built a launch funnel with AI qualification, premium project storytelling, and automated booking flows connected to the sales calendar.',
        transform: 'Turned launch traffic into qualified demand with cinematic storytelling.',
        implementation:
            'We produced a cinematic project site, configured tracking and attribution, deployed AI inquiry handling, and launched paid acquisition with retargeting loops.',
        businessOutcome:
            'Illustrative outcome: stronger launch momentum, better inquiry quality, and a clearer view of buyer intent before sales calls.',
        results: 'Higher-quality inquiries, improved launch conversion, sharper sales focus.',
        before: 'High traffic, low clarity, manual qualification slowing launches.',
        after: 'Premium launch experience with AI qualification and live demand signal.',
        coverImage: coverKeuken,
        mobileCoverImage: mobileKeuken,
        coverAlt: 'Keuken Centrum premium kitchen showroom website — desktop and mobile',
        technologies: ['Meta Ads', 'Google Ads', 'Cal.com', 'HubSpot', 'GA4', 'Custom CMS'],
        futureImprovements: [
            'Buyer intent scoring by unit type preference',
            'Investor-specific nurture sequences',
            'Dynamic inventory-led ad creative',
        ],
        theme: {
            from: '#84cc16',
            to: '#22d3ee',
            glow: 'rgba(132,204,22,0.22)',
            mesh: 'from-[#84cc16]/28 via-[#0f172a]/40 to-[#0f172a]',
            label: 'Lime Showroom',
        },
        metrics: [
            { value: '+210%', label: 'Qualified Inquiries' },
            { value: '€2.4M', label: 'Sales Volume' },
            { value: '+72%', label: 'Launch Conversion' },
        ],
        timeline: [
            {
                phase: 'Discovery',
                title: 'Launch readiness audit',
                description: 'Assessed buyer journey, sales process, and existing launch assets.',
            },
            {
                phase: 'Strategy',
                title: 'Demand generation blueprint',
                description: 'Defined messaging, funnel stages, and qualification criteria for the launch.',
            },
            {
                phase: 'Implementation',
                title: 'Site, tracking & AI qualification',
                description: 'Built the launch experience, automation flows, and attribution stack.',
            },
            {
                phase: 'Launch',
                title: 'Campaign go-live',
                description: 'Activated paid media, retargeting, and sales handoff protocols.',
            },
            {
                phase: 'Optimization',
                title: 'Demand quality loops',
                description: 'Refined audience targeting, inquiry handling, and booking conversion.',
            },
        ],
        gallery: buildCaseStudyGallery(coverKeuken, mobileKeuken, {
            hero: 'Project Hero',
            desktop: 'Launch Website',
            mobile: 'Mobile Inquiry Flow',
            dashboard: 'Demand Dashboard',
            analytics: 'Launch Analytics',
            workflow: 'Booking Workflow',
        }),
        testimonial: {
            quote:
                'Placeholder testimonial. The launch finally felt like a product experience, not just a brochure with a contact form.',
            name: 'Demo Client',
            role: 'Sales Director · Placeholder',
            company: 'Confidential Development Group',
            initials: 'SD',
        },
    },
];

export function getCaseStudyById(id: string): CaseStudyExperience | undefined {
    return CASE_STUDY_EXPERIENCES.find((study) => study.id === id);
}

export function getAdjacentCaseStudies(id: string): {
    prev: CaseStudyExperience | null;
    next: CaseStudyExperience | null;
} {
    const index = CASE_STUDY_EXPERIENCES.findIndex((study) => study.id === id);
    if (index === -1) return { prev: null, next: null };
    return {
        prev: index > 0 ? CASE_STUDY_EXPERIENCES[index - 1] : null,
        next: index < CASE_STUDY_EXPERIENCES.length - 1 ? CASE_STUDY_EXPERIENCES[index + 1] : null,
    };
}
