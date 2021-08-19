import axios from "axios";
global.Buffer = global.Buffer || require("buffer").Buffer;

const getBase64FromUrl = async (url: string) => {
  if (url) {
    const response: any = await axios.get(url, {
      responseType: "arraybuffer",
    });
    const base64: string = Buffer.from(await response.data, "base64").toString(
      "base64"
    );
    return `data:image/png;base64,${base64}`;
  } else {
    return "";
  }
};

export default getBase64FromUrl;
