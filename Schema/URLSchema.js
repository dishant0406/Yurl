//mongoDB Schema
import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var URLSchema = new Schema({
  original_url: String,
  short_url: String
});

const URL = mongoose.model('URL', URLSchema);
export default URL;
