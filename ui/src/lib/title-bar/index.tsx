import { defineComponent, getCurrentInstance } from "vue";

const IOProps = {
  /** @description 自定义样式类名 */
  customClass: String,
  /** @description 标题栏状态：init: 页面未滚动，scroll: 页面已滚动 */
  titleBarStatus: {
    type: String as () => 'init' | 'scroll',
    default: 'init',
  },
  /** @description 标题, 在页面已滚动时展示 */
  title: String,
  /** @description 左侧图标 */
  leftIcon: {
    type: Object as () => {
      iconInit: string;
      iconScroll: string;
      onClick: () => void;
    }
  }
}

/**
 * TitleBar
 * @description 自定义标题栏
 */
export default defineComponent({
  name: 'TitleBar',
  props: IOProps,
  setup(props) {
    const instance = getCurrentInstance();
    const { customClass } = props;
    return () => {
      return (
        <div class={customClass}>
          <img src={props.leftIcon?.iconInit} onClick={props.leftIcon?.onClick} />
          {instance?.slots.default?.()}
        </div>
      )
    }
  },
})
