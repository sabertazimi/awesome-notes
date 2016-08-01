
* [Redux Basic Notes](#redux-basic-notes)
	* [Best Practice](#best-practice)
	* [Awesome Tools](#awesome-tools)
		* [Debugging](#debugging)

# Redux Basic Notes

Stack: ES6, webpack, react-hot-loader

## Best Practice

1. 用ES6, webpack, react-hot-loader....详细内容参照MERN v2.0 - Build production ready universal apps easily
3. https://github.com/gaearon/redux-devtools
5. 区分smart component (know the state) 和 dump component (stateless)
6. component里不要出现任何async calls，交给action creator来做
7. reducer尽量简单，复杂的交给action creator
8. reducer里return新state的时候：

// add new item to state array //

// bad and does not work case "ADD": return state.push(newItem); // Good case "ADD": return [ ...state, newItem ]; 


// delete new item to state array // bad and does not work case "DELETE": return state.splice(index, 1); // Good case "DELETE": return state.slice(0, index).concat(state.slice(index + 1));

// update new item to state array // First way case "EDIT": return state.slice(0, index) .concat([{id: "id", value: "newValue"}]) .slice(index + 1); // Second way case "EDIT": return state.map((item) => { if (item.id === "id") { return { ...item, value: "newValue" } } else { return item; } }) 

9. action creator里，用promise/async/await以及redux-thunk来帮助你完成想要的功能
10. 在test里不管你用tape还是mocha，请用http://airbnb.io/enzyme/
11. 有些时候有些项目你并不需要redux

## Awesome Tools

### Debugging

-   [Redux Devtools](https://github.com/gaearon/redux-devtools)
