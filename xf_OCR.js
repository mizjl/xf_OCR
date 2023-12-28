const dayjs = require('dayjs')
const request = require('request')
const crypto = require('crypto');


const xf_OCR = (config, imageBase64) => {
    const { APISecret, apiKey, appId } = config;
    const currentDate = new Date();
    const date = currentDate.toUTCString();

    const host = 'api.xf-yun.com';
    const signature_origin = `host: ${host}\ndate: ${date}\nPOST /v1/private/sf8e6aca1 HTTP/1.1`;

    const signature_sha = crypto.createHmac('sha256', APISecret).update(signature_origin).digest('base64');

    const authorization_origin = `api_key="${apiKey}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature_sha}"`;
    const authorization = Buffer.from(authorization_origin).toString('base64');

    const url = `https://api.xf-yun.com/v1/private/sf8e6aca1?authorization=${authorization}&date=${date}&host=${host}`

    const options = {
        url: url,
        method: 'POST',
        headers: {
            'Host': host,
            'Data': date,
            'Authorization': authorization,
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
                }
            },
            "payload": {
                "sf8e6aca1_data_1": {
                    "encoding": "jpg",
                    "status": 3,
                    "image": imageBase64
                }
            }
        }
    };

    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
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
                console.log(contents.join(' '));
                resolve(contents.join(' '));
            }
        });
    });

}

module.exports = {
    xf_OCR
}