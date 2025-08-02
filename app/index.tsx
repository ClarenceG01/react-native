import { FlatList, Text, StyleSheet, TextInput, View } from "react-native";
import ShoppingListItem from "../components/ShoppingListItem";
import { theme } from "../theme";
import { useState } from "react";

type ShoppingListItem = {
  id: string;
  name: string;
};
export default function App() {
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [value, setValue] = useState("");
  const handleSubmit = () => {
    if (value) {
      const newShoppingList = [
        { id: new Date().toISOString(), name: value },
        ...shoppingList,
      ];
      setShoppingList(newShoppingList);
      setValue("");
    }
  };
  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
      data={shoppingList}
      ListHeaderComponent={
        <TextInput
          style={styles.textInput}
          placeholder="E.G coffee..."
          value={value}
          onChangeText={setValue}
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />
      }
      renderItem={({ item }) => <ShoppingListItem name={item.name} />}
      ListEmptyComponent={() => (
        <View style={styles.emptyList}>
          <Text style={styles.emptyText}>Your Shopping List is Empty</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
    padding: 12,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  textInput: {
    borderColor: theme.colorLightGrey,
    borderWidth: 2,
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 12,
    fontSize: 18,
    borderRadius: 50,
    backgroundColor: theme.colorWhite,
  },
  emptyList: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 18,
  },
  emptyText: {
    fontWeight: "bold",
  },
});
