const OneSignal = require("onesignal-node");
async function sendPushNotification(userId, message, deepLinkUrl) {
  try {
    const oneSignalClient = new OneSignal.Client(
      process.env.APP_ID,
      process.env.KEY_ID
    );

    let notification = {
      contents: {
        en: message,
      },
      include_player_ids: [userId],
    };
    if (deepLinkUrl) {
      notification["url"] = deepLinkUrl;
    }

    try {
      await oneSignalClient.createNotification(notification);
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  } catch (e) {
    console.log("Error at sending notification", e);
  }
}
module.exports = sendPushNotification;
