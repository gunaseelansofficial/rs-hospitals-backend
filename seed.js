const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Doctor = require('./models/Doctor');
const Service = require('./models/Service');

dotenv.config();

const doctors = [
    {
        name: "Dr. Sarah Johnson",
        specialization: "Cardiology",
        experience: "15 Years",
        bio: "Expert in interventional cardiology and heart failure management.",
        photo: "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=300&h=300",
        available: true
    },
    {
        name: "Dr. Michael Chen",
        specialization: "Neurology",
        experience: "12 Years",
        bio: "Specializing in stroke treatment and neuromuscular disorders.",
        photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300",
        available: true
    },
    {
        name: "Dr. Priya Sharma",
        specialization: "Orthopedics",
        experience: "10 Years",
        bio: "Focused on sports medicine and joint replacement surgeries.",
        photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300&h=300",
        available: true
    },
    {
        name: "Dr. James Wilson",
        specialization: "Pediatrics",
        experience: "8 Years",
        bio: "Dedicated to providing compassionate care for children and adolescents.",
        photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300",
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
