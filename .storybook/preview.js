import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

// 커스텀 뷰포트
const customViewports = {
  galaxys20: {
    name: 'Galaxy S20',
    styles: {
      width: '360px',
      height: '800px',
    },
  },
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  // 뷰포트
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
      ...customViewports,
    },
    // defaultViewport: 'galaxys9',
  },
  // 배경색
  backgrounds: {
    default: 'twitter',
    values: [
      {
        name: 'light',
        value: '#fff',
      },
      {
        name: 'brick',
        value: '#00B2A9',
      },
      {
        name: 'dark',
        value: 'black',
      },
    ],
  },
};

// export const globalTypes = {
//   locale: {
//     name: 'Locale',
//     description: 'Internationalization locale',
//     defaultValue: 'en',
//     toolbar: {
//       icon: 'globe',
//       items: [
//         { value: 'en', right: '🇺🇸', title: 'English' },
//         { value: 'fr', right: '🇫🇷', title: 'Français' },
//         { value: 'es', right: '🇪🇸', title: 'Español' },
//         { value: 'zh', right: '🇨🇳', title: '中文' },
//         { value: 'kr', right: '🇰🇷', title: '한국어' },
//       ],
//     },
//   },
// };
