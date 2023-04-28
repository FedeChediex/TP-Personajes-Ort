import 'dotenv/config'

const config = {
    user: process.env.,
    password: process.env.,
    server:process.env.,
    database:process.env.,
    options : {
        trustServerCertificate  : true,
        trustedConnection       : true,
    }
}

export default config;