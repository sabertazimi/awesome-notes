/*!
 * \file quicksort3.cc
 * \brief Quicksort 3 - Quicksort in Place
 *
 * \author sabertazimi, <sabertazimi@gmail.com>
 * \version 1.0
 * \date 2016
 * \license MIT
 */

#include <vector>
#include <iostream>
#include <algorithm>

using namespace std;

int partition(vector<int> &arr, int lo, int hi) {
    int pivot = hi,
        lq = lo - 1;

    for (int i = lo; i < pivot; i++) {
        if (arr[i] <= arr[pivot]) {
            swap(arr[++lq], arr[i]);
        }
    }

    swap(arr[++lq], arr[pivot]);

    return lq;
}

void _quickSort(vector<int> &arr, int lo, int hi) {
    if (lo < hi) {
        int sep = partition(arr, lo, hi);

        for (int i = 0; i < arr.size() - 1; i++) {
            cout << arr[i] << " ";
        }
        cout << arr[arr.size() - 1] << endl;

        _quickSort(arr, lo, sep-1);
        _quickSort(arr, sep+1, hi);

    }
}

void quickSort(vector<int> &arr) {
    _quickSort(arr, 0, arr.size() - 1);
}

int main(void) {
    int n;
    cin >> n;

    vector<int> arr(n);

    for (int i = 0; i < (int)n; i++) {
        cin >> arr[i];
    }

    quickSort(arr);

    /* for (int i = 0; i < arr.size() - 1; i++) { */
    /*     cout << arr[i] << " "; */
    /* } */
    /* cout << arr[arr.size() - 1] << endl; */

    return 0;
}
