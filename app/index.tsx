import { FlatList, Text, StyleSheet, TextInput, View } from "react-native";
import ShoppingListItem from "../components/ShoppingListItem";
import { theme } from "../theme";
import { useState, useEffect } from "react";
import { getFromStorage, saveToStorage } from "@/utils/storage";

type ShoppingListItem = {
  id: string;
  name: string;
  lastUpdatedTimestamp: number;
  completedAtTimestamp?: number;
};
const storageKey = "shopping-list";
export default function App() {
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [value, setValue] = useState("");
  const handleSubmit = () => {
    if (value) {
      const newShoppingList = [
        {
          id: new Date().toISOString(),
          name: value,
          lastUpdatedTimestamp: Date.now(),
        },
        ...shoppingList,
      ];
      setShoppingList(newShoppingList);
      saveToStorage(storageKey,newShoppingList)
      setValue("");
    }
  };
  const handleDelete = (id: string) => {
    const newShoppingList = shoppingList.filter((item) => item.id !== id);
    setShoppingList(newShoppingList);
    saveToStorage(storageKey,newShoppingList)
  };
  const handleToggleComplete = (id: string) => {
    const newShoppingList = shoppingList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          lastUpdatedTimestamp: Date.now(),
          completedAtTimestamp: item.completedAtTimestamp
            ? undefined
            : Date.now(),
        };
      } else {
        return item;
      }
    });
    setShoppingList(newShoppingList);
  };
  useEffect(() => {
    const fetchInitial = async () => {
      const data = await getFromStorage(storageKey);
      if (data) setShoppingList(data);
    };
    fetchInitial();
  }, []);
  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[0]}
      data={orderShoppingList(shoppingList)}
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
      renderItem={({ item }) => (
        <ShoppingListItem
          name={item.name}
          onDelete={() => handleDelete(item.id)}
          onToggleComplete={() => handleToggleComplete(item.id)}
          isCompleted={Boolean(item.completedAtTimestamp)}
        />
      )}
      ListEmptyComponent={() => (
        <View style={styles.emptyList}>
          <Text style={styles.emptyText}>Your Shopping List is Empty</Text>
        </View>
      )}
    />
  );
}
function orderShoppingList(shoppingList: ShoppingListItem[]) {
  return shoppingList.sort((item1, item2) => {
    if (item1.completedAtTimestamp && item2.completedAtTimestamp) {
      return item2.completedAtTimestamp - item1.completedAtTimestamp;
    }

    if (item1.completedAtTimestamp && !item2.completedAtTimestamp) {
      return 1;
    }

    if (!item1.completedAtTimestamp && item2.completedAtTimestamp) {
      return -1;
    }

    if (!item1.completedAtTimestamp && !item2.completedAtTimestamp) {
      return item2.lastUpdatedTimestamp - item1.lastUpdatedTimestamp;
    }

    return 0;
  });
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
