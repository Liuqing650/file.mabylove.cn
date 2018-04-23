# Upload
用于文件上传
## 代码演示

#### 代码
```jsx
import React from 'react';
import Upload from 'scrc-upload';
import './demo1.less';

export default class Demo1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base64File: [],
    };
  }
  onChange = (files) => {
    this.resetState();
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const newFileList = this.state.base64File.slice();
        newFileList.push(reader.result);
        this.setState({
          base64File: newFileList,
        });
      };
    });
  }
  beforeUpload = (files) => {
    console.log(Array.from(files));
    return true;
  }
  genPreview = () => {
    return this.state.base64File.map((img, index) => {
      return <img key={index} src={img} alt={`upload_img_${index}`} />;
    });
  }
  resetState = () => {
    this.setState({
      base64File: [],
    });
  }
  render() {
    return [
      <Upload
        key="upload"
        accept="image/*"
        beforeUpload={this.beforeUpload}
        onChange={this.onChange}
        multiple
      >
        <button className="demo1-button">上传图片</button>
      </Upload>,
      <div
        key="preview"
        className="demo1-preview"
      >
        {this.genPreview()}
      </div>,
    ];
  }
}
```
#### 效果

![](./assets/demo_1.png)

## API
|属性|说明|类型|默认值|
|---|---|---|---|
|accept|接受文件上传的类型|string|无|
|beforeUpload|文件上传前的钩子，参数为上传的文件列表，若返回false，则不上传所选文件|function(file)|无|
|children|Upload默认不包含任何内容，你需要在其中包裹一个元素，作为点击目标|element|无|
|disabled|禁用上传|bool|false|
|multiple|支持多文件上传|bool|false|
|onChange|文件上传回调，参数为上传的文件列表|function(file)|无|
## 提示
如果你想对上传文件数量或者上传文件大小做限制，可以在beforeUpload中加入你自己的判断逻辑
