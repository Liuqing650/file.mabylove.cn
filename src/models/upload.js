import { getFileList, deleteFile, getComment,saveComment } from '../services/api';
import {message} from 'antd';


export default {
	namespace:'upload',

	state:{
		previewVisible: false,
		loading: false,
		previewImage:'',
		previewImageInfo:{},
		uploadList:[],
		uploadInterface:'',
		uploadMsg:{},
		fileInfo:{},
		count:0,
		fileList: [{uid: -1,name: 'xxx.png',status: 'done',url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'}],
	},

	subscriptions: {
		setup({dispatch, history}) {
			history.listen( location => {
				if(location.pathname === '/upload/image') {
					dispatch({
						type:'query',
						payload: {file_type:'1'},
					})
				}
				if(location.pathname === '/upload/music') {
					dispatch({
						type:'query',
						payload: {file_type:'2'},
					})
				}
				if(location.pathname === '/upload/video') {
					dispatch({
						type:'query',
						payload: {file_type:'3'},
					})
				}
				if(location.pathname === '/upload/file') {
					dispatch({
						type:'query',
						payload: {file_type:'4'},
					})
				}
				if(location.pathname === '/upload/res') {
					dispatch({
						type:'query',
						payload: {file_type:'5'},
					})
				}
			});
		}
	},

	effects: {
		*query({ payload }, { call, put }) {//	1,img;2,voice,3,video;4,files;5,其他文件
			yield put({type:'showLoading'});
			const data = yield call(getFileList,payload)
			if(data) {
				yield put({
					type:'querySuccess',
					payload: {
						data:data,
						...payload,
					},
				})
			}
		},
		*updateFile({payload},{call,put}) {
			const file = payload;
			yield put({
				type:'showPreviewVisible',
				payload: payload,
			});
		},
		*deleteFile({payload},{call,put,select}) {
			const fileInfo = yield select(state=>state.upload.fileInfo);
			const data = yield call(deleteFile,payload);
			message.info(data.info);
			if(data.msg) {
				yield put({
					type:'query',
					payload: fileInfo,
				});
			}
		}
	},

	reducers: {
		querySuccess(state,action) {
			const payload = action.payload;
			state.fileList = payload.data;
			state.count = payload.data&&payload.data.length?payload.data.length:0;
			state.loading = false;
			state.fileInfo = {file_type:payload.file_type};
			return { ...state };
		},
		showPreviewVisible(state,action) {
			const file = action.payload;
			state.previewImage=file.url || file.thumbUrl;
			state.previewVisible = true;
			return { ...state };
		},
		showImagePreviewVisible(state,action) {
			state.previewImageInfo=action.payload;
			state.previewVisible = true;
			return { ...state };
		},
		hidePreviewVisible(state,action) {
			state.previewVisible = false;
			return { ...state };
		},
		showLoading(state,action) {
			state.loading = true;
			return { ...state }
		},
		hideLoading(state,action) {
			state.loading = false;
			return { ...state };
		},
		fileChange(state,action) {
			return { ...state,...action.payload};
		},
		successUpload(state,action) {
			let fileList = action.payload;
			let tempList = [];
			if(fileList.length>0) {
				fileList.map((item,index)=>{
					let obj = {};
					obj['name'] = item.name;
					obj['size'] = item.size;
					obj['type'] = item.type;
					tempList.push(obj);
				})
			}
			state.uploadList=tempList;
			return { ...state};
		},
		changeUploadData(state,action) {
			state.uploadMsg = {};
			state.uploadMsg['user_id']="-1";
			state.uploadInterface=action.payload;
			return { ...state };
		}
	}
}
