import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    primary: '#683257',
    primaryDark: '#42213d',
    white500: '#c2c1c2',
  },
  components: {
    Text: {
      baseStyle: {
        width: 'full',
        fontFamily: "Poppins", // Changed "FontFace" to "fontFamily"
      },
      Heading: {
        baseStyle: {
          width: 'full',
          color: '#000',
        },
      },
    },
  },
});

export default customTheme;
