const {Schema,model,Types} = require('mongoose')

const schema = new Schema(
    {
        VideoId:{type:String,required:true},
        Video:{type:Object, required:true},
        UserId: {type:String,required:true}
    }
)

module.exports = model('Like',schema)