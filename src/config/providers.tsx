
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import customTheme from '../theme/customTheme'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ChakraProvider theme={customTheme}>
            <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
            {children}
        </ChakraProvider>
    )
}