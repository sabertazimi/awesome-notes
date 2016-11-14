/*!
 * \file quicksort4.cc
 * \brief Quicksort 4 -Running Time of Quicksort
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

static int nis, nqs;

int partition(vector<int> &arr, int lo, int hi) {
    int pivot = hi,
        lq = lo - 1;

    for (int i = lo; i < pivot; i++) {
        if (arr[i] <= arr[pivot]) {
            swap(arr[++lq], arr[i]);
            nqs++;
        }
    }

    swap(arr[++lq], arr[pivot]);
    nqs++;

    return lq;
}

void _quickSort(vector<int> &arr, int lo, int hi) {
    if (lo < hi) {
        int sep = partition(arr, lo, hi);

        // for (int i = 0; i < arr.size() - 1; i++) {
        //     cout << arr[i] << " ";
        // }
        // cout << arr[arr.size() - 1] << endl;

        _quickSort(arr, lo, sep-1);
        _quickSort(arr, sep+1, hi);

    }
}

void quickSort(vector<int> &arr) {
    _quickSort(arr, 0, arr.size() - 1);
}

void insertionsort(vector<int> arr) {
    for (int i = 1; i < arr.size(); i++) {
        for (int j = i; arr[j - 1] > arr[j] && j > 0; j--) {
            swap(arr[j - 1], arr[j]);
            nis++;
        }
    }
}

int main(void) {
    int n;
    cin >> n;

    vector<int> arr(n);

    for (int i = 0; i < (int)n; i++) {
        cin >> arr[i];
    }

    insertionsort(arr);
    quickSort(arr);

    cout<< nis - nqs << endl;

    /* for (int i = 0; i < arr.size() - 1; i++) { */
    /*     cout << arr[i] << " "; */
    /* } */
    /* cout << arr[arr.size() - 1] << endl; */

    return 0;
}
