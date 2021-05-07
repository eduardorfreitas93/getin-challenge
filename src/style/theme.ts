import { DefaultTheme } from 'styled-components/native';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      darkDown: string;
      dark: string;
      white: string;
      lightDown: string;
      light: string;
      lightMedium: string;
      lightUp: string;
    };

    fonts: {
      h1: string;
      h2: string;
      h3: string;
      h4: string;
      h5: string;
      h6: string;
      lead: string;
      paragraph: string;
      small: string;
    };
  }
}

export const lightTheme: DefaultTheme = {
  colors: {
    primary: '#ED1C24',
    darkDown: '#333',
    dark: '#666',
    white: '#fff',
    lightDown: '#aaa',
    light: '#ccc',
    lightMedium: '#E6E6E6',
    lightUp: '#F2F2F2',
  },

  fonts: {
    h1: '32px',
    h2: '24px',
    h3: '20px',
    h4: '17px',
    h5: '15px',
    h6: '16px',
    lead: '17px',
    paragraph: '14px',
    small: '12px',
  },
};
