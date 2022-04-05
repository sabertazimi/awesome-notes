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
```

```css
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

```ts
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
@import url('https://use.fontawesome.com/releases/v5.6.3/css/all.css');
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

## Legacy Vue Internals

### Vue Constructor

`core/instance/index.js`:

```ts
// 从五个文件导入五个方法（不包括 warn）
import { warn } from '../util/index';
import { initMixin } from './init';
import { stateMixin } from './state';
import { renderMixin } from './render';
import { eventsMixin } from './events';
import { lifecycleMixin } from './lifecycle';

// 定义 Vue 构造函数
function Vue(options) {
  if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

// 将 Vue 作为参数传递给导入的五个方法
initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

// 导出 Vue
export default Vue;
```

`core/instance/init.js`:

```ts
// initMixin(Vue)
Vue.prototype._init = function (options?: Object) {};
```

`core/instance/state.js`:

```ts
// stateMixin(Vue)
Vue.prototype.$data = data;
Vue.prototype.$props = props;
Vue.prototype.$set = set;
Vue.prototype.$delete = del;
Vue.prototype.$watch = function (
  expOrFn: string | Function,
  cb: any,
  options?: Object
): Function {};
```

`core/instance/events.js`:

```ts
// eventsMixin(Vue)
Vue.prototype.$on = function (
  event: string | Array<string>,
  fn: Function
): Component {};
Vue.prototype.$once = function (event: string, fn: Function): Component {};
Vue.prototype.$off = function (
  event?: string | Array<string>,
  fn?: Function
): Component {};
Vue.prototype.$emit = function (event: string): Component {};
```

`core/instance/lifecycle.js`:

```ts
// lifecycleMixin(Vue)
Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {};
Vue.prototype.$forceUpdate = function () {};
Vue.prototype.$destroy = function () {};
```

`core/instance/render.js`:

```ts
export function initRender(vm: Component) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  const options = vm.$options;
  const parentVnode = (vm.$vnode = options._parentVnode);
  const renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false);
  vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true);
  const parentData = parentVnode && parentVnode.data;
}

export function renderMixin(Vue: Class<Component>) {
  installRenderHelpers(Vue.prototype);
  Vue.prototype.$nextTick = function (fn: Function) {
    return nextTick(fn, this);
  };
  Vue.prototype._render = function (): VNode {};
}
```

`core/instance/render-helpers/index.js`:

```ts
export function installRenderHelpers(target: any) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}
```

### Vue Prototype

`core/index.js`:

```ts
import { FunctionalRenderContext } from 'core/vdom/create-functional-component';
import { isServerRendering } from 'core/util/env';
import Vue from './instance/index';
import { initGlobalAPI } from './global-api/index';

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering,
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get() {
    return this.$vnode && this.$vnode.ssrContext;
  },
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext,
});

Vue.version = '__VERSION__';

export default Vue;
```

`runtime/index.js`:

```ts
import Vue from 'core/index';
import config from 'core/config';
import { extend, noop } from 'shared/util';
import { mountComponent } from 'core/instance/lifecycle';
import { devtools, inBrowser, isChrome } from 'core/util/index';

import {
  getTagNamespace,
  isReservedAttr,
  isReservedTag,
  isUnknownElement,
  mustUseProp,
  query,
} from 'web/util/index';

import { patch } from './patch';
import platformDirectives from './directives/index';
import platformComponents from './components/index';

// Install platform specific utils.
Vue.config.mustUseProp = mustUseProp;
Vue.config.isReservedTag = isReservedTag;
Vue.config.isReservedAttr = isReservedAttr;
Vue.config.getTagNamespace = getTagNamespace;
Vue.config.isUnknownElement = isUnknownElement;

// Install platform runtime directives & components.
extend(Vue.options.directives, platformDirectives);
extend(Vue.options.components, platformComponents);

// Install platform patch function.
Vue.prototype.__patch__ = inBrowser ? patch : noop;

// Public mount method.
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating);
};

export default Vue;
```

`platforms/web/entry-runtime-with-compiler.js` 重写 `Vue.prototype.$mount` 方法:

```ts
import config from 'core/config';
import { cached } from 'core/util/index';

import Vue from './runtime/index';
import { compileToFunctions } from './compiler/index';
import {
  shouldDecodeNewlines,
  shouldDecodeNewlinesForHref,
} from './util/compat';
import { query } from './util/index';

const mount = Vue.prototype.$mount;

const idToTemplate = cached(id => {
  const el = query(id);
  return el && el.innerHTML;
});

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
const getOuterHTML = (el: Element): string => {
  if (el.outerHTML) {
    return el.outerHTML;
  } else {
    const container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML;
  }
};

Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el);

  if (el === document.body || el === document.documentElement) {
    process.env.NODE_ENV !== 'production' &&
      warn(
        `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
      );
    return this;
  }

  const options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    let template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              `Template element not found or is empty: ${options.template}`,
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn(`invalid template option: ${template}`, this);
        }

        return this;
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      const { render, staticRenderFns } = compileToFunctions(
        template,
        {
          shouldDecodeNewlines,
          shouldDecodeNewlinesForHref,
          delimiters: options.delimiters,
          comments: options.comments,
        },
        this
      );
      options.render = render;
      options.staticRenderFns = staticRenderFns;
    }
  }

  return mount.call(this, el, hydrating);
};

Vue.compile = compileToFunctions;

export default Vue;
```

### Vue Global API

`core/global-api/index.js` 添加 `Vue.XXX` 静态方法:

```ts
// initGlobalAPI
Vue.config = config;
Vue.util = {
  warn,
  extend,
  mergeOptions,
  defineReactive,
};
Vue.set = set;
Vue.delete = del;
Vue.nextTick = nextTick;
Vue.options = {
  components: {
    KeepAlive,
    // Transition 和 TransitionGroup 组件在 runtime/index.js 文件中被添加
    // Transition,
    // TransitionGroup
  },
  directives: Object.create(null),
  // 在 runtime/index.js 文件中, 为 directives 添加了两个平台化的指令 model 和 show
  // directives:{
  // model,
  // show
  // },
  filters: Object.create(null),
  _base: Vue,
};

// initUse: global-api/use.js
Vue.use = function (plugin: Function | Object) {};

// initMixin: global-api/mixin.js
Vue.mixin = function (mixin: Object) {};

// initExtend: global-api/extend.js
Vue.cid = 0;
Vue.extend = function (extendOptions: Object): Function {};

// initAssetRegisters: global-api/assets.js
Vue.component =
  Vue.directive =
  Vue.filter =
    function (
      id: string,
      definition: Function | Object
    ): Function | Object | void {};

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext,
});

Vue.version = '__VERSION__';

// entry-runtime-with-compiler.js
Vue.compile = compileToFunctions;
```

#### Vue Global Extend API

`core/global-api/extend.js`:

- `Vue.extend`/`vm.$options._base.extend` will return brand new `Vue` constructor.

```ts
/**
 * Class inheritance
 */
Vue.extend = function (extendOptions: Object): Function {
  extendOptions = extendOptions || {};
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const Super = this;
  const SuperId = Super.cid;
  const cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});

  if (cachedCtors[SuperId]) {
    return cachedCtors[SuperId];
  }

  const name = extendOptions.name || Super.options.name;
  const Sub = function VueComponent(options) {
    this._init(options);
  };

  Sub.prototype = Object.create(Super.prototype);
  Sub.prototype.constructor = Sub;
  Sub.cid = cid++;
  Sub.options = mergeOptions(Super.options, extendOptions);
  Sub.super = Super;

  // For props and computed properties, we define the proxy getters on
  // the Vue instances at extension time, on the extended prototype. This
  // avoids Object.defineProperty calls for each instance created.
  if (Sub.options.props) {
    initProps(Sub);
  }

  if (Sub.options.computed) {
    initComputed(Sub);
  }

  // allow further extension/mixin/plugin usage
  Sub.extend = Super.extend;
  Sub.mixin = Super.mixin;
  Sub.use = Super.use;

  // create asset registers, so extended classes
  // can have their private assets too.
  ASSET_TYPES.forEach(function (type) {
    Sub[type] = Super[type];
  });

  // enable recursive self-lookup
  if (name) {
    Sub.options.components[name] = Sub;
  }

  // keep a reference to the super options at extension time.
  // later at instantiation we can check if Super's options have
  // been updated.
  Sub.superOptions = Super.options;
  Sub.extendOptions = extendOptions;
  Sub.sealedOptions = extend({}, Sub.options);

  // cache constructor
  cachedCtors[SuperId] = Sub;
  return Sub;
};
```

#### Vue Global NextTick API

`core/util/next-tick.js`:

```ts
import { noop } from 'shared/util';
import { handleError } from './error';
import { isIOS, isNative } from './env';

const callbacks = [];
let pending = false;

function flushCallbacks() {
  pending = false;
  const copies = callbacks.slice(0);
  callbacks.length = 0;

  for (let i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

let microTimerFunc;
let macroTimerFunc;
let useMacroTask = false;

// setImmediate -> MessageChannel -> setTimeout.
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = () => {
    setImmediate(flushCallbacks);
  };
} else if (
  typeof MessageChannel !== 'undefined' &&
  (isNative(MessageChannel) ||
    // PhantomJS
    MessageChannel.toString() === '[object MessageChannelConstructor]')
) {
  const channel = new MessageChannel();
  const port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = () => {
    port.postMessage(1);
  };
} else {
  macroTimerFunc = () => {
    setTimeout(flushCallbacks, 0);
  };
}

// Promise.then -> Macro Timer.
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve();
  microTimerFunc = () => {
    p.then(flushCallbacks);
    if (isIOS) setTimeout(noop);
  };
} else {
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a (macro) task instead of a micro task.
 */
export function withMacroTask(fn: Function): Function {
  return (
    fn._withTask ||
    (fn._withTask = function (...args) {
      useMacroTask = true;
      const res = fn(...args);
      useMacroTask = false;
      return res;
    })
  );
}

export function nextTick(cb?: Function, ctx?: Object) {
  let _resolve;

  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });

  if (!pending) {
    pending = true;

    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }

  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve;
    });
  }
}
```

### Vue Instance

```ts
// Vue.prototype._init: core/instance/init.js
// eslint-disable-next-line @typescript-eslint/no-this-alias
const vm: Component = this;
```

```ts
// Vue.prototype._init: core/instance/init.js
vm._uid = uid++; // 每个Vue实例都拥有一个唯一的 id
vm._isVue = true; // 这个表示用于避免Vue实例对象被观测(observed)
vm.$options = options; // 当前 Vue 实例的初始化选项, 注意: 这是经过 mergeOptions() 后的
vm._renderProxy = vm; // 渲染函数作用域代理
vm._self = vm; // 实例本身

// initLifecycle(vm): core/instance/lifecycle.js
vm.$parent = vmParent;
vm.$root = vmParent ? vmParent.$root : vm;

vm.$children = [];
vm.$refs = {};

vm._watcher = null;
vm._inactive = null;
vm._directInactive = false;
vm._isMounted = false;
vm._isDestroyed = false;
vm._isBeingDestroyed = false;

// initEvents(vm): core/instance/events.js
vm._events = Object.create(null);
vm._hasHookEvent = false;

// initRender(vm): core/instance/render.js
vm._vnode = null; // the root of the child tree
vm._staticTrees = null; // v-once cached trees

vm.$vnode = vnode;
vm.$slots = slots;
vm.$scopedSlots = scopedSlots;

vm._c = c;
vm.$createElement = createElement;

vm.$attrs = attrs;
vm.$listeners = listeners;

// initState(vm): core/instance/state.js
vm._watchers = [];
vm._data = data;

// mountComponent(): core/instance/lifecycle.js
vm.$el = el;

// initComputed(): core/instance/state.js
vm._computedWatchers = Object.create(null);

// initProps(): core/instance/state.js
vm._props = {};

// initProvide(): core/instance/inject.js
vm._provided = provided;
```

### Vue Mounting Workflow

`new Vue()` -> 初始化 -> 编译 -> 渲染 -> 挂载 -> 更新:

- `new Vue()`.
- `Vue.prototype._init`.
- `Vue.prototype.$mount`.
- `vm.$options.render = compileToFunctions(vm.$options.template)`:
  - `vue-loader` for static transform:
    `.vue` -> `.js` in build time.
  - `compileToFunctions` for runtime transform:
    bundle `compiler` and `runtime` into `vue.js`.
- `mountComponent(vm, el)`.
- `Vue.prototype._render`.
- `VDOM.createElement(vm)`:
  - Normalize children.
  - Create VNode and install hooks.
  - Create children recursively.
- `Vue.prototype._update`.
- `Vue.prototype.__patch__` (`platforms/web/runtime/patch.js`):
  - `backend.nodeOps` (`platforms/web/runtime/node-ops`).
    - `createElement`.
    - `createElementNS`.
    - `createTextNode`.
    - `createComment`.
    - `insertBefore`.
    - `appendChild`.
    - `removeChild`.
    - `parentNode`.
    - `nextSibling`.
    - `tagName`.
    - `setTextContent`.
    - `setStyleScope`.
  - `backend.hooksModules` (`core/vdom/modules` + `platforms/web/runtime/modules`):
    - `create`.
    - `activate`.
    - `update`.
    - `remove`.
    - `destroy`.

```ts
const app = new Vue({ el: '#app', ...restOptionsAPI });
vm._init(...restOptionsAPI);
if (vm.$options.el) vm.$mount(vm.$options.el);
vm.$options.render = compileToFunctions(vm.$options.template);
mountComponent(vm, el);
```

`core/instance/init.js`:

- 合并配置.
- 初始化生命周期.
- 初始化事件中心.
- 初始化渲染.
- 初始化 data/props/computed/watcher.

```ts
// initMixin(Vue)
Vue.prototype._init = function (options?: Object) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const vm: Component = this;

  // uid
  vm._uid = uid++;

  // a flag to avoid this being observed
  vm._isVue = true;

  // merge options
  if (options && options._isComponent) {
    initInternalComponent(vm, options);
  } else {
    vm.$options = mergeOptions(
      resolveConstructorOptions(vm.constructor),
      options || {},
      vm
    );
  }

  vm._renderProxy = vm;

  // expose real self
  vm._self = vm;
  initLifecycle(vm);
  initEvents(vm);
  initRender(vm);
  callHook(vm, 'beforeCreate');
  initInjections(vm); // resolve injections before data/props
  initState(vm);
  initProvide(vm); // resolve provide after data/props
  callHook(vm, 'created');

  if (vm.$options.el) {
    vm.$mount(vm.$options.el);
  }
};
```

`core/instance/lifecycle.js`:

```ts
export function mountComponent(
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  vm.$el = el;

  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
  }

  callHook(vm, 'beforeMount');

  const updateComponent = () => {
    vm._update(vm._render(), hydrating);
  };

  // eslint-disable-next-line no-new
  new Watcher(
    vm,
    updateComponent,
    noop,
    {
      before() {
        if (vm._isMounted) {
          callHook(vm, 'beforeUpdate');
        }
      },
    },
    true /* isRenderWatcher */
  );

  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  // vm.$vnode 表示 Vue 实例的父虚拟 Node.
  if (vm.$vnode == null) {
    // Only `new Vue()` trigger this:
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }

  return vm;
}
```

`core/instance/render.js`:

```ts
Vue.prototype._render = function (): VNode {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const vm: Component = this;
  const { render, _parentVnode } = vm.$options;

  if (_parentVnode) {
    vm.$scopedSlots = _parentVnode.data.scopedSlots || emptyObject;
  }

  // set parent vnode. this allows render functions to have access
  // to the data on the placeholder node.
  vm.$vnode = _parentVnode;

  // render self
  const vnode = render.call(vm._renderProxy, vm.$createElement);

  // return empty vnode in case the render function errored out
  if (!(vnode instanceof VNode)) {
    vnode = createEmptyVNode();
  }

  // set parent
  vnode.parent = _parentVnode;
  return vnode;
};
```

`core/vdom/create-element.js`:

- Normalize children: transform children to `Array<VNode>`.
- Create VNode:
  - `new VNode(tag, data, children, vm)` for native host elements (e.g `<div>`).
  - `createComponent(tag, data, children, vm)` for custom components:
    - `resolveConstructorOptions`: merge and resolve options API.
    - `installComponentHooks`:
      - Install internal (`core/vdom/create-component.js/componentVNodeHooks`) hooks.
      - Merge user-defined VNode hooks.
    - `new VNode(`vue-component-${Ctor.options.name}`, data, undefined, vm)`.
    - Component VNode children is `undefined`.
- `vm._vnode.parent === vm.$vnode`.
- 组件 patch 过程中 DOM 的插入顺序为**先子后父**:
  `createComponent(vnode)` 中会调用内部钩子函数 `init(vnode)`,
  `init(vnode)` 函数会创建子组件 `VNode`, 并调用 `child.$mount(vnode.elm)`,
  递归式地创建子组件.

```ts
export function createElement(
  context: Component,
  tag: any,
  data: any,
  children: any,
  normalizationType: any,
  alwaysNormalize: boolean
): VNode | Array<VNode> {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }

  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }

  return _createElement(context, tag, data, children, normalizationType);
}

export function _createElement(
  context: Component,
  tag?: string | Class<Component> | Function | Object,
  data?: VNodeData,
  children?: any,
  normalizationType?: number
): VNode | Array<VNode> {
  if (isDef(data) && isDef(data.__ob__)) {
    return createEmptyVNode();
  }

  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }

  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode();
  }

  // support single function children as default scoped slot
  if (Array.isArray(children) && typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }

  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }

  let vnode;
  let ns;

  if (typeof tag === 'string') {
    let Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);

    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag),
        data,
        children,
        undefined,
        undefined,
        context
      );
    } else if (
      (!data || !data.pre) &&
      // eslint-disable-next-line no-cond-assign
      isDef((Ctor = resolveAsset(context.$options, 'components', tag)))
    ) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(tag, data, children, undefined, undefined, context);
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }

  if (Array.isArray(vnode)) {
    return vnode;
  } else if (isDef(vnode)) {
    if (isDef(ns)) applyNS(vnode, ns);
    if (isDef(data)) registerDeepBindings(data);
    return vnode;
  } else {
    return createEmptyVNode();
  }
}
```

`core/instance/lifecycle.js`:

```ts
Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const vm: Component = this;
  const prevEl = vm.$el;
  const prevVnode = vm._vnode;
  const restoreActiveInstance = setActiveInstance(vm);
  vm._vnode = vnode;

  // Vue.prototype.__patch__ is injected in entry points
  // based on the rendering backend used.
  if (!prevVnode) {
    // initial render
    vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
  } else {
    // updates
    vm.$el = vm.__patch__(prevVnode, vnode);
  }

  restoreActiveInstance();

  // update __vue__ reference
  if (prevEl) {
    prevEl.__vue__ = null;
  }

  if (vm.$el) {
    vm.$el.__vue__ = vm;
  }

  // if parent is an HOC, update its $el as well
  if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
    vm.$parent.$el = vm.$el;
  }

  // updated hook is called by the scheduler
  // to ensure that children are updated in a parent's updated hook.
};
```

### Vue Options API

`core/instance/init.js`:

```ts
vm.$options = mergeOptions(
  // resolveConstructorOptions(vm.constructor)
  {
    components: {
      KeepAlive,
      Transition,
      TransitionGroup,
    },
    directives: {
      model,
      show,
    },
    filters: Object.create(null),
    _base: Vue,
  },
  // options || {}
  {
    el: '#app',
    data: {
      test: 1,
    },
  },
  vm
);
```

Parent component options:

```ts
vm.$options = {
  components: {
    KeepAlive,
    Transition,
    TransitionGroup,
    ...UserRegisterComponents,
  },
  created: [
    function created() {
      console.log('parent created');
    },
  ],
  directives: {
    model,
    show,
    ...userCustomDirectives,
  },
  filters: {},
  _base: function Vue(options) {},
  el: '#app',
  render: function _render(h) {},
};
```

Children component options:

```ts
vm.$options = {
  parent: Vue /* 父Vue实例 */,
  propsData: undefined,
  _componentTag: undefined,
  _parentVnode: VNode /* 父VNode实例 */,
  _renderChildren: undefined,
  __proto__: {
    components: {
      KeepAlive,
      Transition,
      TransitionGroup,
      ...UserRegisterComponents,
    },
    directives: {
      model,
      show,
      ...userCustomDirectives,
    },
    filters: {},
    _base: function Vue(options) {},
    _Ctor: {},
    created: [
      function created() {
        console.log('parent created');
      },
      function created() {
        console.log('child created');
      },
    ],
    mounted: [
      function mounted() {
        console.log('child mounted');
      },
    ],
    data() {
      return {
        msg: 'Hello Vue',
      };
    },
    template: '<div>{{msg}}</div>',
  },
};
```

- `core/instance/state.js/initProps()`: `this.XXX` -> `this._props.XXX`.
- `core/instance/state.js/initData()`: `this.XXX` -> `this._data.XXX`.

#### Vue Merge Options

`mergeOptions` (`core/util/options.js`):

- 对于 `el`/`propsData` 选项使用默认的合并策略 `defaultStrategy`.
- 对于 `data` 选项, 使用 `mergeDataOrFn` 函数进行处理, 最终结果是 `data` 选项将变成一个函数, 且该函数的执行结果为真正的数据对象.
- 对于 生命周期钩子 选项, 将合并成数组, 使得父子选项中的钩子函数都能够被执行.
- 对于 `directives`/`filters` 以及 `components` 等资源选项,
  父子选项将以原型链的形式被处理, 正是因为这样我们才能够在任何地方都使用内置组件或指令等.
- 对于 `watch` 选项的合并处理, 类似于生命周期钩子, 如果父子选项都有相同的观测字段, 将被合并为数组, 这样观察者都将被执行.
- 对于 `props`/`methods`/`inject`/`computed` 选项, 父选项始终可用, 但是子选项会覆盖同名的父选项字段.
- 对于 `provide` 选项, 其合并策略使用与 `data` 选项相同的 `mergeDataOrFn` 函数.
- 最后, 以上没有提及到的选项都将使默认选项 `defaultStrategy`.
- 最最后, 默认合并策略函数 `defaultStrategy` 的策略是: 只要子选项不是 `undefined` 就使用子选项, 否则使用父选项.

```ts
/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
export function mergeOptions(
  parent: Object,
  child: Object,
  vm?: Component
): Object {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  const extendsFrom = child.extends;

  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }

  if (child.mixins) {
    for (let i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }

  const options = {};
  let key;

  for (key in parent) {
    mergeField(key);
  }

  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }

  function mergeField(key) {
    const strategy = strategies[key] || defaultStrategy;
    options[key] = strategy(parent[key], child[key], vm, key);
  }

  return options;
}
```

#### Vue Normalize Options

Props:

```ts
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  props: {
    someData1: {
      type: Number,
    },
    someData2: {
      type: String,
      default: '',
    },
  },
};
```

Injects:

```ts
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  inject: {
    data1: { from: 'data1' },
    d2: { from: 'data2' },
    data3: { from: 'data3', someProperty: 'someValue' },
  },
};
```

Directives:

```ts
for (const key in dirs) {
  const def = dirs[key];
  if (typeof def === 'function') {
    dirs[key] = { bind: def, update: def };
  }
}
```

### Vue Lifecycle

[![Lifecycle](./figures/lifecycle.png)](https://v2.vuejs.org/v2/api/#Options-Lifecycle-Hooks)

`callHook` in `core/instance/lifecycle.js`:

```ts
export function callHook(vm: Component, hook: string) {
  pushTarget();
  const handlers = vm.$options[hook];

  if (handlers) {
    for (let i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, `${hook} hook`);
      }
    }
  }

  if (vm._hasHookEvent) {
    vm.$emit(`hook:${hook}`);
  }

  popTarget();
}
```

`beforeCreate`/`created` in `core/instance/init.js`:

- `beforeCreate` 不能访问 `props`/`data`/`methods`.
- `created` 可以访问 `props`/`data`/`methods`.
- `beforeCreate`/`created` 不能访问 DOM.

```ts
Vue.prototype._init = function (options?: Object) {
  // ...
  initLifecycle(vm);
  initEvents(vm);
  initRender(vm);
  callHook(vm, 'beforeCreate');
  initInjections(vm);
  initState(vm); // props/data/methods/watch/computed.
  initProvide(vm);
  callHook(vm, 'created');
  // ...
};
```

`beforeMount`/`beforeUpdate` in `core/instance/lifecycle.js`:

```ts
export function mountComponent(
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  vm.$el = el;
  // ...
  callHook(vm, 'beforeMount');

  const updateComponent = () => {
    vm._update(vm._render(), hydrating);
  };

  // eslint-disable-next-line no-new
  new Watcher(
    vm,
    updateComponent,
    noop,
    {
      before() {
        if (vm._isMounted) {
          callHook(vm, 'beforeUpdate');
        }
      },
    },
    true /* isRenderWatcher */
  );

  hydrating = false;

  if (vm.$vnode == null) {
    // Only `new Vue()` trigger this:
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }

  return vm;
}
```

`mounted` in `core/vdom/patch.js`/`core/vdom/create-component.js`:

- 对于同步渲染的子组件, `mounted` 执行顺序为**先子后父**.

```ts
// core/vdom/patch.js:
function invokeInsertHook(vnode, queue, initial) {
  // delay insert hooks for component root nodes, invoke them after the
  // element is really inserted
  if (isTrue(initial) && isDef(vnode.parent)) {
    vnode.parent.data.pendingInsert = queue;
  } else {
    for (let i = 0; i < queue.length; ++i) {
      queue[i].data.hook.insert(queue[i]);
    }
  }
}

// core/vdom/create-component.js:
const componentVNodeHooks = {
  // ...
  insert(vnode: MountedComponentVNode) {
    const { context, componentInstance } = vnode;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    // ...
  },
};
```

`update` in `core/observer/scheduler.js`:

- `RenderWatcher`.

```ts
function flushSchedulerQueue() {
  // ...
  // 获取到 updatedQueue
  callUpdatedHooks(updatedQueue);
}

function callUpdatedHooks(queue) {
  let i = queue.length;

  while (i--) {
    const watcher = queue[i];
    const vm = watcher.vm;

    // Peek up `RenderWatcher`
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}
```

`beforeDestroy`/`destroyed` in `core/instance/lifecycle.js`:

- 调用 `beforeDestroy` 钩子函数.
- 从 `parent` 的 `$children` 中删掉自身.
- 删除 `watcher`.
- 当前渲染的 VNode 执行销毁钩子函数.
- 调用 `destroyed` 钩子函数.
- 在 `$destroy` 的执行过程中,
  会执行 `vm.__patch__(vm._vnode, null)` 触发子组件的销毁钩子函数 (递归),
  `destroyed` 钩子函数执行顺序为**先子后父**.

```ts
Vue.prototype.$destroy = function () {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const vm: Component = this;

  if (vm._isBeingDestroyed) {
    return;
  }

  callHook(vm, 'beforeDestroy');
  vm._isBeingDestroyed = true;

  // remove self from parent
  const parent = vm.$parent;

  if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
    remove(parent.$children, vm);
  }

  // teardown watchers
  if (vm._watcher) {
    vm._watcher.teardown();
  }

  let i = vm._watchers.length;

  while (i--) {
    vm._watchers[i].teardown();
  }

  // remove reference from data ob
  // frozen object may not have observer.
  if (vm._data.__ob__) {
    vm._data.__ob__.vmCount--;
  }

  // call the last hook...
  vm._isDestroyed = true;
  // invoke destroy hooks on current rendered tree
  vm.__patch__(vm._vnode, null);
  // fire destroyed hook
  callHook(vm, 'destroyed');
  // turn off all instance listeners.
  vm.$off();

  // GC: remove __vue__ reference
  if (vm.$el) {
    vm.$el.__vue__ = null;
  }

  // GC: release circular reference (#6759)
  if (vm.$vnode) {
    vm.$vnode.parent = null;
  }
};
```

### Vue Async Component

```ts
// 1. Basic async component:
Vue.component('AsyncExample', function (resolve, reject) {
  // 这个特殊的 require 语法告诉 webpack
  // 自动将编译后的代码分割成不同的块,
  // 这些块将通过 Ajax 请求自动下载.
  require(['./my-async-component'], resolve);
});

// 2. Promise async component:
Vue.component(
  'AsyncWebpackExample',
  // 该 `import` 函数返回一个 `Promise` 对象.
  () => import('./my-async-component')
);

// 3. Advanced async component:
const AsyncComp = () => ({
  // 需要加载的组件, 应当是一个 Promise.
  component: import('./MyComp.vue'),
  // 加载中应当渲染的组件.
  loading: LoadingComp,
  // 出错时渲染的组件.
  error: ErrorComp,
  // 渲染加载中组件前的等待时间, 默认: 200ms.
  delay: 200,
  // 最长等待时间, 超出此时间则渲染错误组件, 默认: Infinity.
  timeout: 3000,
});
Vue.component('AsyncExample', AsyncComp);
```

`core/vdom/helpers/resolve-async-component.js`:

- 3 种异步组件的实现方式.
  - 高级异步组件实现了 loading/resolve/reject/timeout 4 种状态.
- 异步组件实现的本质是 2 次渲染:
  - 第一次渲染生成一个注释节点/`<LoadingComponent>`.
  - 当异步获取组件成功后, 通过 `forceRender` 强制重新渲染.

```ts
import {
  hasSymbol,
  isDef,
  isObject,
  isPromise,
  isTrue,
  isUndef,
  once,
  remove,
} from 'core/util/index';
import { createEmptyVNode } from 'core/vdom/vnode';
import { currentRenderingInstance } from 'core/instance/render';

export function resolveAsyncComponent(
  factory: Function,
  baseCtor: Class<Component>
): Class<Component> | void {
  // 3.
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp;
  }

  if (isDef(factory.resolved)) {
    return factory.resolved;
  }

  const owner = currentRenderingInstance;

  if (owner && isDef(factory.owners) && !factory.owners.includes(owner)) {
    // already pending
    factory.owners.push(owner);
  }

  // 3.
  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp;
  }

  if (owner && !isDef(factory.owners)) {
    const owners = (factory.owners = [owner]);
    let sync = true;
    let timerLoading = null;
    let timerTimeout = null;

    owner.$on('hook:destroyed', () => remove(owners, owner));

    const forceRender = (renderCompleted: boolean) => {
      for (let i = 0, l = owners.length; i < l; i++) {
        owners[i].$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;

        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }

        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    const resolve = once((res: Object | Class<Component>) => {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    const reject = once(reason => {
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    const res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // 2. () => Promise.
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        // 3.
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);

          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(() => {
              timerLoading = null;

              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(() => {
            timerTimeout = null;

            if (isUndef(factory.resolved)) {
              reject(null);
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading ? factory.loadingComp : factory.resolved;
  }
}

function ensureCtor(comp: any, base) {
  if (comp.__esModule || (hasSymbol && comp[Symbol.toStringTag] === 'Module')) {
    comp = comp.default;
  }

  return isObject(comp) ? base.extend(comp) : comp;
}

function createAsyncPlaceholder(
  factory: Function,
  data: ?VNodeData,
  context: Component,
  children: ?Array<VNode>,
  tag: ?string
): VNode {
  const node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data, context, children, tag };
  return node;
}
```

### Vue Proxy

[![Reactive](./figures/proxy.png)](https://ustbhuangyi.github.io/vue-analysis/v2/reactive/summary.html)

Collect deps (get):

- `watcher.get()`.
- `pushTarget(watcher)`.
- `watcherGetter()`: Access reactive object `reactiveObject.key`.
- `reactiveObject.get(key)` (`defineReactive`).
- `dep.depend()` + `childObserver.dep.depend()`.
- `Dep.target.addDep(dep)` -> `watcher.addDep(dep)`.
- `dep.addSub(watcher)`
- `dep.subs.push(watcher)`.
- `popTarget()`.
- `watcher.cleanupDeps()`.

Dispatch updates (set):

- Change reactive object `reactiveObject.key = value`.
- `reactiveObject.set(key, value)` (`defineReactive`).
- `dep.notify()`.
- `dep.subs.forEach(watcher => watcher.update())`.
- `watcher.update()`.
- `queueWatcher(watcher)`.
- `nextTick(flushSchedulerQueue)`.
- `watcher.run()`.
- `watcher.get()`: Get new value and recollect deps.

#### Vue Watcher and Observer

`core/observer/watcher.js`:

- Watcher 的创建顺序为先父后子, 执行顺序 (WatcherQueue) 保持先父后子.
- 用户自定义 Watcher 要优先于 RenderWatcher 执行 (先创建先执行).
- 若一个组件在父组件的 Watcher 执行期间被销毁, 则它对应的 Watcher 执行都可以被跳过.
- `RenderWatcher` (built-in Watcher)
  `updateComponent = () => vm._update(vm._render(), hydrating)`:
  When reactive props and data changed,
  `updateComponent` get invoked automatically.
- 四种 `Watcher` 类型:
  - `Computed Watcher`: `Computed Props` Watcher.
  - `Sync Watcher`. `sync: true`.
  - `Deep Watcher`: `deep: true`, 检测 `Object` 内部变化.
  - `User Watcher`.

```ts
let uid = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
export default class Watcher {
  vm: Component;
  expression: string;
  cb: Function;
  id: number;
  deep: boolean;
  user: boolean;
  computed: boolean;
  sync: boolean;
  dirty: boolean;
  active: boolean;
  dep: Dep;
  deps: Array<Dep>;
  newDeps: Array<Dep>;
  depIds: SimpleSet;
  newDepIds: SimpleSet;
  before: Function | null;
  getter: Function;
  value: any;

  constructor(
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean
  ) {
    this.vm = vm;

    if (isRenderWatcher) {
      vm._watcher = this;
    }

    vm._watchers.push(this);

    // options
    if (options) {
      this.deep = !!options.deep;
      this.user = !!options.user;
      this.computed = !!options.computed;
      this.sync = !!options.sync;
      this.before = options.before;
    } else {
      this.deep = this.user = this.computed = this.sync = false;
    }

    this.cb = cb;
    this.id = ++uid; // uid for batching
    this.active = true;
    this.dirty = this.computed; // for computed watchers
    this.deps = [];
    this.newDeps = [];
    this.depIds = new Set();
    this.newDepIds = new Set();
    this.expression =
      process.env.NODE_ENV !== 'production' ? expOrFn.toString() : '';

    // parse expression for getter
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn;
    } else {
      this.getter = parsePath(expOrFn);

      if (!this.getter) {
        this.getter = function () {};
      }
    }

    if (this.computed) {
      this.value = undefined;
      this.dep = new Dep();
    } else {
      this.value = this.get();
    }
  }

  /**
   * Evaluate the getter, and re-collect dependencies.
   */
  get() {
    pushTarget(this);
    const vm = this.vm;
    const value = this.getter.call(vm, vm);

    if (this.deep) {
      traverse(value);
    }

    popTarget();
    this.cleanupDeps();
    return value;
  }

  /**
   * Add a dependency to this directive.
   */
  addDep(dep: Dep) {
    const id = dep.id;

    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id);
      this.newDeps.push(dep);

      if (!this.depIds.has(id)) {
        dep.addSub(this);
      }
    }
  }

  /**
   * Subscriber interface.
   * Will be called when a dependency changes.
   */
  update() {
    if (this.lazy) {
      this.dirty = true;
    } else if (this.sync) {
      this.run();
    } else {
      queueWatcher(this);
    }
  }

  /**
   * Scheduler job interface.
   * Will be called by the scheduler.
   */
  run() {
    if (this.active) {
      const value = this.get();

      if (value !== this.value || isObject(value) || this.deep) {
        // set new value
        const oldValue = this.value;
        this.value = value;

        if (this.user) {
          const info = `callback for watcher "${this.expression}"`;
          invokeWithErrorHandling(
            this.cb,
            this.vm,
            [value, oldValue],
            this.vm,
            info
          );
        } else {
          this.cb.call(this.vm, value, oldValue);
        }
      }
    }
  }

  /**
   * Depend on this watcher. Only for computed property watchers.
   */
  depend() {
    if (this.dep && Dep.target) {
      this.dep.depend();
    }
  }

  /**
   * Evaluate and return the value of the watcher.
   * This only gets called for computed property watchers.
   */
  evaluate() {
    if (this.dirty) {
      this.value = this.get();
      this.dirty = false;
    }

    return this.value;
  }
}
```

`core/observer/dep.js`:

```ts
import { remove } from '../util/index';
import type Watcher from './watcher';

let uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
export default class Dep {
  static target: ?Watcher;
  id: number;
  subs: Array<Watcher>;

  constructor() {
    this.id = uid++;
    this.subs = [];
  }

  addSub(sub: Watcher) {
    this.subs.push(sub);
  }

  removeSub(sub: Watcher) {
    remove(this.subs, sub);
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }

  notify() {
    // stabilize the subscriber list first
    const subs = this.subs.slice();
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  }
}

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
const targetStack = [];

export function pushTarget(_target: ?Watcher) {
  if (Dep.target) targetStack.push(Dep.target);
  Dep.target = _target;
}

export function popTarget() {
  Dep.target = targetStack.pop();
}
```

`core/observer/index.js`:

```ts
/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
export class Observer {
  value: any;
  dep: Dep;
  vmCount: number; // number of vms that have this object as root $data

  constructor(value: any) {
    this.value = value;
    this.dep = new Dep();
    this.vmCount = 0;
    def(value, '__ob__', this);

    if (Array.isArray(value)) {
      if (hasProto) {
        protoAugment(value, arrayMethods);
      } else {
        copyAugment(value, arrayMethods, arrayKeys);
      }

      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }

  /**
   * Walk through all properties and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  walk(obj: Object) {
    const keys = Object.keys(obj);

    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i]);
    }
  }

  /**
   * Observe a list of Array items.
   */
  observeArray(items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i]);
    }
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
export function observe(value: any, asRootData: ?boolean): Observer | void {
  if (!isObject(value) || value instanceof VNode) {
    return;
  }

  let ob: Observer | void;

  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }

  if (asRootData && ob) {
    ob.vmCount++;
  }

  return ob;
}

/**
 * Define a reactive property on an Object.
 */
export function defineReactive(
  obj: Object,
  key: string,
  val: any,
  customSetter?: ?Function,
  shallow?: boolean
) {
  const dep = new Dep();

  const property = Object.getOwnPropertyDescriptor(obj, key);

  if (property && property.configurable === false) {
    return;
  }

  // cater for pre-defined getter/setters
  const getter = property && property.get;
  const setter = property && property.set;

  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  let childOb = !shallow && observe(val);

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      const value = getter ? getter.call(obj) : val;

      if (Dep.target) {
        dep.depend();

        if (childOb) {
          childOb.dep.depend();

          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }

      return value;
    },
    set: function reactiveSetter(newVal) {
      const value = getter ? getter.call(obj) : val;

      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return;
      }

      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }

      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }

      childOb = !shallow && observe(newVal);
      dep.notify();
    },
  });
}
```

#### Vue Computed Props and Watchers

`core/instance/state.js`:

- `Computed Props` 只关注最终计算结果是否发生变化, 是一种性能优化手段.
- `Computed Props` 最终计算结果不变, 不触发后续更新.
- `Computed Props` 创建的 `Watcher` 称为 `Computed Watcher`.

```ts
const computedWatcherOptions = { computed: true };

function initComputed(vm: Component, computed: Object) {
  const watchers = (vm._computedWatchers = Object.create(null));

  for (const key in computed) {
    const userDef = computed[key];
    const getter = typeof userDef === 'function' ? userDef : userDef.get;

    // create internal watcher for the computed property.
    watchers[key] = new Watcher(
      vm,
      getter || noop,
      noop,
      computedWatcherOptions
    );

    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    }
  }
}

export function defineComputed(
  target: any,
  key: string,
  userDef: Object | Function
) {
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = createComputedGetter(key);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get ?? noop;
    sharedPropertyDefinition.set = userDef.set ?? noop;
  }

  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter(key) {
  return function computedGetter() {
    const watcher = this._computedWatchers && this._computedWatchers[key];

    if (watcher) {
      watcher.depend();
      return watcher.evaluate();
    }
  };
}
```

## Modern Vue Internals

### Vue Virtual DOM

VNode Type:

- HTML native tag.
- Plain text.
- Component:
  - Functional component.
  - Stateful component:
    - Normal stateful component.
    - Need keep-alive stateful component.
    - Already keep-alive stateful component.
- Fragment.
- Portal.
- Suspense.

```ts
export default class VNode {
  tag: string | void;
  data: VNodeData | void;
  children: Array<VNode> | null;
  text: string | void;
  elm: Node | void;
  ns: string | void;
  context: Component | void; // rendered in this component's scope
  key: string | number | void;
  componentOptions: VNodeComponentOptions | void;
  componentInstance: Component | void; // component instance
  parent: VNode | void; // component placeholder node

  // strictly internal
  raw: boolean; // contains raw HTML? (server only)
  isStatic: boolean; // hoisted static node
  isRootInsert: boolean; // necessary for enter transition check
  isComment: boolean; // empty comment placeholder?
  isCloned: boolean; // is a cloned node?
  isOnce: boolean; // is a v-once node?
  asyncFactory: Function | void; // async component factory function
  asyncMeta: Object | void;
  isAsyncPlaceholder: boolean;
  ssrContext: Object | void;
  fnContext: Component | void; // real context vm for functional nodes
  fnOptions: ComponentOptions | null; // for SSR caching
  fnScopeId: string | null; // functional scope id support

  constructor(
    tag?: string,
    data?: VNodeData,
    children?: Array<VNode> | null,
    text?: string,
    elm?: Node,
    context?: Component,
    componentOptions?: VNodeComponentOptions,
    asyncFactory?: Function
  ) {
    this.tag = tag;
    this.data = data;
    this.children = children;
    this.text = text;
    this.elm = elm;
    this.ns = undefined;
    this.context = context;
    this.fnContext = undefined;
    this.fnOptions = undefined;
    this.fnScopeId = undefined;
    this.key = data && data.key;
    this.componentOptions = componentOptions;
    this.componentInstance = undefined;
    this.parent = undefined;
    this.raw = false;
    this.isStatic = false;
    this.isRootInsert = true;
    this.isComment = false;
    this.isCloned = false;
    this.isOnce = false;
    this.asyncFactory = asyncFactory;
    this.asyncMeta = undefined;
    this.isAsyncPlaceholder = false;
  }
}
```

```ts
const VNodeFlags = {
  ELEMENT_HTML: 1,
  ELEMENT_SVG: 1 << 1,
  COMPONENT_STATEFUL_NORMAL: 1 << 2,
  COMPONENT_STATEFUL_SHOULD_KEEP_ALIVE: 1 << 3,
  COMPONENT_STATEFUL_KEPT_ALIVE: 1 << 4,
  COMPONENT_FUNCTIONAL: 1 << 5,
  TEXT: 1 << 6,
  FRAGMENT: 1 << 7,
  PORTAL: 1 << 8,
};

VNodeFlags.ELEMENT = VNodeFlags.ELEMENT_HTML | VNodeFlags.ELEMENT_SVG;

VNodeFlags.COMPONENT_STATEFUL =
  VNodeFlags.COMPONENT_STATEFUL_NORMAL |
  VNodeFlags.COMPONENT_STATEFUL_SHOULD_KEEP_ALIVE |
  VNodeFlags.COMPONENT_STATEFUL_KEPT_ALIVE;

VNodeFlags.COMPONENT =
  VNodeFlags.COMPONENT_STATEFUL | VNodeFlags.COMPONENT_FUNCTIONAL;

const ChildrenFlags = {
  // 未知的 children 类型.
  UNKNOWN_CHILDREN: 0,
  // 没有 children.
  NO_CHILDREN: 1,
  // children 是单个 VNode.
  SINGLE_VNODE: 1 << 1,
  // children 是多个拥有 key 的 VNode.
  KEYED_VNODES: 1 << 2,
  // children 是多个没有 key 的 VNode.
  NONE_KEYED_VNODES: 1 << 3,
};

ChildrenFlags.MULTIPLE_VNODES =
  ChildrenFlags.KEYED_VNODES | ChildrenFlags.NONE_KEYED_VNODES;

export interface VNode {
  _isVNode: true;
  // Refer to real DOM.
  el: Element | null;
  flags: VNodeFlags;
  tag: string | FunctionalComponent | ComponentClass | null;
  data: VNodeData | null;
  children: VNodeChildren;
  childFlags: ChildrenFlags;
}
```

### Vue Template and Compiler

#### Vue Compilation Workflow

```ts
function compile(template: string, options: CompilerOptions): CompiledResult {
  const ast = parse(template.trim(), options);
  optimize(ast, options);
  const code = generate(ast, options);

  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns,
  };
}
```

#### Vue Compilation Performant Improvements

- Shorten template helper function with prefix `_v`/`_s` etc.
- Hoist static template blocks,
  eliminate unnecessary virtual DOM diff effort,
  only track dynamic VNode.
- Cache event handlers (like `useCallback` in React).

```ts
function isStatic(node: ASTNode): boolean {
  if (node.type === 2) {
    // expression
    return false;
  }

  if (node.type === 3) {
    // text
    return true;
  }

  return !!(
    node.pre ||
    (!node.hasBindings && // no dynamic bindings
      !node.if &&
      !node.for && // not v-if or v-for or v-else
      !isBuiltInTag(node.tag) && // not a built-in
      isPlatformReservedTag(node.tag) && // not a component
      !isDirectChildOfTemplateFor(node) &&
      Object.keys(node).every(isStaticKey))
  );
}
```

### Vue Two-Way Data Binding

`View-Model`: 主要做了两件微小的事情:

- 从 M 到 V 的映射 (Data Binding), 这样可以大量节省人肉来 update View 的代码:
  通过 Proxy 代理 Model, 每当调用 `Model[property].set` 时同时调用 `render`
- 从 V 到 M 的事件监听 (DOM Listeners), 这样 Model 会随着 View 触发事件而改变

```ts
const _data = {
  name: 'mark',
};

// new Proxy(target, handler);
const changeName = new Proxy(_data, {
  set(obj, name, value) {
    obj[name] = value;
    render();
  },
});
```

```ts
Array.from(el.getElementsByTagName('input'))
  .filter(ele => {
    return ele.getAttribute('v-model');
  })
  .forEach(input => {
    const name = input.getAttribute('v-model');
    input.value = changeName[name];

    // DOM Event Listener (listen to the changes of view)
    input.oninput = function () {
      changeName[name] = this.value;
    };
  });
```

### Vue Reactivity

Data `getter`/`setter` -> Notify -> Watcher -> Trigger --> Renderer:

```ts
console.log(data.a); // getHook() get called.
data.a = 2; // setHook() get called.
```

- `targetMap` -> `key: effectsMap`: key is reactive object.
- `effectsMap` -> `key: effects`: key is object property name.

```ts
type Primitive = string | number | boolean;
type Key = string | symbol;
type Effect<T> = () => T;

const runningEffects = [];

const targetMap = new WeakMap();

// runEffect -> effect -> proxy.get -> track.
function createEffect<T>(effect: Effect<T>) {
  runningEffects.push(effect);
  effect();
  runningEffects.pop();
}

function track<T extends object>(target: T, key: Key) {
  for (const effect of runningEffects) {
    let effectsMap = targetMap.get(target);
    if (!effectsMap) targetMap.set(target, (effectsMap = new Map()));

    let effects = effectsMap.get(key);
    if (!effects) effectsMap.set(key, (effects = new Set()));

    effects.add(effect);
  }
}

function trigger<T extends object>(target: T, key: Key) {
  const effectsMap = targetMap.get(target);
  if (!effectsMap) return;

  const effects = effectsMap.get(key);
  if (effects) effects.forEach(effect => effect());
}

export function reactive<T extends object>(target: T) {
  const handler: ProxyHandler<T> = {
    get(target, key, receiver) {
      const value = Reflect.get(target, key, receiver);
      track(target, key);
      if (value !== null && typeof value === 'object') return reactive(value);
      else return value;
    },
    set(target, key, value, receiver) {
      const oldValue = Reflect.get(target, key, receiver);
      const result = Reflect.set(target, key, value, receiver);
      if (result && oldValue !== value) trigger(target, key);
      return result;
    },
  };

  return new Proxy(target, handler);
}

export function ref<T extends Primitive>(raw?: T) {
  const refObject = {
    get value() {
      track(refObject, 'value');
      return raw;
    },
    set value(newValue: T) {
      raw = newValue;
      trigger(refObject, 'value');
    },
  };

  return refObject;
}

export function computed<T extends Primitive>(getter: () => T) {
  const refObject = ref<T>();
  createEffect(() => (refObject.value = getter()));
  return refObject;
}
```

```ts
interface Product {
  price: number;
  quantity: number;
}

const product = reactive<Product>({ price: 5, quantity: 2 });
const salePrice = computed(() => product.price * 0.9);
const total = computed(() => salePrice.value * product.quantity);

console.assert(salePrice.value === 4.5);
console.assert(total.value === 9);

product.quantity = 3;
console.assert(total.value === 13.5);

product.quantity = 4;
console.assert(total.value === 18);

product.price = 6;
console.assert(salePrice.value === 5.4);
console.assert(total.value === 21.6);

product.price = 10;
console.assert(salePrice.value === 9);
console.assert(total.value === 36);
```

- `effect.ts`: `effect`, `track`, `trigger`.
- `baseHandlers.ts`: proxy handler (`get` and `set`).
- `reactive.ts`: `reactive` using ES6 Proxy.
- `ref.ts`:
  - reactive reference using Object Accessors.
  - `ref` performant over `reactive`.
- `computed.ts`: `computed` using `effect` and return a `ref`.

#### ES6 Reactive Proxy

- Simple: `Proxy` 使用上比 `Object.defineProperty` 方便.
  - `Object.defineProperty` 只能监听对象, 导致 `Vue 2` `data` 属性必须通过一个返回对象的函数方式初始化,
  - `Vue 3` 更加多元化, 可以监听任意数据.
- Performant: `Proxy` 代理整个对象, `Object.defineProperty` 只代理对象上的某个属性.
  - `Object.defineProperty` 由于每次只能监听对象一个键的 `get`/`set`, 导致需要循环监听浪费性能.
  - `Proxy` 可以一次性监听到所有属性.
- Lazy: `Proxy` 性能优于 `Object.defineProperty`.
  - 如果对象内部要全部递归代理, 则 `Proxy` 可以只在调用时递归.
  - `Object.defineProperty` 需要在一开始就全部递归.
- Feature:
  - 对象上定义新属性时, 只有 `Proxy` 可以监听到.
  - 数组新增删除修改时, 只有 `Proxy` 可以监听到.
  - `Object.defineProperty` 无法监听数组, `Proxy` 则可以直接监听数组变化.
  - Vue2: 重写数组方法监听数组变化, Vue3: `Proxy` 监听数组变化.
- `Proxy` 不兼容 IE, `Object.defineProperty` 不兼容 IE8 及以下.

Vue 2:

```ts
Vue.set(app.items, indexOfItem, newValue);
Vue.set(app.product, newField, newValue);
```

Vue 3:

```ts
app.items[indexOfItem] = newValue;
app.product[newField] = newValue;
```
