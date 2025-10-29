import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton } from "../components/UI/IconButton";
import { GlobalStyles } from "../constans/styles";
// import { Button } from '../components/UI/Button';
import { ExpensesContext } from "../store/expenses-context";
import { ExpenseForm } from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../store/http";
import { LoadingOverlay } from "../components/UI/LoadingOverlay";
import { ErrorOverlay } from "../components/UI/ErrorOverlay";

export function ManageExpense({ route, navigation }) {
  const expensesContext = useContext(ExpensesContext);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const selectedExpense = expensesContext.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHanlder() {
    setIsLoading(true);
    try {
      await deleteExpense(editedExpenseId);
      expensesContext.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError('Could not delete expense. Please try again later.');
      setIsLoading(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsLoading(true);
    try {
      if (isEditing) {
        expensesContext.updateExpense(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expensesContext.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError('Could not save data. Please try again later.');
      setIsLoading(false);
    }
  }

  function errorHandler() {
    setError(null);
  }

  if(error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={errorHandler}/>
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHanlder}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
