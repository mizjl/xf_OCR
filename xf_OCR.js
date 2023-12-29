const request = require('request')

const { getFileExtension } = require('./utlis/FileExtension')
const { generateSignature } = require('./utlis/Signature')


const options = (obj)=>{
    const {apiKey,APISecret,appId,fileExtension,imageBase64} = obj
    return {
        url: generateSignature(apiKey, APISecret),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        json: {
            "header": {
                "app_id": appId,
                "status": 3
            },
            "parameter": {
                "sf8e6aca1": {
                    "category": "ch_en_public_cloud",
                    "result": {
                        "encoding": "utf8",
                        "compress": "raw",
                        "format": "json"
                    }
                },
            },
            "payload": {
                "sf8e6aca1_data_1": {
                    "encoding": fileExtension,
                    "status": 3,
                    "image": imageBase64
                },
    
            }
        }
    };
}

const xf_OCR = (config, imagePath) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { imageBase64, fileExtension } = await getFileExtension(imagePath)
            request(options({...config,imageBase64,fileExtension}), (error, response, body) => {
                if (error) {
                    reject(error.message);
                } else {
                    const { result } = body.payload;
                    const { text } = result;
                    const decodedData = Buffer.from(text, 'base64').toString('utf-8');

                    const data = JSON.parse(decodedData);
                    const contents = data.pages.flatMap(page =>
                        page.lines.flatMap(line =>
                            Array.isArray(line.words) ? line.words.map(word => word.content) : []
                        )
                    );
                    resolve(contents.join(' '));
                }
            });
        } catch (err) {
            reject(err)
        }
    });
}

module.exports = {
    xf_OCR
}