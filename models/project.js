class Project {
  constructor(
    id,
    ownerId,
    ownerPushToken,
    title,
    imageUrl,
    description
  ) {
    this.id = id;
    this.ownerId = ownerId;
    this.pushToken = ownerPushToken;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
  }
}

export default Project;
