
// workaround for IE's lack of support for bubbling on form element events
// sets delegation directly on the element in question by using:
// a general hook on activate event for those element which is guaranteed to happen first
// an expando that identifies the list of event handlers for the activate element
// a set of handlers for the event that should bubble
// unhooking is performed at blur (or deactivate if focus was not triggered)
// a safeguard cleanup is performed as a defensive measure
// requires to expose liveHandler from jQuery
(function(lib) {
	if (!document.all || window.opera) return;
	var jQuery = lib;
	var Hooks = {};
	var HookId = 6; // arbitrary > 0
	// a simplified meta-hook to initialize the IEx workaround on activate/focus
	function HookDelegate(event) {
		event = event || window.event;
		var elt = event.srcElement;
		if (!elt.live4IE) {
            switch(elt.tagName) {
			case "FORM":
				return Hook(elt, ["reset","submit"]);
			case "SELECT":
                return Hook(elt, ["focus", "blur", "change"]);
			case "INPUT":
                if (elt.type != 'text')
                    return Hook(elt, ["focus", "blur", "change"]);
                // else, if a text, continue to textarea
			case "TEXTAREA":
				return Hook(elt, ["focus", "blur", "change","select"]);
            }
		}
		return true;
	}
	// hook delegation for a set of events on a given element
	function Hook(elt,events) {
		HookCleanup(8); // arbitrarily leave last 8 untouched
		var id = elt.live4IE = ""+HookId++;
		Hooks[id] = { elt : elt, id: id, events : events };
		for(var e = 0; e < events.length; ++e) {
			var event = "on"+events[e];
			if (typeof(elt[event])!='undefined')
				elt.attachEvent(event,TriggerDelegate);
		}
		elt.attachEvent("ondeactivate", UnHookDelegate);
        return true;
	}
	// call event bubble delegation
	function TriggerDelegate(event) {
		event = event || window.event;
		var elt = event.srcElement;
        if (event.type == 'focus') // blur will occur and will perform the clean up
            elt.detachEvent("ondeactivate", UnHookDelegate);
        else if (event.type == 'blur') // lets perform the clean up now
            UnHookDelegate(event);
        // propagate the bubble
		event = jQuery.event.fix( event || window.event );
        var ret = jQuery.liveHandler.call(document, event);
        return ret;
	}
	//  remove event bubble delegation
	function UnHookDelegate(event) {
		event = event || window.event;
		var elt = event.srcElement;
		var hook = Hooks[elt.live4IE];
        return UnHook(hook);
	}
	// unhook an element
	function UnHook(hook) {
		if (!hook || hook.elt != elt) return false;
		var elt = hook.elt, events = hook.events;
		for(var e = 0; e < events.length; ++e) {
			var event = "on"+events[e];
			if (typeof(elt[event])!='undefined')
				elt.detachEvent(event,TriggerDelegate);
		}
		elt.detachEvent("ondeactivate", UnHookDelegate);
		elt.live4IE = null;
		elt.removeAttribute("live4IE");
		delete Hooks[this.id];
		hook.elt = hook.unhook = hook.events = null;
		return true;
	}
	// cleanup ie hooks, leave up to count memorized
	function HookCleanup(count) {
		var limit = HookId - count?count:0;
		if (limit >= 0) for(var hookId in Hooks) {
			var nhookId = parseInt(hookId);
			if (nhookId > limit) continue;
			var hook = Hooks[hookId];
			// still attached?
			if (!document.documentElement.contains(hook.elt))
				UnHook(hook);
		}
	}
	// activate the IE workaround
	document.documentElement.attachEvent("onactivate", HookDelegate);
	document.documentElement.attachEvent("onunload", HookCleanup);
})
(window.jQuery);


