const {Schema,model,Types} = require('mongoose')

const schema = new Schema(
    {
        Requesting:{type:String, required:true, unique:true},
        VideoList:{type:Array}
    }
)

module.exports = model('SaveFetched',schema)