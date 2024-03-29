export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

export interface AuthState {
  userId: string;
  token: string;
}

export interface AuthenticationResponse {
  data: {
    localId: string;
    idToken: string;
    docData: {
      ExhibitUId: string;
      email: string;
      profilePictureId: string;
      profilePictureUrl: string;
      profilePictureBase64: string;
      exhibitTempCoverPhotoId: string;
      exhibitTempCoverPhotoUrl: string;
      exhibitTempCoverPhotoBase64: string;
      tempPhotoPostId: string;
      tempPhotoPostUrl: string;
      tempPhotoPostBase64: string;
      fullname: string;
      jobTitle: string;
      username: string;
      profileBiography: string;
      numberOfFollowers: number;
      numberOfFollowing: number;
      profileColumns: number;
      followers: string[];
      following: string[];
      cheeredPosts: string[];
      profileExhibits: object;
      profileLinks: object;
      userFeed: object;
      darkMode: boolean;
      showCheering: boolean;
      hideFollowing: boolean;
      hideFollowers: boolean;
      hideExhibits: boolean;
      updates: object;
      notifications: object[];
    };
  };
}

interface ActionAuthenticate {
  type: typeof AUTHENTICATE;
  userId: string;
  token: string;
}
interface ActionLogout {
  type: typeof LOGOUT;
}

export type Action = ActionAuthenticate | ActionLogout;
