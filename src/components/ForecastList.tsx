import { useEffect, useState } from "react";
import { fetchForecast } from "../utils/fetchForecast";

//Props (親コンポーネントから受け取るデータ)の定義
type Props = {
    city: string;
};

//予約リストコンポーネント
export default function ForecastList ({ city }: Props) {
    //予約データの配列をstateに保存
    const [forecast, setForecast] = useState<any[]>([]);

    //都市名が変わるたびにfetchForecastを呼び出してデータを取得
    useEffect(() => {
        fetchForecast(city)
        .then(setForecast)       //成功時にforecastへ保存
        .catch(console.error);   //失敗時はエラーログ出力
    }, [city]);                  //cityが変化されたときのみ実行する

    //レンダリング
    return (
        <div className="grid  w-full grid-cols-1 sm:grid-cols-3 gap-4">
            {/* 予約データを１件ずつカード形式で表示 */}
            {forecast.map((item, index) => (
                <div key={index} className="bg-white rounded shadow p-4 text-center">

                    {/* 日付の表示 */}
                    <p className="text-sm text-gray-600">
                        {new Date(item.dt_txt).toLocaleDateString('ja-JP', {
                            weekday: 'short',  // 曜日（例: 火）
                            month: 'short',    // 月（例: 5月）
                            day: 'numeric'     // 日（例: 21日）
                        })}
                    </p>
                    
                    {/* 天気アイコン */}
                    <img
                        src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                        alt={item.weather[0].description}
                        className="mx-auto"
                    />

                    {/* 気温 */}
                    <p className="text-lg font-bold">
                        {Math.round(item.main.temp)}℃
                    </p>

                    {/* 天気の説明 */}
                    <p className="text-sm text-gray-700">
                        {item.weather[0].description}
                    </p>
                </div>    
            ))}
        </div>
        )
}