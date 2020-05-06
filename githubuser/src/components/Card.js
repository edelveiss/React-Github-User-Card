import React from "react";

const Card = (props) => {
  const { usermap, updateUser, user } = props;
  //   const userurl = user + "/followers";
  //   console.log("userurl", userurl);
  //updateUser(usermap.login);
  return (
    <div className="card">
      <img src={usermap.avatar_url} />
      <div className="card-info">
        <h3 className="name">{usermap.name}</h3>
        <p className="username">{usermap.login}</p>
        <p>Location: {usermap.location}</p>
        <p>
          Profile:
          <a href={usermap.html_url}>{usermap.html_url}</a>
        </p>
        <p>{`Followers: ${usermap.followers}`};</p>
        <p>{`Following: ${usermap.following}`}</p>
        <p>{`Bio: ${usermap.bio}`}</p>
      </div>
    </div>
  );
};
export default Card;
