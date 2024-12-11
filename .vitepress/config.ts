import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Byl гарын авлага",
  description: "Byl хөгжүүлэгийн гарын авлага",
  themeConfig: {
    siteTitle: 'Byl гарын авлага',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Byl', link: 'https://byl.mn/', target: '_self' },
    ],

    sidebar: [
      {
        text: 'Эхлэл',
        items: [
          { text: 'Танилцуулга', link: '/' },
        ]
      },
      {
        text: 'Developer',
        items: [
          {
            text: 'API',
            items: [
              { text: 'General', link: '/api/' },
              { text: 'API token', link: '/api/api-token' },
              { text: 'Invoices', link: '/api/invoices' },
              { text: 'Checkouts', link: '/api/checkouts' }
            ]
          },
          {
            text: 'Webhook',
            link: '/webhook'
          }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/kitelab-dev/byl-docs' }
    ],

    docFooter: {
      prev: 'Өмнөх хуудас',
      next: 'Дараагын хуудас',
    },

    outlineTitle: 'Энэ хуудсанд',

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: 'Хайх...',
            buttonAriaLabel: 'Хайх...'
          },
          modal: {
            displayDetails: 'Дэлгэрэнгүй харах',
            resetButtonTitle: 'Цэвэрлэх',
            backButtonTitle: 'Буцах',
            noResultsText: 'Хайлт илэрцгүй',
            footer: {
              navigateText: 'шилжэх',
              selectText: 'сонгох',
              closeText: 'хаах'
            }
          }
        }
      }
    }
  }
})
