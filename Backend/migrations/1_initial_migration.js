const Certificate = artifacts.require("CertificateVerifier");

module.exports = function(deployer){
    deployer.deploy(Certificate);
}