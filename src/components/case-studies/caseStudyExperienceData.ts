/**
 * Case Study Experience — narrative demo data.
 * Visual covers: client project heroes (desktop + mobile).
 * Metrics, quotes, and some chapter details remain illustrative until founder verification.
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

/** Three intentional moments only — real assets, no decorative crop repetition. */
function buildStoryGallery(
    cover: string,
    mobile: string,
    labels: { opening: string; desktop: string; mobile: string },
): CaseStudyGalleryItem[] {
    return [
        {
            id: 'hero',
            type: 'hero',
            title: labels.opening,
            overlay: 'Illustrative Preview',
            imageSrc: cover,
            objectPosition: 'center 12%',
        },
        {
            id: 'desktop',
            type: 'desktop',
            title: labels.desktop,
            overlay: 'Illustrative Preview',
            imageSrc: cover,
            objectPosition: 'center 32%',
        },
        {
            id: 'mobile',
            type: 'mobile',
            title: labels.mobile,
            overlay: 'Illustrative Preview',
            imageSrc: mobile,
            objectPosition: 'center top',
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
        title: 'When beautiful work still felt hard to buy',
        summary:
            'A premium outdoor living brand had the craft. What they needed was a clearer path from first curiosity to a real conversation.',
        documentaryLabel: 'CLIENT STORY',
        businessType: 'Outdoor living & veranda brand',
        duration: 'About 14 weeks',
        services: ['Website', 'Marketing', 'Lead systems'],
        challenge:
            'People arrived interested — then waited. Follow-up depended on who was free that day. The team could feel demand, but not trust which inquiries were serious, or which campaigns were wasting money.',
        solution:
            'Instead of adding more ads, the decision was to rebuild the path itself: one clear website story, faster first response, and a single place where every inquiry could be seen and followed.',
        transform: 'From scattered follow-ups to one calm path from interest to conversation.',
        implementation:
            'The new site carried the brand the way a showroom should. Inquiries were answered quickly, routed to the right person, and connected to the tools the team already used — so nothing important sat unanswered overnight.',
        businessOutcome:
            'The team spent less time chasing cold leads, and more time speaking with people who were ready to talk about a real project.',
        results: 'Clearer demand. Faster replies. Less guessing about what was working.',
        before:
            'Strong craft online, but buyers often left without a reply — and the team never knew which interest was worth their evening.',
        after:
            'Every serious inquiry had a place to land, a person to meet it, and a story the brand could stand behind.',
        coverImage: coverJouwdroom,
        mobileCoverImage: mobileJouwdroom,
        coverAlt: 'Jouwdroomoverkapping outdoor living website on desktop and mobile',
        technologies: ['HubSpot', 'Meta Ads', 'Google Ads', 'n8n', 'Custom AI Agents', 'GA4'],
        futureImprovements: [
            'Learn which project types close fastest — and greet those buyers first',
            'Show seasonal collections without rebuilding the whole site',
            'Keep international buyers warm between the first message and the visit',
        ],
        theme: {
            from: '#ef7a17',
            to: '#ff9a44',
            glow: 'rgba(239,122,23,0.28)',
            mesh: 'from-[#ef7a17]/35 via-[#032038]/20 to-[#0f172a]',
            label: 'Warm Craft',
        },
        metrics: [
            { value: '+184%', label: 'Qualified inquiries' },
            { value: '3.2x', label: 'Return on spend' },
            { value: 'Hours → minutes', label: 'First response' },
        ],
        timeline: [
            {
                phase: 'Listen',
                title: 'Where buyers were getting stuck',
                description: 'We sat with the team and followed real inquiries — from the first click to the moment someone finally answered.',
            },
            {
                phase: 'Decide',
                title: 'One path, not more noise',
                description: 'The brief became simple: make the next step obvious, and make sure a human meets it quickly.',
            },
            {
                phase: 'Build',
                title: 'A site that felt like the work',
                description: 'The brand world, forms, and follow-up were rebuilt so interest no longer disappeared into a quiet inbox.',
            },
            {
                phase: 'Launch',
                title: 'Going live with the team',
                description: 'Campaigns and the new workflow went live together — with the sales floor ready, not surprised.',
            },
            {
                phase: 'Refine',
                title: 'Learning from real conversations',
                description: 'After launch, we adjusted messages and handoffs based on what buyers actually asked for.',
            },
        ],
        gallery: buildStoryGallery(coverJouwdroom, mobileJouwdroom, {
            opening: 'The first impression',
            desktop: 'The story on the screen',
            mobile: 'The moment on the phone',
        }),
        testimonial: {
            quote:
                'We stopped wondering who we had forgotten. The work finally matched how carefully we build for our customers.',
            name: 'Client perspective',
            role: 'Founder perspective',
            company: 'Jouwdroomoverkapping',
            initials: 'JO',
        },
    },
    {
        id: 'demo-b2b-growth',
        industry: 'Food & B2B',
        clientName: 'Ayat Food',
        title: 'When growth felt busy — but not bankable',
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
            'The team worked hard every week — yet still argued about whether the next meeting would be worth showing up for.',
        after:
            'Sales walked into conversations already knowing why the buyer was there, and what they cared about.',
        coverImage: coverAyat,
        mobileCoverImage: mobileAyat,
        coverAlt: 'Ayat Food wholesale website on desktop and mobile',
        technologies: ['LinkedIn Ads', 'Google Ads', 'HubSpot', 'Slack', 'Custom AI Agents', 'Zapier'],
        futureImprovements: [
            'Stay closer to the buyers who already trust the quality',
            'Turn a strong call into a proposal without starting from a blank page',
            'See pipeline movement early enough to plan the week',
        ],
        theme: {
            from: '#b91c1c',
            to: '#f59e0b',
            glow: 'rgba(185,28,28,0.24)',
            mesh: 'from-[#b91c1c]/32 via-[#7f1d1d]/18 to-[#0f172a]',
            label: 'Crimson Editorial',
        },
        metrics: [
            { value: '+142%', label: 'Meetings booked' },
            { value: '-38%', label: 'Cost per conversation' },
            { value: 'Clearer', label: 'Sales handoff' },
        ],
        timeline: [
            {
                phase: 'Listen',
                title: 'What “a good lead” really meant',
                description: 'We listened to sales — not dashboards first — to learn which conversations were worth protecting.',
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
                description: 'Channels went live with a shared view — so marketing and sales argued less about “what worked.”',
            },
            {
                phase: 'Refine',
                title: 'Keeping the signal clean',
                description: 'We tightened audiences and messages whenever a week filled with the wrong kind of noise.',
            },
        ],
        gallery: buildStoryGallery(coverAyat, mobileAyat, {
            opening: 'The brand at first glance',
            desktop: 'Where buyers lean in',
            mobile: 'The path from the phone',
        }),
        testimonial: {
            quote:
                'We finally stopped treating every inquiry as equal. The week got quieter — and the conversations got better.',
            name: 'Client perspective',
            role: 'Commercial perspective',
            company: 'Ayat Food',
            initials: 'AF',
        },
    },
    {
        id: 'demo-property-dev',
        industry: 'Retail & Showroom',
        clientName: 'Keuken Centrum',
        title: 'When the showroom online felt smaller than the one in real life',
        summary:
            'A premium kitchen destination had the space, the craft, and the people. Online, too many visitors left before they felt ready to visit.',
        documentaryLabel: 'CLIENT STORY',
        businessType: 'Premium kitchen showroom',
        duration: 'About 16 weeks',
        services: ['Website', 'Marketing', 'Film'],
        challenge:
            'Interest was not the problem. Intent was. High-value buyers needed to feel the space before they booked — while low-intent forms still consumed the sales team’s mornings.',
        solution:
            'The work became a showroom experience on screen: cinematic storytelling, a clearer reason to visit, and a calmer way to separate curiosity from commitment.',
        transform: 'From brochure traffic to visitors who arrived ready to talk.',
        implementation:
            'Film, photography, and a guided inquiry path were built together — so the website felt like walking the floor, and the team only spent time on people who were close to choosing.',
        businessOutcome:
            'Stronger visit quality, a clearer sense of buyer readiness before the appointment, and a launch that felt like an opening — not a form campaign.',
        results: 'Better visits. Sharper focus for sales. A brand presence that matched the floor.',
        before:
            'Beautiful kitchens in person — and an online journey that asked for a quote before it earned trust.',
        after:
            'People arrived already imagining their kitchen in the space — and sales could meet them there.',
        coverImage: coverKeuken,
        mobileCoverImage: mobileKeuken,
        coverAlt: 'Keuken Centrum kitchen showroom website on desktop and mobile',
        technologies: ['Meta Ads', 'Google Ads', 'Cal.com', 'HubSpot', 'GA4', 'Custom CMS'],
        futureImprovements: [
            'Help buyers explore styles before they book the floor',
            'Keep warm visitors close between first click and first visit',
            'Let seasonal collections appear without rewriting the whole experience',
        ],
        theme: {
            from: '#84cc16',
            to: '#22d3ee',
            glow: 'rgba(132,204,22,0.22)',
            mesh: 'from-[#84cc16]/28 via-[#0f172a]/40 to-[#0f172a]',
            label: 'Lime Showroom',
        },
        metrics: [
            { value: '+210%', label: 'Ready inquiries' },
            { value: 'Higher', label: 'Visit quality' },
            { value: '+72%', label: 'Launch conversion' },
        ],
        timeline: [
            {
                phase: 'Listen',
                title: 'Why people left before visiting',
                description: 'We watched how buyers moved — and where the feeling of the showroom disappeared online.',
            },
            {
                phase: 'Decide',
                title: 'Earn the visit first',
                description: 'The priority became trust and desire — then a clean path to book time on the floor.',
            },
            {
                phase: 'Build',
                title: 'Bring the floor to the screen',
                description: 'Story, film, and inquiry flow were shaped as one experience, not three separate deliverables.',
            },
            {
                phase: 'Launch',
                title: 'Opening the new chapter',
                description: 'Campaigns and the new site went live as a single moment — with the team ready for better conversations.',
            },
            {
                phase: 'Refine',
                title: 'Protecting sales time',
                description: 'We kept tuning who reached the calendar, so mornings stayed for people close to choosing.',
            },
        ],
        gallery: buildStoryGallery(coverKeuken, mobileKeuken, {
            opening: 'Walking in for the first time',
            desktop: 'The showroom on screen',
            mobile: 'Booking from the phone',
        }),
        testimonial: {
            quote:
                'Online finally felt like us. People arrived warmer — and we stopped spending mornings on forms that were never going to visit.',
            name: 'Client perspective',
            role: 'Showroom perspective',
            company: 'Keuken Centrum',
            initials: 'KC',
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
