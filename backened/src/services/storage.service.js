require("dotenv").config();
// const ImageKit= require("imagekit")

const ImageKit = require("imagekit")
const imagekit = new ImageKit({
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint:process.env.IMAGEKIT_URL_ENDPOINT
})

// const client = new ImageKit({
//   privateKey: process.env['IMAGEKIT_PRIVATE_KEY'], // This is the default and can be omitted
// });

// const response = await client.files.upload({
//   file: fs.createReadStream('path/to/file'),
//   fileName: 'file-name.jpg',
// });

// console.log(response);

async function uploadFile(file,fileName){
    const result =await imagekit.upload({
        file:file,
        fileName:fileName
    })
    return result;
}

module.exports={
    uploadFile
}
