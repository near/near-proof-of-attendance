import { normalizePort } from "./config/normalizePort"
import app from "./app"

const port = normalizePort(process.env.PORT || '3000')

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})