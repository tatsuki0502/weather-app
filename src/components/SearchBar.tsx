import { useState } from "react";

//親コンポーネントから受け取る関数型を定義
type Props ={
    onSearch: (city: string) => void;
};

export default function SearchBar({ onSearch }: Props) {
    //入力された都市名を状態として保持する
    const [input,setInput] = useState('');

    return (
        <div className="flex gap-2 mb-6">

            {/* 入力ホーム */}
            <input
                type="text"
                className="flex-1 px-4 py-2 rounded border border-gray-400 bg-gray-200 text-black shadow w-full"
                placeholder="都道府県名検索"   //入力欄のヒント文字
                value={input}
                onChange={(e) => setInput(e.target.value)}   //入力されるたびstate更新
            />

            {/* 検索ボタン */}
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 whitespace-nowrap"
                onClick={() => onSearch(input)}   //ボタン押下時に親コンポーネントへ通知
            >
                Search
            </button>

        </div>
    )
}

