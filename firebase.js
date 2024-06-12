// Імпортування необхідних модулів
const TelegramBot = require('node-telegram-bot-api')
const admin = require('firebase-admin')
const serviceAccount = require('./path/to/your/serviceAccountKey.json')

// Ініціалізація Firebase Admin SDK
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
})

// Підключення до Firestore
const db = admin.firestore()

// Ініціалізація Telegram бота
const token = 'YOUR_TELEGRAM_BOT_TOKEN'
const bot = new TelegramBot(token, { polling: true })

// Обробка команди /start та збереження даних користувача у Firestore
bot.onText(/\/start/, msg => {
	const chatId = msg.chat.id
	const user = msg.from

	const docRef = db.collection('users').doc(user.id.toString())
	docRef
		.set({
			username: user.username,
			first_name: user.first_name,
			last_name: user.last_name,
		})
		.then(() => {
			bot.sendMessage(
				chatId,
				`Welcome ${user.first_name}! Your data has been saved.`
			)
		})
		.catch(error => {
			console.error('Error writing document: ', error)
			bot.sendMessage(chatId, `Failed to save data: ${error.message}`)
		})
})

// Обробка команди /getdata та отримання даних користувача з Firestore
bot.onText(/\/getdata/, msg => {
	const chatId = msg.chat.id
	const user = msg.from

	const docRef = db.collection('users').doc(user.id.toString())
	docRef
		.get()
		.then(doc => {
			if (doc.exists) {
				const data = doc.data()
				bot.sendMessage(chatId, `User data: ${JSON.stringify(data)}`)
			} else {
				bot.sendMessage(chatId, 'No data found for this user.')
			}
		})
		.catch(error => {
			console.error('Error getting document: ', error)
			bot.sendMessage(chatId, `Failed to retrieve data: ${error.message}`)
		})
})
