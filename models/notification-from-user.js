class Notification {
  constructor(id, ownerId, ownerPushToken, title, body, senderId, projectId) {
    this.id = id;
    this.ownerId = ownerId;
    this.pushToken = ownerPushToken;
    this.title = title;
    this.body = body;
    this.senderId = senderId;
    this.projectId = projectId;
  }
}

export default Notification;
