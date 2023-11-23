import { Provider as ReduxProvider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'

import store from './plugins/stores'
import GlobalStyle from './assets/styles/globalStyles'
import RoutesGroup from './routes/RoutesGroup'

function App() {
    return (
        <>
            <GlobalStyle />
            <ReduxProvider store={store}>
                <ChakraProvider>
                    <RoutesGroup />
                </ChakraProvider>
            </ReduxProvider>
        </>
    )
}

export default App
