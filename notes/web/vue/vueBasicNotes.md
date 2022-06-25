---
author: Sabertazimi
authorTitle: Web Developer
authorURL: https://github.com/sabertazimi
authorImageURL: https://github.com/sabertazimi.png
tags: [Web, Vue]
---

# Vue Basic Notes

## Directives

### Control Flow Directives

```html
<template>
  <p v-if="isShow">Show</p>
  <p v-if="isEnabled">Enabled</p>
  <p v-else>Disabled</p>
  <p v-if="inventory > 10">In Stock</p>
  <p v-else-if="inventory <= 10 && inventory > 0">Almost Sold Out</p>
  <p v-else>Out of Stock</p>
  <ul>
    <li v-for="item in items" :key="item.id">{{ item.value }}</li>
    <li v-for="(item, index) in items">
      {{ parentMessage }} - {{ index }} - {{ item.message }}
    </li>
  </ul>
</template>
```

:::tip
Prefer `v-show` if you need to toggle something very often,
and prefer `v-if` if the condition is unlikely to change at runtime.
:::

### Attributes Binding Directive

```html
<template>
  <a :href="url">Dynamic Link</a>
  <img :src="link" :alt="description" />
  <button :disabled="item.length === 0">Save Item</button>
</template>
```

### Class and Style Binding Directive

- Static class.
- Array binding.
- Object binding.

```html
<template>
  <div class="static"></div>
  <div :class="{ active: isActive, 'text-danger': hasError }"></div>
  <div :class="[isActive ? activeClass : '', errorClass]"></div>
  <div :class="[{ active: isActive }, errorClass]"></div>
  <div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
  <div :style="[baseStyles, overridingStyles]"></div>
  <div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
</template>
```

### Event Handlers Directive

#### Event Handlers and Modifiers

```html
<div id="handler">
  <button @click="warn('Warn message.', $event)">Submit</button>
  <button @click="one($event), two($event)">Submit</button>

  <!-- 阻止单击事件继续传播 -->
  <a @click.stop="doThis"></a>

  <!-- 提交事件不再重载页面 -->
  <form @submit.prevent="onSubmit"></form>

  <!-- 修饰符可以串联 -->
  <a @click.stop.prevent="doThat"></a>

  <!-- 只有修饰符 -->
  <form @submit.prevent></form>

  <!-- 添加事件监听器时使用事件捕获模式 -->
  <!-- 即内部元素触发的事件先在此处理, 然后才交由内部元素进行处理 -->
  <div @click.capture="doThis">...</div>

  <!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
  <!-- 即事件不是从内部元素触发的 -->
  <div @click.self="doThat">...</div>

  <!-- 点击事件将只会触发一次 -->
  <a @click.once="doThis"></a>

  <!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发   -->
  <!-- 而不会等待 `onScroll` 完成                   -->
  <!-- 这其中包含 `event.preventDefault()` 的情况   -->
  <div @scroll.passive="onScroll">...</div>

  <input @keyup.enter="submit" />
  <input @keyup.tab="submit" />
  <input @keyup.delete="submit" />
  <input @keyup.esc="submit" />
  <input @keyup.space="submit" />
  <input @keyup.up="submit" />
  <input @keyup.down="submit" />
  <input @keyup.left="submit" />
  <input @keyup.right="submit" />
  <input @keyup.page-down="onPageDown" />
  <input @keyup.ctrl.enter="clear" />
  <input @keyup.alt.space="clear" />
  <input @keyup.shift.up="clear" />
  <input @keyup.meta.right="clear" />

  <!-- Ctrl + Click -->
  <div @click.ctrl="doSomething">Do something</div>
  <!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
  <button @click.ctrl="onClick">A</button>
  <!-- 有且只有 Ctrl 被按下的时候才触发 -->
  <button @click.ctrl.exact="onCtrlClick">A</button>
  <!-- 没有任何系统修饰符被按下的时候才触发 -->
  <button @click.exact="onClick">A</button>
  <button @click.left="onClick">Left click</button>
  <button @click.right="onClick">Right click</button>
  <button @click.middle="onClick">Middle click</button>
</div>
```

```ts
Vue.createApp({
  methods: {
    warn(message, event) {
      if (event) event.preventDefault();
      alert(message);
    },
    one(event) {
      if (event) event.preventDefault();
      console.log('one');
    },
    two(event) {
      if (event) event.preventDefault();
      console.log('two');
    },
  },
}).mount('#inline-handler');
```

#### Custom Events

Form events:

```ts
app.component('CustomForm', {
  emits: {
    // 没有验证
    click: null,

    // 验证 submit 事件
    submit: ({ email, password }) => {
      if (email && password) {
        return true;
      } else {
        console.warn('Invalid submit event payload!');
        return false;
      }
    },
  },
  methods: {
    customEvent() {
      this.$emit('custom-event');
    },
    submitForm(email, password) {
      this.$emit('submit', { email, password });
    },
  },
});
```

```html
<custom-form
  @click="handleClick"
  @submit="handleSubmit"
  @custom-event="handleEvent"
></custom-form>
```

Drag and Drop events:

```html
<!-- Drag.vue -->
<template>
  <div
    draggable="true"
    @dragenter.prevent
    @dragover.prevent
    @dragstart.self="onDrag"
  >
    <slot />
  </div>
</template>

<script>
  export default {
    props: {
      transferData: {
        type: Object,
        required: true,
      },
    },
    methods: {
      onDrag(e) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.dropEffect = 'move';
        e.dataTransfer.setData('payload', JSON.stringify(this.transferData));
      },
    },
  };
</script>
```

```html
<!-- Drop.vue -->
<template>
  <div @dragenter.prevent @dragover.prevent @drop.stop="onDrop">
    <slot />
  </div>
</template>

<script>
  export default {
    methods: {
      onDrop(e) {
        const transferData = JSON.parse(e.dataTransfer.getData('payload'));
        this.$emit('drop', transferData);
      },
    },
  };
</script>
```

### Model Directives

本质为语法糖 (`v-model = v-bind + v-on`):

```html
<input v-model="searchText" />
<input :value="searchText" @input="searchText = $event.target.value" />
```

- `checkbox`/`radio`:
  `checked` property and `@change` event.
- Multiple `checkbox`:
  value array.
- `select`:
  `value` property and `@change` event.
- `text`/`textarea`:
  `value` property and `@input` event.
- Child component:
  - Default: `value` property and `@input` event.
  - Use `options.model` on Child component to change default `v-bind` and `v-on`.

```html
<input v-model="message" placeholder="edit me" />
<textarea v-model="message" placeholder="add multiple lines"></textarea>

<input type="radio" id="one" value="One" v-model="picked" />
<input type="radio" id="two" value="Two" v-model="picked" />

<input type="checkbox" id="checkbox" v-model="checked" />
<label for="checkbox">{{ checked }}</label>

<input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
<input type="checkbox" id="john" value="John" v-model="checkedNames" />
<input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />

<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>

<select v-model="selected" multiple>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>

<!-- Debounce -->
<input v-model.lazy="msg" />
<!-- 自动将用户的输入值转为数值类型 -->
<input v-model.number="age" type="number" />
<!-- 自动过滤用户输入的首尾空白字符 -->
<input v-model.trim="msg" /
```

Component `v-model` directive:

```html
<custom-input v-model="searchText"></custom-input>
<custom-input
  :model-value="searchText"
  @update:model-value="searchText = $event"
></custom-input>
```

```ts
app.component('CustomInput', {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  template: `
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
  `,
});
```

```ts
app.component('CustomInput', {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
  template: `
    <input v-model="value">
  `,
});
```

`options.model` on Child component:

```ts
const Child = {
  template: `
    <div>
      <input :value="msg" @input="updateValue" placeholder="edit me">
    </div>
  `,
  props: ['msg'],
  model: {
    prop: 'msg',
    event: 'change',
  },
  methods: {
    updateValue(e) {
      this.$emit('change', e.target.value);
    },
  },
};

const vm = new Vue({
  el: '#app',
  components: {
    Child,
  },
  data() {
    return {
      message: '',
    };
  },
  template: `
    <div>
      <child v-model="message"></child>
      <p>Message is: {{ message }}</p>
    </div>
  `,
});
```

## Components

### Computed Properties

```html
<div id="computed-basics">
  <p>Has published books:</p>
  <span>{{ publishedBooksMessage }}</span>
</div>
```

```ts
Vue.createApp({
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery',
        ],
      },
    };
  },
  computed: {
    // 计算属性的 getter
    publishedBooksMessage() {
      // `this` 指向 vm 实例
      return this.author.books.length > 0 ? 'Yes' : 'No';
    },
    fullName: {
      // getter
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
      // setter
      set(newValue) {
        const names = newValue.split(' ');
        this.firstName = names[0];
        this.lastName = names[names.length - 1];
      },
    },
  },
}).mount('#computed-basics');
```

### Slots

- [Web Slot](https://developers.google.com/web/fundamentals/web-components/shadowdom#slots)
- `name` attribute.
- `fallback` content.
- 插槽基本目的: 自定义组件渲染细节.
- Normal Slots:
  在父组件编译和渲染阶段生成 Slots VNodes,
  数据作用域为父组件实例 (使用插槽的组件).
- Scoped Slots:
  在父组件编译和渲染阶段为 `vnode.data` 添加 `scopedSlots` 对象,
  在子组件编译和渲染阶段生成 Slots VNodes,
  数据作用域为子组件实例 (定义插槽的组件).

#### Fallback Slots

```html
<!-- SubmitButton -->
<button type="submit">
  <slot>Submit</slot>
</button>
```

```html
<SubmitButton></SubmitButton>
```

render to

```html
<button type="submit">Submit</button>
```

```html
<SubmitButton>Save</SubmitButton>
```

render to

```html
<button type="submit">Save</button>
```

#### Named Slots

- `#`: `v-slot` directive shorthand.

```html
<!-- Layout -->
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

```html
<Layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>
  <template v-slot:default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>
  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</Layout>
```

Named slot directive shorthand:

```html
<Layout>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>
  <template>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>
  <template #footer>
    <p>Here's some contact info</p>
  </template>
</Layout>
```

#### Scoped Slots

Pass data from child to parent
(like `Render Props` in React):

```ts
app.component('TodoList', {
  data() {
    return {
      items: ['Feed a cat', 'Buy milk'],
    };
  },
  template: `
    <ul>
      <li v-for="( item, index ) in items">
        <slot :item="item"></slot>
      </li>
    </ul>
  `,
});
```

```html
<TodoList>
  <!-- `default` can be other named slots -->
  <template v-slot:default="slotProps">
    <i class="fas fa-check"></i>
    <span class="green">{{ slotProps.item }}</span>
  </template>
</TodoList>
```

Slot props shorthand
(`default` can be other named slots):

```html
<TodoList v-slot="slotProps">
  <i class="fas fa-check"></i>
  <span class="green">{{ slotProps.item }}</span>
</TodoList>

<TodoList v-slot="{ item }">
  <i class="fas fa-check"></i>
  <span class="green">{{ item }}</span>
</TodoList>

<TodoList v-slot="{ item: todo }">
  <i class="fas fa-check"></i>
  <span class="green">{{ todo }}</span>
</TodoList>

<TodoList v-slot="{ item = 'Placeholder' }">
  <i class="fas fa-check"></i>
  <span class="green">{{ item }}</span>
</TodoList>

<TodoList #default="{ item }">
  <i class="fas fa-check"></i>
  <span class="green">{{ item }}</span>
</TodoList>
```

## Composition API

- [SFC with Script Setup](https://v3.vuejs.org/api/sfc-script-setup.html).

:::tip
Can't access to `this` inside of `setup`,
we cannot directly access `this.$emit` or `this.$route` anymore.
:::

### Setup Method

- Executes before
  `Components`,
  `Props`,
  `Data`,
  `Methods`,
  `Computed` properties,
  `Lifecycle` methods.
- Can't access `this`.
- Can access `props` and `context`:
  - `props`.
  - `context.attrs`.
  - `context.slots`.
  - `context.emit`.
  - `context.expose`.
  - `context.parent`.
  - `context.root`.

```ts
import { ref, toRefs } from 'vue';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  setup(props, { attrs, slots, emit, expose }) {
    const { title } = toRefs(props);

    const count = ref(0);
    const increment = () => ++count.value;

    console.log(title.value);

    return { title, increment };
  },
};
```

### Composition LifeCycle Hooks

- `onBeforeMount`.
- `onMounted`.
- `onBeforeUpdate`.
- `onUpdated`.
- `onBeforeUnmount`.
- `onUnmounted`.
- `onErrorCaptured`.
- `onRenderTracked`.
- `onRenderTriggered`.
- `onActivated`.
- `onDeactivated`.

`beforeCreate` -> `setup` -> `created`:
No need for `onBeforeCreate` and `onCreated` hooks,
just put code in `setup` methods.

### Reactivity

#### Reactive Value

```ts
import { reactive, toRefs } from 'vue';

const book = reactive({
  author: 'Vue Team',
  year: '2020',
  title: 'Vue 3 Guide',
  description: 'You are reading this book right now ;)',
  price: 'free',
});

const { author, title } = toRefs(book);

title.value = 'Vue 3 Detailed Guide';
console.log(book.title); // 'Vue 3 Detailed Guide'
```

#### Computed Value

```ts
const count = ref(1);
const plusOne = computed(() => count.value + 1);

console.log(plusOne.value); // 2

plusOne.value++; // error
```

```ts
const count = ref(1);
const plusOne = computed({
  get: () => count.value + 1,
  set: val => {
    count.value = val - 1;
  },
});

plusOne.value = 1;
console.log(count.value); // 0
```

#### Watch Value

Watch single value:

```ts
// watching a getter
const state = reactive({ count: 0 });
watch(
  () => state.count,
  (count, prevCount) => {
    /* ... */
  }
);

// directly watching a ref
const count = ref(0);
watch(count, (count, prevCount) => {
  /* ... */
});
```

Watch multiple value:

```ts
const firstName = ref('');
const lastName = ref('');

watch([firstName, lastName], (newValues, prevValues) => {
  console.log(newValues, prevValues);
});

firstName.value = 'John'; // logs: ["John", ""] ["", ""]
lastName.value = 'Smith'; // logs: ["John", "Smith"] ["John", ""]
```

Watch reactive value:

```ts
const numbers = reactive([1, 2, 3, 4]);

watch(
  () => [...numbers],
  (numbers, prevNumbers) => {
    console.log(numbers, prevNumbers);
  }
);

numbers.push(5); // logs: [1,2,3,4,5] [1,2,3,4]
```

Watch deep object:

```ts
const state = reactive({
  id: 1,
  attributes: {
    name: '',
  },
});

watch(
  () => state,
  (state, prevState) => {
    console.log('not deep', state.attributes.name, prevState.attributes.name);
  }
);

watch(
  () => state,
  (state, prevState) => {
    console.log('deep', state.attributes.name, prevState.attributes.name);
  },
  { deep: true }
);

state.attributes.name = 'Alex'; // Logs: "deep" "Alex" "Alex"
```

## Animation and Transition

- `v-enter-from`.
- `v-enter-to`: CSS defaults.
- `v-enter-active`.
- `v-leave-from`: CSS defaults.
- `v-leave-to`.
- `v-leave-active`.
- `name`: transition name (different from `v`).
- `mode`:
  - `out-in`: rectify router components transition.
  - `in-out`.

```css
.v-enter-from {
  opacity: 0;
}

@media (prefers-reduced-motion: no-preference) {
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.3s ease-out;
  }
}

.v-leave-to {
  opacity: 0;
}
```

### Fade Transition

```html
<template>
  <div>
    <h1>This is the modal page</h1>
    <button @click="toggleModal">Open</button>
    <transition name="fade" mode="out-in">
      <div v-if="isOpen" class="modal">
        <p><button @click="toggleModal">Close</button></p>
      </div>
    </transition>
  </div>
</template>

<style>
  .fade-enter-from {
    opacity: 0;
  }

  @media (prefers-reduced-motion: no-preference) {
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.5s ease-out;
    }
  }

  .fade-leave-to {
    opacity: 0;
  }
</style>
```

```html
<style>
  @media only screen and (prefers-reduced-motion: no-preference) {
    .enter,
    .leave {
      transition: opacity 0.5s ease-out;
    }
  }

  .before-enter,
  .leave {
    opacity: 0;
  }

  .enter,
  .before-leave {
    opacity: 1;
  }
</style>

<script>
  function enter(el, done) {
    el.classList.add('before-enter');

    setTimeout(() => {
      el.classList.remove('before-enter');
      el.classList.add('enter');
    }, 20);

    setTimeout(() => {
      el.classList.remove('enter');
      done();
    }, 500);
  }

  function leave(el, done) {
    el.classList.add('before-leave');

    setTimeout(() => {
      el.classList.remove('before-leave');
      el.classList.add('leave');
    }, 0);

    setTimeout(() => {
      el.classList.remove('leave');
      done();
    }, 500);
  }
</script>
```

### Slide Transition

```css
.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(10px);
}

@media (prefers-reduced-motion: no-preference) {
  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.2s ease;
  }
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
```

### Transition Group

```html
<template>
  <div>
    <input type="text" v-model="newContact" placeholder="Name" />
    <button @click="addContact">Add Contact</button>
    <button @click="sortContacts">Sort</button>
    <transition-group name="slide-up" tag="ul" appear>
      <li v-for="contact in contacts" :key="contact">{{ contact }}</li>
    </transition-group>
  </div>
</template>
```

```css
.slide-up-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

@media (prefers-reduced-motion: no-preference) {
  .slide-up-enter-active {
    transition: all 0.2s ease;
  }

  .slide-up-move {
    transition: transform 0.8s ease-in;
  }
}
```

### Transition Hooks

`:css="false"` tells Vue don't handle transition classes,
we're relying on JavaScript hooks instead.

When it comes to JavaScript animation library,
transition JavaScript hooks helps a lot.

```html
<transition
  @before-enter="beforeEnter"
  @enter="enter"
  @after-enter="afterEnter"
  @enter-cancelled="enterCancelled"
  @before-leave="beforeLeave"
  @leave="leave"
  @after-leave="afterLeave"
  @leave-cancelled="leaveCancelled"
  :css="false"
>
  <div>Modal</div>
</transition>

<transition-group
  @before-enter="beforeEnter"
  @enter="enter"
  @after-enter="afterEnter"
  @enter-cancelled="enterCancelled"
  @before-leave="beforeLeave"
  @leave="leave"
  @after-leave="afterLeave"
  @leave-cancelled="leaveCancelled"
  :css="false"
>
  >
  <div class="card" v-for="card in cards" :key="card.id">
    <p>{{ card.title }}</p>
  </div>
</transition-group>
```

```ts
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  methods: {
    beforeEnter(el) {},
    enter(el, done) {
      done();
    },
    afterEnter(el) {},
    enterCancelled(el) {},
    beforeLeave(el) {},
    leave(el, done) {
      done();
    },
    afterLeave(el) {},
    leaveCancelled(el) {},
  },
};
```

```html
<template>
  <transition appear @before-enter="beforeEnter" @enter="enter" :css="false">
    <div class="card"></div>
  </transition>
</template>

<script>
  import gsap from 'gsap';

  export default {
    methods: {
      beforeEnter(el) {
        el.style.opacity = 0;
        el.style.transform = 'scale(0, 0)';
      },
      enter(el, done) {
        gsap.to(el, {
          duration: 1,
          opacity: 1,
          scale: 1,
          ease: 'bounce.inOut',
          onComplete: done,
        });
      },
    },
  };
</script>
```

### Transition Internals

#### Transition Component

`platforms/web/runtime/component/transition.js`,
`render` 函数获取一些数据, 并且返回渲染的 VNode:

```ts
const Transition = defineComponent({
  name: 'Transition',
  props: transitionProps,
  abstract: true,

  render(h: Function) {
    // eslint-disable-next-line vue/require-slots-as-functions
    let children: any = this.$slots.default;

    if (!children) {
      return;
    }

    // filter out text nodes (possible white spaces)
    children = children.filter((c: VNode) => c.tag || isAsyncPlaceholder(c));

    if (!children.length) {
      return;
    }

    const mode: string = this.mode;
    const rawChild: VNode = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild;
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    const child: VNode = getRealChild(rawChild);

    if (!child) {
      return rawChild;
    }

    if (this._leaving) {
      return placeholder(h, rawChild);
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    const id = `__transition-${this._uid}-`;
    child.key =
      child.key === null
        ? child.isComment
          ? `${id} comment`
          : id + child.tag
        : isPrimitive(child.key)
        ? String(child.key).indexOf(id) === 0
          ? child.key
          : id + child.key
        : child.key;

    const data: Object = ((child.data || (child.data = {})).transition =
      extractTransitionData(this));
    const oldRawChild: VNode = this._vnode;
    const oldChild: VNode = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (
      child.data.directives &&
      child.data.directives.some(d => d.name === 'show')
    ) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(
        oldChild.componentInstance &&
        oldChild.componentInstance._vnode.isComment
      )
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      const oldData: Object = (oldChild.data.transition = extend({}, data));

      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', () => {
          this._leaving = false;
          this.$forceUpdate();
        });

        return placeholder(h, rawChild);
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild;
        }

        let delayedLeave;
        const performLeave = () => {
          delayedLeave();
        };

        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', leave => {
          delayedLeave = leave;
        });
      }
    }

    return rawChild;
  },
});
```

#### Transition Module

`platforms/web/runtime/modules/transition.js`:

- 自动嗅探目标元素是否应用了 CSS 过渡或动画, 在恰当的时机添加/删除 CSS 类名.
- 过渡组件提供 JavaScript 钩子函数接口, 钩子函数将在恰当的时机被调用.
- 核心逻辑位于 `enter()` 与 `leave()` 函数.

```ts
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  create: _enter,
  activate: _enter,
  remove(vnode: VNode, rm: Function) {
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  },
};

function _enter(_: any, vnode: VNodeWithData) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}
```

#### Transition Group Component

```ts
const TransitionGroup = defineComponent({
  props: extend(
    {
      tag: String,
      moveClass: String,
    },
    transitionProps
  ),

  beforeMount() {
    const update = this._update;
    this._update = (vnode, hydrating) => {
      // force removing pass
      this.__patch__(
        this._vnode,
        this.kept,
        false, // hydrating
        true // removeOnly (!important, avoids unnecessary moves)
      );
      this._vnode = this.kept;
      update.call(this, vnode, hydrating);
    };
  },

  updated() {
    const children: Array<VNode> = this.prevChildren;
    const moveClass: string = this.moveClass || `${this.name || 'v'}-move'`;

    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return;
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach((c: VNode) => {
      if (c.data.moved) {
        const el: any = c.elm;
        const s: any = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(
          transitionEndEvent,
          (el._moveCb = function cb(e) {
            if (!e || /transform$/.test(e.propertyName)) {
              el.removeEventListener(transitionEndEvent, cb);
              el._moveCb = null;
              removeTransitionClass(el, moveClass);
            }
          })
        );
      }
    });
  },

  methods: {
    hasMove(el: any, moveClass: string): boolean {
      if (!hasTransition) {
        return false;
      }

      if (this._hasMove) {
        return this._hasMove;
      }

      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      const clone: HTMLElement = el.cloneNode();

      if (el._transitionClasses) {
        el._transitionClasses.forEach((cls: string) => {
          removeClass(clone, cls);
        });
      }

      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      const info: Object = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform);
    },
  },

  render(h: Function) {
    const tag: string = this.tag || this.$vnode.data.tag || 'span';
    const map: Object = Object.create(null);
    const prevChildren: Array<VNode> = (this.prevChildren = this.children);
    const rawChildren: Array<VNode> = this.$slots.default || [];
    const children: Array<VNode> = (this.children = []);
    const transitionData: Object = extractTransitionData(this);

    for (let i = 0; i < rawChildren.length; i++) {
      const c: VNode = rawChildren[i];

      if (c.tag && c.key != null && String(c.key).indexOf('__vList') !== 0) {
        children.push(c);
        map[c.key] = c;
        (c.data || (c.data = {})).transition = transitionData;
      }
    }

    if (prevChildren) {
      const kept: Array<VNode> = [];
      const removed: Array<VNode> = [];

      for (let i = 0; i < prevChildren.length; i++) {
        const c: VNode = prevChildren[i];
        c.data.transition = transitionData;
        c.data.pos = c.elm.getBoundingClientRect();

        if (map[c.key]) {
          kept.push(c);
        } else {
          removed.push(c);
        }
      }

      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children);
  },
});
```

`Children` 从旧位置按照的缓动时间过渡偏移到当前目标位置,
实现 `Move` 的过渡动画:

```ts
function callPendingCbs(c: VNode) {
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition(c: VNode) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation(c: VNode) {
  const oldPos = c.data.pos;
  const newPos = c.data.newPos;
  const dx = oldPos.left - newPos.left;
  const dy = oldPos.top - newPos.top;

  if (dx || dy) {
    c.data.moved = true;
    const s = c.elm.style;
    s.transform = s.WebkitTransform = `translate(${dx}px,${dy}px)`;
    s.transitionDuration = '0s';
  }
}
```

## Modern Vue

### Suspense

```html
<!-- Events.vue -->
<script setup lang="ts">
  import { getEvents } from '@/services';
  import type { Event } from '@/services';
  const events: Event[] = await getEvents();
</script>
```

```html
<template>
  <suspense>
    <template #default>
      <Events />
    </template>
    <template #fallback>
      <div>Loading events list ...</div>
    </template>
  </suspense>
</template>
```

### Keep Alive

- `include`: `string | RegExp | Array<string>`, 匹配的组件会被缓存.
- `exclude`: `string | RegExp | Array<string>`, 匹配的组件不会被缓存.
- `max`: 缓存大小.
- 组件一旦被 `<keep-alive>` 缓存,
  再次渲染的时候不会执行 `created`/`mounted` 等钩子函数 (`core/vdom/create-component.js`).
  但会执行 `activated`/`deactivated` 钩子函数 (`core/vdom/create-component.js`/`core/instance/lifecycle.js`).

```ts
// core/components/keep-alive.js
const KeepAlive = defineComponent({
  name: 'KeepAlive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number],
  },

  created() {
    this.cache = Object.create(null);
    this.keys = [];
  },

  mounted() {
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name));
    });
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name));
    });
  },

  unmounted() {
    for (const key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  render() {
    // eslint-disable-next-line vue/require-slots-as-functions
    const slot = this.$slots.default;
    const vnode: VNode = getFirstComponentChild(slot);
    const componentOptions: ?VNodeComponentOptions =
      vnode && vnode.componentOptions;

    if (componentOptions) {
      // check pattern
      const name: ?string = getComponentName(componentOptions);
      const { include, exclude } = this;

      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode;
      }

      const { cache, keys } = this;
      const key: ?string =
        vnode.key == null
          ? // same constructor may get registered as different local components
            // so cid alone is not enough (#3269)
            componentOptions.Ctor.cid +
            (componentOptions.tag ? `::${componentOptions.tag}` : '')
          : vnode.key;

      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);

        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }

    return vnode || (slot && slot[0]);
  },
});
```

## Vue Router

- [Composition API Reference](https://next.router.vuejs.org/guide/advanced/composition-api.html)

### Basic Routes

```ts
import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
```

```ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

createApp(App).use(store).use(router).mount('#app');
```

### Dynamic Routes

Two methods to access route `params` in components:

- Composition route API: `const { params } = useRoute()`.
- Passing route props to component: `const props = defineProps<{ id: string }>()`:
  - `props` better testing friendly.
  - `props` better TypeScript types inference.

```html
<template>
  <router-link
    class="event-link"
    :to="{ name: 'EventDetails', params: { id: event.id } }"
  >
    <div class="event-card">
      <span>@{{ event.time }} on {{ event.date }}</span>
      <h4>{{ event.title }}</h4>
    </div>
  </router-link>
</template>
```

:::tip
Can't access to `this` inside of `setup`,
we cannot directly access `this.$router` or `this.$route` anymore.
:::

#### Routes Composition API

```ts
import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import EventDetails from '../views/EventDetails.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/event/:id',
    name: 'EventDetails',
    component: EventDetails,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
```

```html
<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { getEvent } from '@/services';
  import type { Event } from '@/services';

  const { params } = useRoute();
  const event: Event = await getEvent(Number.parseInt(params.id));
</script>
```

#### Passing Routes Props

```ts
import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import EventDetails from '../views/EventDetails.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/event/:id',
    name: 'EventDetails',
    component: EventDetails,
    props: true /* Passing route props to component */,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
```

```html
<script setup lang="ts">
  import { getEvent } from '@/services';
  import type { Event } from '@/services';

  const props = defineProps<{ id: string }>();
  const event: Event = await getEvent(Number.parseInt(props.id));
</script>
```

### Named Routes

```ts
const routes = [
  {
    path: '/user/:username',
    name: 'User',
    component: User,
  },
];
```

```html
<router-link :to="{ name: 'User', params: { username: 'sabertaz' }}">
  User
</router-link>
```

```ts
router.push({ name: 'User', params: { username: 'sabertaz' } });
```

### Nested Routes

```ts
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'board',
    component: Board,
    children: [
      {
        path: 'task/:id',
        name: 'task',
        component: Task,
        props: true,
      },
    ],
  },
];
```

```html
<!-- App.vue -->
<!-- Root router view -->
<template><router-view /></template>
```

```html
<!-- Board.vue -->
<!-- Nested router view -->
<template>
  <div>Board View</div>
  <router-view />
</template>
```

```html
<!-- Task.vue -->
<script setup lang="ts">
  defineProps<{ id: string }>();
</script>

<template>
  <div>Task View {{ id }}</div>
</template>
```

### Programmatic Routes Navigation

```ts
import { useRouter } from 'vue-router';

function App() {
  const router = useRouter();
}
```

#### Navigate to Different Location

```ts
const username = 'eduardo';
// we can manually build the url but we will have to handle the encoding ourselves
router.push(`/user/${username}`); // -> /user/eduardo
// same as
router.push({ path: `/user/${username}` }); // -> /user/eduardo
// if possible use `name` and `params` to benefit from automatic URL encoding
router.push({ name: 'user', params: { username } }); // -> /user/eduardo
// `params` cannot be used alongside `path`
router.push({ path: '/user', params: { username } }); // -> /user
```

```ts
// literal string path
router.push('/users/eduardo');

// object with path
router.push({ path: '/users/eduardo' });

// named route with params to let the router build the url
router.push({ name: 'user', params: { username: 'eduardo' } });

// with query, resulting in /register?plan=private
router.push({ path: '/register', query: { plan: 'private' } });

// with hash, resulting in /about#team
router.push({ path: '/about', hash: '#team' });
```

#### Replace Current Location

```ts
// replace current location
router.push({ path: '/home', replace: true });
// equivalent to
router.replace({ path: '/home' });
```

#### Traverse Routes History

```ts
// go forward by one record, the same as router.forward()
router.go(1);

// go back by one record, the same as router.back()
router.go(-1);

// go forward by 3 records
router.go(3);

// fails silently if there aren't that many records
router.go(-100);
router.go(100);
```

### Navigation Guard Routes

#### Guard Routes Configuration

```ts
const routes = [
  {
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: (to, from) => {
      // reject the navigation
      return false;
    },
  },
];
```

:::caution
`beforeEnter` guards only trigger when entering the route,
don't trigger when the params, query or hash change.

Going from `/users/2` to `/users/3` or going from `/users/2#info` to `/users/2#projects`
don't trigger `beforeEnter` guards.
:::

#### Global Navigation Guards

```ts
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' });
  else next();
});
```

```ts
router.beforeResolve(async to => {
  if (to.meta.requiresCamera) {
    try {
      await askForCameraPermission();
    } catch (error) {
      if (error instanceof NotAllowedError) {
        // Handle the error and then cancel the navigation.
        return false;
      } else {
        // Unexpected error: cancel the navigation and pass error to global handler.
        throw error;
      }
    }
  }
});
```

```ts
router.afterEach((to, from, failure) => {
  if (!failure) sendToAnalytics(to.fullPath);
});
```

#### Full Navigation Resolution Flow

- Navigation triggered.
- Call `beforeRouteLeave` guards in deactivated components.
- Call global `beforeEach` guards.
- Call `beforeRouteUpdate` guards in reused components.
- Call `beforeEnter` in route configs.
- Resolve async route components.
- Call `beforeRouteEnter` in activated components.
- Call global `beforeResolve` guards.
- Navigation is confirmed.
- Call global `afterEach` hooks.
- DOM updates triggered.
- Call `next` callbacks in `beforeRouteEnter` guards with instantiated instances.

## Vuex

### Vuex Types

- Vuex types [guide](https://dev.to/3vilarthas/vuex-typescript-m4j).

```ts
// store.ts
import type { InjectionKey } from 'vue';
import type { Store } from 'vuex';
import { createStore, useStore } from 'vuex';

// define your typings for the store state
interface State {
  count: number;
}

// define injection key
const key: InjectionKey<Store<State>> = Symbol('key');

const store = createStore<State>({
  state: {
    count: 0,
  },
});

const useAppStore = () => useStore<State>(key);

export { key, useAppStore };
export type { State };
export default store;
```

```ts
// main.ts
import { createApp } from 'vue';
import store, { key } from './store';

const app = createApp({});

// pass the injection key
app.use(store, key);

app.mount('#app');
```

```ts
// in a vue component
import { useAppStore } from './store';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  setup() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const store = useAppStore();
    const count = store.state.count; // typed as number
  },
};
```

## Vite

### Basic Configuration

```ts
import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: '/awesome-web/vue-trello/',
  plugins: [vue()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
});
```

### Environment Variables and Modes

- `import.meta.env.MODE`: {string} running mode.
- `import.meta.env.BASE_URL`: {string} vite `base` url.
- `import.meta.env.PROD`: {boolean} whether in production.
- `import.meta.env.DEV`: {boolean} whether in development.

```ts
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
```

```ts
interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_APP_TITLE: string;
  // More environment variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

```bash
.env                # Loaded in all cases.
.env.local          # Loaded in all cases, ignored by git.
.env.[mode]         # Only loaded in specified mode.
.env.[mode].local   # Only loaded in specified mode, ignored by git.
```

## Vue CLI

### SCSS Configuration

[Build with Bulma](https://css-tricks.com/how-to-increase-your-page-size-by-1500-with-webpack-and-vue):

Every element and every style for this scoped styled component
will have a `data-v-2929` on them at runtime.
If import a Sass file into component that has actual styles in it,
Vue (via webpack) will pull in those styles and
"namespace" them with that dynamic `data-` attribute.
The result is that is include `Bulma` in your **many** times
with a bunch of `data-v` weirdness in front of it.

```css
/* bulma-custom.scss */
@import './variables.scss';

/* UTILITIES */
@import 'bulma/sass/utilities/animations.sass';
@import 'bulma/sass/utilities/controls.sass';
@import 'bulma/sass/utilities/mixins.sass';

/* etc... */
```

```css
/* site.scss */
@import 'https://use.fontawesome.com/releases/v5.6.3/css/all.css';
@import './bulma-custom.scss';

html,
body {
  height: 100%;
  background-color: #f9fafc;
}

/* etc... */
```

```ts
// main.js
import Vue from 'vue';
import App from './App.vue';
import router from './router';

// import styles
import '@/styles/site.scss';
```

```ts
// webpack.config.js
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/variables.scss";`,
      },
    },
  },
};
```

## Vue Best Practice

When it comes to Vue 3,
Evan You [recommended](https://github.com/vuejs/rfcs/discussions/378):

- Use SFC + `<script setup>` + Composition API (drop Options API).
- Use VSCode + [Volar](https://github.com/johnsoncodehk/volar).
- Not strictly required for TS, but if applicable, use Vite for build tooling.

:::tip Composition API vs Options API

Original intention for supporting both APIs:
existing Options-API-based codebases can benefit from Composition API-based libraries,
It's not for new codebases to mix Composition API and Options API.

Intentionally mixing Composition API and Options API
should be avoided except in existing Options API codebases,
to either replace mixins or leverage a Composition API-based library.

:::
