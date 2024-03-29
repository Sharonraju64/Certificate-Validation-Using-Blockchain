# Certificate Validation Using Blockchain

This is a Flask web server that connects users, schools, and certificates to a blockchain-based certificate verification system. The goal of this system is to provide a secure and tamper-proof way of verifying educational certificates and degrees.

## Getting Started

## Prerequisites

- Python 3.6 or higher
- Flask
- Flask-RESTful
- Flask-CORS
- SQLAlchemy
- MySQL

## Installing

Clone the repository:

```
git clone https://github.com/Sharonraju64/Certificate-Validation-Using-Blockchain.git
```

## start the frontend

```
cd frontend
```

install the react dependencies

```
npm i
```

start development server

```
npm start
```

## start backend application

Create a virtual environment and activate it.

Install the required Python packages:

```
pip install -r requirements.txt
```

Set the environment variables (see the Configuration section below).

Start the Flask web server:

```
python3 -m app.api.v1.app
```

## Configuration

The following environment variables must be set in order to run the web server:

```
MYSQL_USER: The MySQL username.
MYSQL_PWD: The MySQL password.
MYSQL_HOST: The MySQL server hostname.
MYSQL_DB: The name of the MySQL database.
API_HOST: The hostname or IP address where the web server will listen for requests (default: 0.0.0.0).
API_PORT: The port where the web server will listen for requests (default: 5000).
SECRET_KEY: The secret key used by Flask for session management.
```

## Blockchain Integration

This system supports two types of storage: MySQL and blockchain-based storage. To use blockchain-based storage, you must have a running Ethereum blockchain node and a smart contract that implements the certificate storage and verification logic.

- Starting the nodes

```
cd Backend/contracts
```

`npm i` to install requrimentest



## Contributing

Contributions are welcome! Please read the CONTRIBUTING.md file for more information.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
#Certificate-Validation-Using-Blockchain