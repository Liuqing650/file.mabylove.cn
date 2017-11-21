import React from 'react';
import { Card,Button,Row, Col,Icon,Modal } from 'antd';
import styles from './uploadStyle.less';

const CardComponent = ({
	fileList,
	count,
	previewVisible,
	previewImageInfo,
	onCancelPreview,
	onPreviewImage,
	onDeleteFile
}) => {

	const loopCard = fileList&&fileList.length>0 ? fileList.map((item,index)=> {
		return (
			<Card key={index}  className={styles.cardWrapper} style={{ width: 240 }} bodyStyle={{ padding: 0 }}>
			    <div className={styles.imageStyle}>
			      <img alt="example" width="100%" src={item.url} onClick={()=>{onPreviewImage(item)}} />
			    </div>
			    <div className={styles.customCard}>
			      	<h3>{item.name}</h3>
			      	<div className={styles.clearfix}>
						<a href={item.url} download={item.name}><Button className={styles.downloadStyle} icon="cloud-download" >下载</Button></a>
						<Button className={styles.deleteStyle} icon="delete" onClick={()=>{onDeleteFile(item.id)}}>删除</Button>
			    	</div>
			    </div>
			 </Card>
		)
	}):null;

	return (
		<div>
			<div className={styles.clearfix}>
				{loopCard}
			</div>
			<Modal title={previewImageInfo.name} visible={previewVisible} footer={null} onCancel={onCancelPreview} className={styles.modalStyle}>
	          <img alt="example" style={{ width: '100%' }} src={previewImageInfo.url} />
	        </Modal>
		</div>
	)
}

export default CardComponent;