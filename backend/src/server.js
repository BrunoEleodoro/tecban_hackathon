import app from "./app"
import "dotenv/config"

const PORT = process.env.APP_ROUTE || 3333
app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`)
})