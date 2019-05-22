import uuid from 'uuid'
import database from '../firebase/firebase'

// component calls action generator
// action generator returns object
// component dispatches object
// redux store changes

// with async
// component calls action generator
// action generator returns function
// component dispatches function (redux with middleware)
// function runs (has ability to dispatch other actions and do whatever)

// ADD_EXPENSE

export const addExpense = expense => ({
	type: 'ADD_EXPENSE',
	expense
})

export const startAddExpense = (expenseData = {}) => {
	return dispatch => {
		const {
			description = '', // default value is none parsed
			note = '', // default value is none parsed
			amount = 0, // default value is none parsed
			createdAt = 0 // default value is none parsed
		} = expenseData
		const expense = { description, note, amount, createdAt }
		return database
			.ref('expenses')
			.push(expense)
			.then(ref => {
				dispatch(
					addExpense({
						id: ref.key,
						...expense
					})
				)
			})
	}
}

// REMOVE_EXPENSE

export const removeExpense = ({ id } = {}) => ({
	type: 'REMOVE_EXPENSE',
	id
})

export const startRemoveExpense = ({ id }) => {
	return dispatch => {
		return database
			.ref(`expenses/${id}`)
			.remove()
			.then(() => {
				dispatch(removeExpense({ id }))
			})
	}
}

// EDIT_EXPENSE

export const editExpense = (id, updates) => ({
	type: 'EDIT_EXPENSE',
	id,
	updates
})

export const startEditExpense = (id, updates) => {
	return dispatch => {
		// return function called by dispatch
		return database // to chain on the dispatch action
			.ref(`expenses/${id}`)
			.update(updates)
			.then(() => {
				dispatch(editExpense(id, updates))
			})
	}
}

//SET_EXPENSES
export const setExpenses = expenses => ({
	type: 'SET_EXPENSES',
	expenses
})

export const startSetExpenses = () => {
	return dispatch => {
		return database // this returned for promise chaining so startSetExpenses is thenable
			.ref('expenses')
			.once('value')
			.then(snapshot => {
				const expenses = []
				snapshot.forEach(childSnapshot => {
					expenses.push({
						id: childSnapshot.key,
						...childSnapshot.val()
					})
				})
				dispatch(setExpenses(expenses))
			})
	}
}
