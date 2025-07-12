import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./Router";
import Router from "./Router";
import axios from "axios";
import LogoButton from "./components/atoms/LogoSawer";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Impor GoogleOAuthProvider

axios.defaults.withCredentials = true;

const clientId = import.meta.env.VITE_OAUTH_CLIENT_ID

function App() {
  return (
    // Bungkus seluruh aplikasi dengan GoogleOAuthProvider
    <GoogleOAuthProvider clientId={clientId}>
      <QueryClientProvider client={queryClient}>
        <LogoButton />
        <Router />
        <ReactQueryDevtools position="top" buttonPosition="bottom-left" />
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default App;