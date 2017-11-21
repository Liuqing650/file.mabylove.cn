import React, {PropTypes} from 'react';
import { Modal,Upload,Layout,Row,Col,Icon,Spin,Timeline, message,Alert,notification } from 'antd';
import { cdn } from '../../utils';

import styles from './uploadStyle.less';

const UploadUtil = ({
	previewVisible,
	loading,
	fileList,
	uploadList,
	previewImage,

	onFileChange,
	onSuccessUpload,
	onUpdateFile,
	onCancel,
	onChangeUploadData,

	uploadInterface,
	uploadMsg,
}) => {
	const { Content} = Layout;

 	function openNotification(notice) {
 		const noticeContent = <p>亲，您刚刚选择的文件是<a>{notice}</a></p>
		const args = {
			message: <h2>上传文件类型提示</h2>,
			description: noticeContent,
			duration: 3,
		};
	  notification.open(args);
	};

	function handlePreview(file) {
		onUpdateFile(file);
	}
	function handleCancel() {
		onCancel();
	}
	function handleChange(fileList) {
		onFileChange(fileList)
	}
	function changeFileTypeUrl(fileType) {
		var uploadcdn = '';
		if(fileType.indexOf('image')>-1) {
			const notice = '图片';
			openNotification(notice)
			uploadcdn = cdn.img;
		} else if(fileType.indexOf('audio')>-1) {
			const notice = '音乐';
			openNotification(notice)
			uploadcdn = cdn.voice;
		} else if(fileType.indexOf('video')>-1) {
			const notice = '视频';
			openNotification(notice)
			uploadcdn = cdn.video;
		} else {
			const notice = '其他类型文件';
			openNotification(notice)
			uploadcdn = cdn.res;
		}

 		console.log("uploadcdn=====>",uploadcdn);
		onChangeUploadData(uploadcdn);
	}

	const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

	const uploadButtonText = (
      	<div className={styles.uploadButtonWrapper} >
	        <Icon type="plus"  className={styles.avatarUploadButton} />
	    </div>
    );

	const props = {
	  	name: 'file',
	  	multiple: true,
	  	action: uploadInterface,
		listType:'picture-card',
		beforeUpload(file) {
			changeFileTypeUrl(file.type);
			// message.info("很抱歉,上传通道暂时关闭了",4)
			// return false;
		},
	  	onChange(info) {
		    handleChange(info.fileList)
			if (info.file.status == 'uploading') {}
			if (info.file.status !== 'uploading') {
			  console.log(info.file);
			  console.log(info.fileList);
			}
			if(info.file.status=='done'){
				if(info.file.response.result ===true) {
			    	onSuccessUpload(info.fileList)
			    	message.info("上传成功")
				} else if (info.file.response.result ===false) {
			    	message.error("上传失败"+nfo.file.msg)
				}
			}
	  	},
		onPreview:handlePreview,
		onRemove:handleCancel,
	};
	const timeLineNode = uploadList&&uploadList.length>0?uploadList.map((item,index)=>{
		return (
			<Timeline.Item key={index}>{item.name}<span className="ant-divider" />{item.type}<span className="ant-divider" />{item.size}<span className="ant-divider" />字节</Timeline.Item>
		)
	}):null;

  	return (
		<div className={styles.uploadWrapper}>
		<Layout>
		    <Content style={{ margin: '20px 50px',}}>
				<Row>
					<Col span={12}>
						<Timeline>
					    	{timeLineNode}
					    </Timeline>
					</Col>
					<Col span={12}>
						 <div>
					        <Upload {...props}>
							    {uploadButton}
					        </Upload>
					        <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
					          <img alt="example" style={{ width: '100%' }} src={previewImage} />
					        </Modal>
					      </div>
					</Col>
			    </Row>
		    </Content>
		</Layout>
		</div>
  	)
}

export default UploadUtil;
