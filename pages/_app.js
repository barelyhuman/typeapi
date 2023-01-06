import { IBM_Plex_Sans } from "@next/font/google";
import "../styles/globals.css";

const sans = IBM_Plex_Sans({
  weight: "400",
});

export default function App({ Component, pageProps }) {
  return (
    <main className={sans.className}>
      <Component {...pageProps} />
    </main>
  );
}
