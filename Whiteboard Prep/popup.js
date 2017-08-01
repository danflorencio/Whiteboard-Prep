/*
 * popup.js is executed when the popup.html is clicked on. This will work with
 * previously scraped links using script.py and allHTML.txt in the above
 * directory. All those links are then written to links.txt, and used to
 * grab JSON data from Codewars.
 */

// jQuery for API requests
var theNewScript = document.createElement("script");
theNewScript.type = "text/javascript";
theNewScript.src = "jquery.js";

// To keep track of what question a user is on
var qNum;

var p = "";

var bgPage;

window.onload = function() {
  // Debug
  console.log("window.onload");
  // Go to previous question
  document.getElementById("prev").addEventListener("click", decrement);
  document.getElementById("next").addEventListener("click", increment);
  bgPage = chrome.extension.getBackgroundPage();
  /*chrome.storage.local.get(qNo, function(result) {
    qNo = result.qNo;
  });*/
  qNum = bgPage.getQNo();
}

window.addEventListener ("load", readfileautomatically, false);

function get() {
  p = document.getElementById('question');
  var x;

  x = new XMLHttpRequest();
  x.onload = xhttpResponse;
  x.open("GET", "links.txt", true);
  x.send();
}

function xhttpResponse() {
    p.innerHTML += this.responseText;
}

function readfileautomatically () {
  var client = new XMLHttpRequest();
  client.open('GET', '/links.txt');
  client.onreadystatechange = function()
  {
    if(client.responseText != '')
    {
      var txt = client.responseText.split("\n");
      $.get(txt[qNum], function(data) {
        document.getElementById("questionName").innerHTML = "Today's Question: " + data.name;
        document.getElementById("question").innerHTML = data.description;
        document.getElementById("questionLink").innerHTML = data.url;
        document.getElementById("questionLink").href = data.url;
      })
    }
  }
  client.send();
}

// Make the question link in popup.html clickable so that a user can open it in
// a new tab
window.addEventListener('click', function(e){
  if(e.target.href !== undefined){
    chrome.tabs.create({url:e.target.href})
  }
})

function decrement() {
  qNum = bgPage.decQNo();
  readfileautomatically();
}

function increment() {
  qNum = bgPage.incQNo();
  readfileautomatically();
}
