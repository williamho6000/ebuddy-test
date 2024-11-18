import { authMiddleware } from "../middleware/authMiddleware";
import userRoutes from '../routes/userRoutes';
import * as functions from 'firebase-functions';

const express = require("express");
const cors = require('cors')

const PORT = process.env.port || 3001;
const app = express();

app.use(cors())
app.use(express.json());
app.use(authMiddleware);

app.use('/users', userRoutes);

if (process.env.FUNCTIONS_EMULATOR) {
    exports.api = functions.https.onRequest(app);
} else {
    app.listen(PORT, () => {
        console.log(`Server is listening on port:${PORT}`)
    })
}
