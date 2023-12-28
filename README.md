# xf_OCR
讯飞通用文字识别 OCR ocr

# 项目下载

```javascript
npm i xf_ocr
```

# 项目使用

``` javascript
const { xf_OCR } = require('xf_ocr')
const fs = require('fs');

const config = {

 APISecret:'', //你的 APISecret 

 apiKey:'',//你的 apiKey

 appId:''//你的 appId

}

const imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' }) //imagePath 图片路径

try{
   const response = await xf_OCR(config,imageBase64)
   console.log(response);
}catch(err){
    console.log(err);
}

```