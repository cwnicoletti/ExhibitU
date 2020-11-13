class ProjectItem {
  constructor(
    id,
    ownerId,
    ownerPushToken,
    projectPictureId,
    title,
    imageUrl,
    description
  ) {
    this.id = id;
    this.ownerId = ownerId;
    this.pushToken = ownerPushToken;
    this.projectPictureId = projectPictureId;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
  }
}

export default ProjectItem;
