var s = document.createElement('script');
s.src = chrome.runtime.getURL('network-sniffer.js');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);