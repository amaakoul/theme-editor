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
          float: '1.1',
          unit: 'rem',
        },
        validator: ['[0-9. ]+( )', ['px', 'em', 'rem']],
        template: '{float} {unit}',
      },
      h1: {
        alias: 'fontSize',
        values: {
          float: '1.4',
          unit: 'rem',
        },
        validator: ['[0-9. ]+( )', ['px', 'em', 'rem']],
        template: '{float} {unit}',
      },
      h2: {
        alias: 'fontSize',
        values: {
          float: '1.2',
          unit: 'rem',
        },
        validator: ['[0-9. ]+( )', ['px', 'em', 'rem']],
        template: '{float} {unit}',
      },
      borderWidth: {
        alias: 'borderWidth',
        values: {
          float: '1',
          unit: 'px',
        },
        validator: ['[0-9. ]+( )', ['px', 'em', 'rem']],
        template: '{float} {unit}',
      },
    },
    textField: {
      textSize: {
        values: {
          float: '1.1',
          unit: 'rem',
        },
        validator: ['[0-9. ]+( )', ['px', 'em', 'rem']],
        template: '{float} {unit}',
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
          float: '1',
          unit: 'px',
          type: 'solid',
          color: '#000000',
        },
        validator: ['[0-9. ]+( )', ['px', 'em', 'rem'], '[a-z.]+( )', '[0-9A-Fa-f]{6}'],
        template: '{float} {unit} {type} {color}',
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
          float: '1.1',
          unit: 'rem',
        },
        validator: ['[0-9. ]+( )', ['px', 'em', 'rem']],
        template: '{float} {unit}',
      },
      color: {
        values: {
          float: '1.1',
          float2: '1.1',
          unit: 'rem',
        },
        validator: ['[0-9. ]+( )', '[0-9.]+( )', ['px', 'em', 'rem']],
        template: 'calc({float}*{float2}{unit})',
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
