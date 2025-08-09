// craco.config.js
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.ignoreWarnings = [
        {
          module: /@supabase\/realtime-js/,
          message: /Critical dependency: the request of a dependency is an expression/,
        },
      ];
      return webpackConfig;
    },
  },
};
