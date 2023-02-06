const TelegramApi = require('node-telegram-bot-api')

const {gameOptions, againOptions} = require('./options.js')

const token = "5035198168:AAH-ptQ__n8Hg_37S8J_4TUyrz8V9uDIrjs"

const bot = new TelegramApi(token, {polling: true})

const chats = {}


const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `Угадаешь мое либимое число?`)
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Отгадывай)', gameOptions);
}

const start = () => {
    bot.setMyCommands([
        {command:'/start', description: 'Поздароваться с горячим незнакомцем..'}
    ])
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/598/712/59871276-e6c4-44ae-9d34-863ff75e75a6/7.webp')
            await bot.sendMessage(chatId, 'Привет Кис-кис)')
            return bot.sendMessage(chatId, `Да, это я, Тимати Шаламе \nЖду твоих команд.. : \n/info \n/paws \n/game`)
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Тебя зовут ${msg.chat.first_name} ${msg.chat.username}!`)
        }
        if (text === '/paws') {
            await bot.sendMessage(chatId, `${msg.chat.first_name}, давай на этот раз ты останешься со мной дома.. Мау`)
            return bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/598/712/59871276-e6c4-44ae-9d34-863ff75e75a6/4.webp')
        }
        if (text === '/game') {
            return startGame(chatId)
        }
        return bot.sendMessage(chatId, 'Сладкая.. Я тебя не понимаю.. \nМожет уже перейдем на язык любви?')

    })

    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(chatId)
        }
        if (data === chats[chatId]) {
            return bot.sendMessage(chatId, `Ого.. Да, это была ${chats[chatId]} \nЯ думаю у нас с тобой особая связь..`, againOptions)
        } else {
            return bot.sendMessage(chatId, 'К сожалению это не то число.. И сама же видишь что тут нету твоего года рождения)', againOptions)
        }
    })
}

start()