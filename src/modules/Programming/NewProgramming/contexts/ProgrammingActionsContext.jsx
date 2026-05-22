import { createContext, useContext } from 'react';
export const ProgrammingActionsContext = createContext(null);

export const ProgrammingActionsProvider = ({
    onOpenChat,
    onGoAttention,
    children
}) => {
    const value = {
        onOpenChat,
        onGoAttention,
    };

    return (
        <ProgrammingActionsContext.Provider value={value}>
            {children}
        </ProgrammingActionsContext.Provider>
    );
};

export const useProgrammingActions = () => {
    const context = useContext(ProgrammingActionsContext);

    if (!context) {
        throw new Error('useProgrammingActions debe ser usado dentro de ProgrammingActionsProvider');
    }

    return context;
};