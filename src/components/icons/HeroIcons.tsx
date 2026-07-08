import {
    ArrowRight2,
    Cpu,
    Flash,
    Global,
    MagicStar,
    Profile2User,
    Refresh,
    ShieldTick,
    Star1,
    TickCircle,
    TrendUp,
} from 'iconsax-react';

export type IconsaxVariant = 'Linear' | 'Outline' | 'TwoTone' | 'Bulk' | 'Broken' | 'Bold';

export type IconsaxIconProps = {
    size?: number | string;
    color?: string;
    variant?: IconsaxVariant;
};

export const ICON_COLORS = {
    primary: '#5600e3',
    violet: '#9b4dff',
    emerald: '#10b981',
    slate: '#64748b',
    white: '#ffffff',
    gold: '#FBBC05',
} as const;

export function IconUsers(props: IconsaxIconProps) {
    return <Profile2User size={16} color={ICON_COLORS.emerald} variant="Bulk" {...props} />;
}

export function IconTrendUp(props: IconsaxIconProps) {
    return <TrendUp size={16} color={ICON_COLORS.slate} variant="Bulk" {...props} />;
}

export function IconSparkle(props: IconsaxIconProps) {
    return <MagicStar size={16} color={ICON_COLORS.primary} variant="Bulk" {...props} />;
}

export function IconBrain(props: IconsaxIconProps) {
    return <Cpu size={16} color={ICON_COLORS.white} variant="Bulk" {...props} />;
}

export function IconBrainPrimary(props: IconsaxIconProps) {
    return <Cpu size={14} color={ICON_COLORS.primary} variant="Bulk" {...props} />;
}

export function IconTick(props: IconsaxIconProps) {
    return <TickCircle size={14} color={ICON_COLORS.emerald} variant="Bulk" {...props} />;
}

export function IconTickPrimary(props: IconsaxIconProps) {
    return <TickCircle size={14} color={ICON_COLORS.primary} variant="Bulk" {...props} />;
}

export function IconRefresh(props: IconsaxIconProps) {
    return <Refresh size={14} color={ICON_COLORS.white} variant="Bulk" {...props} />;
}

export function IconFlash(props: IconsaxIconProps) {
    return <Flash size={14} color={ICON_COLORS.white} variant="Bulk" {...props} />;
}

export function IconArrow(props: IconsaxIconProps) {
    return <ArrowRight2 size={18} color={ICON_COLORS.white} variant="Bulk" {...props} />;
}

export function IconShield(props: IconsaxIconProps) {
    return <ShieldTick size={18} color={ICON_COLORS.primary} variant="Bulk" {...props} />;
}

export function IconGlobal(props: IconsaxIconProps) {
    return <Global size={18} color={ICON_COLORS.slate} variant="Bulk" {...props} />;
}

export function IconStar(props: IconsaxIconProps) {
    return <Star1 size={12} color={ICON_COLORS.gold} variant="Bold" {...props} />;
}
