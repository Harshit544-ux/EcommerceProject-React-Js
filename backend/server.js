import express from "express"
import cors from "cors"
import 'dotenv/config'
import supabase from './config/supabase.js'

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// API Endpoints
app.get('/', (req, res) => {
  res.send("API is working");
});


app.get('/api/products', async (req, res) => {
    const { data, error } = await supabase.from('Forever_Ecommerce').select('*');
    console.log("data",data)
    if (error) {
        res.status(500).json({ error: error.message });
    } else {
        res.status(200).json(data);
    }
});

// Start server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
