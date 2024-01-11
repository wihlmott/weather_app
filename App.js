import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import LottieView from "lottie-react-native";

import Days from "./Components/Days";

import {
  COORDINATES_API,
  COORDINATES_BASE_URL,
  WEATHER_BASE_URL,
  images,
  animations,
} from "./Config";

export default function App() {
  const [loading, setLoading] = useState(true);

  const [town, setTown] = useState({
    name: "Kraaifontein",
    lat: -33.8473,
    lon: 18.7174,
  });
  const [inputTown, setInputTown] = useState();

  const [weather, setWeather] = useState();
  const [days, setDays] = useState();
  const [allTemps, setAllTemps] = useState();
  const [currentTemp, setCurrentTemp] = useState();
  const [dayNight, setDayNight] = useState(1);
  const [cover, setCover] = useState("sunny");

  const fetchCoordinates = async () => {
    try {
      const response = await fetch(
        `${COORDINATES_BASE_URL}=${inputTown.replace(
          " ",
          ""
        )},ZA&limit=5&appid=${COORDINATES_API}`
      );
      const data = await response.json();
      setTown({ name: data[0].name, lat: data[0].lat, lon: data[0].lon });
    } catch (err) {
      console.log(err);
    }
  };
  const fetchData = async () => {
    const response = await fetch(
      `${WEATHER_BASE_URL}latitude=${town.lat}&longitude=${town.lon}&current=temperature_2m,is_day,rain,cloud_cover,&hourly=temperature_2m,cloud_cover,rain&timezone=Africa%2FCairo`
    );
    const data = await response.json();

    setWeather(data);
    setDays([...new Set(data.hourly.time.map((el) => el.split("T")[0]))]);
    setAllTemps(data.hourly.temperature_2m);
    setCurrentTemp(data.current.temperature_2m);
    setDayNight(data.current.is_day);

    if (data.current.cloud_cover > 50) setCover("cloudy");
    if (data.current.rain > 2) setCover("rainy");

    setLoading(false);
  };
  const inputHandler = (e) => {
    setInputTown(e);
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [town]);

  if (!weather) return <ActivityIndicator />;

  return (
    <ImageBackground source={images[cover]} style={styles.container}>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: `${
            dayNight == 0 ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.2)"
          }`,
        }}
      />

      <View style={styles.topSection}>
        <LottieView
          source={animations[cover]}
          style={{
            width: 300,
            aspectRatio: 1,
            marginTop: -160,
            opacity: 0.8,
          }}
          autoPlay
          loop
        />
        <Text>current</Text>
        <Text style={styles.location}>{town.name}</Text>
        <Text style={styles.tempMax}>{currentTemp}°</Text>

        {loading && <ActivityIndicator />}
        {!loading && <Days allTemps={allTemps} days={days} />}
      </View>
      <View style={styles.inputTown}>
        <TextInput
          placeholder="enter different city"
          style={styles.input}
          onChangeText={inputHandler}
        />
        <Button
          title="GO"
          color={"rgba(0,0,0,0.8)"}
          onPress={fetchCoordinates}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    flex: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  location: { fontFamily: "Roboto", fontSize: 30 },
  tempToday: { flexDirection: "row" },
  tempMax: {
    textAlign: "right",
    fontFamily: "Roboto",
    fontSize: 100,
    color: "black",
    marginLeft: 25,
    paddingBottom: 50,
  },
  days: {
    flexDirection: "row",
  },
  inputTown: {
    flex: 1,
    flexDirection: "row",
    padding: 8,
    alignItems: "center",
  },
  input: { flex: 1, borderWidth: 1, padding: 4, borderColor: "#cccccc" },
});
