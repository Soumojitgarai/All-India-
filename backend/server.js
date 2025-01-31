const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { pool } = require('./db'); 
const userRoutes = require('./routes/users'); 
const serviceProviderRoutes = require('./routes/serviceproviders'); 
// ... other route imports

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoutes); 
app.use('/api/serviceproviders', serviceProviderRoutes); 
// ... other route mounts

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});