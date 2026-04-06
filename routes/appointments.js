const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

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
        res.json({ success: true, appointment, reference: appointment._id });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
