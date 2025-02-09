// Reference: https://v2.chakra-ui.com/docs/styled-system/color-mode
import { extendTheme, ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
    initialColorMode: 'dark'
  };
  
  const theme = extendTheme({ 
    config
   });
  
  export default theme;