import { FlatList, Text } from 'react-native';

function RenderExpenseItem(itemData) {
  return <Text>{itemData.item.description}</Text>;
}

export function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={RenderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
}
