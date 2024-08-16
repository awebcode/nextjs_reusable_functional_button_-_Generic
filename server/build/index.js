console.log("Hello via Buxn!");
import MongoStore from "connect-mongo";
import express, {} from "express";
const app = express();
import session from "express-session";
app.use(session({
    name: "MySession",
    secret: "Secret",
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        maxAge: 1000 * 60 * 60 * 7,
    },
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://Asikur:12345@cluster0.txiokqr.mongodb.net/express_session",
    }),
}));
app.use(express.json());
app.post("/register", async (req, res, next) => {
    const { name } = req.body;
    req.session.user = {
        name,
        isLoggedIn: true,
    };
    try {
        const data = await req.session.save();
        res.json({ name, data });
    }
    catch (err) {
        console.error("Error saving to session storage: ", err);
        return next(new Error("Error creating user"));
    }
    res.status(200).send();
});
app.post("/login", async (req, res, next) => {
    const { name } = req.body;
    try {
        if (req.session.user) {
            res.json({ data: req.session.user, message: "You are already logged in" });
        }
        else {
            res.json({ message: "You are not logged in" });
        }
    }
    catch (err) {
        console.error("Error saving to session storage: ", err);
        return next(new Error("Error creating user"));
    }
    res.status(200).send();
});
app.get("/name", (req, res) => {
    console.log({ req: req.session });
    if (!req.session) {
        return res.status(404).send();
    }
    return res.status(200).send({ name: req.session.user });
});
app.get("/", (req, res) => {
    return res.status(200).send({ count: "hit" });
});
app.post("/logout", async (req, res, next) => {
    try {
        await req.session.destroy((err) => {
            if (err) {
                console.error("Error logging out:", err);
                return next(new Error("Error logging out"));
            }
        });
        res.clearCookie("MySession");
    }
    catch (err) {
        console.error("Error logging out:", err);
        return next(new Error("Error logging out"));
    }
    res.status(200).send();
});
app.listen(4000, () => {
    console.log("App listening on port 4000");
});
