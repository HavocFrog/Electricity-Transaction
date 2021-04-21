pragma solidity >=0.7.0 <0.9.0;

contract Electricity {
    
    mapping(string=>User) users;
    mapping(string=>bool) added;
    mapping(uint=>Rate) rates;
    string public a = "You are not registered";
    string public b = "Password Mismatch";
    string public c = "Successfully logged in";
    string public x = "Registration successful";
    string public y = "Registration unsuccessful";
    string public r1 = "Rate fixing done Successfully";
    string public r2 = "Rate fixing failed insufficient energy";
    uint public count = 0;
    string[] public array1;
    uint[] public array2;
    uint[] public array3;
    
    struct User {
        string name;
        string password;
        string homeAddress;
        uint sentInd;
        uint recvInd;
        uint amount;
        uint power;
        mapping(uint => string) sent;
        mapping(uint => string) recv;
    }
    
    struct Rate{
        uint id;
        string name;
        uint energy;
        uint costPerKwhr;
    }

    
    function transaction(string memory sender, string memory receiver, uint req, uint money, uint id) public {
        if(added[sender]==true && added[receiver]==true) {
            if(users[sender].power >= req && users[receiver].amount >= req*money) {
                users[sender].power -= req;
                users[receiver].power += req;
                users[sender].amount += money*req;
                users[receiver].amount -= money*req;
                users[sender].sentInd++;
                users[receiver].recvInd++;
                uint sentInd = users[sender].sentInd;
                uint recvInd = users[receiver].recvInd;
                users[sender].sent[sentInd] = receiver;
                users[receiver].recv[recvInd] = sender;
                removeName(id);
                removeCost(id);
                removeEnergy(id);
            }
        }
    }
    
    function addUser(string memory name, string memory homeAddress, string memory password, uint energy, uint amount) public {
        if(added[name]!=true) {
            added[name] = true;
            users[name].name = name;
            users[name].homeAddress = homeAddress;
            users[name].password = password;
            users[name].sentInd = 0;
            users[name].recvInd = 0;
            users[name].power = energy;
            users[name].amount = amount;
        }
    }
    
    function authenticate(string memory name, string memory password) public view returns (string memory) {
        if(added[name] == true){
            if (keccak256(bytes(users[name].password)) != keccak256(bytes(password))) {
                return b;
            }
            else{
                return name;
            }
        }
        return a;
    }
    
    function getSentInd(string memory name) public view returns (uint) {
        return users[name].sentInd;
    }
    
    function getRecvInd(string memory name) public view returns (uint) {
        return users[name].recvInd;
    }
    
    function getSentIndUser(string memory name, uint ind) public view returns (string memory) {
        return users[name].sent[ind];
    }
    
    function getRecvIndUser(string memory name, uint ind) public view returns (string memory) {
        return users[name].recv[ind];
    }
    
    function getEnergy(string memory name)  public view returns (uint) {
        return users[name].power;
    }
    
    function getName(string memory name) public view returns (string memory) {
        return users[name].name;
    }
    
    function getHomeAddress(string memory name) public view returns (string memory) {
        return users[name].homeAddress;
    }
    
    function getBalance(string memory name) public view returns (uint) {
        return users[name].amount;
    }
    
    function auctionNames() public view returns (string[] memory){
        return array1;
    }
    
    function auctionCost() public view returns (uint[] memory){
        return array2;
    }

    function auctionEnergy() public view returns (uint[] memory){
        return array3;
    }
    
    function rateFixing(string memory name, uint costPerKwhr, uint energy) public returns(string memory){
        if(users[name].power >= energy){
            rates[count].id = count;
            rates[count].name = name;
            rates[count].costPerKwhr = costPerKwhr;
            rates[count].energy = energy;
            count += 1;
            array1.push(name);
            array2.push(costPerKwhr);
            array3.push(energy);
            return r1;
        }else{
            return r2;
        }
    }
    
    function removeName(uint index) public returns(string[] memory) {
        // if (index >= array1.length) return [0];

        for (uint i = index; i<array1.length-1; i++){
            array1[i] = array1[i+1];
        }
        delete array1[array1.length-1];
        // array1.length--;
        return array1;
    }
    
    function removeCost(uint index) public returns(uint[] memory) {
        // if (index >= array1.length) return [0];

        for (uint i = index; i<array2.length-1; i++){
            array2[i] = array2[i+1];
        }
        delete array2[array2.length-1];
        // array1.length--;
        return array2;
    }
    
    function removeEnergy(uint index) public returns(uint[] memory) {
        // if (index >= array1.length) return [0];

        for (uint i = index; i<array3.length-1; i++){
            array3[i] = array3[i+1];
        }
        delete array3[array3.length-1];
        // array1.length--;
        return array3;
    }
}