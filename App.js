import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, SafeAreaView, Animated, TextInput } from 'react-native';
import { Icon } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class App extends Component {
  state = {
    showArrow: false
  };

  DATA = [
    { user: 'me', message: 'Hi' },
    { user: 'you', message: 'Hi' },
    { user: 'me', message: 'How is family?' },
    { user: 'you', message: 'Good.' },
    { user: 'me', message: 'I tried reaching you yesterday but to no avail.' },
    { user: 'you', message: 'That is true. I was in a meeting throughtout the day.' },
    { user: 'me', message: 'OK' },
    { user: 'you', message: "So, what's up?" },
    {
      user: 'me',
      message: 'Nothing much. Just wanted to ask you if you went for lectures yesterday before.'
    },
    { user: 'you', message: 'OK.\nHow are your folks?' },
    { user: 'me', message: 'They are doing great walhamdulillaah.' },
    { user: 'you', message: 'Alright, do extend my regards to them.' },
    { user: 'me', message: 'OK. I shall do that, take care.' },
    { user: 'you', message: 'Yep, take care.' }
  ];
  animatedValue = new Animated.Value(150);

  render() {
    const { showArrow } = this.state;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          style={styles.container}
          contentContainerStyle={{ justifyContent: 'center' }}
          keyboardDismissMode="on-drag"
        >
          <View style={{ marginBottom: 16 }}>
            <FlatList
              data={this.DATA}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => String(index)}
              contentContainerStyle={{ paddingHorizontal: 16 }}
            />

            <View style={styles.bottomWrapper}>
              <Animated.View style={[styles.iconsWrapper, { width: this.animatedValue }]}>
                {!showArrow ? (
                  <View style={{ flexDirection: 'row' }}>
                    <Icon name="grid" type="Entypo" style={styles.icon} />
                    <Icon name="camera" type="Entypo" style={styles.icon} />
                    <Icon name="picture" type="AntDesign" style={styles.icon} />
                    <Icon name="mic" type="Entypo" style={styles.icon} />
                  </View>
                ) : (
                  <Icon name="right" type="AntDesign" style={styles.icon} />
                )}
              </Animated.View>

              <TextInput
                placeholder="Aa"
                style={styles.textInput}
                placeholderTextColor={'grey'}
                onFocus={this.decrease}
                onBlur={this.expand}
              />
              <Icon name="smile" type="FontAwesome5" style={styles.icon} />
              <Icon name="thumbs-up" type="FontAwesome" style={styles.icon} />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }

  renderItem = ({ item }) => {
    return (
      <View
        style={[
          styles.messageWrapper,
          { alignSelf: item.user === 'me' ? 'flex-start' : 'flex-end' },
          { backgroundColor: item.user === 'me' ? 'lightgrey' : '#4267b2' }
        ]}
      >
        <Text style={{ color: item.user === 'you' ? 'white' : undefined }}>{item.message}</Text>
      </View>
    );
  };

  decrease = () => {
    Animated.timing(this.animatedValue, {
      toValue: 30
    }).start();
    this.setState({ showArrow: true });
  };

  expand = () => {
    Animated.timing(this.animatedValue, {
      toValue: 150
    }).start();
    this.setState({ showArrow: false });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingVertical: 16
  },
  messageWrapper: {
    justifyContent: 'center',
    marginVertical: 8,
    padding: 8,
    borderRadius: 8,
    maxWidth: 300
  },
  bottomWrapper: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingHorizontal: 8
  },
  iconsWrapper: {
    flexDirection: 'row',
    width: 150
  },
  icon: {
    color: '#4267b2',
    marginRight: 8
  },
  textInput: {
    backgroundColor: 'lightgrey',
    borderRadius: 16,
    flex: 1,
    paddingHorizontal: 8,
    color: 'grey',
    marginRight: 8
  }
});
