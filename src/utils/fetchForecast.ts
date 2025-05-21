import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchForecast = async (city: string ) => {
    const res: any = await axios.get('https://api.openweathermap.org/data/2.5/forecast', {
        params: {
            q: city,
            appid: API_KEY,
            units: 'metric',
            lang: 'ja',
        },
    });

    //3日分だけ抽出
    const list = res.data.list.filter((item: any) => item.dt_txt.includes('12:00:00')).slice(0,3);
    return list;
};