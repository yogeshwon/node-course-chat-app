var expect = require('expect');

var {genrateMessage} = require('./message');

describe('genrateMessage', () =>{
  it('should genrate correct message object', ()=> {
    var from = 'Jan';
    var text = 'Some message';
    var message = genrateMessage(from, text);

    extend(expect(message.createAt).toBeA('number'));
    expect(message).toInclude({from, text});
  })
})
