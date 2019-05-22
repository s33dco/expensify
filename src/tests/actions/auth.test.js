import { login, logout } from '../../actions/auth'

test('should generate login in action object', () => {
	const uid = 'ghfhiweuhfwiehfwehfiwhef'
	const action = login(uid)
	expect(action).toEqual({
		type: 'LOGIN',
		uid
	})
})

test('should generate logout in action object', () => {
	const action = logout()
	expect(action).toEqual({ type: 'LOGOUT' })
})
