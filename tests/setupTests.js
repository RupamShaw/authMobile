import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.3';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

Enzyme.configure({ adapter: new Adapter() });
// ============== global Mocks
global.fetch = require('jest-fetch-mock');
// jest.mock('react-native-web/dist/components/Touchable/Touchable.js', () => {
//   return require('./__mocks__/Touchable.js').default;
// });
// jest.mock('../../node_modules/react-native-web/dist/exports/Touchable', () => {
//   return require('./__mocks__/Touchable.js').default;
// });

export default mockStore;
