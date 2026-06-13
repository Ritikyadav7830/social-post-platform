import connectDB from "./db/index.js";
import dotenv from "dotenv"
import app from "./app.js"

dotenv.config({
    path: './.env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {    
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})


// (async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       dbName: DB_NAME,
//     });

//     console.log("MongoDB connected successfully");

//     app.on("error", (error) => {
//       console.error("Express app error:", error);
//     });

//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });

//   } catch (error) {
//     console.error("ERROR:", error);
//     process.exit(1);
//   }
// })();