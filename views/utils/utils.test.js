const utils = require('./utils');

it('Should add two numbers', () => {
    var res = utils.add(33,11);
    if(res !== 44){
        throw new Error(`Expected 44, but got ${res}`);
    }
});

it('Should square a numbers', () => {
    var res = utils.square(4);
    if(res !== 16){
        throw new Error(`Expected 16, but got ${res}`);
    }
});