var uiToggleDisable = function(){
    var _intervalTM = null;
    var _toggleFlag = false;
    var _targetRef = null;
    var _xhr = null;

    function addMsgToBody(msg, prepend) {
        var div = document.createElement("div");
        div.textContent = msg;
        if(prepend) {
            document.body.prepend(div);
        } else {
            document.body.appendChild(div);
        }
      }

    function uiDisableEnableToggle(target) {
        _toggleFlag = !_toggleFlag;
        if(_toggleFlag) {
            target.setAttribute('disabled', 'true');
        } else {
            target.removeAttribute('disabled')
        }
        console.log(`uiToggleDisable running ${_toggleFlag}, for ${target.tagName}`);
    }

    function startIntervalTest(selectorString) {
        stopIntervalTest();
        _targetRef = document.body.querySelector(selectorString);
        _intervalTM = setInterval(function(){
            uiDisableEnableToggle(_targetRef);
        }, 3000);
    }
    function stopIntervalTest(){
        if(_intervalTM) {
            clearInterval(_intervalTM);
            _intervalTM = null;
        }
        if(_targetRef) {
            _targetRef.removeAttribute('disabled');
            _targetRef = null;
        }
        if(_xhr) {
            _xhr.abort();
            _xhr = null;
        }
    }

    function startNetworkDelayedActions(selectorString, responseDelayMs){
        _xhr = new XMLHttpRequest();
        const url = `https://deelay.me/${responseDelayMs}/https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1`;

        _xhr.onreadystatechange = function() {
          if (_xhr.readyState === 4 && _xhr.status == 200) {
            //console.log("RESP", _xhr.responseText);
            addMsgToBody("Network Reply: " + _xhr.responseText);
            startIntervalTest(selectorString);
          }
        };

        _xhr.open("GET", url, true);
        _xhr.send();
        addMsgToBody("startNetworkDelayedActions SEND!");
    }


    return {
        addMsgToBody: addMsgToBody,
        startIntervalTest: startIntervalTest,
        stop: stopIntervalTest,
        startNetworkDelayedTest: startNetworkDelayedActions
    }
}();

