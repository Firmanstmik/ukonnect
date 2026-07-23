import markSrc from '../assets/ukonnect-mark.png';

type UkonnectMarkProps = {
    className?: string;
    title?: string;
};

/** Official interlocking UKONNECT mark (cyan + purple brand links). */
export function UkonnectMark({ className = 'h-8 w-8', title = 'UKONNECT' }: UkonnectMarkProps) {
    return (
        <img
            src={markSrc}
            alt={title}
            className={className}
            width={64}
            height={64}
            decoding="async"
            draggable={false}
        />
    );
}
