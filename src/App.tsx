import { lazy, Suspense, useState, useEffect } from "react";
import "./App.css";

const CharacterModel = lazy(() => import("./components/Character"));
const MainContainer = lazy(() => import("./components/MainContainer"));
const AdminPortal = lazy(() => import("./components/AdminPortal"));
import { LoadingProvider } from "./context/LoadingProvider";

const App = () => {
  const [isAdminRoute, setIsAdminRoute] = useState(
    window.location.pathname.toLowerCase().endsWith("/admin")
  );

  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdminRoute(window.location.pathname.toLowerCase().endsWith("/admin"));
    };

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  if (isAdminRoute) {
    return (
      <Suspense fallback={<div style={{ color: "#fff", padding: "40px", textAlign: "center" }}>Loading Admin Portal...</div>}>
        <AdminPortal />
      </Suspense>
    );
  }

  return (
    <>
      <LoadingProvider>
        <Suspense>
          <MainContainer>
            <Suspense>
              <CharacterModel />
            </Suspense>
          </MainContainer>
        </Suspense>
      </LoadingProvider>
    </>
  );
};

export default App;
