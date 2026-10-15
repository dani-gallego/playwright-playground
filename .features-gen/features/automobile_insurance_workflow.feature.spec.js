// Generated from: features\automobile_insurance_workflow.feature
import { test } from "../../Steps/fixtures.ts";

test.describe('Get an automobile insurance quote', () => {

  test.beforeEach('Background', async ({ Given, homePage, vehiclePage }, testInfo) => { if (testInfo.error) return;
    await Given('the user is on the automobile insurance form', null, { homePage, vehiclePage }); 
  });
  
  test('Complete all data steps with valid details', { tag: ['@smoke'] }, async ({ Given, When, Then, wizard }) => { 
    await Given('the user has valid vehicle, insurant and product details'); 
    await When('the user submits the vehicle, insurant and product steps in order', null, { wizard }); 
    await Then('no validation errors are shown on any step', null, { wizard }); 
  });

  test.describe('Valid details are accepted on the <step> step', () => {

    test('Valid details are accepted on the vehicle step', { tag: ['@validation'] }, async ({ Given, When, Then, wizard }) => { 
      await Given('the user has completed all steps before the "vehicle" step', null, { wizard }); 
      await When('the user enters valid details on the "vehicle" step', null, { wizard }); 
      await Then('no validation errors are shown on the "vehicle" step', null, { wizard }); 
    });

    test('Valid details are accepted on the insurant step', { tag: ['@validation'] }, async ({ Given, When, Then, wizard }) => { 
      await Given('the user has completed all steps before the "insurant" step', null, { wizard }); 
      await When('the user enters valid details on the "insurant" step', null, { wizard }); 
      await Then('no validation errors are shown on the "insurant" step', null, { wizard }); 
    });

    test('Valid details are accepted on the product step', { tag: ['@validation'] }, async ({ Given, When, Then, wizard }) => { 
      await Given('the user has completed all steps before the "product" step', null, { wizard }); 
      await When('the user enters valid details on the "product" step', null, { wizard }); 
      await Then('no validation errors are shown on the "product" step', null, { wizard }); 
    });

  });

});

// == technical section ==

test.use({
  $test: [({}, use) => use(test), { scope: 'test', box: true }],
  $uri: [({}, use) => use('features\\automobile_insurance_workflow.feature'), { scope: 'test', box: true }],
  $bddFileData: [({}, use) => use(bddFileData), { scope: "test", box: true }],
});

const bddFileData = [ // bdd-data-start
  {"pwTestLine":10,"pickleLine":10,"tags":["@smoke"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the user is on the automobile insurance form","isBg":true,"stepMatchArguments":[]},{"pwStepLine":11,"gherkinStepLine":11,"keywordType":"Context","textWithKeyword":"Given the user has valid vehicle, insurant and product details","stepMatchArguments":[]},{"pwStepLine":12,"gherkinStepLine":12,"keywordType":"Action","textWithKeyword":"When the user submits the vehicle, insurant and product steps in order","stepMatchArguments":[]},{"pwStepLine":13,"gherkinStepLine":13,"keywordType":"Outcome","textWithKeyword":"Then no validation errors are shown on any step","stepMatchArguments":[]}]},
  {"pwTestLine":18,"pickleLine":23,"tags":["@validation"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the user is on the automobile insurance form","isBg":true,"stepMatchArguments":[]},{"pwStepLine":19,"gherkinStepLine":17,"keywordType":"Context","textWithKeyword":"Given the user has completed all steps before the \"vehicle\" step","stepMatchArguments":[{"group":{"start":44,"value":"\"vehicle\"","children":[{"start":45,"value":"vehicle","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":20,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"When the user enters valid details on the \"vehicle\" step","stepMatchArguments":[{"group":{"start":37,"value":"\"vehicle\"","children":[{"start":38,"value":"vehicle","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":21,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then no validation errors are shown on the \"vehicle\" step","stepMatchArguments":[{"group":{"start":38,"value":"\"vehicle\"","children":[{"start":39,"value":"vehicle","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":24,"pickleLine":24,"tags":["@validation"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the user is on the automobile insurance form","isBg":true,"stepMatchArguments":[]},{"pwStepLine":25,"gherkinStepLine":17,"keywordType":"Context","textWithKeyword":"Given the user has completed all steps before the \"insurant\" step","stepMatchArguments":[{"group":{"start":44,"value":"\"insurant\"","children":[{"start":45,"value":"insurant","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":26,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"When the user enters valid details on the \"insurant\" step","stepMatchArguments":[{"group":{"start":37,"value":"\"insurant\"","children":[{"start":38,"value":"insurant","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":27,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then no validation errors are shown on the \"insurant\" step","stepMatchArguments":[{"group":{"start":38,"value":"\"insurant\"","children":[{"start":39,"value":"insurant","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
  {"pwTestLine":30,"pickleLine":25,"tags":["@validation"],"steps":[{"pwStepLine":7,"gherkinStepLine":7,"keywordType":"Context","textWithKeyword":"Given the user is on the automobile insurance form","isBg":true,"stepMatchArguments":[]},{"pwStepLine":31,"gherkinStepLine":17,"keywordType":"Context","textWithKeyword":"Given the user has completed all steps before the \"product\" step","stepMatchArguments":[{"group":{"start":44,"value":"\"product\"","children":[{"start":45,"value":"product","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":32,"gherkinStepLine":18,"keywordType":"Action","textWithKeyword":"When the user enters valid details on the \"product\" step","stepMatchArguments":[{"group":{"start":37,"value":"\"product\"","children":[{"start":38,"value":"product","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]},{"pwStepLine":33,"gherkinStepLine":19,"keywordType":"Outcome","textWithKeyword":"Then no validation errors are shown on the \"product\" step","stepMatchArguments":[{"group":{"start":38,"value":"\"product\"","children":[{"start":39,"value":"product","children":[{}]},{"children":[{}]}]},"parameterTypeName":"string"}]}]},
]; // bdd-data-end