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

var userName = "";

chrome.identity.getProfileUserInfo(function(userInfo) {
 /* Use userInfo.email, or better (for privacy) userInfo.id
    They will be empty if user is not signed in in Chrome */
  console.log(userInfo.email);
  for (var i = 0; i < userInfo.email.length; i++) {
    if (userInfo.email[i] != '@') {
      userName += userInfo.email[i];
    }
    else {
      break;
    }
  }
  console.log(userName);
});

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

  // The rest of the method is for the dumb little terminal
  //document.getElementById('screen').textContent = userName + '$' + '>';

  $("#screen input").focus();

  $("#screen input").on('keydown', function(event) {
    console.log("hello daniel");
    if(event.which === 13) { // Enter key pressed
      var $this = $(this),
      val = $this.val();
      $this.focus().val('');
    }
  });

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
        document.getElementById("questionName").innerHTML = data.name;
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
