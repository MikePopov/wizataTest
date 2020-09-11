import {positiveTestData} from "../../../fixtures";

export class Helpers {
  sendDataSampleToEventHub (data, waitMs) {
    cy.task('sendEvent', data);
    cy.wait(waitMs);
    console.log(`Wait ${waitMs} ms`);
  }

  deleteTableInDb (waitMs) {
    cy.request('/delete');
    cy.wait(waitMs);
  }

}
export const helpers = new Helpers();