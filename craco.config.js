const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#c23616",
              "@link-color": "#273c75",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
