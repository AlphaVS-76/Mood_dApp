window.ethereum.enable()
    var provider = new ethers.providers.Web3Provider(web3.currentProvider, 'rinkeby');

    var MoodContractAddress = "0x90ca8088976092DEf32d0308533B60a368C7B60e";
    let MoodContractABI = [
	{
		"constant": true,
		"inputs": [],
		"name": "getMood",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "_mood",
				"type": "string"
			}
		],
		"name": "setMood",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

    provider.listAccounts().then(function (accounts) {
      signer = provider.getSigner(accounts[0]);
      moodContract = new ethers.Contract(MoodContractAddress, MoodContractABI, signer);
    })

    async function getMood() {
        getMoodPromise = moodContract.getMood();
        var mood = await getMoodPromise;
        console.log(mood);
    }

    async function setMood() {
        let mood = document.getElementById("mood").value;
        setMoodPromise = moodContract.setMood(mood);
        await setMoodPromise;
    }
