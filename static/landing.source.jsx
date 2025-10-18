const { useMemo, useEffect, useState, useRef } = React;

const ContaFlowLanding = () => {
    const [particlesLoaded, setParticlesLoaded] = useState(false);

    useEffect(() => {
        const initParticles = async () => {
            if (!window.tsParticles) {
                return;
            }
            try {
                await window.tsParticles.load({
                    id: "hero-particles",
                    options: {
                        background: { color: { value: "transparent" } },
                        fpsLimit: 60,
                        interactivity: {
                            events: {
                                onHover: { enable: true, mode: "grab" },
                                onClick: { enable: true, mode: "push" },
                                resize: true,
                            },
                            modes: {
                                grab: { distance: 180, links: { opacity: 0.35 } },
                                push: { quantity: 2 },
                            },
                        },
                        particles: {
                            color: { value: ["#60B97B", "#2D6DAA", "#11446E"] },
                            links: {
                                color: "#60B97B",
                                distance: 150,
                                enable: true,
                                opacity: 0.2,
                                width: 1,
                            },
                            move: {
                                enable: true,
                                speed: 0.6,
                                random: true,
                                direction: "none",
                                outModes: { default: "bounce" },
                            },
                            number: { value: 80, density: { enable: true, area: 900 } },
                            opacity: { value: 0.4 },
                            shape: { type: "circle" },
                            size: { value: { min: 1, max: 3 } },
                        },
                        detectRetina: true,
                    },
                });
                setParticlesLoaded(true);
            } catch (error) {
                console.warn("No se pudieron inicializar las partículas:", error);
            }
        };

        initParticles();
    }, []);

    useEffect(() => {
        const styleId = "contaflow-landing-animations";
        if (document.getElementById(styleId)) {
            return;
        }
        const style = document.createElement("style");
        style.id = styleId;
        style.textContent = `
            @keyframes auroraShift {
                0% { transform: translate3d(-4%, -2%, 0); background-position: 0% 50%; }
                50% { transform: translate3d(0%, 4%, 0); background-position: 50% 30%; }
                100% { transform: translate3d(6%, -3%, 0); background-position: 100% 70%; }
            }
            @keyframes ctaPulse {
                0% { transform: scale(0.95); opacity: 0.45; }
                50% { transform: scale(1.03); opacity: 0.7; }
                100% { transform: scale(1.08); opacity: 0.4; }
            }
            .hero-aurora {
                position: relative;
                isolation: isolate;
            }
            .hero-aurora::before {
                content: "";
                position: absolute;
                inset: -160px -220px;
                background: radial-gradient(circle at 20% 20%, rgba(132, 216, 168, 0.45), transparent 55%),
                            radial-gradient(circle at 80% 30%, rgba(45, 109, 170, 0.35), transparent 60%),
                            linear-gradient(120deg, rgba(30, 94, 156, 0.35), rgba(96, 185, 123, 0.3));
                background-size: 180% 180%;
                filter: blur(70px);
                opacity: 0.55;
                border-radius: 36px;
                animation: auroraShift 16s ease-in-out infinite alternate;
                z-index: -1;
            }
            .reveal-on-scroll {
                opacity: 0;
                transform: translateY(28px);
                transition: opacity 0.8s cubic-bezier(0.2, 0.6, 0.3, 1), transform 0.8s cubic-bezier(0.2, 0.6, 0.3, 1);
            }
            .reveal-on-scroll.is-visible {
                opacity: 1;
                transform: translateY(0);
            }
            .pill-button {
                position: relative;
                overflow: hidden;
            }
            .pill-button::after {
                content: "";
                position: absolute;
                inset: 0;
                transform: translateX(-120%);
                transition: transform 0.6s ease;
            }
            .pill-button--solid::after {
                background: linear-gradient(120deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.4) 45%, rgba(255, 255, 255, 0) 100%);
            }
            .pill-button--ghost::after {
                background: linear-gradient(120deg, rgba(45, 109, 170, 0) 0%, rgba(45, 109, 170, 0.14) 45%, rgba(45, 109, 170, 0) 100%);
            }
            .pill-button:hover::after {
                transform: translateX(120%);
            }
            [data-parallax="tilt"] {
                perspective: 1200px;
            }
            [data-parallax="tilt"] img {
                transition: transform 0.4s ease, opacity 0.4s ease;
                will-change: transform;
            }
            [data-parallax="tilt"].is-tilting img {
                transform: rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) scale(1.03);
            }
            .timeline-progress-track {
                pointer-events: none;
                position: absolute;
                left: 50%;
                top: 140px;
                bottom: 140px;
                width: 2px;
                transform: translateX(-50%);
                background: linear-gradient(to bottom, rgba(45, 109, 170, 0.18), rgba(96, 185, 123, 0.18));
                overflow: hidden;
                border-radius: 999px;
                opacity: 0;
                transition: opacity 0.6s ease;
            }
            .timeline-progress-track::after {
                content: "";
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                height: 0%;
                background: linear-gradient(to bottom, rgba(45, 109, 170, 0.65), rgba(96, 185, 123, 0.55));
                transition: height 1s ease;
            }
            .timeline-progress-track.is-visible {
                opacity: 1;
            }
            .timeline-progress-track.is-visible::after {
                height: 100%;
            }
            .cta-card::before {
                content: "";
                position: absolute;
                inset: -40px;
                border-radius: inherit;
                background: radial-gradient(circle at 30% 30%, rgba(96, 185, 123, 0.25), transparent 55%),
                            radial-gradient(circle at 70% 70%, rgba(45, 109, 170, 0.24), transparent 60%);
                filter: blur(40px);
                opacity: 0.6;
                animation: ctaPulse 10s ease-in-out infinite alternate;
                z-index: -1;
            }
            @media (prefers-reduced-motion: reduce) {
                .hero-aurora::before,
                .pill-button::after,
                [data-parallax="tilt"] img,
                .timeline-progress-track::after,
                .cta-card::before {
                    animation: none !important;
                    transition: none !important;
                }
                .reveal-on-scroll {
                    opacity: 1 !important;
                    transform: none !important;
                }
            }
        `;
        document.head.appendChild(style);
    }, []);

    useEffect(() => {
        const revealElements = Array.from(document.querySelectorAll("[data-animate='reveal']"));
        if (revealElements.length === 0) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
        );

        revealElements.forEach((element) => observer.observe(element));

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const parallaxCards = Array.from(document.querySelectorAll("[data-parallax='tilt']"));
        if (!parallaxCards.length) {
            return;
        }

        const maxTilt = 8;
        const onMouseEnter = (event) => {
            event.currentTarget.classList.add("is-tilting");
        };
        const onMouseLeave = (event) => {
            const target = event.currentTarget;
            target.classList.remove("is-tilting");
            target.style.removeProperty("--tilt-x");
            target.style.removeProperty("--tilt-y");
        };
        const onMouseMove = (event) => {
            const target = event.currentTarget;
            const rect = target.getBoundingClientRect();
            const offsetX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            const offsetY = ((event.clientY - rect.top) / rect.height) * 2 - 1;
            target.style.setProperty("--tilt-x", `${(-offsetY * maxTilt).toFixed(2)}deg`);
            target.style.setProperty("--tilt-y", `${(offsetX * maxTilt).toFixed(2)}deg`);
        };

        parallaxCards.forEach((card) => {
            card.addEventListener("mouseenter", onMouseEnter);
            card.addEventListener("mouseleave", onMouseLeave);
            card.addEventListener("mousemove", onMouseMove);
        });

        return () => {
            parallaxCards.forEach((card) => {
                card.removeEventListener("mouseenter", onMouseEnter);
                card.removeEventListener("mouseleave", onMouseLeave);
                card.removeEventListener("mousemove", onMouseMove);
            });
        };
    }, []);

    useEffect(() => {
        const timelineSection = document.getElementById("timeline");
        const track = document.querySelector(".timeline-progress-track");

        if (!timelineSection || !track) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        track.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.25 }
        );

        observer.observe(timelineSection);

        return () => observer.disconnect();
    }, []);
    const aiLayers = useMemo(() => ([
        {
            icon: "🧠",
            title: "IA Cognitiva",
            desc: "Comprende catálogos, políticas y flujos fiscales de tu empresa desde el onboarding para personalizar procesos.",
        },
        {
            icon: "⚡",
            title: "IA de Procesamiento",
            desc: "Clasifica tickets, CFDI y transferencias con precisión contable. Aprendizaje continuo con cada confirmación.",
        },
        {
            icon: "🤖",
            title: "IA Operativa",
            desc: "Conciliación bancaria, pólizas y reportes automáticos. Todo con trazabilidad explicable al detalle.",
        },
    ]), []);

    const modules = useMemo(() => ([
        {
            title: "Captura inteligente omnicanal",
            description: "OCR fiscal, clasificación enriquecida y detección antifraude. Cada documento se convierte en gasto listo para auditoría.",
            bullets: [
                "Emails, WhatsApp y app móvil conectados a un mismo flujo.",
                "Motor antifraude: UUID vencidos y duplicados marcados al instante.",
                "Asignación automática de proyectos, centros de costo y responsables.",
            ],
            screenshot: "/screenshots/captura-omnicanal.png",
        },
        {
            title: "Conciliación bancaria asistida",
            description: "Motor híbrido ML + reglas que aprende con cada aprobación. Sugiere coincidencias y explica la decisión.",
            bullets: [
                "Detección de split payments y transferencias atípicas.",
                "Panel de pendientes por banco y prioridad.",
                "Aprendizaje continuo con feedback humano.",
            ],
            screenshot: "/screenshots/conciliacion-inteligente.png",
        },
        {
            title: "Contabilidad y reporting autónomos",
            description: "Genera pólizas, libros y KPIs gerenciales sin hojas de cálculo. Contabilidad viva en tiempo real.",
            bullets: [
                "Pólizas con explicación en lenguaje natural.",
                "Dashboards fiscales y administrativos siempre actualizados.",
                "Historial auditable de cada decisión del copiloto.",
            ],
            screenshot: "/screenshots/contabilidad-asistida.png",
        },
    ]), []);

    const flows = useMemo(() => ([
        {
            title: "Captura y digitalización en segundos",
            kicker: "Tickets, facturas y transferencias limpias en un mismo lugar.",
            description: "Reenvía tus correos, sube fotos o deja que tu equipo reporte desde la app móvil. El motor cognitivo detecta CFDI, categorías y deducibilidad sin intervención manual.",
            bullets: [
                "Reconocimiento de UUID con validación SAT.",
                "Clasificación enriquecida con catálogo SAT + políticas internas.",
                "Asignación automática de responsables y proyectos.",
            ],
            screenshot: "/screenshots/flow-captura.png",
        },
        {
            title: "Conciliación bancaria sin fricción",
            kicker: "Cada movimiento encuentra su par contable, y te dice por qué.",
            description: "Integramos bancos, tarjetas corporativas y wallets. El copiloto sugiere coincidencias con explicación en lenguaje natural; tú decides en un clic.",
            bullets: [
                "Detección predictiva de pagos fraccionados.",
                "Panel de pendientes por banco con level of confidence.",
                "Feedback loop para mejorar con cada aprobación.",
            ],
            screenshot: "/screenshots/flow-conciliacion.png",
        },
        {
            title: "Contabilidad viva y 100% auditable",
            kicker: "Pólizas, libros y KPIs actualizados todos los días.",
            description: "Cuenta con un copiloto que genera pólizas y justifica cada asiento. Los reportes fiscales y tesorería se actualizan solos al cierre del día.",
            bullets: [
                "Explainable AI: razones de cada póliza en español claro.",
                "KPIs gerenciales listos para juntas de dirección.",
                "Historial de cambios y bitácora lista para auditoría.",
            ],
            screenshot: "/screenshots/flow-reporting.png",
        },
    ]), []);

    const timeline = useMemo(() => ([
        {
            title: "Onboarding asistido",
            description: "Conectamos bancos, SAT y sistemas previos. Limpiamos catálogos y migramos históricos en horas, no semanas.",
        },
        {
            title: "Captura omnicanal",
            description: "Habilita email forwarding, WhatsApp y app móvil. Cada ticket o CFDI llega clasificado sin Excel.",
        },
        {
            title: "Conciliación continua",
            description: "Cada mañana el panel muestra qué movimientos se conciliaron solos y cuáles requieren tu revisión.",
        },
        {
            title: "Contabilidad autónoma",
            description: "Generamos pólizas, libros y KPIs. El equipo contable valida y aprueba; la IA documenta y explica.",
        },
    ]), []);

    const StatBadge = ({ label, value }) => {
        const badgeRef = useRef(null);
        const parsedValue = useMemo(() => {
            const match = value.match(/^(\d+)(.*)$/);
            if (!match) {
                return { number: null, suffix: "", full: value };
            }
            return {
                number: Number(match[1]),
                suffix: match[2],
            };
        }, [value]);
        const [displayNumber, setDisplayNumber] = useState(parsedValue.number !== null ? 0 : null);

        useEffect(() => {
            if (parsedValue.number === null) {
                setDisplayNumber(null);
                return;
            }
            setDisplayNumber(0);
            const badge = badgeRef.current;
            if (!badge) {
                return;
            }

            let frame;
            let hasAnimated = false;
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting && !hasAnimated) {
                            hasAnimated = true;
                            const start = performance.now();
                            const duration = 1600;

                            const animate = (now) => {
                                const progress = Math.min((now - start) / duration, 1);
                                const eased = 1 - Math.pow(1 - progress, 3);
                                const currentValue = Math.round(parsedValue.number * eased);
                                setDisplayNumber(currentValue);
                                if (progress < 1) {
                                    frame = requestAnimationFrame(animate);
                                } else {
                                    setDisplayNumber(parsedValue.number);
                                }
                            };

                            frame = requestAnimationFrame(animate);
                            observer.disconnect();
                        }
                    });
                },
                { threshold: 0.6 }
            );

            observer.observe(badge);

            return () => {
                if (frame) {
                    cancelAnimationFrame(frame);
                }
                observer.disconnect();
            };
        }, [parsedValue]);

        const renderValue =
            parsedValue.number === null || displayNumber === null
                ? parsedValue.full || value
                : `${displayNumber.toLocaleString()}${parsedValue.suffix}`;

        return (
            <div
                ref={badgeRef}
                className="rounded-2xl bg-white/95 backdrop-blur border border-[#D9E8F5] px-6 py-5 shadow-[0_18px_45px_rgba(17,68,110,0.08)] reveal-on-scroll"
                data-animate="reveal"
            >
                <p className="text-xs uppercase tracking-widest text-[#2D6DAA] font-semibold mb-2">{label}</p>
                <p className="text-lg text-[#11446E] font-semibold">
                    <span className="stat-count-value">{renderValue}</span>
                </p>
            </div>
        );
    };

    const PillButton = ({ children, variant = "solid", href }) => {
        const baseStyles = "pill-button rounded-full px-8 py-3 text-sm font-semibold transition-transform transform hover:-translate-y-0.5";
        const styles =
            variant === "ghost"
                ? "pill-button--ghost border border-[#D9E8F5] text-[#11446E] hover:bg-[#F2F9FF]"
                : "pill-button--solid bg-[#60B97B] hover:bg-[#4FA771] text-white shadow-[0_18px_40px_rgba(96,185,123,0.35)]";

        const Component = href ? "a" : "button";

        return (
            <Component href={href} className={`${baseStyles} ${styles}`}>
                {children}
            </Component>
        );
    };

    return (
        <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-white via-white to-[#F1F8F5] text-[#11446E] font-sans overflow-hidden">
            <div id="hero-particles" className="absolute inset-0 pointer-events-none" />
            {!particlesLoaded && (
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white via-white to-[#E4F1FD]" />
            )}

            {/* Navbar */}
            <header className="relative z-20 bg-white/95 backdrop-blur-md border-b border-[#D9E8F5] shadow-[0_10px_40px_rgba(17,68,110,0.08)]">
                <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-6 text-[#11446E]">
                    <div className="flex items-center gap-3">
                        <img src="/img/ContaFlow.png" alt="ContaFlow Logo" width={240} height={96} className="drop-shadow-[0_18px_40px_rgba(17,68,110,0.18)]" />
                    </div>
                    <div className="hidden md:flex items-center gap-6 text-sm text-[#2D6DAA]">
                        <a href="#modules" className="hover:text-[#11446E] transition-colors">Producto</a>
                        <a href="#flows" className="hover:text-[#11446E] transition-colors">Flujos</a>
                        <a href="#timeline" className="hover:text-[#11446E] transition-colors">Cómo funciona</a>
                        <a href="#cta" className="hover:text-[#11446E] transition-colors">Beta</a>
                    </div>
                    <div className="flex items-center gap-3">
                        <PillButton variant="ghost" href="#login">Iniciar sesión</PillButton>
                        <PillButton href="#cta">Unirme a la beta</PillButton>
                    </div>
                </nav>
            </header>

            {/* Hero */}
            <section className="relative z-10 py-24 px-6">
                <div className="pointer-events-none absolute inset-x-0 -top-32 h-[420px] bg-gradient-to-b from-[#E6F1FD] via-white to-transparent blur-2xl opacity-80" />
                <div className="relative flex flex-col items-center text-center max-w-6xl mx-auto gap-12 hero-aurora">
                    <div className="flex flex-col items-center gap-6 reveal-on-scroll" data-animate="reveal">
                        <div className="inline-flex items-center gap-3 bg-white border border-[#D9E8F5] px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.32em] text-[#2D6DAA] shadow-[0_12px_40px_rgba(45,109,170,0.12)]">
                            ERP + IA copiloto + Contabilidad autónoma
                        </div>
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight bg-gradient-to-r from-[#84D8A8] via-[#3C7FC0] to-[#1E5E9C] text-transparent bg-clip-text drop-shadow-lg">
                            Contabilidad que piensa, concilia y explica cada decisión
                        </h1>
                        <p className="text-lg md:text-xl text-[#40566C] max-w-3xl">
                            ContaFlow libera a tu equipo contable de la captura manual y te entrega visibilidad financiera en tiempo real. AI copilots que trabajan con rigor de despacho y velocidad de startup.
                        </p>
                        <div className="flex flex-col md:flex-row gap-4">
                            <PillButton href="#cta">Solicitar demo en vivo</PillButton>
                        <PillButton variant="ghost" href="#demo">Ver flujo interactivo</PillButton>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full text-left reveal-on-scroll" data-animate="reveal">
                        <StatBadge label="Tiempo ahorrado" value="82% menos horas de captura" />
                        <StatBadge label="Automatización real" value="91% de gastos conciliados solos" />
                        <StatBadge label="Visibilidad total" value="KPIs y pólizas en tiempo real" />
                    </div>
                </div>
            </section>

            {/* AI layers */}
            <section className="relative z-10 bg-white py-24 px-8 overflow-hidden" id="layers">
                <div className="pointer-events-none absolute inset-x-12 top-12 h-64 rounded-[48px] bg-gradient-to-r from-[#E8F6EE] via-white to-[#E6F1FD] blur-2xl opacity-80" />
                <div className="relative max-w-6xl mx-auto text-center mb-16 reveal-on-scroll" data-animate="reveal">
                    <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#84D8A8] to-[#3C7FC0] text-transparent bg-clip-text">
                        Tres capas de inteligencia que aprenden de tu negocio
                    </h2>
                    <p className="text-[#40566C] text-lg max-w-3xl mx-auto">
                        Combinamos modelos cognitivos, operativos y de decisión para automatizar todo el ciclo contable. Tú eliges qué aprueba la IA y qué decides validar.
                    </p>
                </div>

                <div className="relative max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                    {aiLayers.map((layer) => (
                        <div
                            key={layer.title}
                            className="bg-white/95 backdrop-blur border border-[#D9E8F5] rounded-3xl p-8 shadow-[0_18px_45px_rgba(17,68,110,0.08)] hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(17,68,110,0.16)] transition-all reveal-on-scroll"
                            data-animate="reveal"
                        >
                            <div className="text-3xl mb-4">{layer.icon}</div>
                            <h3 className="text-2xl font-semibold mb-3 text-[#11446E]">{layer.title}</h3>
                            <p className="text-[#40566C] text-base leading-relaxed">{layer.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Modules */}
            <section className="relative z-10 py-24 px-8 bg-white overflow-hidden" id="modules">
                <div className="pointer-events-none absolute -top-24 right-16 w-72 h-72 rounded-full bg-gradient-to-br from-[#E8F6EE] via-transparent to-[#E6F1FD] blur-3xl opacity-80" />
                <div className="relative max-w-6xl mx-auto mb-16 text-center reveal-on-scroll" data-animate="reveal">
                    <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#84D8A8] to-[#3C7FC0] text-transparent bg-clip-text">
                        El Sistema operativo contable que evoluciona contigo
                    </h2>
                    <p className="text-[#40566C] text-lg max-w-3xl mx-auto">
                        Cada módulo combina automatización con supervisión asistida. Control total con trazabilidad 100% auditable.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto space-y-16">
                    {modules.map((module, index) => (
                        <div
                            key={module.title}
                            className={`grid md:grid-cols-2 gap-12 items-center reveal-on-scroll ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
                            data-animate="reveal"
                        >
                            <div className="space-y-5">
                                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#2D6DAA]">
                                    <span className="text-lg">💡</span>
                                    Módulo
                                </span>
                                <h3 className="text-3xl font-semibold text-[#11446E]">{module.title}</h3>
                                <p className="text-[#40566C] leading-relaxed">{module.description}</p>
                                <ul className="space-y-3 text-[#46617A]">
                                    {module.bullets.map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <span className="text-[#2D6DAA] mt-0.5">●</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="relative rounded-3xl overflow-hidden border border-[#D9E8F5] bg-white shadow-[0_22px_60px_rgba(17,68,110,0.12)] parallax-card" data-parallax="tilt">
                                <img src={module.screenshot} alt={`Screenshot ${module.title}`} className="w-full h-full object-cover opacity-95" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#11446E]/18 via-transparent to-transparent" />
                                <p className="absolute bottom-4 left-4 text-xs uppercase tracking-widest text-[#2D6DAA]">
                                    Placeholder: reemplaza con screenshot real
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Flows */}
            <section className="relative z-10 py-28 px-8 bg-white overflow-hidden" id="flows">
                <div className="pointer-events-none absolute inset-x-10 top-0 h-72 bg-gradient-to-b from-[#E6F1FD] via-white to-transparent blur-2xl opacity-90" />
                <div className="relative max-w-6xl mx-auto text-center mb-16 reveal-on-scroll" data-animate="reveal">
                    <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#84D8A8] to-[#3C7FC0] text-transparent bg-clip-text">
                        Flujos inteligentes que documentan cada decisión
                    </h2>
                    <p className="text-[#40566C] text-lg max-w-3xl mx-auto">
                        La IA toma la carga operativa y deja un rastro explicable para contadores, CFOs y auditorías.
                    </p>
                </div>

                <div className="relative max-w-6xl mx-auto space-y-16">
                    {flows.map((flow) => (
                        <div
                            key={flow.title}
                            className="bg-gradient-to-br from-white via-[#F6FCFF] to-[#EBF5FF] border border-[#D9E8F5] rounded-3xl p-8 md:p-12 shadow-[0_24px_60px_rgba(17,68,110,0.12)] grid md:grid-cols-2 gap-10 items-center reveal-on-scroll"
                            data-animate="reveal"
                        >
                            <div className="space-y-4 text-left">
                                <span className="text-xs uppercase tracking-widest text-[#2D6DAA]">
                                    {flow.kicker}
                                </span>
                                <h3 className="text-3xl font-semibold text-[#11446E]">{flow.title}</h3>
                                <p className="text-[#40566C] leading-relaxed">{flow.description}</p>
                                <ul className="space-y-3 text-[#46617A]">
                                    {flow.bullets.map((bullet) => (
                                        <li key={bullet} className="flex items-start gap-3">
                                            <span className="text-[#60B97B] mt-0.5">✔</span>
                                            <span>{bullet}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="relative rounded-3xl overflow-hidden border border-[#D9E8F5] bg-white shadow-[0_22px_60px_rgba(17,68,110,0.12)] parallax-card" data-parallax="tilt">
                                <img src={flow.screenshot} alt={`Flow screenshot ${flow.title}`} className="w-full h-full object-cover opacity-95" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#11446E]/18 via-transparent to-transparent" />
                                <p className="absolute bottom-4 left-4 text-xs uppercase tracking-widest text-[#2D6DAA]">
                                    Placeholder: reemplaza con demo del flujo
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Timeline */}
            <section className="relative z-10 py-24 px-8 bg-white" id="timeline">
                <div className="timeline-progress-track hidden md:block" data-animate="timeline-progress" />
                <div className="relative max-w-5xl mx-auto text-center mb-14 reveal-on-scroll" data-animate="reveal">
                    <h2 className="text-4xl font-bold mb-4 text-[#11446E]">De onboarding a contabilidad autónoma en 4 pasos</h2>
                    <p className="text-[#40566C]">
                        Implementar ContaFlow no requiere proyectos eternos. Este es el recorrido de cualquier empresa que se suma a la beta.
                    </p>
                </div>

                <div className="relative max-w-5xl mx-auto space-y-12">
                    {timeline.map((step, index) => {
                        const isLast = index === timeline.length - 1;
                        return (
                            <div key={step.title} className="relative flex items-start gap-5 reveal-on-scroll" data-animate="reveal">
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E6F7EE] to-[#E6F1FD] border border-[#2D6DAA]/40 flex items-center justify-center text-[#11446E] font-semibold shadow-[0_10px_30px_rgba(17,68,110,0.12)]">
                                        {index + 1}
                                    </div>
                                    {!isLast && (
                                        <div className="hidden md:block w-px flex-1 bg-gradient-to-b from-[#2D6DAA]/35 via-[#60B97B]/25 to-transparent mt-3" />
                                    )}
                                </div>
                                <div className="flex-1 border border-[#D9E8F5] rounded-2xl px-6 py-5 bg-white shadow-[0_16px_40px_rgba(17,68,110,0.08)]">
                                    <h3 className="text-xl font-semibold text-[#11446E] mb-2">{step.title}</h3>
                                    <p className="text-[#40566C]">{step.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Testimonials */}
            <section className="relative z-10 py-24 px-8 bg-white overflow-hidden" id="stories">
                <div className="pointer-events-none absolute -bottom-24 left-20 w-80 h-80 rounded-full bg-gradient-to-tr from-[#E6F1FD] via-transparent to-[#E8F6EE] blur-3xl opacity-80" />
                <div className="relative max-w-6xl mx-auto text-center mb-14 reveal-on-scroll" data-animate="reveal">
                    <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#84D8A8] to-[#3C7FC0] text-transparent bg-clip-text">
                        Historias reales de despachos y CFOs
                    </h2>
                    <p className="text-[#40566C] max-w-3xl mx-auto">
                        ContaFlow nació trabajando junto a despachos top y áreas financieras exigentes. Así describen su nueva forma de trabajar.
                    </p>
                </div>

                <div className="relative max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
                    {[
                        {
                            quote: "Reducimos 80% del trabajo repetitivo. Cada póliza viene con explicación en español claro lista para auditoría.",
                            author: "Laura Hernández",
                            role: "Socia, Despacho Fiscalista MX",
                        },
                        {
                            quote: "Antes requeríamos tres personas para conciliar dos bancos. Ahora el copiloto lo hace solo y aprobamos excepciones.",
                            author: "Gustavo López",
                            role: "CFO, Scale-up logística",
                        },
                        {
                            quote: "Los cierres dejaron de ser una crisis. Los reportes conectados al SAT salen listos sin perseguir tickets.",
                            author: "María Torres",
                            role: "Contadora corporativa, Grupo Retail",
                        },
                    ].map((testimonial) => (
                        <div key={testimonial.author} className="bg-white/95 backdrop-blur border border-[#D9E8F5] rounded-3xl p-8 shadow-[0_22px_60px_rgba(17,68,110,0.12)] reveal-on-scroll" data-animate="reveal">
                            <p className="text-[#415F78] italic mb-6 leading-relaxed">“{testimonial.quote}”</p>
                            <div className="text-sm text-[#5F7990]">
                                <p className="text-[#11446E] font-semibold">{testimonial.author}</p>
                                <p>{testimonial.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="relative z-10 py-32 px-8 bg-white" id="cta">
                <div className="relative max-w-4xl mx-auto">
                    <div className="absolute inset-0 rounded-[36px] bg-gradient-to-r from-[#60B97B] via-[#2D6DAA] to-[#11446E] opacity-30 blur-2xl" />
                    <div className="relative text-center border border-[#D9E8F5] rounded-[32px] bg-white/95 px-10 md:px-16 py-16 shadow-[0_28px_70px_rgba(17,68,110,0.14)] cta-card reveal-on-scroll" data-animate="reveal">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-snug bg-gradient-to-r from-[#11446E] via-[#2D6DAA] to-[#60B97B] text-transparent bg-clip-text">
                            Da el salto a la contabilidad autónoma con IA explicable
                        </h2>
                        <p className="text-lg text-[#40566C] mb-10">
                            Únete a la beta privada y descubre cómo ContaFlow libera horas de tu equipo y documenta cada decisión para auditorías sin estrés.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <PillButton href="https://cal.com/">Agendar demo</PillButton>
                        <PillButton variant="ghost" href="#login">Crear cuenta beta</PillButton>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 py-12 text-center text-[#5F7990] text-xs border-t border-[#D9E8F5] bg-white">
                <img src="/img/ContaFlow.png" alt="ContaFlow Logo" width={150} height={60} className="mx-auto mb-4" />
                <p className="uppercase tracking-[0.35em] text-[#2D6DAA] mb-3">ContaFlow · ERP & Contabilidad Autónoma</p>
                <p className="text-[#46617A]">© 2025 ContaFlow — Reinventando la contabilidad con inteligencia artificial.</p>
                <div className="flex justify-center items-center gap-4 mt-4 text-[#6B859C]">
                    <a href="#" className="hover:text-[#11446E] transition-colors">Aviso de privacidad</a>
                    <a href="#" className="hover:text-[#11446E] transition-colors">Términos del servicio</a>
                    <a href="mailto:hola@contaflow.ai" className="hover:text-[#11446E] transition-colors">
                        hola@contaflow.ai
                    </a>
                </div>
            </footer>
        </div>
    );
};

window.ContaFlowLanding = ContaFlowLanding;
