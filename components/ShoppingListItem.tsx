import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Pressable,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { theme } from "../theme";
type Props = {
  name: string;
  isCompleted?: boolean;
  onDelete: () => void;
  onToggleComplete: () => void;
};
export default function ShoppingListItem({
  name,
  isCompleted,
  onDelete,
  onToggleComplete,
}: Props) {
  const handleDelete = () => {
    Alert.alert(
      `Are you sure you want to delete ${name} ?`,
      "It cannot be recovered",
      [
        {
          text: "Yes",
          onPress: () => onDelete(),
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
    <Pressable
      style={[styles.itemContainer, isCompleted && styles.completedContainer]}
      onPress={onToggleComplete}
    >
      <View style={styles.row}>
        <Entypo
          name={isCompleted ? "check" : "circle"}
          size={24}
          color={isCompleted ? theme.colorGrey : theme.colorCerulean}
        />
        <Text
          style={[styles.itemText, isCompleted && styles.completedText]}
          numberOfLines={1}
        >
          {name}
        </Text>
      </View>
      <TouchableOpacity onPress={handleDelete} activeOpacity={0.8}>
        <AntDesign
          name="delete"
          size={24}
          color={isCompleted ? theme.colorGrey : theme.colorRed}
        />
      </TouchableOpacity>
    </Pressable>
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
    paddingHorizontal: 5,
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
  itemText: { fontSize: 18, fontWeight: "200", flex: 1 },
  row: {
    flexDirection: "row",
    gap: 8,
    flex: 1,
  },
});
