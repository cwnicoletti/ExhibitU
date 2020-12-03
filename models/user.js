class User {
  constructor(
    userId,
    ownerPushToken,
    name,
    profilePicture,
    jobTitle,
    username,
    network,
    advocating,
    advocates,
    resumeLink,
    description,
    userLinks,
    userProjects,
    darkModePreference,
    qrCode
  ) {
    this.userId = userId;
    this.ownerPushToken = ownerPushToken;
    this.name = name;
    this.profilePicture = profilePicture;
    this.jobTitle = jobTitle;
    this.username = username;
    this.network = network;
    this.advocating = advocating;
    this.advocates = advocates;
    this.resumeLink = resumeLink;
    this.description = description;
    this.userLinks = userLinks;
    this.userProjects = userProjects;
    this.darkModePreference = darkModePreference;
    this.qrCode = qrCode;
    this.notifications = notifications;
  }
}

export default User;
