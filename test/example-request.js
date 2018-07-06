export default {
  version: "1.0",
  session: {
    new: true,
    sessionId: "a-session-id",
    application: {
      applicationId: "an-app-id"
    },
    user: {
      userId: "ME!"
    }
  },
  context: {
    System: {
      application: {
        applicationId: "an-app-id"
      },
      user: {
        userId: "ME!"
      },
      device: {
        deviceId: "a-device-id",
        supportedInterfaces: {}
      },
      apiEndpoint: "https://api.eu.amazonalexa.com",
      apiAccessToken: "an-access-token"
    }
  },
  request: {
    type: "LaunchRequest",
    requestId: "a-request-id",
    timestamp: "2018-07-06T03:59:27Z",
    locale: "en-GB",
    shouldLinkResultBeReturned: false
  }
};
