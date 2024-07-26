import { ElMessage } from 'element-plus';

let messageDom = null;
const resetMessage = (options) => {
  if (messageDom) messageDom.close();
  messageDom = ElMessage(options);
};
const typeArr = ['success', 'error', 'warning', 'info'];
typeArr.forEach((type) => {
  resetMessage[type] = (options) => {
    if (typeof options === 'string') {
      const tmp = { message: options };
      //   options = { message: options };
      tmp.type = type;
      //   options.type = type;
      return resetMessage(tmp);
    }
  };
},
);
export const message = resetMessage;
