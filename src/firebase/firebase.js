// import * as firebase from 'firebase' // take all named exports and put them on firebase variable - too much.
import firebase from 'firebase/app'
import 'firebase/database'

// it is good to be able to connect to the relevant dev or test db by way of the NODE_ENV on build
// but all API_keys etc should be kept in the backend, the env variables are great to gitignore and keep out of the repo
// the they will be in plain site in the bundle.js.

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DATABASE_URL,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID
}

firebase.initializeApp(firebaseConfig)

const database = firebase.database()

export { firebase, database as default }

// // subscription listening for child_removed
// database.ref('expenses').on('child_removed', snapShot => {
// 	console.log(snapShot.key, snapShot.val())
// })

// // subscription listening for child_changed
// database.ref('expenses').on('child_changed', snapShot => {
// 	console.log(snapShot.key, snapShot.val())
// })

// // subscription listening for child_added
// database.ref('expenses').on('child_added', snapShot => {
// 	console.log(snapShot.key, snapShot.val())
// })

// manipulate firebase to return array of objects

// database
// 	.ref('expenses')
// 	.once('value')
// 	.then(snapshot => {
// 		const expenses = []
// 		snapshot.forEach(childSnapshot => {
// 			expenses.push({
// 				id: childSnapshot.key,
// 				...childSnapshot.val()
// 			})
// 		})
// 		console.log(expenses)
// 	})

// set up subscription to update whenever expenses changes

// database.ref('expenses').on(
// 	'value',
// 	snapshot => {
// 		const expenses = []
// 		snapshot.forEach(childSnapshot => {
// 			expenses.push({
// 				id: childSnapshot.key,
// 				...childSnapshot.val()
// 			})
// 		})
// 		console.log(expenses) // the array of objects
// 	},
// 	e => {
// 		// third parameter for error handling
// 		console.log('Error with data fetching')
// 	}
// )

// remove an expense

// database.ref('expenses/-LeTc4tZ-TjyEkn3Le68').remove()

// update an exoense
// database.ref('expenses/-LeTc4tTw-lbOKqatmfl').update({
// 	amount: 10000000000000,
// 	createdAt: 1,
// 	description: 'just another update'
// })

// use expenses ref as an array, push objects on to array.

// database.ref('expenses').push({
// 	description: 'pay bills',
// 	note: 'do quickly',
// 	amount: 500000,
// 	createdAt: 22345
// })

// database.ref('expenses').push({
// 	description: 'pay skills',
// 	note: 'do quickly',
// 	amount: 500000,
// 	createdAt: 22345
// })

// database.ref('notes').push({
// 	title: 'to do',
// 	body: 'pick up the lovetons'
// })

// database.ref('notes').push({
// 	title: 'to do',
// 	body: 'pick up the lovetons'
// })

// database.ref('notes/-LeRy73zqB_ML2sb6Tmh').update({
// 	body: 'buy food'
// })

// database.ref('expenses').push({
// 	description: 'pay bills',
// 	note: 'do quickly',
// 	amount: 500000,
// 	createdAt: 22345
// })

// const notes = [
// 	{ id: 12, body: 'this is my note', title: 'a note' },
// 	{ id: 7, body: 'another note', title: 'a note' }
// ]
// database.ref('notes').set(notes)

// database
// 	.ref()
// 	.once('value') // makes request once....
// 	.then(snapshot => {
// 		console.log(snapshot.val())
// 	})
// 	.catch(e => {
// 		console.log('oh noes', e)
// 	})

// // set up subscription, return of function as const for ease of unsubscribing...

// const onValueChange = database
// 	.ref()
// 	// listens for value changes so a callback rather than promise...
// 	.on(
// 		'value',
// 		snapshot => {
// 			console.log(snapshot.val())
// 		},
// 		e => {
// 			// third parameter for error handling
// 			console.log('Error with data fetching')
// 		}
// 	)

// database
// 	.ref('name')
// 	.set('Humpty')
// 	.then(() => {
// 		database.ref('name').set('Bumpty')
// 	})
// 	.then(() => {
// 		database.ref('name').set('Numpty')
// 	})
// 	.then(() => {
// 		database.ref('name').set('Sir Say What?')
// 	})

// setTimeout(() => {
// 	database.ref('age').set(42)
// }, 2000)

// setTimeout(() => {
// 	database.ref('age').set(7)
// }, 4000)

// setTimeout(() => {
// 	database.ref('age').set(22)
// }, 6000)

// setTimeout(() => {
// 	// cancel subscription
// 	database.ref().off('value', onValueChange)
// }, 8000)

// database
// 	.ref()
// 	.set({
// 		name: 'Me Me',
// 		age: 49,
// 		isHappy: true,
// 		location: {
// 			city: 'Brighton',
// 			county: 'England'
// 		}
// 	})
// 	.then(() => {
// 		console.log('data saved')
// 	})
// 	.catch(e => {
// 		console.log('oh noes')
// 	})

// database
// 	.ref('isHappy')
// 	.remove()
// 	.then(() => {
// 		console.log('data removed')
// 	})
// 	.catch(e => {
// 		console.log('oh noes')
// 	})

// database
// 	.ref()
// 	.update({
// 		name: 'Sir Siralot',
// 		age: 458,
// 		attributes: {
// 			height: 2000,
// 			weight: 5000
// 		},
// 		isHappy: null
// 	})
// 	.then(() => {
// 		console.log('data updated')
// 	})
// 	.catch(e => {
// 		console.log('oh noes')
// 	})

// database
// 	.ref()
// 	.update({
// 		'attributes/height': 100
// 	})
// 	.then(() => {
// 		console.log('data updated')
// 	})
// 	.catch(e => {
// 		console.log('oh noes')
// 	})

// set up func and subscribe
// const onValueChange = database
// 	.ref()
// 	// listens for value changes so a callback rather than promise...
// 	.on(
// 		'value',
// 		snapshot => {
// 			const details = snapshot.val()
// 			console.log(`${details.name} is ${details.age} and lives in ${details.location.city}`)
// 		},
// 		e => {
// 			// third parameter for error handling
// 			console.log('Error with data fetching')
// 		}
// )

// change data

// database
// 	.ref()
// 	.update({
// 		'location/city': 'Margate'
// 	})
// 	.then(() => {
// 		database.ref().update({
// 			'location/city': 'Torquay',
// 			age: 93
// 		})
// 	})
// 	.then(() => {
// 		database.ref().update({
// 			'location/city': 'Skegness',
// 			age: 44
// 		})
// 	})
// 	.then(() => {
// 		database.ref().update({
// 			'location/city': 'Lancing',
// 			age: 7
// 		})
// 	})
// 	.then(() => {
// 		database.ref().update({
// 			'location/city': 'Moreton',
// 			age: 64
// 		})
// 	})
// 	.catch(e => {
// 		console.log('oh noes')
// 	})

// // unsubscribe

// setTimeout(() => {
// 	database.ref().off('value', onValueChange)
// }, 5000)
