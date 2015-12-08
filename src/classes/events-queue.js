(function(){
    module.exports = EventsQueueDependencies;

    function EventsQueueDependencies(){

        var _queue = [];

        return {
            subscribe   :subscribe,
            removeAll   :removeAll
        };


        function subscribe(eventName, element, subscriberFn){

            var knownQueueItem;

            for(var i = 0; i < _queue.length; i++){
                if(_queue[i].event === event && _queue[i].element === element){
                    _queue[i].events.push(subscriberFn);
                    knownQueueItem = _queue[i];
                    break;
                }
            }
            return (knownQueueItem || new EventObject(eventName, element, subscriberFn))['publicEvents'];
        }

        function EventObject(eventName, element, subscriberFn){

            var queueObject = {
                events:[subscriberFn],
                element:element,
                fn:subscriberFn,
                publicEvents:{
                    unSubscribe:unSubscribe
                }
            };

            _queue.push(queueObject);

            element.addEventListener(eventName, onEvent);

            return queueObject;

            function onEvent(e){
                for(var i = 0; i < queueObject.events.length; i++){
                    queueObject.events[i].call(this, e);
                }
            }

            function unSubscribe(){

                var functionIdx = queueObject.events.indexOf(subscriberFn);

                if(functionIdx > -1 && queueObject){
                    queueObject.events.splice(functionIdx, 1);
                }

                if(queueObject.events.length <= 0){
                    element.removeEventListener(eventName, subscriberFn);
                    _queue.splice(_queue.indexOf(queueObject), 1);
                }
            }
        }

        function removeAll(){
            var l = _queue.length;
            while(l--){
                _queue[l].events = [];
                _queue[l].publicEvents.unSubscribe();
            }
        }

    }
})();