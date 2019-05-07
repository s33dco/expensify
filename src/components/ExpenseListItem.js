import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import numeral from 'numeral'
import 'numeral/locales'
numeral.locale('en-gb')
numeral.defaultFormat('$0,0.00')

const ExpenseListItem = ({ description, amount, createdAt, id }) => (
	<div>
		<Link to={`/edit/${id}`}>
			<h3>{description}</h3>
		</Link>
		<p>
			{numeral(amount / 100).format()}-{moment(createdAt).format('Do MMMM YYYY')}
		</p>
	</div>
)

export default ExpenseListItem
