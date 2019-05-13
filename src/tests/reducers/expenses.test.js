import expensesReducer from '../../reducers/expenses'
import expenses from '../fixtures/expenses'
import moment from 'moment'

test('should set default state', () => {
	const state = expensesReducer(undefined, { type: '@@INIT' })
	expect(state).toEqual([])
})

test('should remove the correct expense', () => {
	const state = expensesReducer(expenses, { type: 'REMOVE_EXPENSE', id: expenses[0].id })
	expect(state).toEqual([expenses[1], expenses[2]])
})

test('should remove the no expenses if id not found', () => {
	const state = expensesReducer(expenses, { type: 'REMOVE_EXPENSE', id: '9' })
	expect(state).toEqual(state)
})

test('should add an expense', () => {
	const expense = {
		id: '4', // make an id
		description: 'new description',
		note: 'new expense',
		amount: 100000,
		createdAt: moment(0)
			.add(20, 'days')
			.valueOf()
	}
	const state = expensesReducer(expenses, {
		type: 'ADD_EXPENSE',
		expense
	})
	expect(state.length).toBe(4)
	expect(state).toEqual([...expenses, expense]) // spread out expenses array and add expense to that array
})

test('should edit an expense', () => {
	const action = {
		type: 'EDIT_EXPENSE',
		id: expenses[0].id,
		updates: {
			note: 'this has been edited'
		}
	}
	const state = expensesReducer(expenses, action)
	expect(state[0].note).toBe('this has been edited')
})

test('should not edit an expense when id not found', () => {
	const action = {
		type: 'EDIT_EXPENSE',
		id: '33',
		updates: {
			note: 'this should not happen'
		}
	}
	const state = expensesReducer(expenses, action)
	expect(state).toEqual(expenses)
})

test('should set expenses', () => {
	const action = {
		type: 'SET_EXPENSES',
		expenses: [expenses[1]]
	}
	const state = expensesReducer(expenses, action)
	expect(state).toEqual([expenses[1]])
})
