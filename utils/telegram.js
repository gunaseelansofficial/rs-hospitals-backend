/**
 * Telegram Notification Utility
 * Sends messages to a Telegram bot using native fetch API
 */

const sendTelegramMessage = async (message) => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
        console.warn('⚠️ Telegram credentials not found. Notification skipped.');
        return;
    }

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML'
            })
        });

        const data = await response.json();
        if (!data.ok) {
            console.error('❌ Telegram API Error:', data.description);
        } else {
            console.log('✅ Telegram Notification Sent');
        }
    } catch (error) {
        console.error('❌ Failed to send Telegram message:', error.message);
    }
};

module.exports = { sendTelegramMessage };
