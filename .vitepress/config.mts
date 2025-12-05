import { defineConfig } from 'vitepress'
import { set_sidebar } from './auto_sidebar.ts'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ETS2LA 中文维基",
  description: "ETS2LA 的中文文档",
  ignoreDeadLinks: true,
  themeConfig: {
      siteTitle: "ETS2LA 中文维基",
      logo: "/image/svg/logo.svg",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
        {
            text: '文档', items: [
                {text: "基础", link: "/docs/base/install"},
                { // 带分割线的导航栏
                    items:[
                        {text: "进阶", link: "/docs/advanced/manual-install"},
                    ],
                },
            ],
        },
      { text: '作者', link: '/author/' },
      { text: '赞助名单', link: '/sponsored/' }
    ],

    sidebar: {
      '/docs/base/': set_sidebar('/docs/base/'),
      '/docs/advanced/': set_sidebar('/docs/advanced/'),
      '/author/': set_sidebar('/author/'),
      '/sponsored/': set_sidebar('/sponsored/'),
      '/': set_sidebar('')
    },

    outline: 'deep',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ETS2LA/Euro-Truck-Simulator-2-Lane-Assist' },
      { icon: 'discord', link: 'https://ets2la.com/discord' },
      { icon: {
        svg: '<svg t="1764297309339" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4765" width="200" height="200"><path d="M153.930323 0L0 724.067097l56.485161 108.345806h370.621936l86.214193 166.152258h83.571613l36.005162-166.152258h229.24387l150.95742-719.44258L952.980645 0H153.930323z m45.584516 706.56L328.010323 114.952258h190.926451l-32.701935 152.609032 141.047742-158.224516h185.64129l-14.534194 79.27742-214.709677 249.393548 115.612903 202.157419-16.516129 66.394839h-176.392258l-84.892903-157.894194-27.086452 157.894194h-194.890322z" p-id="4766"></path></svg>'
      },
      link: 'https://www.kookapp.cn/app/invite/VZaUPP',
      ariaLabel: 'kook link' },
      { icon: {
        svg: '<svg t="1764297464837" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6582" width="200" height="200"><path d="M789 610.3c-38.7-12.9-90.7-32.7-148.5-53.6 34.8-60.3 62.5-129 80.7-203.6H530.5v-68.6h233.6v-38.3H530.5V132h-95.4c-16.7 0-16.7 16.5-16.7 16.5v97.8H182.2v38.3h236.3v68.6H223.4v38.3h378.4c-13.8 47.6-32.4 92.3-54.5 132.9-122.8-40.4-253.8-73.2-336.1-53-52.6 13-86.5 36.1-106.5 60.3-91.4 111-25.9 279.6 167.2 279.6C386 811.2 496 747.6 581.2 643 708.3 704 960 808.7 960 808.7V659.4s-31.6-2.5-171-49.1zM253.9 746.6c-150.5 0-195-118.3-120.6-183.1 24.8-21.9 70.2-32.6 94.4-35 89.4-8.8 172.2 25.2 269.9 72.8-68.8 89.5-156.3 145.3-243.7 145.3z" p-id="6583"></path></svg>'
      },
      link: '/image/sponsor.png',
      ariaLabel: 'alipay link' }
    ],
    footer: {
      message: '<a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener">苏ICP备2025160641号-3</a> | <a href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32120202010796" target="_blank" rel="noopener">苏公网安备32120202010796号</a>'
    }
  },
    //图片懒加载
    markdown:{
      image:{
          lazyLoading:true
      }
    }
})
