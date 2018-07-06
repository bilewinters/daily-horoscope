import dailyHoroscope from "../index";
import context from "aws-lambda-mock-context";
import { expect } from "chai";
import request from "./example-request";
const ctx = context();

describe("Testing a session with the AboutIntent", function() {
  let speechResponse = null;
  let speechError = null;
  before(done => {
    dailyHoroscope.handler(request, ctx);
    ctx.Promise.then(resp => {
      speechResponse = resp;
      done();
    }).catch(err => {
      speechError = err;
      done();
    });
  });

  describe("The response is structurally correct for Alexa Speech Services", () => {
    it("should not have errored", () => {
      expect(speechError).to.be.null;
    });
  });
});
