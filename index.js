// script.js
const header = document.getElementById("header");
const form = document.getElementById("form");
const downloader = document.getElementById("downloader");
const getStartedBtn = document.getElementById("tryNowButton");
const formSubmitBtn = document.getElementById("formSubmitBtn");

const progress = document.getElementById("progress");
const downloadProgressBar = document.getElementById('downloadProgressBar');
const  downloadBtn =  document.getElementById('downloadBtn');
    //  const signInForm = document.getElementById("signInForm");
    //  const signUpForm = document.getElementById("signUpForm");

    // const signInOption = document.getElementById("signIn");
    // const signUpOption = document.getElementById("signUp");


    // const sign_inBtn = document.getElementById("sign_in");
    // const sign_upBtn= document.getElementById("sign_up");




    // signInOption.addEventListener("click", () => {
    //     signUpForm.style.display='none';
    //    signInForm.style.display='block';
    // })



    // signUpOption.addEventListener("click", () => {
    //     signUpForm.style.display='block';
    //     signInForm.style.display='none';
    //  })
    

    
    // sign_upBtn.addEventListener("click", () => {
    //     const name = document.getElementById("up_name");
    //     const email= document.getElementById("up_email");
    //     const password = document.getElementById("up_password");
    //     const comfirmPass= document.getElementById("up_comfirmPass");

    //     if(password !== comfirmPass){
    //         alert("Password and comfirm password fields don't match.")
    //     }else if(name.length == 0 || email.length <= 1){
    //         alert("Invalid email, password or field")
    //     }
    //  })




    // sign_inBtn.addEventListener("click", () => { 
    //     const email= document.getElementById("in_email");
    //     const password = document.getElementById("in_password"); 
        
    //     if(email.length == 0 || password.length <= 1){
    //         alert("Invalid email, password or field")
    //     }
    //  })



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

 
async function createClip() {
    const exampleSocket = new WebSocket("wss://s2zwrp5xhd.execute-api.us-west-2.amazonaws.com/production/");
    
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
  
    checksocket(exampleSocket)
  
    await new Promise(resolve => setTimeout(resolve, 3000));
    exampleSocket.send(JSON.stringify(message));
  
      checksocket(exampleSocket)
      exampleSocket.onmessage = (event) => {
          var linkdata = event.data
          console.log(event.data);
          linkdata = linkdata.split('"').join('');
          downloadBtn.setAttribute("href",linkdata);
          downloadBtn.setAttribute('disabled',false);

          if (linkdata == "complete") {
            exampleSocket.close() 
          }
        
        };
      
      await new Promise(resolve => setTimeout(resolve, 2000));
     
    checksocket(exampleSocket)



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






 
function checksocket(exampleSocket){
    if (exampleSocket.readyState == 0){
      console.log("The Socket has not opened yet")
    }else if (exampleSocket.readyState == 1){
      console.log("The Socket is open")
    } else {
      console.log("The Socket has now closed")
    }
  }



