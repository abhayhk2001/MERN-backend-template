import { statusCode, userTypes } from "../helpers/constants";
import { findOne } from "../Models/User";

const auth = (roles) => async (req, res, next) => {
  var userId = req.session.auth;

  if (!userId && roles)
    return res
      .status(statusCode.Unauthorized)
      .json({ message: "You are not authorized!" });

  if (!userId && !roles) {
    next();
    return;
  }

  findOne({ _id: userId }).then((userDetails) => {
    console.log(userDetails ? userDetails.email : "No user logged in");
    let error = "";

    if (!userDetails) error = "Only for users!";
    else if (roles === false) error = "You have to be logged out";
    else if (roles && roles.includes && !roles.includes(userDetails.type))
      error = "You are not an authorised user!";

    if (error)
      return res.status(statusCode.BadRequest).json({ message: error });

    if (userDetails) delete userDetails.auth_token;
    req.user = userDetails;
    req.userType = userDetails?.type;
    next();
  });
};

export default auth;
