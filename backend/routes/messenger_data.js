const { listAllChatsForUser, getChatUsers, getUserNameByID, getUserID, getChatMessages, sendChatMessage, getCurrentMessageIndex, printInfo } = require('./../messenger_mgr');
const { loadDashboardJSON } = require('./../dashboard_handler');

module.exports = function (app) {
    app.post('/messenger_api/list_all_chats', async (req, res) => {
        const { token } = req.body;

        try {
            const userChatsList = await listAllChatsForUser(token);
            res.json( { chatsList: userChatsList });
        } catch (err) {
            res.status(401).json({ error: 'Invalid token' });
        }
    });

    app.post('/messenger_api/get_user_id', async (req, res) => {
        const { token } = req.body;

        try {
            const _userID = await getUserID(token);
            res.json( { userID: _userID });
        } catch (err) {
            res.status(401).json({ error: String(err) });
        }
    });

    app.post('/messenger_api/get_user_name_by_id', async (req, res) => {
        const { userID } = req.body;

        try {
            const _userName = await getUserNameByID(userID);
            res.json( { userName: _userName });
        } catch (err) {
            res.status(401).json({ error: String(err) });
        }
    });

    app.post('/messenger_api/get_chat_users', async (req, res) => {
        const { chatID } = req.body;

        try {
            const _chatUsers = await getChatUsers(chatID);
            res.json( { chatUsers: _chatUsers });
        } catch (err) {
            res.status(401).json({ error: String(err) });
        }
    });

    app.post('/messenger_api/get_chat_messages', async (req, res) => {
        const { chatID } = req.body;

        try {
            const _chatUsers = await getChatUsers(chatID);
            res.json( { chatUsers: _chatUsers });
        } catch (err) {
            res.status(401).json({ error: String(err) });
        }
    });

    app.post('/messenger_api/list_chat_messages', async (req, res) => {
        const { chatID } = req.body;

        try {
            const _chatMessages = await getChatMessages(chatID);
            res.json( { chatMessages: _chatMessages });
        } catch (err) {
            res.status(401).json({ error: String(err) });
        }
    });

    app.post('/messenger_api/send_message', async (req, res) => {
        const { chatID, bySend, messageText } = req.body;

        try {
            await sendChatMessage(chatID, bySend, messageText);
            res.json( { sendResult: "ok" });
        } catch (err) {
            res.status(401).json({ error: String(err) });
        }
    });

    app.post('/messenger_api/get_current_message_index', async (req, res) => {
        const { chatID } = req.body;

        try {
            const _currentMessageIndex= await getCurrentMessageIndex(chatID);
            res.json( { currentMessageIndex: _currentMessageIndex });
        } catch (err) {
            res.status(401).json({ error: String(err) });
        }
    });

    app.post('/dashboard_api/load_dashboard', async (req, res) => {
        const { _id } = req.body;

        try {
            const _dashboardContent = loadDashboardJSON(_id);
            console.log(_id);
            res.json( { dashboardContent: _dashboardContent });
        } catch (err) {
            res.status(401).json({ error: String(err) });
        }
    });
}