import notion from '../../assets/brands/notion.svg';
import slack from '../../assets/brands/slack.svg';
import meta from '../../assets/brands/meta.svg';
import googleAds from '../../assets/brands/google-ads.svg';
import wordpress from '../../assets/brands/wordpress.svg';
import analytics from '../../assets/brands/analytics.svg';
import hubspot from '../../assets/brands/hubspot.svg';
import zapier from '../../assets/brands/zapier.svg';
import openai from '../../assets/brands/openai.svg';
import claude from '../../assets/brands/claude.svg';
import gemini from '../../assets/brands/gemini.svg';
import calendar from '../../assets/brands/calendar.svg';
import meet from '../../assets/brands/meet.svg';
import whatsapp from '../../assets/brands/whatsapp.svg';
import stripe from '../../assets/brands/stripe.svg';
import googleBusiness from '../../assets/google ukonnect.svg';
import type { BrandKey } from './heroDesign';

const BRAND_ASSETS: Record<BrandKey, string> = {
    notion,
    slack,
    meta,
    googleAds,
    wordpress,
    analytics,
    hubspot,
    zapier,
    openai,
    claude,
    gemini,
    calendar,
    meet,
    whatsapp,
    stripe,
    googleBusiness,
};

export function HeroBrandLogo({ brand }: { brand: BrandKey }) {
    return <img src={BRAND_ASSETS[brand]} alt="" className="h-full w-full object-contain" aria-hidden />;
}
