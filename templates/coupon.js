export default () => {
  return {
    type: 'bubble',
    hero: {
      type: 'image',
      url: 'https://kfcoosfs.kfcclub.com.tw/原味蛋撻-pc.jpg',
      size: 'full',
      aspectRatio: '20:13',
      aspectMode: 'cover',
      margin: 'none',
      align: 'center'
    },
    body: {
      type: 'box',
      layout: 'vertical',
      spacing: 'md',
      action: {
        type: 'uri',
        uri: 'https://www.kfcclub.com.tw/Coupon'
      },
      contents: [
        {
          type: 'text',
          text: '(莎莎捲換兩塊炸雞) 蛋塔x2 + 炸雞x2 + 小飲x1',
          size: 'md',
          weight: 'regular',
          wrap: true
        },
        {
          type: 'box',
          layout: 'vertical',
          spacing: 'sm',
          contents: [
            {
              type: 'box',
              layout: 'baseline',
              contents: [
                {
                  type: 'text',
                  text: '129元',
                  weight: 'bold',
                  margin: 'sm',
                  flex: 0,
                  size: 'xxl'
                },
                {
                  type: 'text',
                  text: '53折',
                  size: 'md',
                  align: 'end',
                  color: '#F02C2C',
                  style: 'italic'
                }
              ]
            }
          ]
        },
        {
          type: 'text',
          text: '期限 2024-01-31 止',
          wrap: true,
          color: '#aaaaaa',
          size: 'xs'
        }
      ]
    },
    footer: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'button',
          style: 'primary',
          color: '#F02C2C',
          margin: 'md',
          action: {
            type: 'postback',
            label: '23835',
            data: 'coupon',
            displayText: '23835'
          }
        }
      ],
      paddingTop: 'none'
    }
  }
}
