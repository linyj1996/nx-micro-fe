import { request } from "../request";

// 获取联名券包页数据
export const getJointInfo = (joint_type: string, relevance_type: string) => {
  return request({
    url: '/tq-api/api/equityOrder/getMeiTuanJointRedEnvelop',
    method: 'get',
    params: {
      joint_type,
      relevance_type
    }
  })
}
