export const extractValueFromEvent = event => (event.target ? event.target.value : event);
export const extractKeyFromEvent = event => (event.nativeEvent ? event.nativeEvent.key : event.key);
