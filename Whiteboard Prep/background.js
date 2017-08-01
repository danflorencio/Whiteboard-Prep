{
  var qNo;
  chrome.runtime.onInstalled.addListener(function(info) {
    qNo = 0;
    localStorage["qNo"] = 0;
  });
  function getQNo() {
    console.log("Question Number: " + localStorage["qNo"]);
    return localStorage["qNo"];
  };
  function decQNo() {
    if (localStorage["qNo"] >= 1) {
      localStorage["qNo"]--;
    }
    else {
      localStorage["qNo"] = 3338
    }
    console.log("After decrement: " + localStorage["qNo"]);
    return localStorage["qNo"];
  };
  function incQNo() {
    if (localStorage["qNo"] <= 3337) {
      localStorage["qNo"]++;
    }
    else {
      localStorage["qNo"] = 0;
    }
    console.log("After increment: " + localStorage["qNo"]);
    return localStorage["qNo"];
  };
}
