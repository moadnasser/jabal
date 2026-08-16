import { LanguageProvider } from "./controllers/LanguageProvider.jsx";
import { HomePage } from "./views/pages/HomePage.jsx";

/**
 * Application shell. The language controller wraps everything because the
 * active locale decides not just the copy but the writing direction and the
 * typeface, which every view below depends on.
 */
export default function App() {
  return (
    <LanguageProvider>
      <HomePage />
    </LanguageProvider>
  );
}
