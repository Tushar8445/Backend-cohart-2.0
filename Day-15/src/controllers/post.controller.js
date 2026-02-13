const postModel = require('../models/post.model')
const ImageKit = require('@imagekit/nodejs')


const imagekit = new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
})

async function postController(req, res){
    console.log(req.body, req.file);

    const file = await imagekit.files.upload({
            file: req.file.buffer, // Seedha buffer bhejo
            fileName: `post-${Date.now()}.jpg`, // Dynamic naam rakho
        })

    res.send(file)
    
}

module.exports = postController