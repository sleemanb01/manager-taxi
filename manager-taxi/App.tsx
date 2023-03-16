import { AuthContextProvider } from "./src/hooks/auth-context";
import { Root } from "./src/components/util/Navigation/Root";
import React from "react";
import { handleLang } from "./src/util/handleLang";
import { Loading } from "./src/components/util/Loading";
import { Provider as PaperProvider } from "react-native-paper";
import { theme } from "./src/styles/theme";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import LandingPage from "./src/components/util/LandingPage";

export default function App() {
  const [showLandingPage, setShowLandingPage] = React.useState(true);

  React.useEffect(() => {
    const toRef = setTimeout(() => {
      setShowLandingPage(false);
      clearTimeout(toRef);
    }, 2000);
  }, []);

  React.useLayoutEffect(() => {
    handleLang();
  }, []);

  if (showLandingPage) {
    return <LandingPage />;
  }

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <PaperProvider theme={theme}>
        <AuthContextProvider>
          <React.Suspense fallback={<Loading />}>
            <Root />
          </React.Suspense>
        </AuthContextProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
