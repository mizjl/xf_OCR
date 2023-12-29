const fs = require('fs');

const encodingArr = ['jpg', 'jpeg', 'png', 'bmp']

const getFileExtension = (imagePath) => {
    const parts = imagePath.split('.');
    const fileExtension = parts[parts.length - 1]

    return new Promise((resolve, reject) => {
        if (!encodingArr.includes(fileExtension)) {
            reject('文件格式不正确,仅支持jpg格式(默认值)/jpeg格式/png格式/bmp格式')
            return
        }
        const imageBase64 = fs.readFileSync(imagePath, { encoding: 'base64' })
        resolve({
            imageBase64,
            fileExtension
        })
    })
}

module.exports = {
    getFileExtension
}