// 執行 dotenv 裡的檔案  // 引用環境變數
import 'dotenv/config'
import linebot from 'linebot'
// 引用 function
import eggTartOne from './commands/eggTartOne.js'
import eggTartTwo from './commands/eggTartTwo.js'
import eggTartThree from './commands/eggTartThree.js'
import eggTartSix from './commands/eggTartSix.js'
import eggTartTwelve from './commands/eggTartTwelve.js'
import { scheduleJob } from 'node-schedule'

// 排程工作
// https://crontab.guru/once-a-day
scheduleJob('0 0 * * *', () => {
  eggTartOne.update()
  eggTartTwo.update()
  eggTartThree.update()
  eggTartSix.update()
  eggTartTwelve.update()
})

// 建立機器人
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

// ----- 鸚鵡回覆測試
// bot.on('message', (event) => {
//   if (event.message.type === 'text') {
//     event.reply(event.message.text)
//   }
// })

bot.on('message', (event) => {
  if (event.message.text === '蛋塔x1') {
    eggTartOne(event)
  } else if (event.message.text === '蛋塔x2') {
    eggTartTwo(event)
  } else if (event.message.text === '蛋塔x3') {
    eggTartThree(event)
  } else if (event.message.text === '蛋塔x6') {
    eggTartSix(event)
  } else if (event.message.text === '蛋塔x12') {
    eggTartTwelve(event)
  } else if (event.message.text === '我想吃蛋塔') {
    // 快速回覆
    event.reply({
      type: 'text',
      text: '想吃幾個蛋塔？',
      quickReply: {
        items: [
          {
            type: 'action',
            action: {
              // 傳訊息功能
              type: 'message',
              // 傳送的文字
              text: '蛋塔x1',
              // 按鈕的文字
              label: '蛋塔x1'
            }
          },
          {
            type: 'action',
            action: {
              // 傳訊息功能
              type: 'message',
              // 傳送的文字
              text: '蛋塔x2',
              // 按鈕的文字
              label: '蛋塔x2'
            }
          },
          {
            type: 'action',
            action: {
              // 傳訊息功能
              type: 'message',
              // 傳送的文字
              text: '蛋塔x3',
              // 按鈕的文字
              label: '蛋塔x3'
            }
          },
          {
            type: 'action',
            action: {
              // 傳訊息功能
              type: 'message',
              // 傳送的文字
              text: '蛋塔x6',
              // 按鈕的文字
              label: '蛋塔x6'
            }
          },
          {
            type: 'action',
            action: {
              // 傳訊息功能
              type: 'message',
              // 傳送的文字
              text: '蛋塔x12',
              // 按鈕的文字
              label: '蛋塔x12'
            }
          }
        ]
      }
    })
  }
})

// 監聽傳入 localhost:3000 或 localhost:PORT 的請求
// 雲端服務的 port 不固定，但會被放進環境變數，使用 process.env.PORT 取
// 在本機沒有 port 時，指定 3000
bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
