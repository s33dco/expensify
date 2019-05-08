import selectExpensesTotal from '../../selectors/expenses-total'
import expenses from '../fixtures/expenses'

test('should return 0 if no expenses', () => {
	const result = selectExpensesTotal([])
	expect(result).toBe(0)
})

test('should add up one expense', () => {
	const testExpenses = [expenses[0]]
	const result = selectExpensesTotal(testExpenses)
	expect(result).toBe(195)
})

test('should add up all expenses', () => {
	const testExpenses = expenses
	const result = selectExpensesTotal(testExpenses)
	expect(result).toBe(114195)
})
