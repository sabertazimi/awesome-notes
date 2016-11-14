/*!
 * \file quicksort5.cc
 * \brief Quicksort 5 - Iteration Version
 *
 * \author sabertazimi, <sabertazimi@gmail.com>
 * \version 1.0
 * \date 2016
 * \license MIT
 */

#include <cmath>
#include <vector>
#include <stack>
#include <iostream>

using namespace std;

int partition(vector<int> &arr, int lo, int hi) {
    int guard = hi,     ///< the index of guard element
        lq = lo - 1;    ///< the limit of less/equal element area

    // move all of elements less than or equal to guard element to the left area of array
    for (int i = lo; i < guard; i++) {
        if (arr[i] <= arr[guard]) {
            swap(arr[++lq], arr[i]);
        }
    }

    // move guard element to right position
    swap(arr[++lq], arr[guard]);

    return lq;
}

void _quickSort(vector<int> &arr, int lo, int hi) {
    int spot = 0;       ///< position of separating result
    stack<int> st;      ///< change recursion to iteration by stack

    while (1) {
        // sorting while loop
        while (lo < hi) {
            spot = partition(arr, lo, hi);

            if (spot - lo < hi - spot) {
                // push the limits of larger sub-array into stack
                // to make larger sub-array get sorted later than smaller ones
                st.push(spot + 1);
                st.push(hi);

                // sort the smaller sub-array first
                hi = spot - 1;
            } else {
                // push the limits of larger sub-array into stack
                // to make larger sub-array get sorted later than smaller ones
                st.push(lo);
                st.push(spot - 1);

                // sort the smaller sub-array first
                lo = spot + 1;
            }
        }

        // empty stack represent sorting get finished already
        if (st.empty()) {
            break;
        } else {
            // else, get the limits of larger sub-array
            // then sort the larger sub-array
            hi = st.top();
            st.pop();
            lo = st.top();
            st.pop();
        }
    }
}

void quickSort(vector<int> &arr) {
    _quickSort(arr, 0, arr.size() - 1);
}

int main(void) {
    int n;
    cin >> n;

    vector<int> arr(n);

    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }

    quickSort(arr);

    for (int i = 0; i < arr.size() - 1; i++) {
        cout << arr[i] << ' ';
    }
    cout << arr[arr.size() - 1] << endl;

    return 0;
}
