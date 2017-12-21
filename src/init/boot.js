function configureRouter(app,mvcModule,options) {
  let routes = options.routes;
  let configureRoute = options.configureRoute;

  console.log("Configuring router...");
  for (let key in routes) {
    let route = routes[key];

    for (let method in route) {
      let methodArgs = route[method];
      console.log(`Configuring ${method} ${key} to controller: ${methodArgs.controller}, action: ${methodArgs.action}`);
      configureRoute(app,mvcModule,key,method,methodArgs.controller,methodArgs.action);
    }
  }
}

function createMvcModule(dependencies,DI = require('node-di')) {
  return require('../core/mvc-module').create(dependencies,DI);
}

function boot(args = {}) {
  let options = Object.assign({},{
    configure: function(app) {},
    configureRoute: function(app,mvcModule,route,method,controllerName,actionName) {
      app[method](route, function(req,res) {
        let controller = mvcModule.factory(`${controllerName}Controller`);
        let action = controller[actionName];
        let requestProcessor = mvcModule.service('requestProcessor');
        requestProcessor.process(controller,action,req,res);
      });
    }
  },args);

  let mvcModule = createMvcModule(options.dependencies,options.DI);
  let app = options.express();
  options.configure(app);
  configureRouter(app,mvcModule,options);

  return {
    app: app,
    dependencies: options.dependencies,
    routes: options.routes,
    mvcModule: mvcModule
  };
}

module.exports = boot;
