import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

import theme from "./theme";
import { RouterProvider } from "react-router-dom";
import routes from "./Routes/routes";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <RouterProvider router={routes} />
        {/* <App/> */}
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
