// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  res.status(200).json({
    colors: {
      primary: {
        fontColor: '#000000a',
      },
      primaryBackground: {
        backgroundColor: '#ffffff',
      },
      secondary: {
        fontColor: '#ffffff',
      },
      secondaryBackground: {
        backgroundColor: '#4a86e8',
      },
      hightlight1: {
        background: '#4a86e8',
      },
      hightlight2: {
        background: '#ffab40',
      },
    },
    sizes: {
      text: { fontSize: ['1.1', 'em'] },
      h1: { fontSize: ['1.4', 'em'] },
      h2: { fontSize: ['1.2', 'em'] },
      borderWidth: { borderWidth: ['1', 'px'] },
    },
    textField: {
      textSize: {
        fontSize: '1.1',
      },
      color: {
        fontColor: '#000000',
      },
      border: {
        border: ['1px', 'solid', '#000000'],
      },
      background: {
        background: '#ffffff',
      },
    },
    buttons: {
      textSize: {
        fontSize: '1.1',
      },
      color: {
        fontColor: ['calc(1.1*1.2)', 'rem'],
      },
      background: {
        background: '#4a86e8',
      },
    },
  })
}
