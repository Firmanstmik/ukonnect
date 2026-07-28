import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { hasError: boolean };

/**
 * Production safety net — prevents a blank white screen on unexpected render failures.
 */
export class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false };

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        if (import.meta.env.DEV) {
            console.error('ErrorBoundary caught:', error, info);
        }
    }

    private reload = () => {
        window.location.assign(window.location.pathname.startsWith('/') ? window.location.pathname.split('/').slice(0, 2).join('/') || '/' : '/');
    };

    render() {
        if (!this.state.hasError) return this.props.children;

        return (
            <div
                style={{
                    minHeight: '100vh',
                    display: 'grid',
                    placeItems: 'center',
                    background: '#ecedf1',
                    padding: '2rem',
                    fontFamily: 'system-ui, sans-serif',
                    color: '#0f172a',
                    textAlign: 'center',
                }}
            >
                <div style={{ maxWidth: 420 }}>
                    <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', color: '#5600e3', textTransform: 'uppercase' }}>
                        Something went wrong
                    </p>
                    <h1 style={{ marginTop: 12, fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>
                        We could not load this page.
                    </h1>
                    <p style={{ marginTop: 12, color: '#64748b', lineHeight: 1.6 }}>
                        Please try again. If the problem continues, email us at info@ukonnect.nl.
                    </p>
                    <button
                        type="button"
                        onClick={this.reload}
                        style={{
                            marginTop: 24,
                            border: 0,
                            borderRadius: 999,
                            background: '#5600e3',
                            color: '#fff',
                            fontWeight: 600,
                            padding: '12px 22px',
                            cursor: 'pointer',
                        }}
                    >
                        Back to home
                    </button>
                </div>
            </div>
        );
    }
}
