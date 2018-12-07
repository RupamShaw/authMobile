import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalDropdown from 'react-native-modal-dropdown';
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';
import {
  func,
  string,
} from 'prop-types';
import { setLocale } from './store/actions';

const ukImage = require('../../assets/uk.png');
const chinaImage = require('../../assets/china.png');
const downArrow = require('../../assets/down-arrow.png');
const upArrow = require('../../assets/up-arrow.png');

const styles = StyleSheet.create({
  dropdownContainer: {
    justifyContent: 'center',
    height: 44,
    marginTop: 100,
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 5,
  },
  modalDropdown: {
    width: 100,
    height: 44,
    right: 8,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 3,
    backgroundColor: 'white',
  },
  dropdownDropdown: {
    marginTop: 0,
    width: 100,
    height: 44,
    borderColor: 'cornflowerblue',
    borderRadius: 3,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  dropdownRow: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: 100,
    height: 44,
    borderRadius: 5,
  },
  dropdownImage: {
    marginLeft: 8,
    width: 31,
    height: 19.97,
    alignSelf: 'center',
  },
  dropdownRowText: {
    flex: 1,
    width: 10,
    height: 16,
    alignSelf: 'center',
    paddingLeft: 5,
    color: '#898989',
    fontFamily: 'FontSemiBold',
  },
  dropdownText: {
    fontSize: 16,
    borderColor: 'brown',
    borderStyle: 'solid',
    borderWidth: 1,
    color: 'white',
    textAlign: 'center',
  },
  textBoxView: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: 100,
    height: 44,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
  },
  textboxImage: {
    marginLeft: 8,
    alignSelf: 'center',
    width: 31,
    height: 19.97,
  },
  textBoxText: {
    flex: 1,
    width: 10,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingLeft: 5,
    fontFamily: 'FontBlack',
    color: '#898989',
  },
  downArrow: {
    width: 20,
    height: 14,
    marginRight: 8,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
});

const DropDownLanguage = [{ name: 'CN' }];
export class LanguageDropDown extends Component {
  state = {
    arrowImage: downArrow,
  };

  dropdownRenderRow = () => {
    const countryImage = DropDownLanguage[0].name === 'CN' ? chinaImage : ukImage;
    return (
      <TouchableHighlight underlayColor="cornflowerblue">
        <View style={[styles.dropdownRow]}>
          <Image style={styles.dropdownImage} mode="stretch" source={countryImage} />
          <Text style={[styles.dropdownRowText]}>
            {`${DropDownLanguage[0].name}`}
          </Text>
        </View>
      </TouchableHighlight>
    );
  };

  onDropdownWillShow = () => {
    const { arrowImage } = this.state;
    if (arrowImage === downArrow) {
      this.setState({ arrowImage: upArrow });
    }
  }

  onDropdownWillHide =() => {
    const { arrowImage } = this.state;
    if (arrowImage === upArrow) {
      this.setState({ arrowImage: downArrow });
    }
  }

  submitLang() {
    const { dispatchLocale } = this.props;
    if (DropDownLanguage[0].name === 'EN') {
      dispatchLocale('en');
    } else {
      dispatchLocale('cn');
    }
  }

  renderButtonText = (rowData) => {
    const { name } = rowData;
    DropDownLanguage[0].name = name === 'CN' ? 'EN' : 'CN';
    return `${name}`;
  }

  render() {
    const { currentLocale } = this.props;
    const { arrowImage } = this.state;
    return (
      <View style={styles.dropdownContainer}>
        <ModalDropdown
          style={styles.modalDropdown}
          textStyle={styles.dropdownText}
          dropdownStyle={styles.dropdownDropdown}
          options={DropDownLanguage}
          renderButtonText={rowData => this.renderButtonText(rowData)}
          renderRow={this.dropdownRenderRow}
          onSelect={(idx, value) => this.submitLang(idx, value)}
          showsVerticalScrollIndicator={false}
          onDropdownWillShow={this.onDropdownWillShow}
          onDropdownWillHide={this.onDropdownWillHide}
          animated
        >
          <View style={styles.textBoxView}>
            {currentLocale === 'cn' ? (
              <Image
                source={chinaImage}
                style={styles.textboxImage}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={ukImage}
                style={styles.textboxImage}
                resizeMode="contain"
              />
            )}

            <Text style={styles.textBoxText}>
              {currentLocale === 'en' ? 'EN' : 'CN'}
            </Text>
            <Image
              source={arrowImage}
              style={styles.downArrow}
              resizeMode="contain"
            />
          </View>
        </ModalDropdown>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  currentLocale: state.locale.currentLocale,
});

const mapDispatchToProps = dispatch => ({
  dispatchLocale: language => dispatch(setLocale(language)),
});

LanguageDropDown.defaultProps = {
  currentLocale: 'en',
};
LanguageDropDown.propTypes = {
  currentLocale: string,
  dispatchLocale: func.isRequired,
};
export const ConnectLanguageDropdown = connect(
  mapStateToProps,
  mapDispatchToProps,
)(LanguageDropDown);
