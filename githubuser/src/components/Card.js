import React from "react";
import Button from "@material-ui/core/Button";
import { styled } from "@material-ui/core/styles";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";

const MyButton = styled(Button)({
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 40,
  padding: "0 10px",
  fontSize: "1.1rem",
  marginLeft: "1rem",
});

//const Card = (props) => {
class Card extends React.Component {
  state = {
    modal: false,
    followers: [],
    fError: "",
  };
  toggle = () => {
    this.getFollowers();
    this.setState({ modal: !this.state.modal });
  };

  getFollowers = () => {
    axios
      .get(this.props.usermap.followers_url)
      .then((response) => {
        console.log(response.data);
        response.data.forEach((item) => {
          axios
            .get("https://api.github.com/users/" + item.login)
            .then((response) => {
              this.setState({
                followers: [...this.state.followers, response.data],
              });
            })
            .catch((error) => {
              console.log("The data was not returned1 ", error);
            });
        });
      })
      .catch((error) => {
        this.setState({
          fError:
            "There are too many requests. It has been blocked by CORS policy. Please try again in one hour.",
        });
        console.log("The data was not returned2 ", error);
      });
  };
  //console.log("card", props);
  //const { usermap } = props;
  render() {
    console.log("this.props.followers_url", this.props.usermap.followers_url);
    console.log("followers card", this.state.followers);
    return (
      <div className="card">
        <img src={this.props.usermap.avatar_url} />
        <div className="card-info">
          <h3 className="name">{this.props.usermap.name}</h3>
          <p className="username">{this.props.usermap.login}</p>
          <p>Location: {this.props.usermap.location}</p>
          <p>
            Profile:
            <a href={this.props.usermap.html_url}>
              {this.props.usermap.html_url}
            </a>
          </p>
          <p>{`Followers: ${this.props.usermap.followers}`};</p>
          <p>{`Following: ${this.props.usermap.following}`}</p>
          <p>{`Bio: ${this.props.usermap.bio}`}</p>
        </div>
        <MyButton onClick={this.toggle}>Followers</MyButton>
        <div className={this.state.modal ? "block" : "none"}>
          <div>
            {this.state.fError && (
              <p style={{ color: "red", fontSize: "2rem", marginTop: "2rem" }}>
                {this.state.fError}
              </p>
            )}
            <ul>
              {this.state.followers.map((item, index) => (
                <div style={{ marginLeft: "1rem", marginTop: "0.5rem" }}>
                  <li key={index} style={{ fontSize: "1.5rem" }}>
                    <a
                      href={item.html_url}
                      target="_blank"
                    >{`${item.login} ${item.name}`}</a>
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
export default Card;
