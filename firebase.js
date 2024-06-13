
import {
	collection,
	addDoc,
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js'

// Функція для ініціалізації бази даних
export function initializeDatabase(db) {
	// Функція для додавання даних до бази даних Firebase
	async function addToDatabase() {
		try {
			// Додавання документу з текстом "привіт" у вашу колекцію "greetings"
			await addDoc(collection(db, 'greetings'), {
				message: 'привіт',
			})

			console.log('Дані успішно додані до бази даних')
		} catch (error) {
			console.error('Помилка додавання даних до бази даних:', error)
		}
	}

	// Виклик функції для додавання даних при завантаженні сторінки
	window.onload = addToDatabase
}
// // Імпортування необхідних модулів
// const TelegramBot = require('6851141044:AAGwoEGLoXTOuUsf0LNq04JeyJOVij_8WUc')
// const admin = require('firebase-adminsdk-beptz@eggfarm-d8952.iam.gserviceaccount.com')
// const serviceAccount = require('../EggFarmTgApp/eggfarm-d8952-firebase-adminsdk-beptz-1c39385def.json')

// // Ініціалізація Firebase Admin SDK
// admin.initializeApp({
// 	credential: admin.credential.cert(serviceAccount),
// })

// // Підключення до Firestore
// const db = admin.firestore()

// // Ініціалізація Telegram бота
// const token = '6851141044:AAGwoEGLoXTOuUsf0LNq04JeyJOVij_8WUc'
// const bot = new TelegramBot(token, { polling: true })

// // Обробка команди /start та збереження даних користувача у Firestore
// bot.onText(/\/start/, msg => {
// 	const chatId = msg.chat.id
// 	const user = msg.from

// 	const docRef = db.collection('users').doc(user.id.toString())
// 	docRef
// 		.set({
// 			username: user.username,
// 			first_name: user.first_name,
// 			last_name: user.last_name,
// 		})
// 		.then(() => {
// 			bot.sendMessage(
// 				chatId,
// 				`Welcome ${user.first_name}! Your data has been saved.`
// 			)
// 		})
// 		.catch(error => {
// 			console.error('Error writing document: ', error)
// 			bot.sendMessage(chatId, `Failed to save data: ${error.message}`)
// 		})
// })

// // Обробка команди /getdata та отримання даних користувача з Firestore
// bot.onText(/\/getdata/, msg => {
// 	const chatId = msg.chat.id
// 	const user = msg.from

// 	const docRef = db.collection('users').doc(user.id.toString())
// 	docRef
// 		.get()
// 		.then(doc => {
// 			if (doc.exists) {
// 				const data = doc.data()
// 				bot.sendMessage(chatId, `User data: ${JSON.stringify(data)}`)
// 			} else {
// 				bot.sendMessage(chatId, 'No data found for this user.')
// 			}
// 		})
// 		.catch(error => {
// 			console.error('Error getting document: ', error)
// 			bot.sendMessage(chatId, `Failed to retrieve data: ${error.message}`)
// 		})
// })


