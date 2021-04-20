if (document.addEventListener) {
    document.addEventListener('contextmenu', function(e) {
        document.body.addEventListener('contextmenu', function() {
            document.getElementById("rmenu").className = "injectshow";
            document.getElementById("rmenu").style.top = mouseY(event) + 'px';
            document.getElementById("rmenu").style.left = mouseX(event) + 'px';
        
            window.event.returnValue = false;
            });
        e.preventDefault();
    }, false);
    } else {
    document.attachEvent('oncontextmenu', function() {
        document.body.addEventListener('contextmenu', function() {
            document.getElementById("rmenu").className = "injectshow";
            document.getElementById("rmenu").style.top = mouseY(event) + 'px';
            document.getElementById("rmenu").style.left = mouseX(event) + 'px';       
            window.event.returnValue = false;
            });
    });
    }
  
  // this is from another SO post...  
  document.addEventListener("click", function(event) {
    document.getElementById("rmenu").className = "injecthide";
  });
  
  
  
  function mouseX(evt) {
    if (evt.pageX) {
      return evt.pageX;
    } else if (evt.clientX) {
      return evt.clientX + (document.documentElement.scrollLeft ?
        document.documentElement.scrollLeft :
        document.body.scrollLeft);
    } else {
      return null;
    }
  }
  
  function mouseY(evt) {
    if (evt.pageY) {
      return evt.pageY;
    } else if (evt.clientY) {
      return evt.clientY + (document.documentElement.scrollTop ?
        document.documentElement.scrollTop :
        document.body.scrollTop);
    } else {
      return null;
    }
  }