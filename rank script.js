/*
	Rank Tool, created by Kyviro
	Contact:Kyviro#5659 (on discord)
*/
var display = true;

function rankXPRequirement(initial, target, leftovers){
	var requirement = 0;
	if(initial != Math.floor(initial) || target != Math.floor(target) || leftovers != Math.floor(leftovers)){
		alert("This is a decimal. Please enter in a whole number");
	}else{
		if(target == 0){
			return "Give a target";
		}else{
			for(var i = 0; i <= target; i++){
				requirement += i*1000; //calculates and accumulates target rank's xp and adds it
			}
			for(var j = 0; j <= initial; j++){
				requirement -= j*1000; //subtracts already existing rank
			}
			requirement -= leftovers; //subtracts the rank xp earned
			return requirement;	
		}
	}
}

function XPRankRequirement(required, rankreturn){
	var testAccumulation = 0; //used to count up until the rank
	var testGrabber = 0; //used to "grab" the correct value
	var testLeftovers = 0; //leftovers from testGrabber
	if(required != Math.floor(required)){
		alert("This is a decimal. Please enter in a whole number");
	}else{
		if(required == 0){
			return "Give a target";
		}else{
			for(var i = 0; i < 500500000; i++){
				testAccumulation += i*1000;
				if(testAccumulation <= required && testAccumulation+i*1000 > required){//finds a middle ground where the rank satisfies these properties
					testGrabber = testAccumulation;
					testLeftovers = required - testAccumulation;
					console.log(rankreturn);
					return[i, testGrabber, testLeftovers];
				}
			}
		}
	}
}

function creditEarnings(rank){
	//code for credits earned per rank
	if(rank != Math.floor(rank)){
		alert("This is a decimal. Please enter in a whole number");
	}else{
		return 200 + (rank * 5);
	}
}

function findCreditEarnings(credits){
	//credits must be a multiple of 5, and greater than 200
	if(credits != Math.floor(credits)){
		alert("This is a decimal. Please enter in a whole number");
	}else{
		for(var i = 200; i <= credits; i+=5){
			if(credits - 5 < i && credits != i){//checks if it is a multiple of 5
				alert("This number is not a multiple of 5.");
				break;
			}else if(credits == i){
				return Math.floor((i - 200)/5);
			}
		}
		if(credits < 200){
			alert("This number is not above 200.");
		}
	}
}

function gui(){
	var start;
	start = prompt("Choose 1 for xp earnings, or choose 2 for credit earnings", "1,2");
	if(start == "1"){
		var rank = prompt("For a rank's required amount of xp, type in 1. For an xp's amount of ranks needed, type in 2.", "1,2");
		if(rank == "1"){//rankXPRequirement , could be shortened
			var initial = Number(prompt("Enter in your current rank (optional)"));
			var target = Number(prompt("Enter in your target rank"));
			var leftovers = Number(prompt("Enter in your current rank's xp earnings (optional)"));
			if(initial > target){
				alert("You can't unearn xp, silly!");
			}else if(leftovers > (initial+1)*1000){
				alert("You already ranked up; stop having a mid-rank crisis.");
			}else{
				var required = rankXPRequirement(initial, target, leftovers);
				console.log(typeof required);
				if(typeof required != "number"){
					alert("Error");
				}else{
					alert("Your required amount of xp for your desired rank is " + required + ".");
					var store1 = window.confirm("Do you want to store this value?");
					if(store1 == true){
						storageValue("Required for rank " +target +" from " + initial + ": "+required + " XP");
					}
				}
			}
		}else if(rank == "2"){//XPRankRequirement, also could be shortened
			var required1 = prompt("Enter in the amount of xp you want to check the rank of:", "2415000");
			var amount = XPRankRequirement(Number(required1));
			if(typeof amount != "object"){
				console.log(typeof amount);
				alert("Error");
			}else{
				alert("The rank, rank xp, and leftovers are shown respectively: " + amount + ".");
				var store2 = window.confirm("Do you want to store this value?");
				if(store2 == true){
					storageValue("Rank, Rank XP, and Leftovers of " + required1 + ": " + amount);
				}
			}
		}else{
			alert("congratulations you played yourself");
		}
	}else if(start == "2"){
		var creds = prompt("For a rank's credit earning, choose 1. For credits that a rank earns, choose 2.");
		if(creds == "1"){
			var credits = prompt("Enter in the rank you want to know the credit earnings of.");
			var result = creditEarnings(credits);	
			if(typeof result != "number"){
				console.log(typeof required);
				alert("Error");
			}else{
				alert("The amount of credits you earn at rank " + credits + " is "+ result +".");
				var store3 = window.confirm("Do you want to store this value?");
				if(store3 == true){
					storageValue("Rank: "+credits+", Credits Earned: "+result);
				}
			}
		}else if(creds == 2){
			var rank = prompt("Enter in the amount of credits you want. Note: It must be above 200 and also must be a multiple of 5", "545");
			var rankresult = findCreditEarnings(rank);
			if(typeof rankresult != "number"){
				alert("Error");
			}else{
				alert("The rank at which you get "+rank+" amount of credits is "+rankresult+".");
				var store4 = window.confirm("Do you want to store this value?");
				if(store4 == true){
					storageValue("Credits Earned: "+rank+", Rank "+rankresult);
				}
			}
		}
	}
}

function storageValue(value){
	if (typeof(Storage) !== "undefined") {
		var toggle = prompt("What do you want to do with this value?", "set, retrieve, remove");
		if(toggle == "set"){
			for(var i = 0; i < 1000; i++){
				if(localStorage.getItem(i) == null){//indicates if localStorage(i) is empty
					localStorage.setItem(i, value);
					break;
				}
			}
		}else if(toggle == "retrieve"){
			if(typeof value == "undefined"){
					var index = prompt("Enter in a key.");
					alert("Key: "+ index + ", Value: " + localStorage.getItem(index));
			}
		}else if(toggle == "remove"){
			if(typeof value == "undefined"){
				var index1 = prompt("Enter in a key.");
				if(index1 != null){
					var confirm = window.confirm("Are you sure you want to delete this value?");
					if(confirm == true){
						localStorage.removeItem(index1);
					}
				}
			}
		}else if(toggle == null){
			console.log("b");
		}else{
			alert("This is not an option");
			storageValue(value);
		}
	} else {
		return "Unsupported feature."
	}
}

function displayLocal(){
	var d = document.getElementById("local");
	if(display == true){
		for(var i = 0; i < 1000; i++){
			if(localStorage.getItem(i) != null){//prevents null flood
				d.innerHTML += "Key: "+i+", Value: "+ localStorage.getItem(i) + "<br>";
			}
		}
		display = false;
	}else if(display == false){
		d.innerHTML = "";
		display = true;
	}
}