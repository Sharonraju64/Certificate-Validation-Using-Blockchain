// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract CertificateVerifier {
    
    // Structure to hold information about each certificate
    struct Certificate {
        bytes32 certificateHash; // Hash of the certificate data
        string certificateId; //Id of the certificate
        string studentName; // Name of the student associated with the certificate
        string instituteName; // Name of the school associated with the certificate
        string registrationNumber; // Registration number of student associated with the certificate
        string fathersName; // Major of the student associated with the certificate
        //string course; // Department of the school associated with the certificate
        bool verified; // Whether the certificate has been verified
    }

    // Mapping to store certificates by their hash
    mapping(bytes32 => Certificate) private certificates;

    // Event to be emitted when a certificate is verified
    event CertificateVerified(bytes32 certificateHash);

    // Event to be emitted when a certificate is added
    event CertificateAdded(bytes32 indexed certificateHash, string certificateId, string studentName, string instituteName, string registrationNumber, string fathersName);

    // Function to add a new certificate to the mapping
    function addCertificate(string memory _certificateId, string memory _studentName, string memory _instituteName, string memory _registrationNumber ,string memory _fathersName, bytes32 _certificateHash) public {
        certificates[_certificateHash] = Certificate(_certificateHash, _certificateId, _studentName, _instituteName, _registrationNumber ,_fathersName, false);
        
        emit CertificateAdded(_certificateHash, _certificateId, _studentName, _instituteName, _registrationNumber ,_fathersName);
    }

    // Function to verify a certificate
    function verifyCertificate(bytes32 _certificateHash) public {
        require(certificates[_certificateHash].verified == false, "Certificate has already been verified");

        certificates[_certificateHash].verified = true;
        emit CertificateVerified(_certificateHash);
    }

    // Function to get the information associated with a certificate
    function getCertificateInfo(bytes32 _certificateHash) public view returns (bytes32, string memory, string memory, string memory, string memory, string memory, bool) {
        return (certificates[_certificateHash].certificateHash, certificates[_certificateHash].certificateId, certificates[_certificateHash].studentName, certificates[_certificateHash].instituteName, certificates[_certificateHash].registrationNumber, certificates[_certificateHash].fathersName, certificates[_certificateHash].verified);
    }
}
