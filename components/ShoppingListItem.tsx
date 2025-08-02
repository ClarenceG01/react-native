import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { theme } from "../theme";
type Props = {
  name: string;
  isCompleted?: boolean;
};
export default function ShoppingListItem({ name, isCompleted }: Props) {
  const handleDelete = () => {
    Alert.alert(
      `Are you sure you want to delete ${name} ?`,
      "It cannot be recovered",
      [
        {
          text: "Yes",
          onPress: () => console.log("deleted"),
          style: "destructive",
        },
        {
          text: "No",
          style: "cancel",
        },
      ]
    );
  };
  return (
    <View
      style={[styles.itemContainer, isCompleted && styles.completedContainer]}
    >
      <Text style={[styles.itemText, isCompleted && styles.completedText]}>
        {name}
      </Text>
      <TouchableOpacity
        onPress={handleDelete}
        activeOpacity={0.8}
      >
        <AntDesign name="delete" size={24} color={isCompleted ? theme.colorGrey:theme.colorRed} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: theme.colorCerulean,
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  completedContainer: {
    backgroundColor: theme.colorLightGrey,
    borderBottomColor: theme.colorLightGrey,
  },
  completedText: {
    color: theme.colorGrey,
    textDecorationLine: "line-through",
    textDecorationColor: theme.colorGrey,
  },
  itemText: { fontSize: 18, fontWeight: "200" },
});
