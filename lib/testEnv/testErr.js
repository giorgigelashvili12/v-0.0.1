import errStack from "../core/Error.js";
import { ERR_CODES } from "../assets/errorSet.js";

try {
    throw new errStack("Request timeout", ERR_CODES.TIMEOUT);
} catch (err) {
    console.log(err.toJSON());
}