require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./model/User');
const Product = require('./model/Product');

const dummyUsers = [
    {
        name: 'Abhishek',
        email: 'abhishek@example.com',
        password: '123456',
        role: 'user',
        verified: true
    },
    {
        name: 'Rahul',
        email: 'rahul@example.com',
        password: '123456',
        role: 'user',
        verified: true
    },
    {
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin',
        verified: true
    }
];

const dummyProducts = [
    {
        name: 'Wireless Headphones',
        description: 'High quality wireless headphones',
        price: 1999,
        category: 'Electronics',
        stock: 25,
        imageUrl: 'https://via.placeholder.com/500'
    },
    {
        name: 'Smart Watch',
        description: 'Smart watch with fitness tracking',
        price: 2499,
        category: 'Electronics',
        stock: 15,
        imageUrl: 'https://via.placeholder.com/500'
    },
    {
        name: 'Running Shoes',
        description: 'Comfortable running shoes',
        price: 1799,
        category: 'Footwear',
        stock: 30,
        imageUrl: 'https://via.placeholder.com/500'
    },
    {
        name: 'Laptop Backpack',
        description: 'Water resistant laptop backpack',
        price: 999,
        category: 'Bags',
        stock: 40,
        imageUrl: 'https://via.placeholder.com/500'
    },
    {
        name: 'Cotton T-Shirt',
        description: 'Comfortable cotton t-shirt',
        price: 599,
        category: 'Clothing',
        stock: 50,
        imageUrl: 'https://via.placeholder.com/500'
    },
    {
        name: 'Gaming Mouse',
        description: 'RGB gaming mouse',
        price: 799,
        category: 'Electronics',
        stock: 20,
        imageUrl: 'https://via.placeholder.com/500'
    }
];


const seedDatabase = async () => {
    try {

        // MongoDB connection ONLY here
        await mongoose.connect(process.env.MONGO_URI);

        console.log('MongoDB Connected');

        // Delete old data
        await User.deleteMany({});
        await Product.deleteMany({});

        console.log('Old data deleted');

        // Hash user passwords
        const users = await Promise.all(
            dummyUsers.map(async (user) => ({
                ...user,
                password: await bcrypt.hash(user.password, 10)
            }))
        );

        // Insert users
        await User.insertMany(users);

        console.log(`${users.length} users inserted`);

        // Insert products
        await Product.insertMany(dummyProducts);

        console.log(`${dummyProducts.length} products inserted`);

        console.log('Database seeded successfully');

    } catch (error) {

        console.error('Seed Error:', error.message);

    } finally {

        // Close connection ONLY here
        await mongoose.connection.close();

        console.log('MongoDB connection closed');
    }
};

seedDatabase();