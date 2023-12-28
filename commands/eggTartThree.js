import axios from 'axios'
import * as cheerio from 'cheerio'
import couponTemplate from '../templates/coupon.js'

export default async (event) => {
  try {
    // cheerio 語法
    const { data } = await axios.get('https://kfc.izo.tw')
    const $ = cheerio.load(data)
    // const AllCard 陣列存資料
    const AllCard = []

    $('.card-tag').each(function () {
      if ($(this).find('.card-text').eq(0).text().trim().includes('蛋塔x3')) {
        const food = $(this).find('.card-text').eq(0).text().trim()
        const dollor = $(this).find('.card-header span').eq(0).text()
        const discount = $(this).find('.card-header span').eq(2).text().trim()
        const date = $(this).find('.card-text').eq(1).text().trim()
        const coupon = $(this).find('.card-header span').eq(1).text()
        const imageUri = new URL(coupon, 'https://kfc.izo.tw/coupons/')
        // === 呼叫模板
        const template = couponTemplate()
        // === 修改版面內容
        template.hero.url = 'https://raw.githubusercontent.com/haku19602/image/main/eggtartx3.jpg'
        template.body.action.uri = imageUri
        template.body.contents[0].text = food
        template.body.contents[1].contents[0].contents[0].text = dollor
        template.body.contents[1].contents[0].contents[1].text = discount
        template.body.contents[2].text = date
        template.footer.contents[0].action.label = coupon
        template.footer.contents[0].action.displayText = coupon
        // === 模板放到 AllCard 陣列
        AllCard.push(template)
        // ========= 排序
        AllCard.sort((a, b) => parseFloat(a.body.contents[1].contents[0].contents[0].text) - parseFloat(b.body.contents[1].contents[0].contents[0].text))
        // =========
      }
    })

    // ========= 模板一次只能回 12 個
    const limit = 12
    const HowManyRow = Math.ceil(AllCard.length / limit)
    const Allreplies = []

    // 要切幾行迴圈回覆
    for (let i = 0; i < HowManyRow; i++) {
      const start = i * limit
      const end = start + limit
      // 迴圈每次生成該行陣列
      const thisArray = AllCard.slice(start, end)

      const thisReply = {
        type: 'flex',
        altText: '肯德基蛋塔x3 優惠代碼',
        contents: {
          type: 'carousel',
          contents: thisArray
        }
      }

      Allreplies.push(thisReply)
    }
    // =========

    const result = await event.reply(Allreplies)
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}
