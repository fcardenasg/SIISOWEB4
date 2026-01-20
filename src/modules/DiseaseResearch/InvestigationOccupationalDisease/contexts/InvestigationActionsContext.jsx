import { createContext, useContext } from 'react';

/**
 * Context para manejar las acciones de investigación
 * Esto elimina el prop drilling de métodos a través de múltiples niveles de componentes
 */
export const InvestigationActionsContext = createContext(null);

/**
 * Provider del contexto de acciones de investigación
 * @param {Object} props
 * @param {Function} props.onOpenChat - Callback para abrir el chat
 * @param {Function} props.onGoAttention - Callback para ir a atender
 * @param {Function} props.onDelete - Callback para eliminar
 * @param {Function} props.onRestore - Callback para restaurar/devolver
 * @param {Function} props.onReview - Callback para revisar
 * @param {number} props.numStatus - Estado numérico del usuario
 * @param {React.ReactNode} props.children - Componentes hijos
 */
export const InvestigationActionsProvider = ({
    onOpenChat,
    onGoAttention,
    onDelete,
    onRestore,
    onReview,
    numStatus,
    children
}) => {
    const value = {
        onOpenChat,
        onGoAttention,
        onDelete,
        onRestore,
        onReview,
        numStatus
    };

    return (
        <InvestigationActionsContext.Provider value={value}>
            {children}
        </InvestigationActionsContext.Provider>
    );
};

/**
 * Hook personalizado para usar el contexto de acciones de investigación
 * @returns {Object} Objeto con todas las acciones disponibles
 * @throws {Error} Si se usa fuera del provider
 */
export const useInvestigationActions = () => {
    const context = useContext(InvestigationActionsContext);

    if (!context) {
        throw new Error('useInvestigationActions debe ser usado dentro de InvestigationActionsProvider');
    }

    return context;
};
