import { FlatList } from 'react-native';
import { ExpenseItem } from './ExpenseItem';

function RenderExpenseItem(itemData) {
  return <ExpenseItem id={itemData.item.id} description={itemData.item.description} amount={itemData.item.amount} date={itemData.item.date}/>;;
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
