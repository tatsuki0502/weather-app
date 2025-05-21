//axiosを使ってHTTPリクエストを送るためにインポート
import axios from 'axios';
import { cityAliasMap } from './cityAliasMap';

//APIキーを読み込む
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

//天気データを取得する関数(都市名を引数に受け取る)
export const fetchWeather = async (city: string) => {

    // 日本語を英語に変換
    const convertedCity = cityAliasMap[city] || city;

    //OpenWeatherMap APIにリクエストを送信
    const res = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: encodeURIComponent(convertedCity),
            appid: API_KEY,
            units: 'metric',
            lang: 'ja',
        },
    });

    //取得したデータを返す
    return res.data;
}