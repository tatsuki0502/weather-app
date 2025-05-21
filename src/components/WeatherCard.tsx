import { useEffect, useState } from "react";
import { fetchWeather } from "../utils/fetchWeather";

type props = {
    city: string;
};

export default function WeatherCard({ city }: props) {
    
    //天気情報を保持するstate
    const [weather, setWeather] = useState<any>(null);

    //ローディング状態の管理
    const [loading, setLoading] = useState(true);

    //エラーメッセージ
    const [error, setError] = useState(''); 

    //都市名が変わるたびにAPIリクエストを送る
    useEffect(() => {
        setLoading(true);   //読み込み開始
        setError('');       //エラー初期化

        //非同期で天気取得
        fetchWeather(city)
        .then((data) => {
            setWeather(data);   //取得成功時にデータを保存
        })
        .catch(() => {
            setError('天気予報の取得に失敗しました。(都道府県名で入力してください)');   //失敗時
        })
        .finally(() => {
            setLoading(false)   //読み込み終了
        });
    }, [city]);   //cityが変更されたときだけ実行

    //読み込み中の表示
    if (loading) return <p>読み込み中...</p>;

    //エラー時の表示
    if (error) return <p className="text-red-500">{error}</p>;

    //データが存在しない場合は何も表示しない
    if (!weather) return null;

    return (
        <div className="bg-white rounded shadow-md p-6 w-full max-w-3xl mb-6">
            <h2 className="text-xl font-bold">{city}</h2>
            <p className="text-gray-500">{weather.date}</p>

            <div className="flex items-center justify-between mt-4">
                <p className="text-5xl font-bold text-black ">{Math.round(weather.main.temp)}°</p>
                <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt="weather icon"
                    className="w-20 h-20"
                />
            </div>

            <p className="mt-2 text-lg">{weather.weather[0].description}</p>
            <p className="text-lg text-gray-600">風速: {weather.wind.speed} km/h</p>

            {/* 天気の説明 */}
            <p className="text-lg text-gray-600 mt-2 ">
                {weather.weather[0].description}
            </p>
        </div>
    );
}