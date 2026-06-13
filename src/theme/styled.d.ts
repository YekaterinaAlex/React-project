import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    background: string;
    text: string;

    cardBackground: string;
    cardHoverBackground: string;

    buttonBackground: string;
    buttonHoverBackground: string;

    border: string;

    inputBackground: string;
  }
}
