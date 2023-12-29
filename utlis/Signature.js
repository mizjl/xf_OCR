const crypto = require('crypto');

const generateSignature = (APIKey, APISecret) => {
    const currentDate = new Date();
    const date = currentDate.toUTCString();
    const host = 'api.xf-yun.com';
    const signature_origin = `host: ${host}\ndate: ${date}\nPOST /v1/private/sf8e6aca1 HTTP/1.1`;
    const signature_sha = crypto.createHmac('sha256', APISecret).update(signature_origin).digest('base64');
    const authorization_origin = `api_key="${APIKey}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature_sha}"`;
    const authorization = Buffer.from(authorization_origin).toString('base64');
    const url = `https://api.xf-yun.com/v1/private/sf8e6aca1?authorization=${authorization}&date=${date}&host=${host}`;

    return url;
}

module.exports = { generateSignature }