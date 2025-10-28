import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2024-12-19')
  },
  {
    id: 'e2',
    description: 'A pair of trousers',
    amount: 82.99,
    date: new Date('2025-10-27')
  },
  {
    id: 'e3',
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2024-12-01')
  },
  {
    id: 'e4',
    description: 'A book',
    amount: 14.99,
    date: new Date('2025-02-19')
  },
  {
    id: 'e5',
    description: 'Another book',
    amount: 18.59,
    date: new Date('2025-10-28')
  },
   {
    id: 'e6',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2024-12-19')
  },
  {
    id: 'e7',
    description: 'A pair of trousers',
    amount: 82.99,
    date: new Date('2025-01-05')
  },
  {
    id: 'e8',
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2025-10-20')
  },
  {
    id: 'e9',
    description: 'A book',
    amount: 14.1,
    date: new Date('2025-10-21')
  },
  {
    id: 'e10',
    description: 'Another book',
    amount: 18.00,
    date: new Date('2025-02-18')
  }
]

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date}) => {}
});

function expensesReducer(state, action) {
    switch(action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [ {...action.payload, id: id} ,...state];
        case 'UPDATE':
            const updatingExpenseIndex = state.findIndex(expense => expense.id === action.payload.id);
            const updatingExpense = state[updatingExpenseIndex];
            const updatedItem = { ...updatingExpense, ...action.payload.data };
            const updatedExpenses = [...state];
            updatedExpenses[updatingExpenseIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter(expense => expense.id !== action.payload);
        default:
            return state;
    }
}

function ExpensesContextProvider({children}) {
    const [expesesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    function addExpense(expenseData) {
        dispatch({type: 'ADD', payload: expenseData});
    }

    function deleteExpense(id) {
        dispatch({type: 'DELETE', payload: id});
    }

    function updateExpense(id, expenseData) {
        dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}});
    }

    const value = {
        expenses: expesesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    }

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider;