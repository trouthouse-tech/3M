import {Platform} from 'react-native';

// Font Types

export const MAIN_REGULAR =
  Platform.OS === 'ios' ? 'OpenSans-Regular' : 'OpenSans-Regular.ttf';
export const MAIN_ITALIC =
  Platform.OS === 'ios' ? 'OpenSans-Italic' : 'OpenSans-Italic.ttf';
export const MAIN_BOLD =
  Platform.OS === 'ios' ? 'OpenSans-Bold' : 'OpenSans-Bold.ttf';

export const smallest = 12;
export const smaller = 14;
export const small = 16;
export const normal = 18;
export const large = 20;
export const larger = 22;
export const largest = 24;

// Headings

export const h1 = {
  fontSize: large,
};
