import authReducer from '../../reducers/auth'

test('should set uid for login', () => {
	const action = {
		type: 'LOGIN',
		uid: '98uru9'
	}
	const state = authReducer({}, action)
	expect(state.uid).toBe(action.uid)
})

test('should clear uid or logout', () => {
	const action = { type: 'LOGOUT' }
	const state = authReducer({ uid: '98uru9' }, action)
	expect(state).toEqual({})
})
