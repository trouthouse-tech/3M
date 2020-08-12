import {Platform} from 'react-native';

// Font Types

const MAIN_REGULAR =
  Platform.OS === 'ios' ? 'OpenSans-Regular' : 'OpenSans-Regular.ttf';
const MAIN_ITALIC =
  Platform.OS === 'ios' ? 'OpenSans-Italic' : 'OpenSans-Italic.ttf';
const MAIN_BOLD = Platform.OS === 'ios' ? 'OpenSans-Bold' : 'OpenSans-Bold.ttf';

// Font Sizes

const small = {
  fontSize: 12,
};

const normal = {
  fontSize: 16,
};

const large = {
  fontSize: 20,
};

export {MAIN_REGULAR, MAIN_ITALIC, MAIN_BOLD, small, normal, large};

// Headings

export const h1 = {
  ...large,
};
