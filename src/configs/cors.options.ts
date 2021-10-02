const options = {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    credentials: true
}

export default options;