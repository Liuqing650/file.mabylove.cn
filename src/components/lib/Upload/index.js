import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.less';

export default class Upload extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    accept: PropTypes.string,
    multiple: PropTypes.bool,
    disabled: PropTypes.bool,
    beforeUpload: PropTypes.func,
    onChange: PropTypes.func.isRequired,
  }
  static defaultProps = {
    accept: '*',
    multiple: false,
    disabled: false,
    beforeUpload: () => true,
  }
  handleClickBubble = () => {
    this.removeFile();
    this.fileInput.click();
  }
  handleFileChange = (evt) => {
    const { files } = evt.target;
    const fileValid = this.checkFile(files);
    if (fileValid) {
      this.addFile(files);
    }
  }
  checkFile = (...args) => {
    const { beforeUpload } = this.props;
    if (typeof beforeUpload === 'function') {
      return beforeUpload(...args);
    }
    return true;
  }
  addFile = (...args) => {
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(...args);
    }
  }
  removeFile = () => {
    this.fileInput.value = '';
  }
  saveInputRef = (inputRef) => {
    this.fileInput = inputRef;
  }
  render() {
    const {
      children,
      accept,
      multiple,
      disabled,
    } = this.props;
    return [
      <span
        key="file-proxy"
        onClick={this.handleClickBubble}
      >
        {children}
      </span>,
      <input
        key="file-input"
        type="file"
        className={styles.scrcUploadInput}
        ref={this.saveInputRef}
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={this.handleFileChange}
      />,
    ];
  }
}
