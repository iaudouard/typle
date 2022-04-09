import axios from "axios";

export default function fetchText(size: number) {
  const url = `https://ivanadrd.pythonanywhere.com/typle`;

  return axios.get(url).then((res) => {
    return res.data.text;
  });
}
