

const {
  override,
  addLessLoader,
  fixBabelImports,
  addDecoratorsLegacy,
  addWebpackExternals,
  addWebpackAlias,
  overrideDevServer,
  addWebpackModuleRule
} = require('customize-cra')


const path = require('path')
// const resolve = (src) => path.resolve(__dirname, '.', src)
const resolve = (src) => path.join(__dirname, src)

// eslint-disable-next-line no-unused-vars
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer') // 分析模块

// eslint-disable-next-line no-unused-vars
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin') // 缓存 (开发)

// eslint-disable-next-line no-unused-vars
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin') // runtime 打包进html

const isDev = process.env.NODE_ENV === 'development'


const ApiTarget = 'www.baidu.com'

// devServer
const devServerConfig = () => config => {
  return {
    ...config,
    proxy: {
      '/api': {
        target: ApiTarget,
        changeOrigin: true,
        secure: false
      }
    }
  }
}

// plugins
const plugins = []
plugins.push(new BundleAnalyzerPlugin())
// 开发阶段 plugin 包
if (isDev) {
  plugins.push(new HardSourceWebpackPlugin())
} else {

  plugins.push(
    new ScriptExtHtmlWebpackPlugin(
      {
        // `runtime` must same as runtimeChunk name. default is `runtime`
        inline: /runtime\..*\.js$/
      })
  )
}

const invade = (target, name, callback) => {
  target.forEach(item => {
    if (item.constructor.name === name) {
      callback(item)
    }
  })
}
let cdn = {};
let externals = {}
// 配置cdn
if (!isDev) {
  cdn = {
    // 'react': 'https://cdn.bootcdn.net/ajax/libs/react/17.0.2/umd/react.development.js',
    // 'react-dom': 'https://cdn.bootcdn.net/ajax/libs/react-dom/17.0.2/umd/react-dom.production.min.js',

  }

  externals = {
    // 'react': 'React',
    // 'react-dom': 'ReactDOM',


  }

}


// 自定义 操作
const customize = () => config => {
  // console.log(config)
  console.log(config.plugins)
  console.log(config.plugins[0])
  console.log(config.plugins[0].options)
  // 生产阶段
  if (!isDev) {
    config.plugins[0].options.cdn = Object.values(cdn)
    // map
    config.devtool = false

    // pubicPath
    // config.output.publicPath = './';
    // const paths = require('react-scripts/config/paths');
    // paths.appBuild = resolve('APPINFO');
    // config.output.path = resolve('APPINFO');
    // 文件名去除chunk
    config.output.chunkFilename = config.output.chunkFilename.replace('.chunk', '')
    // dropConsole comments
    invade(config.optimization.minimizer, 'TerserPlugin', e => {
      // e.options.terserOptions.compress.drop_console = true
      // e.options.extractComments = false
    })
    invade(config.plugins, 'MiniCssExtractPlugin', e => {
      e.options.chunkFilename = e.options.chunkFilename.replace('.chunk', '')
    })

    // --- 公共包配置 ---
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        // 其次: 打包业务中公共代码
        common: {
          name: "test-components",
          chunks: "all",
          test: resolve('src/components'),
          minChunks: 2, //  minimum common number
          priority: 10,
          reuseExistingChunk: true
        },
        // 首先: 打包node_modules中的文件
        vender: {
          name: "test-vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: 10
        }
      }
    }
    config.optimization.runtimeChunk = 'single'
  }


  // -------- px-to-viewport -------
  require('react-app-rewire-postcss')(config, {
    plugins: loader => [
      require('postcss-flexbugs-fixes'),
      require('postcss-preset-env')({
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
      }),
      require('postcss-aspect-ratio-mini')({}),
      require('postcss-px-to-viewport')({
        viewportWidth: 750, // (Number) The width of the viewport.
        viewportHeight: 1334, // (Number) The height of the viewport.
        unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
        viewportUnit: 'vw', // (String) Expected units.
        exclude: /(\/|\\)(node_modules)(\/|\\)/,
        selectorBlackList: ['.ignore', '.hairlines',
          '.fz',
          '.fz12',
          '.fz14',
          '.fz16',
          '.fz18',
          '.fz20',
        ], // (Array) The selectors to ignore and leave as px.
        minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
        mediaQuery: false // (Boolean) Allow px to be converted in media queries.
      }),
      require('postcss-write-svg')({
        utf8: false
      }),
      require('postcss-viewport-units')({}),
      require('cssnano')({
        preset: "advanced",
        autoprefixer: false,
        "postcss-zindex": false
      })
    ]
  });
  // -------------



  // config.optimization.splitChunks = {
  //   chunks: "all",          //async异步代码分割 initial同步代码分割 all同步异步分割都开启
  //   minSize: 30000,         //字节 引入的文件大于30kb才进行分割
  //   //maxSize: 50000,         //50kb，尝试将大于50kb的文件拆分成n个50kb的文件
  //   minChunks: 1,           //模块至少使用次数
  //   maxAsyncRequests: 5,    //同时加载的模块数量最多是5个，只分割出同时引入的前5个文件
  //   maxInitialRequests: 3,  //首页加载的时候引入的文件最多3个
  //   automaticNameDelimiter: '~', //缓存组和生成文件名称之间的连接符
  //   name: false,                  //缓存组里面的filename生效，覆盖默认命名
  //   cacheGroups: { //缓存组，将所有加载模块放在缓存里面一起分割打包
  //     vendors: {  //自定义打包模块
  //       test: /[\\/]node_modules[\\/]/,
  //       priority: -10, //优先级，先打包到哪个组里面，值越大，优先级越高
  //       filename: 'vendors.js',
  //     },
  //     default: { //默认打包模块
  //       priority: -20,
  //       reuseExistingChunk: true, //模块嵌套引入时，判断是否复用已经被打包的模块
  //       filename: 'common.js'
  //     }
  //   }
  // }


  // style-resource-loader
  const loaders = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf

  loaders[loaders.length - 3].use.push({
    loader: 'style-resources-loader',
    options: {
      patterns: [resolve('src/styles/common.less'),],
      injector: 'append'
    }
  })
  // addPlugin
  config.plugins.push(...plugins)
  return config
}



module.exports = {

  webpack: override(
    addDecoratorsLegacy(),
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
        sourceMap: false
      }
    }),
    fixBabelImports('import', {
      libraryName: 'antd-mobile',
      libraryDirectory: 'es',
      // style: 'css',
      style: true,
    }),
    customize(),
    addWebpackExternals(externals),
    addWebpackAlias({
      '@': resolve('src'),
      'views': resolve('src/views'),
      'common': resolve('src/components'),
      'store': resolve('src/store'),
      'routes': resolve('src/routes'),
      'utils': resolve('src/utils'),
      'styles': resolve('src/styles'),
      'assets': resolve('src/assets'),
    }),
    addWebpackModuleRule({
      test: /.svg$/,
      include: [resolve('src/icons')],
      use: [
        {
          loader: 'svg-sprite-loader',
          options: {
            symbolId: "icon-[name]"
          }
        }
      ]
    })
  ),
  devServer: overrideDevServer(devServerConfig())
}