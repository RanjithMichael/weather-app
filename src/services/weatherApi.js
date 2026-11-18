import axios from "axios";

const API_KEY = "8ebb7d2e738fab7803713dd66b56a3f7";

export const getWeatherByCity = async (city) => {
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );

  return response.data;
};