const path = require('path');

// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');

module.exports = {
  outputDir: path.resolve(__dirname, 'docs'),
  lintOnSave: false,
  transpileDependencies: [
    'vuetify',
  ],
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        CANVAS_RENDERER: JSON.stringify(true),
        WEBGL_RENDERER: JSON.stringify(true),
      }),
    ],
  },
  chainWebpack: (config) => {
    // HTML Title used for OpenGraph linters (social media links)
    config.plugin('html').tap((args) => {
      // eslint-disable-next-line no-param-reassign
      args[0].title = 'Happy Birthday Enna!';
      // eslint-disable-next-line no-param-reassign
      args[0].meta = {
        description: 'Aloupeeps celebrate Enna Alouette\'s Birthday in 2022',
        'og:title': 'Happy Birthday Enna!',
        'og:type': 'website',
        'og:description': 'Aloupeeps celebrate Enna Alouette\'s Birthday in 2022',
        // 'og:image': 'https://bday2022.ennaalouette.com/share.png',
        'twitter:card': 'summary_large_image',
        'twitter:title': 'Happy Birthday Enna!',
        'twitter:description': 'Aloupeeps celebrate Enna Alouette\'s Birthday in 2022',
        // 'twitter:image': 'https://bday2022.ennaalouette.com/share.png',
      };
      return args;
    });
    // Disable hot reload
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        // eslint-disable-next-line no-param-reassign
        options.hotReload = false;
        return options;
      });
    // Disable base64 image url-loader
    config.module
      .rule('images')
      .use('url-loader')
      .tap((options) => {
        // eslint-disable-next-line no-param-reassign
        options.limit = 1;
        return options;
      });
  },
  pwa: {
    name: 'Enna Birthday',
    themeColor: '#102471',
    workboxOptions: {
      skipWaiting: true,
      exclude: [
        'CNAME',
        /(.*).css.map/g,
        /(.*).js.map/g,
      ],
    },
    assetsVersion: '2022_02_08_04_00',
    manifestOptions: {
      name: 'Enna Birthday',
      short_name: 'Enna Birthday',
      description: 'Aloupeeps celebrate Enna Alouette\'s Birthday in 2022',
      display: 'standalone',
      orientation: 'landscape',
      background_color: '#ffffff',
      start_url: './',
    },
  },
};
