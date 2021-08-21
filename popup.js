let changeColor = document.getElementById("changeColor");

/*chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});*/

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});





// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
	
	function buscarPlantasParaRegar() {
		const divsConRiegos = document.getElementsByClassName('plant-attr-number');
		
		let plantasParaRegar = 0;
		let riegosDeLasPlantas = []
		
		for (i=0; i<divsConRiegos.length; i++) {
			let previousImg = divsConRiegos[i].previousElementSibling;
			if (previousImg.src.includes("water")){ // If the previous IMG is water, we guess that we are in the water div.		
				let valor = divsConRiegos[i].innerText;
				console.log("Valor de riego encontrado: " + valor);
				if (parseInt(valor, 10) < 100) {
					plantasParaRegar++;
					riegosDeLasPlantas.push(valor);
				};
			} 
		}
		
		if (plantasParaRegar > 0) {
			// Hay plantas para regar
			alert("Plantas disponibles para regar! -> " + plantasParaRegar + " Riegos: " + riegosDeLasPlantas);
		} else {
			document.getElementsByClassName('box tw-cursor-pointer')[1].click();
			console.log("clickie");
			setTimeout(buscarPlantasParaRegar, 3000);
		}
	}
		
	chrome.storage.sync.get("color", ({ color }) => {
	  
		// document.body.style.backgroundColor = color;
		buscarPlantasParaRegar();
	});
}



// *********************************************************
//                    MY PLANTS RESET TIME
// *********************************************************

let resetTimeElement = document.getElementById("MyPlantsResetTime");


resetTimeElement.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: printMyPlantsResetTime,
  });
});


function printMyPlantsResetTime() {
	
	
	
	var open = window.XMLHttpRequest.prototype.open,  
	send = window.XMLHttpRequest.prototype.send;

	function openReplacement(method, url, async, user, password) {  
	  this._url = url;
	  return open.apply(this, arguments);
	}

	function sendReplacement(data) {  
	  if(this.onreadystatechange) {
		this._onreadystatechange = this.onreadystatechange;
	  }
	 
	  console.log('Request sent');
	  console.log(this)
	  console.log(this.response)
	  
	  this.onreadystatechange = onReadyStateChangeReplacement;
	  return send.apply(this, arguments);
	}

	function onReadyStateChangeReplacement() {  
	  
	  console.log('Ready state changed to: ', this.readyState);
	  
	  if(this._onreadystatechange) {
		return this._onreadystatechange.apply(this, arguments);
	  }
	}

	window.XMLHttpRequest.prototype.open = openReplacement;  
	window.XMLHttpRequest.prototype.send = sendReplacement;

}