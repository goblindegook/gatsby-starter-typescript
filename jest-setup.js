const { configure } = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')
require('jest-styled-components')

configure({ adapter: new Adapter() })