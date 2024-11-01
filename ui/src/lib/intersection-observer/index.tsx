import { defineComponent, getCurrentInstance, onMounted } from "vue";
const IOProps = {
  /** @description 自定义类名 */
  customClass: {
    type: String,
  },
  /** @description 是否只触发一次,默认为true */
  triggerOnce: {
    type: Boolean,
    default: true,
  },
  /** @description 阈值,默认为0.5 */
  threshold: {
    type:[Number, Array<number>],
    default: 0.5
  },
  /** @description 回调(inView: boolean, entry: IntersectionObserverEntry) => void; */
  onChange: Function
}
/**
 * IntersectionObserver
 * @description 监听元素是否可见
 */
export default defineComponent({
  name: 'IntersectionObserver',
  props: IOProps,
  setup(props) {
    const instance = getCurrentInstance();
    const { customClass, triggerOnce, threshold, onChange } = props;

    onMounted(() => {
      const { content } = instance?.refs || {};

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (onChange) {
            onChange(entry.isIntersecting, entry);
          }
          if (triggerOnce && entry.isIntersecting) {
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: threshold || 0
      });
      observer.observe(content as Element);
    })
    return () => {
      return (
        <div class={customClass} ref='content'>
          {instance?.slots.default?.()}
        </div>
      )
    }
  },
})
