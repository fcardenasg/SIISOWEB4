import 'assets/scss/otherstyles.scss';
import { useEffect } from 'react';

const FullScreenModal = ({ onClose, children }) => {

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div className="fullscreen-overlay" onClick={onClose}>
            <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
                {/* Botón de cierre con tooltip */}
                <div className="tooltip-container">
                    <button className="close-button-bottom" onClick={onClose}>
                        ×
                    </button>
                    <span className="tooltip-text">Cerrar</span>
                </div>

                {/* Contenido del PDF */}
                <div className="pdf-container">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default FullScreenModal;