
const header = document.getElementById("header");
const form = document.getElementById("form");
const downloader = document.getElementById("downloader");
const getStartedBtn = document.getElementById("tryNowButton");
const formSubmitBtn = document.getElementById("formSubmitBtn");

const progress = document.getElementById("progress");
const downloadProgressBar = document.getElementById('downloadProgressBar');
const downloadBtn = document.getElementById('downloadBtn');



formSubmitBtn.addEventListener("click", async () => {
  form.style.display = "none";
  downloader.style.display = "flex";
  downloadBtn.style.opacity = 0.1;

  let timer = 0;
  /// Uses an exponential function f(x)=−(1/2)^(x) +1  (pre-cal 12 math application :) ) to keep increasing the progress never reaching a 100. The slider is removed when the createClip method is complete.
  const intervalId = setInterval(() => {
    timer += 0.05;
    // Exponential function with a horizontal asymptote of 1
    let progress = 1 - Math.exp(-timer);
    downloadProgressBar.style.width = progress * 100 + "%";

  }, 1000);
  createClip(()=>{clearInterval(intervalId)});

})


async function createClip(whenComplete) {
  const socket = new WebSocket("wss://s2zwrp5xhd.execute-api.us-west-2.amazonaws.com/production/");

  var mainLinkValue = document.getElementById("mainLink").value;
  var perfLinkValue = document.getElementById("peripheralLink").value;
  var captionsBoolValue = document.getElementById("captionsBool").checked ? "True" : "False";
  var timestampValue = parseInt(document.getElementById("timestamp").value);
  var numClipsValue = parseInt(document.getElementById("numClips").value)

  var message = {
    "action": "SendMessage",
    "main_link": mainLinkValue,
    "peripheral_link": perfLinkValue,
    "captions": captionsBoolValue,
    "manual_timestamp": timestampValue,
    "num_clips": numClipsValue
  };




  socket.addEventListener("open", (event) => {
    socket.send(JSON.stringify(message));

  });


  socket.onmessage = (event) => {
    var linkdata = event.data;
    console.log(event.data);
    linkdata = linkdata.split('"').join('');
 
    if (linkdata.includes("got presigned url")) {
      console.log("complete");
      downloadBtn.setAttribute('disabled', false);
      downloadBtn.setAttribute("href", linkdata);
      whenComplete();
      socket.close();
    }

  };
}