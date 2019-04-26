import uuid from "uuid"

// ADD_EXPENSE

export const addExpense = ({
	description = "", // default value is none parsed
	note = "", // default value is none parsed
	amount = 0, // default value is none parsed
	createdAt = 0 // default value is none parsed
} = {}) => ({
	type: "ADD_EXPENSE",
	expense: {
		// expense object with properties passed
		id: uuid(), // make an id
		description, // from object passed to generator function
		note,
		amount,
		createdAt
	}
})

// REMOVE_EXPENSE

export const removeExpense = ({ id } = {}) => ({
	type: "REMOVE_EXPENSE",
	id
})

// EDIT_EXPENSE

export const editExpense = (id, updates) => ({
	type: "EDIT_EXPENSE",
	id,
	updates
})
