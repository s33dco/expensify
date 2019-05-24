import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'
import 'numeral/locales'
numeral.locale('en-gb')
numeral.defaultFormat('$0,0.00')

const ExpenseListItem = ({ description, amount, createdAt, id }) => (
	<Link className='list-item' to={`/edit/${id}`}>
		<div>
			<h3 className='list-item__title'>{description}</h3>
			<span className='list-item__subtitle'>{moment(createdAt).format('Do MMMM YYYY')}</span>
		</div>
		<h3 className='list-item__data'>{numeral(amount / 100).format()}</h3>
	</Link>
)

export default ExpenseListItem
