import { request } from "../request";

// 获取特权商家页数据
export const getPrivilegeInfo = (joint_type: string, relevance_type: string) => {
  return request({
    url: '/tq-api/api/equityOrder/getMeiTuanJointRedEnvelop',
    method: 'get',
    params: {
      joint_type,
      relevance_type
    }
  })
}
