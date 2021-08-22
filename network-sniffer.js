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
  this.onreadystatechange = onReadyStateChangeReplacement;
  return send.apply(this, arguments);
}

function onReadyStateChangeReplacement() {  
  
  //console.log('Ready state changed to: ', this.readyState);
  //console.log(this)
  if (this.readyState == 4) {
	let jsonResponse = JSON.parse(this.response)
	let dataArray = jsonResponse.data;
	if (dataArray) {
		let list = [];
		for (var i = 0; i < dataArray.length; i++) {
			if (dataArray[i].activeTools) {
				let waterData = dataArray[i].activeTools[1];
				let endTime = waterData.endTime;
				let newElement = document.createElement('span');
				newElement.style = "color: red;"
				newElement.innerHTML = "Time left to refresh: " + endTime;
				//console.log(endTime);
				list.push(endTime)
			}
		}
		
		if (list != []) {
			window.localStorage.setItem('refreshTimes', list);
		}
		
		
	}
  }
  
   // {"status":0,"data":[{"_id":"611f8a9f7504ba001968ba11","plant":{"farmConfig":{"le":850,"hours":144},"sunflowerId":2,"type":2,"iconUrl":"https://pvu-static.s3.ap-southeast-1.amazonaws.com/farms/mama.svg","synergy":{}},"land":{"elements":{"fire":0,"water":0,"ice":0,"wind":0,"electro":0,"parasite":0,"light":0,"dark":0,"metal":0},"capacity":{"plant":5,"motherTree":1},"landId":0,"x":0,"y":0,"totalOfElements":0,"rarity":0},"isTempPlant":true,"stage":"farming","ownerId":"0x62ad5a9c41666374e459de62bfea20f8cee74665","landId":0,"plantId":0,"plantType":2,"activeTools":[{"count":1,"_id":"611f8a9f7504ba001968ba12","id":1,"type":"POT","endTime":"2021-08-30T10:58:08.857Z","startTime":"2021-08-20T10:58:08.857Z"},{"count":2,"_id":"611f8a9f7504ba001968ba14","id":3,"type":"WATER","endTime":"2021-08-22T09:58:09.152Z","startTime":"2021-08-21T10:58:09.152Z"}],"createdAt":"2021-08-20T10:57:35.310Z","updatedAt":"2021-08-21T16:38:16.076Z","__v":0,"harvestTime":"2021-08-26T14:16:49.437Z","rate":{"le":850,"hours":144},"startTime":"2021-08-20T10:58:09.152Z","hasSynergy":false,"needWater":false,"hasSeed":false,"pausedTime":null,"inGreenhouse":false,"count":140,"totalHarvest":0,"totalExtraHarvest":0},{"_id":"611f8b94cc9ff200197c742c","plant":{"farmConfig":{"le":250,"hours":72},"sunflowerId":1,"type":1,"iconUrl":"https://pvu-static.s3.ap-southeast-1.amazonaws.com/farms/sapling.svg","synergy":{}},"land":{"elements":{"fire":0,"water":0,"ice":0,"wind":0,"electro":0,"parasite":0,"light":0,"dark":0,"metal":0},"capacity":{"plant":5,"motherTree":1},"landId":0,"x":0,"y":0,"totalOfElements":0,"rarity":0},"isTempPlant":true,"stage":"farming","ownerId":"0x62ad5a9c41666374e459de62bfea20f8cee74665","landId":0,"plantId":0,"plantType":1,"activeTools":[{"count":1,"_id":"611f8b94cc9ff200197c742d","id":1,"type":"POT","endTime":"2021-08-30T11:01:48.932Z","startTime":"2021-08-20T11:01:48.932Z"},{"count":2,"_id":"611f8b94cc9ff200197c742f","id":3,"type":"WATER","endTime":"2021-08-22T10:01:49.258Z","startTime":"2021-08-21T11:01:49.258Z"}],"createdAt":"2021-08-20T11:01:40.586Z","updatedAt":"2021-08-21T16:38:05.011Z","__v":0,"harvestTime":"2021-08-23T14:15:59.452Z","rate":{"le":250,"hours":72},"startTime":"2021-08-20T11:01:49.258Z","hasSynergy":false,"needWater":false,"hasSeed":false,"pausedTime":null,"inGreenhouse":false,"count":54,"totalHarvest":0,"totalExtraHarvest":0},{"_id":"6120fc2a343bf30019f30705","plant":{"farmConfig":{"le":250,"hours":72},"sunflowerId":1,"type":1,"iconUrl":"https://pvu-static.s3.ap-southeast-1.amazonaws.com/farms/sapling.svg","synergy":{}},"land":{"elements":{"fire":0,"water":0,"ice":0,"wind":0,"electro":0,"parasite":0,"light":0,"dark":0,"metal":0},"capacity":{"plant":5,"motherTree":1},"landId":0,"x":0,"y":0,"totalOfElements":0,"rarity":0},"isTempPlant":true,"stage":"farming","ownerId":"0x62ad5a9c41666374e459de62bfea20f8cee74665","landId":0,"plantId":0,"plantType":1,"activeTools":[{"count":1,"_id":"6120fc2a343bf30019f30706","id":1,"type":"POT","endTime":"2021-08-31T13:14:35.898Z","startTime":"2021-08-21T13:14:35.898Z"},{"count":2,"_id":"6120fc2a343bf30019f30708","id":3,"type":"WATER","endTime":"2021-08-22T13:14:36.189Z","startTime":"2021-08-21T13:14:36.189Z"}],"createdAt":"2021-08-21T13:14:18.622Z","updatedAt":"2021-08-21T13:15:35.762Z","__v":0,"harvestTime":"2021-08-24T13:14:36.189Z","rate":{"le":250,"hours":72},"startTime":"2021-08-21T13:14:36.189Z","hasSynergy":false,"needWater":false,"hasSeed":false,"inGreenhouse":false,"count":179,"totalHarvest":0,"totalExtraHarvest":0}],"total":3}
  
  
  if(this._onreadystatechange) {
	return this._onreadystatechange.apply(this, arguments);
  }
}

window.XMLHttpRequest.prototype.open = openReplacement;  
window.XMLHttpRequest.prototype.send = sendReplacement;



