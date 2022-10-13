import app from "./app.js";
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`app is up and running on port ${port}`);
});
