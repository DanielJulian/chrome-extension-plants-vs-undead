// *********************************************************
//                    PLANTS RESET TIME
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
	let times = window.localStorage.getItem('refreshTimes').split(",");
	
	for (var i = 0; i < times.length; i++) {
		let newElement = document.createElement('span');
		newElement.style = "color: red;"
		let text = "Time left to refresh: " + times[i].replace("T", " ").replace("Z", "");
		newElement.innerHTML = text.substr(0, 41);
		let plantToAppend = document.getElementsByClassName('grid-item tw-w-full tw-rounded-md tw-p-3 tw-relative tw-flex tw-flex-col tw-gap-2')[i];
		plantToAppend.appendChild(newElement);
	}
	
}