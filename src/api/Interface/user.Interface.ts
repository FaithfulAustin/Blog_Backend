export default interface User {
    first_name: string;
    last_name: string;
    bio: string;
    email: string;
    profile_pic?: string;
    isVerified:boolean;
    last_auth_type: "google" | "native";
    reseTokenExpiration:Date;
    googleId: String;
    joinedAt: Date;
    following: String[];
    followers: String[];
    category:string[];

}