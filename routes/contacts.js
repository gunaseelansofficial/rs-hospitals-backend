const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { sendTelegramMessage } = require('../utils/telegram');

// @route   POST /api/contacts
// @desc    Submit a contact inquiry
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, department, date, message } = req.body;
        
        const newContact = new Contact({
            name,
            email,
            phone,
            department,
            date,
            message
        });

        const contact = await newContact.save();

        // Send Telegram Notification
        try {
            const telegramMsg = `
<b>📬 New Contact Inquiry!</b>

<b>👤 Name:</b> ${name}
<b>📞 Phone:</b> ${phone}
<b>📧 Email:</b> ${email}
<b>🏢 Dept:</b> ${department || 'N/A'}
<b>💬 Message:</b> ${message}

<i>#RS_Hospitals #NewInquiry</i>`;
            
            await sendTelegramMessage(telegramMsg);
        } catch (msgErr) {
            console.error('⚠️ Could not send Telegram alert:', msgErr.message);
        }

        res.json({ success: true, contact, message: 'Your message has been sent successfully!' });
    } catch (err) {
        console.error('❌ Contact Submission Error:', err);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send message. Please try again later.' 
        });
    }
});

module.exports = router;
