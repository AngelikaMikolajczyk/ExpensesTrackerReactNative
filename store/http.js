import axios from 'axios';
const DB_URL = 'https://expenses-react-native-75c53-default-rtdb.firebaseio.com';

export async function storeExpense(expenseData) {
    const response = await axios.post(`${DB_URL}/expenses.json`,
        expenseData
    );
    const id = response.data.name;
    return id;
}

export async function fetchExpenses() {
    const response = await axios.get(`${DB_URL}/expenses.json`);
    let expenses = [];
    for (const key in response.data) {
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        }

        expenses.push(expenseObj);
    }
    return expenses;
}

export function updateExpense(id, expenseData) {
    return axios.put(`${DB_URL}/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
    return axios.delete(`${DB_URL}/expenses/${id}.json`);
}