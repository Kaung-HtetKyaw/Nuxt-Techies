
<script>
export default {
  props: {
    size: {
      type: Number,
      required: true,
    },
  },
  render(h) {
    const slot = this.$slots.default ? this.$slots.default : [];
    return h(
      "div",
      { class: "comment-box" },
      slot.map((child) => {
        return h("div", { class: `pa-${this.$props.size}` }, [child]);
      })
    );
  },
};
</script>

