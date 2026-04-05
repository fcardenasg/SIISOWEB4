import { createContext, useContext } from 'react';

export const InvestigationActionsContext = createContext(null);

export const InvestigationActionsProvider = ({
    onOpenChat,
    onGoAttention,
    onDelete,
    onRestore,
    onReview,
    onReport,
    loadingReport,
    openReport,
    reportUrl,
    numStatus,
    children
}) => {
    const value = {
        onOpenChat,
        onGoAttention,
        onDelete,
        onRestore,
        onReview,
        onReport,
        loadingReport,
        openReport,
        reportUrl,
        numStatus
    };

    return (
        <InvestigationActionsContext.Provider value={value}>
            {children}
        </InvestigationActionsContext.Provider>
    );
};

export const useInvestigationActions = () => {
    const context = useContext(InvestigationActionsContext);

    if (!context) {
        throw new Error('useInvestigationActions debe ser usado dentro de InvestigationActionsProvider');
    }

    return context;
};