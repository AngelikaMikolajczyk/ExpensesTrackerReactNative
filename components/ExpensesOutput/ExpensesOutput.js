import { StyleSheet, Text, View } from 'react-native';
import { ExpensesSummary } from './ExpensesSummary';
import { ExpensesList } from './ExpensesList';
import { GlobalStyles } from '../../constans/styles';

export function ExpensesOutput({expenses, periodName, fallBackText}) {
  let content = <Text style={styles.fallbackText}>{fallBackText}</Text>

  if(expenses.length > 0) {
    content = <ExpensesList expenses={expenses}/>
  }
    return (
      <View style={styles.container}>
        <ExpensesSummary expenses={expenses} periodName={periodName}/>
        {content}
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
    flex: 1
  },
  fallbackText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32
  }
});