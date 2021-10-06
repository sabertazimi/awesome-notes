---
author: Sabertazimi
authorTitle: Web Developer
authorURL: https://github.com/sabertazimi
authorImageURL: https://github.com/sabertazimi.png
tags: [Web, Vue]
---

# Vue Basic Notes

[TOC]

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
  <!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
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

```js
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

```js
app.component('custom-form', {
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

本质为语法糖:

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

```js
app.component('custom-input', {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  template: `
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
  `,
});

app.component('custom-input', {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  template: `
    <input v-model="value">
  `,
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

```js
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
        return this.firstName + ' ' + this.lastName;
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

```js
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

- [SFC with `setup`](https://v3.vuejs.org/api/sfc-script-setup.html).

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

```js
import { ref, toRefs } from 'vue';

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

```js
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

```js
const count = ref(1);
const plusOne = computed(() => count.value + 1);

console.log(plusOne.value); // 2

plusOne.value++; // error
```

```js
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

```js
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

```js
const firstName = ref('');
const lastName = ref('');

watch([firstName, lastName], (newValues, prevValues) => {
  console.log(newValues, prevValues);
});

firstName.value = 'John'; // logs: ["John", ""] ["", ""]
lastName.value = 'Smith'; // logs: ["John", "Smith"] ["John", ""]
```

Watch reactive value:

```js
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

```js
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

## Vue Router

- [Composition API Reference](https://next.router.vuejs.org/guide/advanced/composition-api.html)

### Basic Routes

```ts
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
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
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
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
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
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

const router = useRouter();
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
import { InjectionKey } from 'vue';
import { createStore, useStore, Store } from 'vuex';

// define your typings for the store state
interface State {
  count: number;
}

// define injection key
const key: InjectionKey<Store<State>> = Symbol();

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
import { createApp } from 'vue'
import store, { key } from './store'

const app = createApp({ ... })

// pass the injection key
app.use(store, key)

app.mount('#app')
```

```ts
// in a vue component
import { useAppStore } from './store';

export default {
  setup() {
    const store = useAppStore();

    store.state.count; // typed as number
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

```js
// main.js
import Vue from 'vue';
import App from './App.vue';
import router from './router';

// import styles
import '@/styles/site.scss';
```

```js
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

## Vue Internal

### Vue Constructor

`src/core/instance/index.js`

```js
// 从五个文件导入五个方法（不包括 warn）
import { initMixin } from './init';
import { stateMixin } from './state';
import { renderMixin } from './render';
import { eventsMixin } from './events';
import { lifecycleMixin } from './lifecycle';
import { warn } from '../util/index';

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

### Vue Prototype

```js
// initMixin(Vue)    src/core/instance/init.js **************************************************
Vue.prototype._init = function (options?: Object) {};

// stateMixin(Vue)    src/core/instance/state.js **************************************************
Vue.prototype.$data;
Vue.prototype.$props;
Vue.prototype.$set = set;
Vue.prototype.$delete = del;
Vue.prototype.$watch = function (
  expOrFn: string | Function,
  cb: any,
  options?: Object
): Function {};

// eventsMixin(Vue)    src/core/instance/events.js **************************************************
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

// lifecycleMixin(Vue)    src/core/instance/lifecycle.js **************************************************
Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {};
Vue.prototype.$forceUpdate = function () {};
Vue.prototype.$destroy = function () {};

// renderMixin(Vue)    src/core/instance/render.js **************************************************
// installRenderHelpers 函数中
Vue.prototype._o = markOnce;
Vue.prototype._n = toNumber;
Vue.prototype._s = toString;
Vue.prototype._l = renderList;
Vue.prototype._t = renderSlot;
Vue.prototype._q = looseEqual;
Vue.prototype._i = looseIndexOf;
Vue.prototype._m = renderStatic;
Vue.prototype._f = resolveFilter;
Vue.prototype._k = checkKeyCodes;
Vue.prototype._b = bindObjectProps;
Vue.prototype._v = createTextVNode;
Vue.prototype._e = createEmptyVNode;
Vue.prototype._u = resolveScopedSlots;
Vue.prototype._g = bindObjectListeners;
Vue.prototype.$nextTick = function (fn: Function) {};
Vue.prototype._render = function (): VNode {};

// core/index.js 文件中
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering,
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get() {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext;
  },
});

// 在 runtime/index.js 文件中
Vue.prototype.__patch__ = inBrowser ? patch : noop;
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating);
};

// 在入口文件 entry-runtime-with-compiler.js 中重写了 Vue.prototype.$mount 方法
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  // ... 函数体
};
```

### Vue Global API

```js
// initGlobalAPI
Vue.config;
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
  // 在 runtime/index.js 文件中，为 directives 添加了两个平台化的指令 model 和 show
  // directives:{
  // model,
  // show
  // },
  filters: Object.create(null),
  _base: Vue,
};

// initUse ***************** global-api/use.js
Vue.use = function (plugin: Function | Object) {};

// initMixin ***************** global-api/mixin.js
Vue.mixin = function (mixin: Object) {};

// initExtend ***************** global-api/extend.js
Vue.cid = 0;
Vue.extend = function (extendOptions: Object): Function {};

// initAssetRegisters ***************** global-api/assets.js
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

### Vue Instance

```js
// Vue.prototype._init
vm._uid = uid++; // 每个Vue实例都拥有一个唯一的 id
vm._isVue = true; // 这个表示用于避免Vue实例对象被观测(observed)
vm.$options; // 当前 Vue 实例的初始化选项，注意：这是经过 mergeOptions() 后的
vm._renderProxy = vm; // 渲染函数作用域代理
vm._self = vm; // 实例本身

// initLifecycle(vm)    src/core/instance/lifecycle.js **************************************************
vm.$parent = parent;
vm.$root = parent ? parent.$root : vm;

vm.$children = [];
vm.$refs = {};

vm._watcher = null;
vm._inactive = null;
vm._directInactive = false;
vm._isMounted = false;
vm._isDestroyed = false;
vm._isBeingDestroyed = false;

// initEvents(vm)   src/core/instance/events.js **************************************************
vm._events = Object.create(null);
vm._hasHookEvent = false;

// initRender(vm)   src/core/instance/render.js **************************************************
vm._vnode = null; // the root of the child tree
vm._staticTrees = null; // v-once cached trees

vm.$vnode;
vm.$slots;
vm.$scopedSlots;

vm._c;
vm.$createElement;

vm.$attrs;
vm.$listeners;

// initState(vm)   src/core/instance/state.js **************************************************
vm._watchers = [];
vm._data;

// mountComponent()   src/core/instance/lifecycle.js
vm.$el;

// initComputed()   src/core/instance/state.js
vm._computedWatchers = Object.create(null);

// initProps()    src/core/instance/state.js
vm._props = {};

// initProvide()    src/core/instance/inject.js
vm._provided;
```

### Vue ReadOnly Property

```js
const dataDef = {};
dataDef.get = function () {
  return this._data;
};
const propsDef = {};
propsDef.get = function () {
  return this._props;
};

if (process.env.NODE_ENV !== 'production') {
  dataDef.set = function (newData: Object) {
    warn(
      'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
      this
    );
  };
  propsDef.set = function () {
    warn(`$props is readonly.`, this);
  };
}

Object.defineProperty(Vue.prototype, '$data', dataDef);
Object.defineProperty(Vue.prototype, '$props', propsDef);
```

### Vue Shared Utils

```js
/* @flow */

export const emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
export function isUndef(v: any): boolean {
  return v === undefined || v === null;
}

export function isDef(v: any): boolean {
  return v !== undefined && v !== null;
}

export function isTrue(v: any): boolean {
  return v === true;
}

export function isFalse(v: any): boolean {
  return v === false;
}

/**
 * Check if value is primitive.
 */
export function isPrimitive(value: any): boolean {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  );
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
export function isObject(obj: mixed): boolean {
  return obj !== null && typeof obj === 'object';
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
const _toString = Object.prototype.toString;

export function toRawType(value: any): string {
  return _toString.call(value).slice(8, -1);
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
export function isPlainObject(obj: any): boolean {
  return _toString.call(obj) === '[object Object]';
}

export function isRegExp(v: any): boolean {
  return _toString.call(v) === '[object RegExp]';
}

/**
 * Check if val is a valid array index.
 */
export function isValidArrayIndex(val: any): boolean {
  const n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}

/**
 * Convert a value to a string that is actually rendered.
 */
export function toString(val: any): string {
  return val == null
    ? ''
    : typeof val === 'object'
    ? JSON.stringify(val, null, 2)
    : String(val);
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
export function toNumber(val: string): number | string {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
export function makeMap(
  str: string,
  expectsLowerCase?: boolean
): (key: string) => true | void {
  const map = Object.create(null);
  const list: Array<string> = str.split(',');
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? val => map[val.toLowerCase()] : val => map[val];
}

/**
 * Check if a tag is a built-in tag.
 */
export const isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
export const isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
export function remove(arr: Array<any>, item: any): Array<any> | void {
  if (arr.length) {
    const index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}

/**
 * Check whether an object has the property.
 */
const hasOwnProperty = Object.prototype.hasOwnProperty;
export function hasOwn(obj: Object | Array<*>, key: string): boolean {
  return hasOwnProperty.call(obj, key);
}

/**
 * Create a cached version of a pure function.
 */
export function cached<F: Function>(fn: F): F {
  const cache = Object.create(null);
  return (function cachedFn(str: string) {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  }: any);
}

/**
 * Camelize a hyphen-delimited string.
 */
const camelizeRE = /-(\w)/g;
export const camelize = cached((str: string): string => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''));
});

/**
 * Capitalize a string.
 */
export const capitalize = cached((str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});

/**
 * Hyphenate a camelCase string.
 */
const hyphenateRE = /\B([A-Z])/g;
export const hyphenate = cached((str: string): string => {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performance enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind(fn: Function, ctx: Object): Function {
  function boundFn(a) {
    const l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx);
  }

  boundFn._length = fn.length;
  return boundFn;
}

function nativeBind(fn: Function, ctx: Object): Function {
  return fn.bind(ctx);
}

export const bind = Function.prototype.bind ? nativeBind : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
export function toArray(list: any, start?: number): Array<any> {
  start = start || 0;
  let i = list.length - start;
  const ret: Array<any> = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret;
}

/**
 * Mix properties into target object.
 */
export function extend(to: Object, _from: ?Object): Object {
  for (const key in _from) {
    to[key] = _from[key];
  }
  return to;
}

/**
 * Merge an Array of Objects into a single Object.
 */
export function toObject(arr: Array<any>): Object {
  const res = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
export function noop(a?: any, b?: any, c?: any) {}

/**
 * Always return false.
 */
export const no = (a?: any, b?: any, c?: any) => false;

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
export const identity = (_: any) => _;

/**
 * Generate a string containing static keys from compiler modules.
 */
export function genStaticKeys(modules: Array<ModuleOptions>): string {
  return modules
    .reduce((keys, m) => {
      return keys.concat(m.staticKeys || []);
    }, [])
    .join(',');
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
export function looseEqual(a: any, b: any): boolean {
  if (a === b) return true;
  const isObjectA = isObject(a);
  const isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      const isArrayA = Array.isArray(a);
      const isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return (
          a.length === b.length &&
          a.every((e, i) => {
            return looseEqual(e, b[i]);
          })
        );
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        return (
          keysA.length === keysB.length &&
          keysA.every(key => {
            return looseEqual(a[key], b[key]);
          })
        );
      } else {
        /* istanbul ignore next */
        return false;
      }
    } catch (e) {
      /* istanbul ignore next */
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
export function looseIndexOf(arr: Array<mixed>, val: mixed): number {
  for (let i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) return i;
  }
  return -1;
}

/**
 * Ensure a function is called only once.
 */
export function once(fn: Function): Function {
  let called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  };
}
```

### Vue Options

```js
vm.$options = mergeOptions(
  // resolveConstructorOptions(vm.constructor)
  {
    components: {
      KeepAlive
      Transition,
      TransitionGroup
    },
    directives:{
      model,
      show
    },
    filters: Object.create(null),
    _base: Vue
  },
  // options || {}
  {
    el: '#app',
    data: {
      test: 1
    }
  },
  vm
)
```

#### Vue Normalize Options

Props:

```js
props: {
  someData1: {
    type: Number
  },
  someData2: {
    type: String,
    default: ''
  }
}
```

Injects:

```js
inject: {
  'data1': { from: 'data1' },
  'd2': { from: 'data2' },
  'data3': { from: 'data3', someProperty: 'someValue' }
}
```

Directives:

```js
for (const key in dirs) {
  const def = dirs[key];
  if (typeof def === 'function') {
    dirs[key] = { bind: def, update: def };
  }
}
```

#### Vue Merge Options

- 对于 el、propsData 选项使用默认的合并策略 defaultStart
- 对于 data 选项，使用 mergeDataOrFn 函数进行处理，最终结果是 data 选项将变成一个函数，且该函数的执行结果为真正的数据对象
- 对于 生命周期钩子 选项，将合并成数组，使得父子选项中的钩子函数都能够被执行
- 对于 directives、filters 以及 components 等资源选项，
  父子选项将以原型链的形式被处理，正是因为这样我们才能够在任何地方都使用内置组件、指令等
- 对于 watch 选项的合并处理，类似于生命周期钩子，如果父子选项都有相同的观测字段，将被合并为数组，这样观察者都将被执行
- 对于 props、methods、inject、computed 选项，父选项始终可用，但是子选项会覆盖同名的父选项字段
- 对于 provide 选项，其合并策略使用与 data 选项相同的 mergeDataOrFn 函数
- 最后，以上没有提及到的选项都将使默认选项 defaultStart
- 最最后，默认合并策略函数 defaultStart 的策略是：只要子选项不是 undefined 就使用子选项，否则使用父选项

### Vue Two-Way Data Binding

View-Model 主要做了两件微小的事情：

- 从 M 到 V 的映射 (Data Binding), 这样可以大量节省人肉来 update View 的代码:
  通过 Proxy 代理 Model, 每当调用 `Model[property].set` 时同时调用 `render`
- 从 V 到 M 的事件监听 (DOM Listeners), 这样 Model 会随着 View 触发事件而改变

```js
const _data = {
  name: 'mark',
};

// new Proxy(target, handler);
let changeName = new Proxy(_data, {
  set(obj, name, value) {
    obj[name] = value;
    render();
  },
});
```

```js
Array.from(el.getElementsByTagName('input'))
  .filter(ele => {
    return ele.getAttribute('v-model');
  })
  .forEach(input => {
    let name = input.getAttribute('v-model');
    input.value = changeName[name];

    // DOM Event Listener (listen to the changes of view)
    input.oninput = function () {
      changeName[name] = this.value;
    };
  });
```

### Vue Reactivity

Data `getter`/`setter` -> Notify -> Watcher -> Trigger --> Renderer:

```js
data.a; // getHook() get called.
data.a = 2; // setHook() get called.
```

- `targetMap` -> `key: depsMap`: key is reactive object.
- `depsMap` -> `key: dep`: key is object property name.
- `dep` -> `effects`.

```js
type Effect<T> = () => T;

const runningEffects = [];

const targetMap = new WeakMap();

// runEffect -> effect -> proxy.get -> track.
function createEffect<T>(effect: Effect<T>) {
  runningEffects.push(effect);
  effect();
  runningEffects.pop();
}

function track<T extends object>(target: T, key: string | symbol) {
  for (const effect of runningEffects) {
    let depsMap = targetMap.get(target);
    if (!depsMap) targetMap.set(target, (depsMap = new Map()));

    let dep = depsMap.get(key);
    if (!dep) depsMap.set(key, (dep = new Set()));

    dep.add(effect);
  }
}

function trigger<T extends object>(target: T, key: string | symbol) {
  const depsMap = targetMap.get(target);
  if (!depsMap) return;

  const dep = depsMap.get(key);
  if (dep) dep.forEach(effect => effect());
}

function reactive<T extends object>(target: T) {
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

function ref<T>(raw: T) {
  const refObject = {
    get value() {
      track(refObject, 'value');
      return raw;
    },
    set value(newValue) {
      raw = newValue;
      trigger(refObject, 'value');
    },
  };

  return refObject;
}
```

```js
interface Product {
  price: number;
  quantity: number;
}

const product = reactive<Product>({ price: 5, quantity: 2 });
const salePrice = ref(0);
let total = 0;

createEffect(() => {
  salePrice.value = product.price * 0.9;
});

console.assert(salePrice.value === 4.5);

createEffect(() => {
  total = salePrice.value * product.quantity;
});

console.assert(total === 9);

product.quantity = 3;
console.assert(total === 13.5);

product.quantity = 4;
console.assert(total === 18);

product.price = 6;
console.assert(salePrice.value === 5.4);
console.assert(total === 21.6);

product.price = 10;
console.assert(salePrice.value === 9);
console.assert(total === 36);
```
