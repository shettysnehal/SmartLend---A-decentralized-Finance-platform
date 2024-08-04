// SPDX-License-Identifier: MIT
pragma solidity ^0.8;


contract CampaignFactory {
    struct CampaignInfo {
        address campaignAddress;
        string country;
        uint year;
        string description;
    }

    CampaignInfo[] public deployedCampaigns;
    mapping(string=>string) emailotp;

    event CampaignCreated(address campaignAddress, address manager);

    function createCampaign(
        uint minimum, 
        bool isPublic, 
        string memory _country, 
        uint year, 
        string memory description, 
        string memory email,
        string memory _interest
    ) public {
        Campaign newCampaign = new Campaign(minimum, msg.sender, isPublic, email, _country, year, description,_interest);
        CampaignInfo memory campaignInfo = CampaignInfo({
            campaignAddress: address(newCampaign),
            country: _country,
            year: year,
            description: description
        });
        deployedCampaigns.push(campaignInfo);
        emit CampaignCreated(address(newCampaign), msg.sender);
    }

    function getDeployedCampaigns() public view returns (CampaignInfo[] memory) {
        return deployedCampaigns;
    }
    function setOtp(string memory email,string memory otp) external {
        emailotp[email] = otp;
    }
    function returnOtp(string memory _email) public view returns (string memory ){
        return emailotp[_email];
    }

   
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;
    Request[] public requests;
    bool public isPublic;
    string public email;
    string public country;
    uint public year;
    string public campaignDescription;
    mapping(address=>bool) public authorizedUsers;
    address[] public authorized;
    string public interestRate;
    modifier restricted() {
        require(msg.sender == manager, "Caller is not the manager");
        _;
    }

    modifier onlyAuthorized() {
        require(isPublic || authorizedUsers[msg.sender], "Caller is not authorized");
        _;
    }
     modifier onlyApprovers() {
        require(approvers[msg.sender]);
        _;
    }

    constructor(
        uint minimum, 
        address creator, 
        bool isPublicCampaign, 
        string memory creatorEmail,
        string memory _country, 
        uint _year, 
        string memory _description,
        string memory interest
    ) {
        manager = creator;
        minimumContribution = minimum;
        isPublic = isPublicCampaign;
        email = creatorEmail;
        country = _country;
        year = _year;
        campaignDescription = _description;
        interestRate = interest;
    }

    function contribute() public payable onlyAuthorized {
        require(msg.value > minimumContribution, "Contribution is less than the minimum amount");
        approvers[msg.sender] = true;
        approversCount++;
    }

    function authorizeUser(address user) public restricted {
        authorizedUsers[user] = true;
        authorized.push(user);
    }

    function createRequest(
        string memory description,
        uint value,
        address recipient
    ) public restricted {
        Request storage newRequest = requests.push();
        newRequest.description = description;
        newRequest.value = value;
        newRequest.recipient = recipient;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
    }

    function approveRequest(uint index) public onlyApprovers {
        Request storage request = requests[index];

        require(approvers[msg.sender], "Caller is not an approver");
        require(!request.approvals[msg.sender], "Caller has already approved this request");

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
    function checkApprover()public view returns(bool){
       if(approvers[msg.sender]){
        return true;
       }
       else{
        return false;
       }
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(!request.complete, "Request is already complete");
        require(request.approvalCount > (approversCount / 2), "Not enough approvals");

        payable(request.recipient).transfer(request.value);
        request.complete = true;
    }
    
    function getSummary() public view returns (
        uint, uint, uint, uint, address, bool, string memory, string memory, uint, string memory,string memory
    ) {
        return (
            minimumContribution,
            address(this).balance,
            requests.length,
            approversCount,
            manager,
            isPublic,
            email,
            country,
            year,
            campaignDescription,
            interestRate
        );
    }
    function getAuthorizedUser()public view returns(address[] memory){
       return authorized;
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
}