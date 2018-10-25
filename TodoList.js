import React, { Component } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  ListView,
  Image,
  TouchableOpacity
} from "react-native";
import ImagePicker from "react-native-image-picker";

export default class App extends Component {
  state = {
    inputValue: "",
    todoList: [],
    geolocation: null,
    avatarSource: null,
    avatarSize: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.receiveGeolocation);
  }

  receiveGeolocation = geolocation => {
    console.log(geolocation);
    this.setState({ geolocation });
  };

  _handleTextChange = value => {
    const inputValue = value;
    this.setState(() => ({
      inputValue
    }));
  };

  _handleSendButtonPress = () => {
    if (!this.state.inputValue) {
      return;
    }
    this.setState(prevState => ({
      todoList: [
        ...prevState.todoList,
        {
          avatar: this.state.avatarSource,
          title: this.state.inputValue
        }
      ],
      inputValue: "",
      avatarSource: null,
      avatarSize: null
    }));
  };

  _handleDeleteButtonPress = id => {
    this.setState(prevState => {
      const todoList = prevState.todoList.filter(
        (item, i) => parseInt(id) !== i
      );
      return {
        todoList
      };
    });
  };

  pickImage = () => {
    const options = {};
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: "data:image/jpeg;base64," + response.data };

        this.setState({
          avatarSource: source,
          avatarSize: {
            width: response.width,
            height: response.height
          }
        });
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.geolocation ? (
          <Text style={{ marginBottom: 15 }}>
            {`lng: ${this.state.geolocation.coords.longitude}, lat: ${
              this.state.geolocation.coords.latitude
            }`}
          </Text>
        ) : null}
        <View style={styles.formView}>
          <TextInput
            style={styles.inputForm}
            value={this.state.inputValue}
            onChangeText={this._handleTextChange}
            placeholder="Input todo"
          />
          {this.state.avatarSource ? (
            <TouchableOpacity onPress={this.pickImage} style={styles.center}>
              <Image
                source={this.state.avatarSource}
                style={[
                  styles.uploadAvatar,
                  {
                    width:
                      (this.state.avatarSize.width /
                        this.state.avatarSize.height) *
                      150,
                    height: 150
                  }
                ]}
              />
            </TouchableOpacity>
          ) : (
            <Button title="Add Photo" onPress={this.pickImage} />
          )}
          <View height={10} />
          <Button title="Submit" onPress={this._handleSendButtonPress} />
        </View>
        <FlatList
          data={this.state.todoList}
          style={styles.listView}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.todoItem}>
                <Image style={styles.todoAvatar} source={item.avatar} />
                <Text style={styles.todoText}>{item.title}</Text>
                <Button
                  title="Delete"
                  onPress={() => {
                    this._handleDeleteButtonPress(index);
                  }}
                  style={styles.deleteButton}
                />
              </View>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
    backgroundColor: "#eee"
  },
  formView: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 8
  },
  inputForm: {
    backgroundColor: "#fff",
    width: 320,
    height: 40,
    padding: 8,
    marginBottom: 8
  },
  todoItem: {
    alignItems: "center",
    padding: 8,
    width: 320,
    borderBottomWidth: 1.5,
    borderColor: "#e0e0e0",
    backgroundColor: "#fff",
    // border: '1 solid #333',
    flex: 1,
    flexDirection: "row"
  },
  todoText: {
    flex: 1
  },
  uploadAvatar: {
    margin: 10,
    height: 100,
    width: "auto"
  },
  center: {
    justifyContent: "center",
    alignItems: "center"
  },
  todoAvatar: {
    marginRight: 15,
    width: 60,
    height: 60
  }
});
