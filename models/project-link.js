class ProjectLink {
  constructor(id, ownerId, ownerPushToken, title, imageUrl, linkUrl) {
    this.id = id;
    this.ownerId = ownerId;
    this.pushToken = ownerPushToken;
    this.title = title;
    this.imageUrl = imageUrl;
    this.linkUrl = linkUrl;
  }
}

export default ProjectLink;
