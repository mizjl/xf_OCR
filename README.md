# xf_OCR
讯飞通用文字识别 OCR ocr

# 项目下载

```javascript
npm i xf_ocr
```

# 项目使用

``` javascript
const { xf_OCR } = require('xf_ocr')

const config = {

 APISecret:'', //你的 APISecret 

 apiKey:'',//你的 apiKey

 appId:''//你的 appId

}

const imagePath = 'your picture path';
try {
    const response = await xf_OCR(config, imagePath)
    console.log(response);

} catch (err) {
    console.log(err);
}


```