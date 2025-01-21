import SessionProvider from "@/auth/SessionContext";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/providers/theme-provider";
import { Outlet } from "react-router-dom";

// Wrapping all providers in here
export default function Root() {
  return (
    <SessionProvider>
      <ThemeProvider defaultTheme="system" storageKey="ui-theme">
        <Outlet />
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  );
}
