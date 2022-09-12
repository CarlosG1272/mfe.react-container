const { merge } = require('webpack-merge')
const path = require('path')
const commonConfig = require('./webpack.common')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const packageJson = require('../package.json')
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin')

const devConfig = {
    entry: './src/index',
    mode: 'development', 
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'develop.js'
    }, 
    devServer: {
        open: true, 
        port: 3000,
        watchFiles: ['src/**/*.js', 'src/**/*.json', 'public/**/*']
    }, 
    module: {
        rules: [
            {
                test: /\.jsx?$/, 
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-react']
                }
            }
        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            // ELejimos el nombre para la aplicación, debe ser diferente al nombre de las externas
            name: 'container', 
            remotes: {
                // Enumeramos todas las aplicaciones remotas a las que se accederá, para esto reemplazamos con el identificador de la aplicación: 
                // Ejemplo--> dashboard:
                // 'dashboard@http://localhost:8080/remoteEntry.js'
                remote: 'remote@http://localhost:8080/remoteEntry.js',
            }, 
            // Usamos las mismas dependencias de los packages.json
            shared: packageJson.dependencies,
        }), 
        // Este plugin ayudará a establecer orígenes remotos en tiempo de ejecución dentro de los hosts
        new ExternalTemplateRemotesPlugin()
    ]
}

module.exports = merge(commonConfig, devConfig)