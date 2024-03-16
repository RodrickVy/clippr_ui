// script.js
const header = document.getElementById("header");
const form = document.getElementById("form");
const downloader = document.getElementById("downloader");
const getStartedBtn = document.getElementById("tryNowButton");
const formSubmitBtn = document.getElementById("formSubmitBtn");

const progress = document.getElementById("progress");
const downloadProgressBar = document.getElementById('downloadProgressBar');
const  downloadBtn =  document.getElementById('downloadBtn');
getStartedBtn.addEventListener("click", () => {
    header.style.display = "none";
    form.style.display = "flex";
})
formSubmitBtn.addEventListener("click", async () => {
    form.style.display = "none";
    downloader.style.display = "flex";
    downloadBtn.style.opacity = 0.1;

    let timer = 0;
    /// Uses an exponential function f(x)=−(1/2)^(x) +1  (pre-cal 12 math application :) ) to keep increasing the progress never reaching a 100. The slider is removed when the createClip method is complete.
    const intervalId = setInterval(() => {
        timer += 0.5;
        // Exponential function with a horizontal asymptote of 1
        let progress = 1 - Math.exp(-timer);
        downloadProgressBar.style.width = progress * 100 + "%";

    }, 1000);
    createClip().then((e) => {

        // hide progress after video has processed
        clearInterval(intervalId);
        downloadProgressBar.style.width =0+ "%";
        downloadBtn.style.opacity = 1+"";
        progress.style.display = 'none';
    })

})


function exponentialProgress(callback, condition) {

// 1000 milliseconds = 1 second
}

async function createClip() {
    // Get form values
    const mainLink = document.getElementById("mainLink").value;
    const peripheralLink = document.getElementById("peripheralLink").value;
    const captionsBool = document.getElementById("captionsBool").value;
    const timestamp = document.getElementById("timestamp").value;
    const numClips = document.getElementById("numClips").value;

    await  delay(4);
}


/**
 * Delays execution for a specified number of seconds.
 * @param {number} seconds The number of seconds to delay.
 * @returns {Promise} A promise that resolves after the specified delay.
 */
function delay(seconds) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Completed after ${seconds} second(s)`);
        }, seconds * 1000); // Convert seconds to milliseconds
    });
}


