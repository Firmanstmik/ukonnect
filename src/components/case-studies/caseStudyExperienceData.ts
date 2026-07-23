/**
 * Case Study Experience — structured demo data.
 * Visual covers use real UKONNECT photography (documentary stills).
 * Metrics/copy remain illustrative until founder verification.
 */

import coverEstate from '../../assets/Culture/Large left.jpg';
import coverConsulting from '../../assets/Culture/Top bento row (upper).jpg';
import coverLuxury from '../../assets/Culture/bottom row (center).jpg';

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
};

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
    coverAlt: string;
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
        industry: 'Real Estate',
        title: 'AI Lead Pipeline for Premium Property Sales',
        summary: 'Paid acquisition, AI qualification, and CRM follow-up — rebuilt as one growth system.',
        documentaryLabel: 'DOCUMENTED SYSTEM',
        businessType: 'Luxury residential brokerage · Demo',
        duration: '14 weeks · Illustrative',
        services: ['Marketing', 'AI Systems', 'Web Development'],
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
        coverImage: coverEstate,
        coverAlt: 'UKONNECT real estate growth system documentary still',
        technologies: ['HubSpot', 'Meta Ads', 'Google Ads', 'n8n', 'Custom AI Agents', 'GA4'],
        futureImprovements: [
            'Predictive lead scoring based on historical close patterns',
            'Dynamic ad creative generation from listing inventory',
            'WhatsApp nurture sequences for international buyers',
        ],
        theme: {
            from: '#059669',
            to: '#34d399',
            glow: 'rgba(5,150,105,0.24)',
            mesh: 'from-[#059669]/35 via-[#10b981]/18 to-[#0f172a]',
            label: 'Emerald System',
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
        gallery: [
            { id: 'hero', type: 'hero', title: 'Campaign Hero', overlay: 'Illustrative Preview' },
            { id: 'desktop', type: 'desktop', title: 'Landing Page', overlay: 'Placeholder Screenshot' },
            { id: 'mobile', type: 'mobile', title: 'Mobile Experience', overlay: 'Demo Case Study' },
            { id: 'dashboard', type: 'dashboard', title: 'Pipeline Dashboard', overlay: 'Placeholder Screenshot' },
            { id: 'analytics', type: 'analytics', title: 'Attribution Analytics', overlay: 'Illustrative Preview' },
            { id: 'workflow', type: 'workflow', title: 'AI Workflow Map', overlay: 'Demo Case Study' },
        ],
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
        industry: 'Consulting',
        title: 'Automated B2B Growth Engine for Consultancies',
        summary: 'A meeting-generation system for firms that need qualified conversations — not form spam.',
        documentaryLabel: 'CLIENT STORY',
        businessType: 'B2B advisory firm · Demo',
        duration: '11 weeks · Illustrative',
        services: ['Marketing', 'AI Systems', 'Web Development'],
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
        coverImage: coverConsulting,
        coverAlt: 'UKONNECT consulting growth system documentary still',
        technologies: ['LinkedIn Ads', 'Google Ads', 'HubSpot', 'Slack', 'Custom AI Agents', 'Zapier'],
        futureImprovements: [
            'Account-based nurture for enterprise targets',
            'Proposal automation triggered by qualified calls',
            'Revenue forecasting from pipeline velocity',
        ],
        theme: {
            from: '#2563eb',
            to: '#60a5fa',
            glow: 'rgba(37,99,235,0.22)',
            mesh: 'from-[#2563eb]/32 via-[#3b82f6]/16 to-[#0f172a]',
            label: 'Blue Engine',
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
        gallery: [
            { id: 'hero', type: 'hero', title: 'Growth Console', overlay: 'Demo Case Study' },
            { id: 'desktop', type: 'desktop', title: 'Service Landing', overlay: 'Illustrative Preview' },
            { id: 'mobile', type: 'mobile', title: 'Mobile Funnel', overlay: 'Placeholder Screenshot' },
            { id: 'dashboard', type: 'dashboard', title: 'Meeting Dashboard', overlay: 'Illustrative Preview' },
            { id: 'analytics', type: 'analytics', title: 'Channel Analytics', overlay: 'Demo Case Study' },
            { id: 'workflow', type: 'workflow', title: 'Qualification Workflow', overlay: 'Placeholder Screenshot' },
        ],
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
        industry: 'Luxury',
        title: 'Conversion System for Off-Plan Development Launches',
        summary: 'Cinematic launch storytelling with AI qualification — demand validated from day one.',
        documentaryLabel: 'LIVE PROJECT',
        businessType: 'Residential development studio · Demo',
        duration: '16 weeks · Illustrative',
        services: ['Marketing', 'AI Systems', 'Web Development'],
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
        coverImage: coverLuxury,
        coverAlt: 'UKONNECT luxury development launch documentary still',
        technologies: ['Meta Ads', 'Google Ads', 'Cal.com', 'HubSpot', 'GA4', 'Custom CMS'],
        futureImprovements: [
            'Buyer intent scoring by unit type preference',
            'Investor-specific nurture sequences',
            'Dynamic inventory-led ad creative',
        ],
        theme: {
            from: '#B45309',
            to: '#F59E0B',
            glow: 'rgba(180,83,9,0.22)',
            mesh: 'from-[#B45309]/30 via-[#D97706]/16 to-[#0f172a]',
            label: 'Gold Launch',
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
        gallery: [
            { id: 'hero', type: 'hero', title: 'Project Hero', overlay: 'Illustrative Preview' },
            { id: 'desktop', type: 'desktop', title: 'Launch Website', overlay: 'Placeholder Screenshot' },
            { id: 'mobile', type: 'mobile', title: 'Mobile Inquiry Flow', overlay: 'Demo Case Study' },
            { id: 'dashboard', type: 'dashboard', title: 'Demand Dashboard', overlay: 'Illustrative Preview' },
            { id: 'analytics', type: 'analytics', title: 'Launch Analytics', overlay: 'Placeholder Screenshot' },
            { id: 'workflow', type: 'workflow', title: 'Booking Workflow', overlay: 'Demo Case Study' },
        ],
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
