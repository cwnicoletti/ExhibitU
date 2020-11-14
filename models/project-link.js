class ProjectLink {
  constructor(
    id,
    ownerId,
    ownerPushToken,
    projectLinkId,
    title,
    imageUrl,
    linkUrl
  ) {
    this.id = id;
    this.ownerId = ownerId;
    this.pushToken = ownerPushToken;
    this.projectLinkId = projectLinkId;
    this.title = title;
    this.imageUrl = imageUrl;
    this.linkUrl = linkUrl;
  }
}

export default ProjectLink;
