class ProjectItem {
  constructor(
    id,
    ownerId,
    ownerPushToken,
    projectId,
    title,
    imageUrl,
    description
  ) {
    this.id = id;
    this.ownerId = ownerId;
    this.pushToken = ownerPushToken;
    this.projectId = projectId;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
  }
}

export default ProjectItem;
