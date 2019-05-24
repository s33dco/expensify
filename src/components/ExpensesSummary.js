import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import selectExpenses from '../selectors/expenses'
import selectExpensesTotal from '../selectors/expenses-total'
import numeral from 'numeral'
import 'numeral/locales'
numeral.locale('en-gb')
numeral.defaultFormat('$0,0.00')

export const ExpensesSummary = ({ expenseCount, expenseTotal }) => {
	const expenseWord = expenseCount === 1 ? 'expense' : 'expenses'
	const formattedTotal = numeral(expenseTotal / 100).format()
	return (
		<div className='page-header'>
			<div className='content-container'>
				<h1 className='page-header__title'>
					Viewing <span>{expenseCount}</span> {expenseWord} totalling <span>{formattedTotal}</span>.
				</h1>
				<div className='page-header__actions'>
					<Link className='button' to='/create'>
						Add Expense
					</Link>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = state => {
	const visibleExpenses = selectExpenses(state.expenses, state.filters)
	return {
		expenseCount: visibleExpenses.length,
		expenseTotal: selectExpensesTotal(visibleExpenses)
	}
}
export default connect(mapStateToProps)(ExpensesSummary)

// first go

// export const ExpensesSummary = props => (
// 	<div>
// 		{props.expenses.length === 1 ? (
// 			<p>Viewing 1 expense totaling {numeral(props.total / 100).format()}</p>
// 		) : (
// 			<p>
// 				Viewing {props.expenses.length} expenses totaling {numeral(props.total / 100).format()}
// 			</p>
// 		)}
// 	</div>
// )

// const mapStateToProps = state => {
// 	return {
// 		expenses: selectExpenses(state.expenses, state.filters),
// 		total: selectExpensesTotal(selectExpenses(state.expenses, state.filters))
// 	}
// }

// export default connect(mapStateToProps)(ExpensesSummary)
