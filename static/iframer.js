
// frameless document.querySelectorAll: 
// https://gist.github.com/vmysla/ed1daad8109ea1ba811e

// frameless jQuery: 
// https://gist.github.com/vmysla/00806f5c98b51857ee36


var outside = (typeof module == 'undefined' || !module.exports) 
	  ? (typeof window != 'undefined' && window || this)
	  : module.exports;

outside.iframer = iframer;


/*
    // ------------ Usage: -------------
    // =================================
    
    var container = document.querySelector('body');
    var html      = "<h1>Timestamp <script>document.write( Date.now() );</script></h1>";

    function logFrameEvent(frame, eventName){
        console.log(
            "eventName"      , eventName, 
            "frame.resolved" , frame.resolved, 
            "document.body"  , frame.document && frame.document.body 
        );
    }

    var listeners = {
        'onBeforeAppend'    : logFrameEvent,
        'onAfterAppend'     : logFrameEvent,
        'onBeforePopulate'  : logFrameEvent,
        'onAfterPopulate'   : logFrameEvent
    };

    // --------------- API: -------------

    iframer(container, html, listeners);

    // ----------------------------------

*/

function iframer(container, html,  listeners, domain){

    var frame = {
        container : container || document.body,
        html      : html      || '',
        listeners : listeners || {},
        domain    : domain    || document.domain,

        element   : document.createElement('iframe'),
        resolved  : false,

        document  : false,
        window    : false
    }

    iframer.append(frame);
    iframer.resolve(frame) 
        ? iframer.populate(frame) 
        : iframer.populate(frame, document.domain);
}

iframer.append = function (frame){
    iframer.trigger(frame, 'onBeforeAppend');
    frame.container.appendChild( frame.element );
    iframer.trigger(frame, 'onAfterAppend');
}

iframer.populate = function (frame, domain) {
    if(domain){
        frame.element.populate = iframer.populate;
        frame.element.src = 'javascript:(document.open().domain="'+domain+'") && frameElement.populate(frameElement)';
    }
    else {
        iframer.resolve(frame);
        iframer.trigger(frame, 'onBeforePopulate');
        frame.element.frameElement = frame.element;
        frame.document.write(frame.html);
        frame.document.close();
        iframer.trigger(frame, 'onAfterPopulate');
    }
}

iframer.trigger = function (frame, eventName){
    var handler = frame.listeners[eventName];
    return handler && handler(frame, eventName);
}

iframer.resolve = function (frame){
    try {
      frame.window = frame.element.contentWindow;
      frame.document = frame.element.contentDocument || (frame.window && frame.window.document);
    } catch(ex) {
      // mute
    };
    return frame.resolved = !!(frame.window && frame.document);
}
