const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Doctor = require('./models/Doctor');
const Service = require('./models/Service');

dotenv.config();

const doctors = [
    {
        name: 'Dr. Prabhu',
        qualification: 'MBBS, MD (Psychiatry)',
        specialization: 'Psychiatry',
        experience: '12+ Years',
        availableTime: '9:00 AM – 8:00 PM',
        type: 'Full-Time Eye Specialist', // User requested this type for Dr. Prabhu
        icon: '🧠',
        bgColor: 'bg-indigo-50',
        available: true
    },
    {
        name: 'Dr. Barath Arjun',
        qualification: 'MBBS, MS (Ophthalmology)',
        specialization: 'Ophthalmology',
        experience: '8+ Years',
        availableTime: '4:00 PM – 8:30 PM',
        type: 'Full-Time Specialist',
        icon: '👁',
        bgColor: 'bg-blue-50',
        available: true
    },
    {
        name: 'Dr. Bhanu Regha',
        qualification: 'MBBS (Ophthalmology)',
        specialization: 'Ophthalmology',
        experience: '15+ Years',
        availableTime: '9:00 AM – 3:00 PM',
        type: 'Visiting Eye Surgeon',
        icon: '👁',
        bgColor: 'bg-emerald-50',
        available: true
    },
    {
        name: 'Dr. Rajaram Thangasamy',
        qualification: 'MBBS, DNB (Ophthalmology)',
        specialization: 'Ophthalmology',
        experience: '20+ Years',
        availableTime: 'Visiting Surgeon',
        type: 'Visiting Specialist',
        icon: '👁',
        bgColor: 'bg-amber-50',
        available: true
    },
    {
        name: 'Dr. Adaikalanathan Louis',
        qualification: 'Diploma in Anaesthesiology',
        specialization: 'Anaesthesiology',
        experience: '30+ Years',
        availableTime: 'Visiting Specialist',
        type: 'Visiting Specialist',
        icon: '💉',
        bgColor: 'bg-rose-50',
        available: true
    }
];

const services = [
    {
        name: "Cardiology",
        icon: "Heart",
        description: "Advanced heart care including diagnostics and interventional procedures."
    },
    {
        name: "Neurology",
        icon: "Brain",
        description: "Comprehensive care for brain and nervous system disorders."
    },
    {
        name: "Orthopedics",
        icon: "Activity",
        description: "Expert treatment for bone, joint, and muscle conditions."
    },
    {
        name: "Pediatrics",
        icon: "Baby",
        description: "Specialized medical care for infants, children, and adolescents."
    },
    {
        name: "Dermatology",
        icon: "User",
        description: "Advanced treatment for skin, hair, and nail conditions."
    },
    {
        name: "Oncology",
        icon: "Shield",
        description: "Cutting-edge cancer diagnosis and treatment plans."
    }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        await Doctor.deleteMany();
        await Service.deleteMany();

        await Doctor.insertMany(doctors);
        await Service.insertMany(services);

        console.log('✅ Database seeded successfully!');
        process.exit();
    } catch (err) {
        console.error('❌ Error seeding database:', err);
        process.exit(1);
    }
}

seed();
