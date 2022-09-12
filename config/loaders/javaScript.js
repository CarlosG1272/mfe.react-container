module.exports = {
    test: /\.(js | ts | jsx | tsx)$/, 
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader', 
        options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'] // Evita realizar acciones de forma duplicada a un mismo archivo
        }
    }
}