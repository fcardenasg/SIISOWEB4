import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

import Routes from 'routes';

import themes from 'themes';

import Locales from 'ui-component/Locales';
import NavigationScroll from 'layout/NavigationScroll';
import Snackbar from 'ui-component/extended/Snackbar';

import { JWTProvider } from 'contexts/JWTContext';
import { Toaster } from 'react-hot-toast';

const App = () => {
    const customization = useSelector((state) => state.customization);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <Toaster reverseOrder={false} duration={3000} />
                
                <CssBaseline />
                <Locales>
                    <NavigationScroll>
                        <JWTProvider>
                            <>
                                <Routes />
                                <Snackbar />
                            </>
                        </JWTProvider>
                    </NavigationScroll>
                </Locales>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
