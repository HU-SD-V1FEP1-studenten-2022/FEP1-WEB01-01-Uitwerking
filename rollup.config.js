import html from '@web/rollup-plugin-html';
import resolve from '@rollup/plugin-node-resolve';
import { copy } from '@web/rollup-plugin-copy';

export default {
  plugins: [
    html({
      input: [
        'pages/**/*.html',
        '*.html',
      ],
    }),
    resolve(),
    copy({
      patterns: [
        'images/**/*',
      ],
    }),
  ],
  output: {
    dir: 'dist',
  },
};
