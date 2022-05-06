module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'], //指定所有page，使生产构建中对未使用的样式摇树优化
  presets: [
    require("./src/assets/css/element.js")
  ],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  plugins: [],
  theme: {
    backgroundColor: theme=> ({
      ...theme('colors'),
      'aside': '#545c64', //添加自定义颜色
    })
  }
}
