import React from "react";

import "./App.css";
import axios from "axios";
import Card from "./components/Card";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { styled } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const MyButton = styled(Button)({
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 48,
  padding: "0 30px",
  fontSize: "1.5rem",
  marginLeft: "1rem",
});
class App extends React.Component {
  state = {
    users: [],
    error: "",
    searchUser: "edelveiss",
  };
  componentDidMount() {
    this.userLoading(this.state.searchUser);
  }

  // updateUser = (person) => {
  //   this.setState({ user: person });
  //   console.log("updateuser", this.state.user);
  // };
  handleChanges = (e) => {
    this.setState({
      searchUser: e.target.value,
    });
  };

  userLoading = (userString) => {
    axios
      .get(`https://api.github.com/users/${userString}`)
      .then((res) => {
        this.setState({
          users: [...this.state.users, res.data],
          followersUrl: res.data.followers_url,
          searchUser: "",
          error: "",
        });

        axios
          .get(res.data.followers_url)
          .then((response) => {
            console.log(response.data);
            response.data.forEach((item) => {
              axios
                .get("https://api.github.com/users/" + item.login)
                .then((response) => {
                  this.setState({
                    users: [...this.state.users, response.data],
                  });
                })
                .catch((error) => {
                  console.log("The data was not returned ", error);
                });
            });
          })
          .catch((error) => {
            console.log("The data was not returned ", error);
          });
      })
      .catch((err) => {
        this.setState({
          error: "Looks like we could not find that user. Please try again",
        });
      });
  };

  fetchUser = (e) => {
    e.preventDefault();

    this.setState({
      users: [],
    });
    this.userLoading(this.state.searchUser);
  };

  render() {
    console.log("user", this.state.user);
    console.log("followersUrl", this.state.followersUrl);
    return (
      <div className="App">
        <input
          style={{
            height: "4.5rem",
            width: "40%",
            marginTop: "3rem",
            fontSize: "2rem",
          }}
          type="text"
          value={this.state.searchUser}
          onChange={this.handleChanges}
          placeholder="Enter user name"
        />
        <MyButton onClick={this.fetchUser}>Fetch user</MyButton>

        {this.state.error && (
          <p style={{ color: "red", fontSize: "2rem", marginTop: "2rem" }}>
            {this.state.error}
          </p>
        )}
        <div className="container">
          {this.state.users.map((el, index) => (
            <Card
              usermap={el}
              key={index}
              updateUser={this.updateUser}
              user={this.state.user}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;

// componentDidUpdate(prevProps, prevState) {
//   if (prevState.users !== this.state.users) {
//     axios
//       .get(this.state.followersUrl)
//       .then((response) => {
//         console.log("followersUrl", response.data);
//         response.data.forEach((item) => {
//           axios
//             .get("https://api.github.com/users/" + item.login)
//             .then((response) => {
//               console.log(
//                 "https://api.github.com/users/ + item.login",
//                 response.data
//               );
//               this.setState({
//                 users: [...this.state.users, response.data],
//               });
//             })
//             .catch((error) => {
//               console.log("The data was not returned ", error);
//             });
//         });
//       })
//       .catch((error) => {
//         console.log("The data was not returned ", error);
//       });
//   }
// }

// componentDidMount() {
//   axios
//     .get("https://api.github.com/users/edelveiss")
//     .then((response) => {
//       console.log(response.data.followers_url);
//       this.setState({
//         users: [...this.state.users, response.data],
//       });

//       axios
//         .get(response.data.followers_url)
//         .then((response) => {
//           console.log(response.data);
//           response.data.forEach((item) => {
//             axios
//               .get("https://api.github.com/users/" + item.login)
//               .then((response) => {
//                 this.setState({
//                   users: [...this.state.users, response.data],
//                 });
//               })
//               .catch((error) => {
//                 console.log("The data was not returned ", error);
//               });
//           });
//         })
//         .catch((error) => {
//           console.log("The data was not returned ", error);
//         });
//     })

//     .catch((error) => {
//       console.log("The data was not returned ", error);
//     });
// }
