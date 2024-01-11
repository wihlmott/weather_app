import { StyleSheet, View } from "react-native";
import dayjs from "dayjs";

import DayItem from "./DayItem";
import { chunk } from "../Methods/arrayChunks";

const Days = ({ days, allTemps }) => {
  const temps = chunk(allTemps, 24);

  return (
    <View style={styles.days}>
      {days.map((day, i) => (
        <DayItem
          key={i}
          day={dayjs(day).format("ddd")}
          min={Math.min(...temps[i])}
          max={Math.max(...temps[i])}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  days: {
    flexDirection: "row",
  },
});

export default Days;
