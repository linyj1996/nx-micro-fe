/* eslint-disable @nx/enforce-module-boundaries */
import { defineComponent, reactive } from 'vue';
import { IntersectionObserver, TitleBar } from '@fanhuan/ui';
import { getJointInfo } from '@fanhuan/h5/services/api/vip';
import { JointMTPageInfo } from '@fanhuan/h5/types';
import './style.scss';
const JointMT = defineComponent({
  name: 'JointMT',
  setup() {
    const state: { pageInfo: JointMTPageInfo } = reactive({
      pageInfo: {},
    });
    getJointInfo('3', '29')
      .then((res) => {
        if (res?.status === 200 && res?.data) {
          state.pageInfo = res.data;
        } else {
          console.log(res?.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return {
      state,
    };
  },
  render() {
    const { pageInfo } = this.state;
    const handleObserve = (
      inView: boolean,
      entry: IntersectionObserverEntry
    ) => {
      if (inView) {
        console.log('inView');
        console.log(inView, entry);
      }
    };
    return (
      <div class="joint_mt">
        {/* <img
          class="head_img"
          draggable="false"
          src={pageInfo.goods_pic}
          alt=""
        /> */}
        {/* <Button
          class="button"
          onClick={() => {
            console.log('click button')
          }}
          /> */}
        <TitleBar
          customClass="my-title-bar"
          titleBarStatus="scroll"
          title="加盟合作"
          leftIcon={{
            iconInit: new URL('./img/icon_dycg@3x.png', import.meta.url).href,
            iconScroll: '',
            onClick: () => {
              console.log('click leftIcon');
            },
          }}
        />
        <div style="height: 800px">占位</div>
        <IntersectionObserver
          customClass="my-observer"
          threshold={0.1}
          onChange={handleObserve}
        >
          <div>出来了</div>
        </IntersectionObserver>
        <div style="height: 800px">占位</div>
      </div>
    );
  },
});
export default JointMT;
