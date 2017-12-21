const JClass = require('jclass');

const parameterfy = require('../core/util').parameterfy;

const RequestProcessor = JClass._extend({
  process(controller,action,req,res) {

    let actionProxy = parameterfy(action,controller);

    let actionPromise = actionProxy(Object.assign({},{
      $request: req,
      $response: res
    },req.params));

    if (!res.headersSent) {
      controller.setResponseContentType(res);
      controller.respond(actionPromise,req,res);
    }


  }
});

module.exports = RequestProcessor;
