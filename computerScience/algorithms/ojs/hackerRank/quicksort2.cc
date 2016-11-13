/*!
 * \file quicksort2.cc
 * \brief Quicksort 2 -Sorting from HackerRank
 *
 * \author sabertazimi, <sabertazimi@gmail.com>
 * \version 1.0
 * \date 2016
 * \license MIT
 */

#include <vector>
#include <iostream>

using namespace std;

int partition(vector<int> &arr, int lo, int hi) {
    // enter code for partitioning and printing here.
    int guard = arr[lo],
        left = lo + 1,
        right = hi;

    while (left <= right) {
        while (arr[left] < guard) left++;
        while (arr[right] > guard) right--;

        if (left <= right) {
            int tmp = arr[left];
            arr[left] = arr[right];
            arr[right] = tmp;
            left++;
            right--;
        }
    }

    int tmp = arr[right];
    arr[right] = arr[lo];
    arr[lo] = tmp;

    for (int i = lo; i < hi; i++) {
        cout << arr[i] << " ";
    }
    cout << arr[hi] << endl;

    return right;
}

void quickSort(vector<int> &arr, int lo, int hi) {
    // Complete this function
    if (arr.size() <= 1 || lo >= hi) {
        return;
    } else {
        int sep = partition(arr, lo, hi);
        quickSort(arr, lo, sep-1);
        quickSort(arr, sep+1, hi);
    }
}

int main(void) {
    int n;
    cin >> n;

    vector<int> arr(n);

    for (int i = 0; i < (int)n; i++) {
        cin >> arr[i];
    }

    quickSort(arr, 0, arr.size() - 1);

    return 0;
}
