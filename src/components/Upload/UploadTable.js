import React from 'react';
import { Table, Icon, Button } from 'antd';
import styles from './uploadStyle.less';

const UploadTable = ({
	count,
	fileList,
	previewVisible,
	previewImage,
	onCancelPreview,
	onPreviewImage,
	onDeleteFile
}) => {

	const columns = [{
	  title: '名称',
	  dataIndex: 'name',
	  key: 'name',
	}, {
	  title: '文件类型',
	  dataIndex: 'file_type',
	  key: 'file_type',
	}, {
	  title: '路径',
	  dataIndex: 'path',
	  key: 'path',
	},  {
	  title: '创建时间',
	  dataIndex: 'create_time',
	  key: 'create_time',
	}, {
	  title: '操作',
	  key: 'action',
	  render: (text, record) => (
	    <span>
	      <a href={record.url} download={record.name}><Button icon="cloud-download" >下载</Button></a>
	      <span className="ant-divider" />
	      <Button icon="delete" onClick={()=>{onDeleteFile(record.id)}}>删除</Button>
	    </span>
	  )
	}];


	return (
		<div>
			<Table 
				columns={columns} 
				dataSource={fileList}
				rowKey={record => record.id}
				/>
		</div>
	)
}

export default UploadTable;