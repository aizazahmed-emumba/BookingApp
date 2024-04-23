import DataURIParser from "datauri/parser.js";
import  path  from "path";

const getDataUri = (file) => {

const parser = new DataURIParser();

return parser.format(path.extname(file.originalname).toString(), file.buffer);

}


export default getDataUri;