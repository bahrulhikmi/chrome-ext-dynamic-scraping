// @ts-nocheck
import { Applicant } from "./applicant";


let availableHostnames = ['linkedin.com'];

function injectRightClick(){
  let divOuter = document.createElement("div");
  divOuter.classList.add("injecthide");
  divOuter.id= "rmenu";
  divOuter.style.width = "60px";
  divOuter.style.height = "60px";

  let ul = document.createElement("ul");
  divOuter.appendChild(ul);

  let menu = ["firstname", "lastname", "middlename"];
  menu.forEach(function(item){
      let li = document.createElement("li");
      let a = document.createElement("a");
      a.innerHtml = item;
      console.log(item);
      li.appendChild(a);      
      ul.appendChild(li);
  });

  let profileContent = document.getElementById("profile-content");

  if(!profileContent) return;    
  profileContent.appendChild(divOuter);
}

function injectScript(scriptName){
  var s = document.createElement('script');

  s.src = chrome.runtime.getURL(scriptName);
  s.onload = function() {
      this.remove();
  };
  (document.head || document.documentElement).appendChild(s);
}

function injectButton() {
   console.log("Injecting button "+ document) ;
    let button  = document.createElement("button") as HTMLButtonElement;
    button.innerHTML = "Add to dynamic";
    let profileContent = document.getElementById("profile-content");
    console.log("Content found "+ profileContent) ;
    if(!profileContent) return;    
    profileContent.prepend(button);
    button.classList.add("button");
    button.style.color ="white";
    button.style.backgroundColor= "red";
    button.style.width= "200px";
    button.style.height= "50px";
    button.addEventListener ("click", function() {
        let applicant = {} as Applicant;
        var firstNameElement = document.getElementsByClassName("inline t-24 t-black t-normal break-words")[0] as HTMLElement;
        if(firstNameElement)
        applicant.firstName = firstNameElement.innerText;


        var jobTitleElement = document.getElementsByClassName("mt1 t-18 t-black t-normal break-words")[0] as HTMLElement;

        if(jobTitleElement)
        applicant.jobTitle =  jobTitleElement.innerText;

        applicant.photoUrl =  document.getElementsByClassName("presence-entity__image  pv-top-card__photo  lazy-image ember-view")[0].getAttribute("src") as string;
        addToApplicant(applicant);
    });
}

function addToApplicant(newApplicant: Applicant){
    var applicants = [] as Array<Applicant>

    chrome.storage.sync.get({applicants:[]}, function(data){
      console.log(data.applicants)      
      applicants=data.applicants;

      let sameFound = false;
      applicants.forEach(function(applicant){
          if(newApplicant.firstName== applicant.firstName) {
            applicant = newApplicant;
            sameFound= true;
          }
      });
  
      if(!sameFound)
      {
        applicants.push(newApplicant);
      }
           
     chrome.storage.sync.set({applicants: applicants}, function(){alert("Added!")});
    });
 
}


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
      if(request.msg == "refresh"){
        injectButton();
        if(location.href.indexOf("linkedin")!==-1)
        {
          injectScript("pageinjectlinkedin.js")
          injectRightClick();
        }
        else{
          injectScript("pageinjectdynamic.js")
        }
      } 

      if(request.applicant)
      {
        sendResponse("applicant received");
        
        document.dispatchEvent(new CustomEvent('autofillapplicant', { detail: JSON.parse(JSON.stringify(request.applicant)) }));
       
      }
     
      if(request.highlight)
      {

      }
      
  }
);

setTimeout(() => {
    injectButton();
    if(location.href.indexOf("linkedin")!==-1)
    {
      injectScript("pageinjectlinkedin.js")
      injectRightClick();
    }
    else{
      injectScript("pageinjectdynamic.js")
    }
    


    
}, 3000);

// SET chrome storage local between popup and browser (not localStorage)
if (availableHostnames.includes(window.location.hostname)) {

}