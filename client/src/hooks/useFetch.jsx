import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_GIPHY_API;

const useFetch = (keyword) => {
  const [gifUrl, setGifUrl] = useState("");

  const fetchGifs = async () => {
    const base_url = "https://api.giphy.com/v1/gifs/search";
    const parsedKeyword = keyword.split(" ").join("");

    try {
      const response = await fetch(
        `${base_url}?api_key=${API_KEY}&q=${parsedKeyword}&limit=1`
      );

      const { data } = await response.json();

      if (data.length === 0) {
        setGifUrl(
          "https://cdn.dribbble.com/users/492116/screenshots/1667059/thrillist-404.gif"
        );
        return;
      }

      setGifUrl(data[0]?.images?.downsized_medium?.url);
    } catch (error) {
      setGifUrl("https://giphy.com/gifs/mini-italia-8L0Pky6C83SzkzU55a");
    }
  };

  useEffect(() => {
    if (keyword) fetchGifs();
  }, [keyword]);

  return gifUrl;
};

export default useFetch;
