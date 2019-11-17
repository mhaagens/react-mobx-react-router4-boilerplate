import { assign } from 'lodash';
import baseAPIs from './base';

// 后续随 API 增加，可以考虑根据功能拆分成单独文件维护
// 拆分 API 在此处 assign 进来，如
// assign({}, baseAPIs, { moreAPIs })

export default assign({}, baseAPIs, {});
