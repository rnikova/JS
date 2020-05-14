function solve() {
	let selectMenuTo = document.getElementById('selectMenuTo');
	let binaryOption = document.createElement('option');
	binaryOption.textContent = 'Binary';
	binaryOption.value = 'binary';

	let hexadecimalOption = document.createElement('option');
	hexadecimalOption.textContent = 'Hexadecimal';
	hexadecimalOption.value = 'hexadecimal';

	selectMenuTo.appendChild(binaryOption);
	selectMenuTo.appendChild(hexadecimalOption);

	let button = document.getElementsByTagName('button')[0];
	button.addEventListener('click', convert);

	function convert(){
		let number = Number(document.getElementById('input').value);
       		let system = selectMenuTo.value;
       		let result;
       
       		if(system == 'binary'){
            		result = number.toString(2);            
       		}else{
         		result=('0' + (number.toString(16))).slice(-2).toUpperCase();
       		}
       		if(result){
           		let resultDiv = document.getElementById('result');
           		resultDiv.value = result;        
       		}
	}
}