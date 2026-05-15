import * as React from "react";

const THEME_STORAGE_KEY = "netmetric-theme";

export function getThemeInitScript(): string {
  return `(function(){try{var key='${THEME_STORAGE_KEY}';var stored=localStorage.getItem(key);var theme=stored==='light'||stored==='dark'||stored==='system'?stored:'system';var dark=theme==='dark'||(theme==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);var root=document.documentElement;root.classList.toggle('dark',dark);root.style.colorScheme=dark?'dark':'light';}catch(e){}})();`;
}

export function ThemeInitScript(): React.JSX.Element {
  return <script dangerouslySetInnerHTML={{ __html: getThemeInitScript() }} />;
}
