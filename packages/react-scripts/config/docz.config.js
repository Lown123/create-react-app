const paths = require('./paths');

export default {
  typescript: true,
  modifyBundlerConfig: config => {
    const jsxPluginIndex = config.plugins.findIndex(
      plugin => plugin.config.id === 'jsx'
    );
    const { loaders } = config.plugins[jsxPluginIndex].config;
    const docGenLoaderIndex = loaders.findIndex(loader =>
      /react-docgen-typescript-loader/.test(loader.loader)
    );
    const docGenLoader = loaders[docGenLoaderIndex];

    docGenLoader.options = {
      tsconfigPath: paths.appTsConfig,
      propFilter: prop => {
        if (prop.parent == null) {
          return true;
        }

        // Filter out props which type definition is placed in react package
        return prop.parent.fileName.indexOf('node_modules/@types/react') < 0;
      },
    };

    return config;
  },
};
