import UserDto from "../../dto/user.dto";

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserDto;
    }
  }
}
