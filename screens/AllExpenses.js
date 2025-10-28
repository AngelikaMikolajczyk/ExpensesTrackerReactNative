import { useContext } from "react";
import { ExpensesOutput } from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

export function AllExpenses() {
  const expensesContext = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expenses={expensesContext.expenses}
      periodName="Total"
      fallBackText={"No registered expenses found!"}
    />
  );
}
