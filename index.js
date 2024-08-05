const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const redis = require("redis");
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");
let RedisStore = require("connect-redis").default;

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  SESSION_SECRET,
  REDIS_URL,
  REDIS_PORT,
} = require("./config/config");

let redisClient = redis.createClient({
  host: REDIS_URL,
  PORT: REDIS_PORT,
  url: `redis://${REDIS_URL}:${REDIS_PORT}`,
});
const app = express();

const connectWithRetry = () => {
  mongoose
    .connect(
      `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
    )
    .then(() => console.log("successfully connected to db"))
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRetry, 5000);
    });
};
connectWithRetry();

const initApp = async () => {
  try {
    await redisClient.connect();
    console.log("Connected to Redis");

    app.use(
      session({
        store: new RedisStore({ client: redisClient }),
        secret: SESSION_SECRET,
        
        cookie: {
          secure: false,
          resave: false,
        saveUninitialized: false, // Set to true if using HTTPS
          httpOnly: true,
          maxAge: 3000000,
        },
      })
    );

    // Middleware to log the session
    app.use((req, res, next) => {
     // console.log("Session:", req.session);
      next();
    });

    app.use(express.json());
    app.use("/api/v1/posts", postRouter);
    app.use("/api/v1/users", userRouter);

    const port = process.env.PORT || 3000;
    app.get("/", (req, res) => {
      res.send("<h2> Hi there!!!!!!</h2>");
    });

    app.listen(port, "0.0.0.0", () => console.log(`Listening on port ${port}`));
  } catch (error) {
    console.error("Failed to connect to Redis", error);
    process.exit(1); // Exit process with failure
  }
};

initApp();