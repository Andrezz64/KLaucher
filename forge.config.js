module.exports = {
  packagerConfig: {icon:'Logo'},
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        iconUrl: "https://www.alterdata.com.br/images/fixo/logo_alterdata_small.svg",
        setupIcon: 'icon.ico'
      },
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
      config:{icon: 'icon.ico'}
    },
    {
      name: '@electron-forge/maker-deb',
      config: {icon: 'icon.ico'},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {icon: 'icon.ico'},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-webpack',
      config: {
        mainConfig: './webpack.main.config.js',
        renderer: {
          config: './webpack.renderer.config.js',
          entryPoints: [
            {
              html: './src/index.html',
              js: './src/renderer.js',
              name: 'main_window',
              preload: {
                js: './src/preload.js',
              },
            },
          ],
        },
      },
    },
  ],
};
