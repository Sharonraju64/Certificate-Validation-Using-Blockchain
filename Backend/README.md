# Certificate Validation Using Blockchain

Description
A Flask web server is a lightweight and scalable web framework used to build web applications in Python. In the context of connecting users, schools, and certificates to blockchain, a Flask web server can be used to create a decentralized and secure platform for managing academic credentials.

The web server can be designed to allow users to create accounts, create a certificate, request the provider school to verify it and receive certificates upon completion. Schools can also create accounts and verify student achievements, while the blockchain ensures the immutability and security of the data.

The Flask web server can be integrated with various blockchain technologies such as Ethereum, Hyperledger Fabric, or Corda, to provide a secure and transparent platform for managing academic credentials. Smart contracts can be used to automate the process of verifying and issuing certificates, while the decentralized nature of the blockchain ensures that the data is secure and tamper-proof.

a Flask web server provides a flexible and scalable solution for connecting users, schools, and certificates to blockchain, and can be used to create a decentralized platform for managing academic credentials that is transparent, secure, and easily accessible.

## Installation

Clone the repository to your local machine.

Install the required dependencies by running the following command:

Copy code

```
pip install -r requirements.txt
```

## Usage

To start the app, you'll need to set the following environment variables:
replace this with your correct env configurations.

### make file .env

```
MYSQL_USER=BCV_dev
MYSQL_PWD=BCV_dev_pwd
MYSQL_HOST=localhost
MYSQL_DB=BCV_dev_db
TYPE_STORAGE=db
API_HOST=0.0.0.0
API_PORT=5000
ENV=BCV_DEV
SECRET_KEY=""
```

Contributing
If you'd like to contribute to the project, please fell free to do so and connect with me.

License
This project is licensed under the MIT License - see the LICENSE.md file for details.
