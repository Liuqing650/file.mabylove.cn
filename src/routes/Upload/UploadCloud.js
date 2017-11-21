import React from 'react';
import {connect} from 'dva';
import UploadComponent from '../../components/Upload/UploadUtil';

const UploadCloud = ({dispatch,location,upload}) => {

	const { previewVisible, loading, previewImage, uploadInterface, uploadMsg, uploadList, count, fileList} = upload;

	const UploadComponentProps = {
		loading,
		previewVisible,
		previewImage,
		fileList,
		uploadList,
		uploadInterface,
		uploadMsg,
		onUpdateFile(file) {
			dispatch({
				type: 'upload/updateFile',
				payload: file,
			})
		},
		onFileChange(value) {
			dispatch({
				type: 'upload/fileChange',
				payload: {fileList:value}
			})
		},
		onSuccessUpload(data) {
			dispatch({
				type: 'upload/successUpload',
				payload: data
			})
		},
		onCancel() {
			dispatch({
				type: 'upload/hidePreviewVisible',
			})
		},
		onChangeUploadData(interfaceStr) {
			dispatch({
				type: 'upload/changeUploadData',
				payload: interfaceStr,
			})
		}
	}
	return (
		<div>
			<h2>上传文件到云端</h2>
			<UploadComponent {...UploadComponentProps} />
		</div>
	)
}

export default connect(({upload})=>({upload}))(UploadCloud);