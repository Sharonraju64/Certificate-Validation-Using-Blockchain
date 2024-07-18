#!/usr/bin/python3
"""
Certificate connection route to contract
"""
from web3 import Web3
from flask import jsonify, request, abort
import json
import os
import time
from datetime import datetime
from app.models import storage
from app.models.certificate import Certificate
from app.models.certificate_request_verification import VerifyCertificate
from app.api.v1.views import app_views
from app.api.v1.views.utilities.encode import generate_keccak256_hash
from eth_abi import decode
    
# Initialize Flask app and Web3 provider
with open('D:\Blockchain-Certificate-Verification-System-main/Backend/build/contracts/CertificateVerifier.json') as f:
    certificate_json = json.load(f)

contract_abi = certificate_json['abi']
bytecode = certificate_json['bytecode']

w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:7545'))
contract_address = "0x859dB2A401d1a54596487cd50399666151bEC5Af"
contract = w3.eth.contract(
    address=contract_address,
    abi=contract_abi,
    bytecode=bytecode)

# Flask routes


@app_views.route('/add-certificate/<certificate_id>', methods=['POST'])
def add_contract_certificate(certificate_id):
    """
    Add new certificate to contract
    """
    try:
        # Get the certificate data from the request body
        if not request.get_json():
            abort(400, description="Not a JSON")

        data = request.get_json()
        certificate = storage.get(Certificate, certificate_id)
        #print(data)
        # certificate_data = request.json
        certificate_id = certificate.id
        student_name = certificate.student_name
        institute_name = certificate.institute_name
        reg_no = certificate.reg_no
        father_name = certificate.fathers_name

        # Generate the certificate hash
        certificate_data_string = f"{certificate_id}{student_name}{institute_name}{reg_no}{father_name}{certificate_id}{datetime.utcnow()}{os.environ['SECRET_KEY']}"
        certificate_hash = generate_keccak256_hash(certificate_data_string)
        # print(certificate_data_string)
        # print(certificate_hash)

        # Get the account that will send the transaction
        # account = w3.eth.accounts[0]
        account = Web3.to_checksum_address(data['account'])

        # Build the transaction to add the certificate to the contract
        tx_hash = contract.functions.addCertificate(
            certificate_id,
            student_name,
            institute_name,
            reg_no,
            father_name,
            certificate_hash).transact(
            {
                'from': account,
            })

        # Wait for the transaction to be mined
        #print(tx_hash)
        receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
        #print(receipt)
        if not receipt:
            abort(404, description="Failed minting of certificate")

        certificate_info = contract.functions.getCertificateInfo(
            certificate_hash).call()
        #print(certificate_info)
        print(certificate_info[3])
        if not certificate_info:
            abort(404, description="Certificate not created successfully")


        # Construct the response JSON
        response = {
            'certificate_hash': certificate_info[0].hex(),
            'certificate_id': certificate_info[1],
            'student_name': certificate_info[2],
            'institute_name': certificate_info[3],
            'reg_no': certificate_info[4],
            'fathers_name': certificate_info[5],
            'verified': certificate_info[6],
        }
        print(response)
        setattr(certificate, "certificate_hash", certificate_info[0].hex())
        certificate_verification_status = storage.get_certificates_status(VerifyCertificate, certificate.id)
        setattr(certificate_verification_status, "certificate_status", "pending")
        storage.save()


        return jsonify({'success': True, 'certificate_data': certificate.to_dict()})

    except ValueError as e:
        abort(400, description=str(e))
    except Exception as e:
        abort(500, description=str(e))


@app_views.route('/get-certificate/<string:certificate_hash>', methods=['GET'])
def get_contract_certificate(certificate_hash):
    """
    Get a certificate from the contract
    """
    try:
        # Get certificate data from contract function
        certificate_info = contract.functions.getCertificateInfo(
            bytes.fromhex(certificate_hash)).call()

        # Construct the response JSON
        response = {
            'certificate_hash': certificate_info[0].hex(),
            'certificate_id': certificate_info[1],
            'student_name': certificate_info[2],
            'institute_name': certificate_info[3],
            'reg_no': certificate_info[4],
            'fathers_name': certificate_info[5],
            'certificate_verify': certificate_info[6],
        }

        return jsonify({'success': True, 'certificate_data': response})

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 400


@app_views.route('/verify-certificate/<string:certificate_hash>',
                 methods=['PUT'])
def verify_contract_certificate(certificate_hash):
    """
    Verify a certificate
    """
    try:
        data = request.get_json()
        # account = w3.eth.accounts[0]
        certificate = storage.get(Certificate, data['certificate_id'])
        account = Web3.to_checksum_address(data['account'])
        tx_hash = contract.functions.verifyCertificate(
            bytes.fromhex(certificate_hash)).transact({'from': account, })
        receipt = w3.eth.wait_for_transaction_receipt(tx_hash)
        if not receipt:
            return jsonify(                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
                {'success': False, 'message': 'Transaction failed to execute.'}), 400
        certificate_info = contract.functions.getCertificateInfo(
            bytes.fromhex(certificate_hash)).call()
        print(account)
        print(tx_hash)
        print(receipt)
        print(certificate_info)
        response = {
            'certificate_hash': certificate_info[0].hex(),
            'certificate_id': certificate_info[1],
            'student_name': certificate_info[2],
            'institute_name': certificate_info[3],
            'reg_no': certificate_info[4],
            'fathers_name': certificate_info[5],
            'certificate_verify': certificate_info[6],
        }
        print(response)
        certificate_data = certificate.to_dict()
        print(certificate_data)
        for key, value in certificate_data.items():
            if key not in response:
                response["key"] = value
        setattr(certificate, "verified_certificate", certificate_info[6])
        certificate_verification_status = storage.get_certificates_status(VerifyCertificate, certificate.id)
        print(certificate_verification_status)
        setattr(certificate_verification_status, "certificate_status", "verified")
        storage.save()

        return jsonify({'success': True, 'verified': response})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 400
