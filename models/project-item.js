class ProjectItem {
  constructor(
    id,
    ownerId,
    ownerPushToken,
    projectId,
    title,
    imageUrl,
    description,
    cheerCount,
    commentCount
  ) {
    this.id = id;
    this.ownerId = ownerId;
    this.pushToken = ownerPushToken;
    this.projectId = projectId;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.cheerCount = cheerCount;
    this.commentCount = commentCount;
  }
}

export default ProjectItem;
