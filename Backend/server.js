const express = require('express')
const cors = require("cors")
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const userRoutes  = require('./routes/userRoutes');
const productRoutes  = require('./routes/productRoutes');
const cartRoutes  = require('./routes/cartRoutes');
const checkoutRoutes  = require('./routes/checkoutRoutes');
const orderRoutes  = require('./routes/orderRoutes');
const uploadRoutes  = require('./routes/uploadRoutes');
const subscriberRoutes  = require('./routes/subscriberRoutes');
const adminRoutes  = require('./routes/adminRoutes');
const productAdminRoutes  = require('./routes/productAdminRoutes');
const adminOrderRoutes  = require('./routes/adminOrderRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes'); // Added wishlistRoutes

const app = express();
app.use(express.json());

// CORS configuration
app.use(cors()); // Allow all CORS for now

// const corsOptions = {
//     origin: ['http://localhost:5173'], // Allow your frontend origin
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
//     credentials: true, // Allow credentials (if needed)
// };

// app.use(cors(corsOptions)); // Use CORS middleware

dotenv.config()

const PORT = process.env.PORT || 3000;

// BD conn
connectDB();

app.get('/',(req,res)=>{
    res.send("Welcome meri tees");
})

// Api routes
app.use("/api/users",userRoutes)
app.use("/api/products",productRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/checkout",checkoutRoutes);    
app.use("/api/orders",orderRoutes);
app.use("/api/upload",uploadRoutes);
app.use("/api",subscriberRoutes);
app.use("/api/wishlist", wishlistRoutes); // Added wishlist route

// admin routes
app.use("/api/admin/users",adminRoutes);
app.use("/api/admin/products",productAdminRoutes);
app.use("/api/admin/orders",adminOrderRoutes);

if (require.main === module) {
    app.listen(PORT, () => {
        console.log("Server is running on PORT: ", PORT);
    });
}

module.exports = app;