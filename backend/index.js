const express = require ('express');
const cors = require ('cors');
const { userRouter } = require ('../backend/routes/user');
const bodyParser = require('body-parser');
const { accountRouter } = require('./routes/account');
const PORT = 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1', userRouter);
app.use('/api/v1/account', accountRouter);
app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`);
});