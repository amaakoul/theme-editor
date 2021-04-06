// Next API route

export default (req, res) => {
  res.status(200).json({
    colors: {
      primary: {
        alias: 'font-color',
        values: {
          color: '#000000',
        },
        validator: ['[0-9A-Fa-f]{6}'],
        template: '{color}',
      },
      primaryBackground: {
        alias: 'background',
        values: {
          color: '#ffffff',
        },
        validator: ['[0-9A-Fa-f]{6}'],
        template: '{color}',
      },
      secondary: {
        alias: 'font-color',
        values: {
          color: '#ffffff',
        },
        validator: ['[0-9A-Fa-f]{6}'],
        template: '{color}',
      },
      secondaryBackground: {
        alias: 'background',
        values: {
          color: '#4a86e8',
        },
        validator: ['[0-9A-Fa-f]{6}'],
        template: '{color}',
      },
      hightlight1: {
        alias: 'background',
        values: {
          color: '#4a86e8',
        },
        validator: ['[0-9A-Fa-f]{6}'],
        template: '{color}',
      },
      hightlight2: {
        alias: 'background',
        values: {
          color: '#ffab40',
        },
        validator: ['[0-9A-Fa-f]{6}'],
        template: '{color}',
      },
    },
    sizes: {
      text: {
        alias: 'fontSize',
        values: {
          float1: '1.1',
          unit: 'rem',
        },
        validator: ['[0-9. ]+( )', ['px', 'em']],
        template: '{float1} {unit}',
      },
      h1: {
        alias: 'fontSize',
        values: {
          float1: '1.4',
          unit: 'rem',
        },
        validator: ['[0-9. ]+( )', ['px', 'em']],
        template: '{float1} {unit}',
      },
      h2: {
        alias: 'fontSize',
        values: {
          float1: '1.2',
          unit: 'rem',
        },
        validator: ['[0-9. ]+( )', ['px', 'em']],
        template: '{float1} {unit}',
      },
      borderWidth: {
        alias: 'borderWidth',
        values: {
          float1: '1',
          unit: 'px',
        },
        validator: ['[0-9. ]+( )', ['px', 'em']],
        template: '{float1} {unit}',
      },
    },
    textField: {
      textSize: {
        values: {
          float1: '1.1',
          unit: 'rem',
        },
        validator: ['[0-9. ]+( )', ['px', 'em']],
        template: '{float1} {unit}',
      },
      color: {
        values: {
          color: '#000000',
        },
        validator: ['[0-9A-Fa-f]{6}'],
        template: '{color}',
      },
      border: {
        values: {
          float1: '1',
          unit: 'px',
          type: 'solid',
          color: '#000000',
        },
        validator: ['[0-9. ]+( )', ['px', 'em'], '[a-z.]+( )', '[0-9A-Fa-f]{6}'],
        template: '{float1} {unit} {type} {color}',
      },
      background: {
        values: {
          color: '#ffffff',
        },
        validator: ['[0-9A-Fa-f]{6}'],
        template: '{color}',
      },
    },
    buttons: {
      textSize: {
        values: {
          float1: '1.1',
          unit: 'rem',
        },
        validator: ['[0-9. ]+( )', ['px', 'em']],
        template: '{float1} {unit}',
      },
      color: {
        values: {
          float1: '1.1',
          float2: '1.1',
          unit: 'rem',
        },
        validator: ['[0-9. ]+( )', '[0-9.]+( )', ['px', 'em']],
        template: 'calc({float1}*{float2}{unit})',
      },
      background: {
        values: {
          color: '#4a86e8',
        },
        validator: ['[0-9A-Fa-f]{6}'],
        template: '{color}',
      },
    },
  })
}
