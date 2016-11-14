# Algorithm Lab Notes

## BUGs

### ceil

*   error: pass a integer, make result become smaller, leading to arr[idx] become segmentation fault
*   solution: pass a double, e.g n/2 => n/2.0, n/r/2 => n/r/2.0
