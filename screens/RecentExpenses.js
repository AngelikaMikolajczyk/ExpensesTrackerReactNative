import { useContext, useEffect, useState } from "react";
import { ExpensesOutput } from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../store/http";
import { LoadingOverlay } from "../components/UI/LoadingOverlay";
import { ErrorOverlay } from "../components/UI/ErrorOverlay";

export function RecentExpenses() {
  const expensesContext = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(undefined);
  // const [expenses, setExpenses] = useState([]);

  const recentExpenses = expensesContext.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date > date7DaysAgo && expense.date <= today;
  });

  // const recentExpenses = expenses.filter((expense) => {
  //   const today = new Date();
  //   const date7DaysAgo = getDateMinusDays(today, 7);
  //   return expense.date > date7DaysAgo && expense.date <= today;
  // });

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
         const expenses = await fetchExpenses();
         expensesContext.setExpenses(expenses);
         // setExpenses(expenses);
      } catch (error) {
        setError('Could not fetch expenses!')
      }
      setIsFetching(false);
    }
    getExpenses();
  },[])

  function errorHandler() {
    setError(null);
  }

  if(error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler}/>
  }

  if(isFetching) {
    return <LoadingOverlay/>
  }

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      periodName="Last 7 days"
      fallBackText={"No expenses registered for the last 7 days."}
    />
  );
}
