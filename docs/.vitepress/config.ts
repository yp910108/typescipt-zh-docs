import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'TypeScript',
  description: 'TypeScript - 带类型的 JavaScript',
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      {
        text: '指引',
        link: '/guide/getting-started',
        activeMatch: '/guide/'
      }
    ],
    sidebar: [
      {
        text: '开始',
        items: [
          { text: '简介', link: '/guide/introduction' },
          {
            text: '快速上手',
            link: '/guide/getting-started'
          }
        ]
      },
      {
        text: '指南',
        items: [
          { text: '基础', link: '/guide/basic' },
          { text: '常用类型', link: '/guide/everyday-types' },
          { text: '窄化', link: '/guide/narrowing' }
        ]
      },
      {
        text: 'TypeScript 与 X 的区别',
        items: [
          {
            text: '与 JavaScript 的区别',
            link: '/guide/compared-with-javascript'
          },
          {
            text: '与 Java/C# 的区别',
            link: '/guide/compared-with-java'
          },
          {
            text: '与函数式编程的区别',
            link: '/guide/compared-with-functional'
          }
        ]
      }
    ],
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/yp910108/typescipt-zh-docs' }
    ],
    editLink: {
      pattern:
        'https://github.com/yp910108/typescipt-zh-docs/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },
    lastUpdated: {
      text: '上次更新'
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    outlineTitle: '本页目录'
  }
})
