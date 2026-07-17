import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LogoHome } from 'ui-component/Logo';
import PressableCard from 'ui-component/PressableCard';

export default function Header() {
    const navigate = useNavigate();

    return (
        <div
            className="h-screen w-screen flex flex-col justify-between overflow-hidden relative"
            style={{ background: 'linear-gradient(to bottom right, #1a1819, #0d0c0e)' }}
        >
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="border-b border-white/5 h-16 sm:h-20 px-4 sm:px-6 lg:px-[12%] flex items-center justify-between backdrop-blur-md z-50 relative shrink-0"
                style={{ backgroundColor: 'rgba(26, 24, 25, 0.9)' }}
            >
                <div className="flex items-center">
                    <LogoHome type="LogoNegative" width={160} className="sm:w-[180px]" />
                </div>
                <PressableCard>
                    <a
                        href="/siae"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 border border-white/10 hover:border-[#E31937]/40 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white/80 hover:text-white transition-all bg-transparent"
                    >
                        <OpenInNewIcon size={14} className="sm:w-[15px]" />
                        SIAE
                    </a>
                </PressableCard>
            </motion.header>

            <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center px-12 md:px-12 lg:px-[12%] py-4 sm:py-6 lg:py-0 flex-1 relative z-10 w-full max-w-full mx-auto">
                <div className="flex flex-col text-center lg:text-left items-center lg:items-start">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                        className="font-bold text-white leading-[1.05] tracking-tight mb-2 sm:mb-3"
                        style={{ fontFamily: 'Tahoma, sans-serif', fontSize: 'clamp(30px, 10vw, 70px)' }}>
                        <span className="text-[#E31937]">© SIISO</span>
                    </motion.h1>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                        className="font-semibold text-white/80 leading-[1.25] tracking-tight mb-4 sm:mb-6"
                        style={{ fontSize: 'clamp(18px, 4vw, 30px)' }}
                    >
                        Sistema Integral de Información
                        <br className="hidden sm:block" />
                        <span className="sm:hidden"> </span>de Salud Ocupacional
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
                        className="text-[13px] sm:text-[15px] text-white/50 leading-relaxed max-w-full lg:max-w-[460px] mb-2 sm:mb-4">
                        Plataforma estratégica para gestionar y optimizar la salud ocupacional en{' '}
                        <strong className="text-white/80 font-semibold">Drummond Ltd.</strong>, garantizando entornos laborales seguros y de alta eficiencia.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
                        className="flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-1 sm:gap-y-2 justify-center lg:justify-start items-center text-[11px] sm:text-xs text-white/40 font-['Calibri'] mt-2 sm:mt-4">
                        {['Módulos con IA', 'Dashboards Power BI', 'Gestión de Triage'].map((feature, idx) => (
                            <div key={feature} className="flex items-center gap-2 sm:gap-3">
                                <span>{feature}</span>
                                {idx < 2 && <span className="w-1 h-1 rounded-full bg-white/10 hidden sm:block" />}
                            </div>
                        ))}
                    </motion.div>
                </div>

                <div className="flex flex-col gap-4 sm:gap-5 justify-center items-center lg:items-start w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
                        className="w-full max-w-[calc(32rem-5px)] bg-brand-dark/60 hover:bg-brand-dark/80 border border-white/10 hover:border-white/20 rounded-2xl p-5 flex items-center justify-between gap-6 transition-all duration-300 ease-out hover:-translate-y-1.5 shadow-xl shadow-black/30 group">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center bg-white border border-white/10 rounded-xl p-3 w-20 h-20 shrink-0">
                                <LogoHome type="LogoVertical" width={60} />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-base font-bold text-white leading-tight">Drummond LTD</p>
                                <p className="text-xs text-white/60 font-['Calibri'] mt-1 leading-tight">Salud Ocupacional Minera • Control Clínico y Triage de Operaciones</p>
                            </div>
                        </div>
                        <PressableCard>
                            <button
                                onClick={() => navigate("/login")}
                                className="shrink-0 h-9 px-5 flex items-center justify-center gap-2 bg-[#E31937] hover:bg-[#b91329] text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-[#E31937]/10"
                            >
                                Ingresar
                            </button>
                        </PressableCard>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
                        className="w-full max-w-[calc(32rem-5px)] bg-brand-dark/60 hover:bg-brand-dark/80 border border-white/10 hover:border-white/20 rounded-2xl p-5 flex items-center justify-between gap-6 transition-all duration-300 ease-out hover:-translate-y-1.5 shadow-xl shadow-black/30 group">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center bg-white border border-white/10 rounded-xl p-3 w-20 h-20 shrink-0">
                                <LogoHome type="LogoEnergy" width={60} />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-base font-bold text-white leading-tight">Drummond Energy</p>
                                <p className="text-xs text-white/60 font-['Calibri'] mt-1 leading-tight">Vigilancia Epidemiológica • Gestión de Salud en Infraestructura Energética</p>
                            </div>
                        </div>
                        <PressableCard>
                            <button
                                onClick={() => window.open('https://siiso.drummondenergy.com:444/login', '_blank', 'noopener,noreferrer')}
                                className="shrink-0 h-9 px-5 flex items-center justify-center gap-2 bg-[#E31937] hover:bg-[#b91329] text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-[#E31937]/10 whitespace-nowrap"
                            >
                                Ir al portal
                            </button>
                        </PressableCard>
                    </motion.div>
                </div>
            </main>

            <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
                className="h-10 sm:h-12 border-t border-white/5 bg-transparent flex items-center justify-center shrink-0 z-50 relative"
            >
                <p className="text-[9px] sm:text-[12px] text-center px-4 text-white/60 font-medium tracking-wide">
                    © {new Date().getFullYear()} Drummond Ltd. Colombia — V 5.0. Área de Salud Ocupacional
                </p>
            </motion.footer>

            <div className="absolute top-[-120px] right-[-120px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(227,25,55,0.12)_0%,transparent_60%)] pointer-events-none z-0 mix-blend-screen" />
            <div className="absolute bottom-[-100px] left-[-80px] w-[480px] h-[480px] rounded-full bg-[radial-gradient(circle,rgba(227,25,55,0.06)_0%,transparent_60%)] pointer-events-none z-0 mix-blend-screen" />
        </div>
    );
}