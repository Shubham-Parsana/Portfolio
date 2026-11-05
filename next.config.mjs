/** GLSL files are imported as strings: webpack (build) and Turbopack (dev) both covered. */
export default {
  reactStrictMode: true,
  turbopack: { rules: { '*.glsl': { loaders: ['raw-loader'], as: '*.js' } } },
  webpack(config) {
    config.module.rules.push({ test: /\.glsl$/, type: 'asset/source' });
    return config;
  },
};
