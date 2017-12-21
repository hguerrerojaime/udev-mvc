function injectValues(mvcModule,values = {}) {
  for (let key in values) {
    let value = values[key];
    console.log(`Register value [${key}]`);
    mvcModule.value(key,value);
  }
  console.log("Register value [currentModule]");
  mvcModule.value('currentModule',mvcModule);
}

function injectControllers(mvcModule, controllers = {}) {
  for (let key in controllers) {
    let value = controllers[key];
    console.log(`Register controller [${key}]`);
    mvcModule.factory(key,value);
  }
}

function injectFactories(mvcModule, factories = {}) {
  for (let key in factories) {
    let value = factories[key];
    console.log(`Register factory [${key}]`);
    mvcModule.factory(key,value);
  }
}

function injectServices(mvcModule, services= {}) {
  for (let key in services) {
    let value = services[key];
    console.log(`Register service [${key}]`);
    mvcModule.service(key,value);
  }
}

function injectRequestProcessor(mvcModule) {
  mvcModule.service('requestProcessor',require('./RequestProcessor'));
}

function injectDependencies(mvcModule,dependencies = {}) {
  injectValues(mvcModule,dependencies.values);
  injectFactories(mvcModule,dependencies.factories);
  injectServices(mvcModule,dependencies.services);
  injectRequestProcessor(mvcModule);
  injectControllers(mvcModule,dependencies.controllers);
}

function createmvcModule(dependencies = require('./dependencies'),DI = require('node-di')) {
  let mvcModule = DI.module('mvcModule',[]);
  injectDependencies(mvcModule,dependencies);
  return mvcModule;
}


module.exports = {
  create: createmvcModule
};
