// theme.ts (tsx file with usage of StyleFunctions, see 4.)
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: "#000000",
        color: "white",
      },
      // styles for the `a`
      a: {
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
});

export default theme;
