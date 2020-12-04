import baseStyled, { ThemedStyledInterface } from 'styled-components';

const color = {
   blue: '#2054ae',
   pink: '#c43683',
   black: '#24272a',
 };

 const theme = {
   color,
 };
 
 export type Theme = typeof theme;
 export const styled = baseStyled as ThemedStyledInterface<Theme>;
 export default theme
