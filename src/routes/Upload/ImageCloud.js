import React from 'react';
import {connect} from 'dva';
import CardComponent from '../../components/Upload/CardComponent';

const ImageCloud = ({dispatch,location,upload}) => {

	const {  loading, previewVisible, previewImageInfo, count, fileList} = upload;

	const UploadComponentProps = {
		count,
		previewImageInfo,
		previewVisible,
		fileList,
		onPreviewImage(item) {
			dispatch({
				type:'upload/showImagePreviewVisible',
				payload: item,
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
			<h2>云端图片：共{count}张</h2>
			<CardComponent {...UploadComponentProps} />
		</div>
	)
}

export default connect(({upload})=>({upload}))(ImageCloud);