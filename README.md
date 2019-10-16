# canshow ([demo](https://browniu.github.io/canshow/))

> canvas can show in react

[![NPM](https://img.shields.io/npm/v/canshow.svg)](https://www.npmjs.com/package/canshow) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save canshow
```

## Usage

```jsx
import React, { Component } from 'react'

import Canshow from 'canshow'

class Example extends Component {
  render () {
    return (
      <div className="banner" style="background:'./bg.jpg'">
        <div className="button"/>
        <Canshow effect={'snow'} />
      </div>
    )
  }
}
```

## Demo

[click here](https://browniu.com/canshow/)

## Props

| Property | Type | Default | Description |
| :------| :------ | :------ | :------ |
| `effect` | string | snow | 使用效果 |
| `config` | Object | `{type:'default',opacity:1,zIndex:1}` | 配置信息 |
| `config.type` | string | default | 效果的可选类型 |
| `config.opacity` | number | 1 | 透明度 |
| `config.zIndex` | number | 1 | 层级 |

## Effects

| effect | type |
|:-------|:-----|
| snow | default |
| unsnow | default |
| smoke | default |
| thunder | default / pulse / electric |
| snow | default |

## License

MIT © [browniu](https://github.com/browniu)
