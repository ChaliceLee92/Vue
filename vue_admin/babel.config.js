module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false
            }
        ]
    ],
    plugins: ['lodash', '@babel/plugin-transform-runtime', 'transform-vue-jsx']
}
