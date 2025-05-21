import { useState } from 'react';
import SearchBar from './components/SearchBar';   //子コンポーネントを読み込み
import WeatherCard from './components/WeatherCard';
import ForecastList from './components/ForecastList';

function App() {
  //選択中の都市名を保持する（初期値はTokyo)
  const [city, setCity] = useState('Tokyo');

  return (
    <div className="min-h-screen flex justify-center items-start pt-6 bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300">
      <div className='w-full max-w-3xl px-4'>
        {/* タイトル */}
        <h1 className='text-3xl text-black font-bold mb-4 text-center'>天気アプリ</h1>

        {/* 検索バー：検索された都市名がsetCity()を通じて反映される */}
        <SearchBar onSearch={setCity} />

        {/*　現在選択中の都市名を表示　*/}
        <p className='text-center text-gray-700 mb-4'>検索中の都市: {city}</p>

        {/* 検索中の都市の天気情報 */}
        <WeatherCard city={city} />

        {/* 今日以外の天気情報 */}
        <ForecastList city={city} />

      </div>
    </div>
  );
}

export default App;
