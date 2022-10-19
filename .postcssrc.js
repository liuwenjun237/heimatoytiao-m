// postcss.config.js
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      propList: ['*']
    }
    // 'postcss-px-to-viewport': {
    //   //   viewportWidth({file}) {
    //   //     return file.indexOf('vant') != -1 ? 375 : 750
    //   //   }
    //   viewportWidth: 750
    //   //   include: /\/src\//,
    // }
  }
}
