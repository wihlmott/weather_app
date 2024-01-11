import { Image, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  dayItem: {
    flex: 1,
    backgroundColor: "ghostwhite",
    aspectRatio: 9 / 16,
    padding: 7,
    margin: 3,
    alignContent: "center",
    borderRadius: 10,
    opacity: 0.9,
  },
  dayName: {
    margin: "auto",
    textAlign: "center",
  },
  tempHigh: {
    borderRadius: 50,
    backgroundColor: "#cccccc",
    textAlign: "center",
    paddingVertical: 7,
    fontSize: 15,
    fontWeight: "bold",
  },
  tempLow: {
    fontSize: 10,
    textAlign: "center",
  },
});

const DayItem = ({ day, max, min }) => {
  return (
    <View style={styles.dayItem}>
      <Text style={styles.dayName}>{day}</Text>
      <Text style={styles.tempHigh}>{Math.round(max)}°</Text>
      <Text style={styles.tempLow}>{Math.round(min)}°</Text>
    </View>
  );
};

export default DayItem;
