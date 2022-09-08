var uiToggleTest = function(){
    var intervalTM = null;
    var toggleFlag = false;
    function uiDisableEnableToggle(target) {
      toggleFlag = !toggleFlag;
      if(toggleFlag) {
        target.setAttribute('disabled', 'true');
      } else {
        target.removeAttribute('disabled')
      }
      console.log(`uiToggleTest running ${toggleFlag}, for ${target.tagName}`);
    }

    function startInterval(selectorString) {
      intervalTM = setInterval(function(){
        uiDisableEnableToggle(
          document.body.querySelector(selectorString)
        );
      }, 3000);
    }
    function stop(){
      if(intervalTM) {
        clearInterval(intervalTM);
      }
    }
    return{
      start: startInterval,
      stop: stop
    }
  }();