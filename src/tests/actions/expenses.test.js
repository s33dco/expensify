import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {
	setExpenses,
	startSetExpenses,
	addExpense,
	startAddExpense,
	editExpense,
	startEditExpense,
	removeExpense,
	startRemoveExpense
} from '../../actions/expenses'
import expenses from '../fixtures/expenses'
import database from '../../firebase/firebase'

const uid = 'thisismytestuid'
const defaultAuthState = { auth: { uid } }
const createMockStore = configureMockStore([thunk])

beforeEach(done => {
	const expensesData = {}
	// format seed test data
	expenses.forEach(({ id, description, note, amount, createdAt }) => {
		expensesData[id] = { description, note, amount, createdAt }
	})
	// wait to be added to db
	database
		.ref(`users/${uid}/expenses`)
		.set(expensesData)
		.then(() => done())
})

test('should setup remove expenses action object', () => {
	const action = removeExpense({ id: '123abc' })
	expect(action).toEqual({
		type: 'REMOVE_EXPENSE',
		id: '123abc'
	})
})

test('should remove expense from firebase', done => {
	const store = createMockStore(defaultAuthState)
	const id = expenses[2].id
	store
		.dispatch(startRemoveExpense({ id }))
		.then(() => {
			const actions = store.getActions()
			expect(actions[0]).toEqual({
				type: 'REMOVE_EXPENSE',
				id
			})
			return database.ref(`users/${uid}/expenses/${id}`).once('value')
		})
		.then(snapshot => {
			expect(snapshot.val()).toBeFalsy()
			done()
		})
})

test('it should setup edit expense action object', () => {
	const action = editExpense('123abc', { note: 'new note value' })
	expect(action).toEqual({
		type: 'EDIT_EXPENSE',
		id: '123abc',
		updates: {
			note: 'new note value'
		}
	})
})

test('should edit expense from firebase', done => {
	const store = createMockStore(defaultAuthState)
	const id = expenses[2].id
	const updates = { description: 'updated' }
	store
		.dispatch(startEditExpense(id, updates))
		.then(() => {
			// because promise returned
			const actions = store.getActions()
			expect(actions[0]).toEqual({
				type: 'EDIT_EXPENSE',
				id,
				updates
			})
			return database.ref(`users/${uid}/expenses/${id}`).once('value') // again return to chain things on
		})
		.then(snapshot => {
			expect(snapshot.val().description).toBe(updates.description)
			done()
		})
})

test('should set up add expense action object with provided values', () => {
	const action = addExpense(expenses[2])
	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: expenses[2]
	})
})

test('should add expenses to database and store', done => {
	const store = createMockStore(defaultAuthState)
	const expenseData = {
		description: 'Mouse',
		amount: 3000,
		note: 'This one is better',
		createdAt: 1000
	}

	store
		.dispatch(startAddExpense(expenseData)) //start asyc func running
		.then(() => {
			const actions = store.getActions()
			expect(actions[0]).toEqual({
				// expect was dispatched
				type: 'ADD_EXPENSE',
				expense: {
					id: expect.any(String),
					...expenseData
				}
			})
			return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
		})
		.then(snapshot => {
			expect(snapshot.val()).toEqual(expenseData)
			done()
		})
})

test('should add with defaults to expenses to database and store', done => {
	const store = createMockStore(defaultAuthState)
	const expenseData = {}
	const expenseDefaults = {
		description: '',
		note: '',
		amount: 0,
		createdAt: 0
	}

	store
		.dispatch(startAddExpense(expenseData)) //start asyc func running
		.then(() => {
			const actions = store.getActions()
			expect(actions[0]).toEqual({
				// expect was dispatched
				type: 'ADD_EXPENSE',
				expense: {
					id: expect.any(String),
					description: '',
					note: '',
					amount: 0,
					createdAt: 0
				}
			})
			return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
		})
		.then(snapshot => {
			expect(snapshot.val()).toEqual(expenseDefaults)
			done()
		})
})

test('should setup set expenses action object with data', () => {
	const action = setExpenses(expenses)
	expect(action).toEqual({
		type: 'SET_EXPENSES',
		expenses
	})
})

test('should fetch the expenses from firebase', done => {
	const store = createMockStore(defaultAuthState)
	store.dispatch(startSetExpenses()).then(() => {
		const actions = store.getActions()
		expect(actions[0]).toEqual({
			type: 'SET_EXPENSES',
			expenses
		})
		done()
	})
})
