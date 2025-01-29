import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { ConfigProvider, theme } from "antd";

type ColorModeContextType = {
  mode: string;
  setMode: (mode: string) => void;
};

export const ColorModeContext = createContext<ColorModeContextType>({} as ColorModeContextType);

export const ColorModeContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useState("light");

  const setColorMode = () => {
    if (typeof window !== "undefined") {
      const colorMode = window.localStorage.getItem("colorMode");
      if (colorMode) {
        setMode(colorMode);
      }
    }
  };

  useEffect(() => {
    setColorMode();
  }, []);

  useEffect(() => {
    window.localStorage.setItem("colorMode", mode);
  }, [mode]);

  const { defaultAlgorithm, darkAlgorithm } = theme;

  return (
    <ColorModeContext.Provider
      value={{
        mode,
        setMode,
      }}
    >
      <ConfigProvider
        theme={{
          algorithm: mode === "light" ? defaultAlgorithm : darkAlgorithm,
        }}
      >
        {children}
      </ConfigProvider>
    </ColorModeContext.Provider>
  );
}; 