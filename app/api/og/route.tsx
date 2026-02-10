import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);

        // ?title=<title>
        const hasTitle = searchParams.has('title');
        const title = hasTitle
            ? searchParams.get('title')?.slice(0, 100)
            : 'Protokol & Dokumentasi';

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#020617', // slate-950
                        backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(59, 130, 246, 0.15) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(139, 92, 246, 0.15) 2%, transparent 0%)',
                        backgroundSize: '100px 100px',
                        fontFamily: 'sans-serif',
                    }}
                >
                    {/* Glowing orb effect */}
                    <div
                        style={{
                            position: 'absolute',
                            top: '20%',
                            left: '20%',
                            width: '600px',
                            height: '600px',
                            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15), transparent 70%)',
                            filter: 'blur(80px)',
                            zIndex: 0,
                        }}
                    />

                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '24px',
                            zIndex: 1,
                        }}
                    >
                        {/* Logo Representation */}
                        <div
                            style={{
                                display: 'flex',
                                width: '64px',
                                height: '64px',
                                borderRadius: '16px',
                                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 0 40px rgba(59, 130, 246, 0.5)',
                            }}
                        >
                            <svg
                                width="40"
                                height="40"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>

                        <h1
                            style={{
                                fontSize: '80px',
                                fontWeight: 900,
                                background: 'white',
                                backgroundClip: 'text',
                                color: 'transparent',
                                margin: 0,
                                letterSpacing: '-3px',
                                textShadow: '0 0 40px rgba(255,255,255,0.2)',
                            }}
                        >
                            NLFTs
                        </h1>
                        <span style={{ fontSize: '80px', fontWeight: 900, color: '#6366f1' }}>.</span>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            marginTop: '60px',
                            padding: '24px 48px',
                            backgroundColor: 'rgba(30, 41, 59, 0.6)',
                            borderRadius: '24px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                            zIndex: 1,
                            backdropFilter: 'blur(10px)',
                        }}
                    >
                        <div
                            style={{
                                fontSize: '48px',
                                color: '#e2e8f0',
                                fontWeight: 600,
                                textAlign: 'center',
                                maxWidth: '900px',
                                lineHeight: 1.2,
                                letterSpacing: '-0.02em',
                            }}
                        >
                            {title}
                        </div>
                    </div>

                    <div
                        style={{
                            position: 'absolute',
                            bottom: 60,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            fontSize: '24px',
                            color: '#94a3b8',
                            zIndex: 1,
                            fontWeight: 500,
                        }}
                    >
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
                        Official Documentation & Protocol
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            },
        );
    } catch (e: any) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
