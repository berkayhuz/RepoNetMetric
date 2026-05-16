import * as React from "react";

const THEME_STORAGE_KEY = "netmetric-theme";
const THEME_COOKIE_KEY = "netmetric-theme";

export function getThemeInitScript(serverTheme?: "light" | "dark" | "system"): string {
  const safeServerTheme =
    serverTheme === "light" || serverTheme === "dark" || serverTheme === "system"
      ? serverTheme
      : "system";

  return `(function(){try{var storageKey='${THEME_STORAGE_KEY}';var cookieKey='${THEME_COOKIE_KEY}';var serverTheme='${safeServerTheme}';var cookieTheme=(document.cookie.match(new RegExp('(?:^|; )'+cookieKey+'=([^;]*)'))||[])[1];cookieTheme=cookieTheme?decodeURIComponent(cookieTheme):null;var stored=localStorage.getItem(storageKey);var theme=stored==='light'||stored==='dark'||stored==='system'?stored:(cookieTheme==='light'||cookieTheme==='dark'||cookieTheme==='system'?cookieTheme:serverTheme);var dark=theme==='dark'||(theme==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);var root=document.documentElement;root.classList.toggle('dark',dark);root.style.colorScheme=dark?'dark':'light';}catch(e){}})();`;
}

export function ThemeInitScript(): React.JSX.Element {
  return <script dangerouslySetInnerHTML={{ __html: getThemeInitScript() }} />;
}
