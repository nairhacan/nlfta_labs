'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function BackgroundAnimation() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const blobs = containerRef.current?.querySelectorAll('.bg-blob');

            blobs?.forEach((blob) => {
                // Initial random positions
                gsap.set(blob, {
                    x: gsap.utils.random(-100, 100, 10),
                    y: gsap.utils.random(-100, 100, 10),
                    scale: gsap.utils.random(0.8, 1.2),
                });

                // Floating animation
                gsap.to(blob, {
                    x: `+=${gsap.utils.random(-300, 300)}`,
                    y: `+=${gsap.utils.random(-300, 300)}`,
                    duration: gsap.utils.random(15, 25),
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                });

                // Slow rotation
                gsap.to(blob, {
                    rotate: 360,
                    duration: gsap.utils.random(30, 60),
                    repeat: -1,
                    ease: 'none',
                });
            });

            // Mouse move effect for subtle depth
            const handleMouseMove = (e: MouseEvent) => {
                const { clientX, clientY } = e;
                const xPos = (clientX / window.innerWidth - 0.5) * 40;
                const yPos = (clientY / window.innerHeight - 0.5) * 40;

                gsap.to('.bg-glow-container', {
                    x: xPos,
                    y: yPos,
                    duration: 2,
                    ease: 'power2.out',
                });
            };

            window.addEventListener('mousemove', handleMouseMove);
            return () => window.removeEventListener('mousemove', handleMouseMove);
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden bg-[#020617]">
            {/* Mesh Gradient Base */}
            <div className="absolute inset-0 opacity-40">
                <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-blue-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse shadow-[0_0_100px_rgba(30,58,138,0.2)]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-900/20 rounded-full blur-[120px] mix-blend-screen shadow-[0_0_100px_rgba(49,46,129,0.2)]" />
            </div>

            {/* Modern Grid Pattern with Gradient Mask */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>

            {/* Animated Glow Blobs */}
            <div className="bg-glow-container absolute inset-0 pointer-events-none">
                <div className="bg-blob absolute top-[10%] left-[20%] w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[110px] transform-gpu" />
                <div className="bg-blob absolute top-[40%] right-[15%] w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] transform-gpu" />
                <div className="bg-blob absolute bottom-[15%] left-[30%] w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[130px] transform-gpu" />
                <div className="bg-blob absolute top-[60%] left-[-5%] w-[350px] h-[350px] bg-blue-400/10 rounded-full blur-[90px] transform-gpu" />
            </div>

            {/* Noise Texture for that premium feel */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.4)_100%)] pointer-events-none"></div>

            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(20px); }
          75% { transform: translateY(10px) translateX(-10px); }
        }
      `}</style>
        </div>
    );
}
