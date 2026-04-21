const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');
const { sendTelegramMessage } = require('../utils/telegram');

// @route   POST /api/appointments
// @desc    Create an appointment
router.post('/', async (req, res) => {
    try {
        const { patientName, age, gender, doctor, department, date, time, message } = req.body;
        
        const newAppointment = new Appointment({
            patientName,
            age,
            gender,
            doctor,
            department,
            date,
            time,
            message
        });

        const appointment = await newAppointment.save();

        // Send Telegram Notification
        try {
            const doctorInfo = await Doctor.findById(doctor);
            const telegramMsg = `
<b>🏥 New Appointment Received!</b>

<b>👤 Patient:</b> ${patientName}
<b>🔢 Age:</b> ${age} | <b>🚻 Gender:</b> ${gender}
<b>👨‍⚕️ Doctor:</b> ${doctorInfo ? doctorInfo.name : 'N/A'}
<b>🏢 Dept:</b> ${department}
<b>📅 Date:</b> ${new Date(date).toLocaleDateString()}
<b>⏰ Time:</b> ${time}
<b>💬 Msg:</b> ${message || 'No extra notes'}

<i>#RS_Hospitals #NewAppointment</i>`;
            
            await sendTelegramMessage(telegramMsg);
        } catch (msgErr) {
            console.error('⚠️ Could not send Telegram alert:', msgErr.message);
        }

        res.json({ success: true, appointment, reference: appointment._id });
    } catch (err) {
        console.error('❌ Appointment Error:', err);
        res.status(500).json({ 
            success: false, 
            message: err.name === 'ValidationError' ? err.message : 'Server Error',
            error: process.env.NODE_ENV === 'production' ? null : err.message
        });
    }
});

module.exports = router;
