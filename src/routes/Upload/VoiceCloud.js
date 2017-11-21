import React from 'react';
import {connect} from 'dva';
import UploadTable from '../../components/Upload/UploadTable'

const VoiceCloud = ({ dispatch,location,upload }) => {
	const {  
		loading, previewVisible, previewImage, count, fileList, uploadList
	} = upload;

	const UploadTableProps = {
		count,
		previewImage,
		previewVisible,
		fileList,
		uploadList,
		onPreviewImage(url) {
			dispatch({
				type:'upload/showImagePreviewVisible',
				payload: url,
			})
		},
		onCancelPreview() {
			dispatch({
				type:'upload/hidePreviewVisible',
			})
		},
		onDeleteFile(fileId) {
			let data = {id:fileId};
			dispatch({
				type:'upload/deleteFile',
				payload: data,
			})
		},
	}

	return (
		<div>
			<h2>云端声音：共{count}个声音</h2>
			<UploadTable { ...UploadTableProps } />
		</div>
	)
}

export default connect(({upload})=>({upload}))(VoiceCloud);