# react-dark-theme-context

[![NPM](https://img.shields.io/npm/v/react-dark-theme-context.svg)](https://www.npmjs.com/package/react-dark-theme-context)
![dependencies status](https://img.shields.io/librariesio/release/npm/react-dark-theme-context)

Tools to detect, switch and save dark theme for react applications

## ThemeProvider

This is the component that detects the setted theme by the browser settings and stores it in `localStorage`.

```tsx
import { ThemeProvider } from "react-dark-theme-context";

// ...

<ThemeProvider>
  {yourReactApplication}
</ThemeProvider>
```

### Props

- **localStorageKey** - `string` - The key of local storage to save the selected theme.
- **defaultTheme** - `"dark" | "light" | "no-preference"` - Theme setted by default. Can be `"no-preference"` for automatical detection.
- **defaultDisplayTheme** - `"dark" | "light"` - Theme displayed if setted theme is `"no-preference"`;
- **children**

## useTheme

This is the hook to get and change the current theme.

```tsx
import { useTheme } from "react-dark-theme-context";

// ...

const {
  displayTheme,
  setTheme,
  theme,
} = useTheme();
```

- **displayTheme** - `"dark" | "light"` - Theme that currently displayed.
- **theme** - `"dark" | "light" | "no-preference"` - Theme that currently setted. Can be `no-preference` for automatical detection.
- **setTheme** - `(nextTheme: ThemeType) => void` - Theme change function;
