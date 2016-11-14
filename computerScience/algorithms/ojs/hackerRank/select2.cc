/*!
 * \file select2.cc
 * \brief
 *
 * \author sabertazimi, <sabertazimi@gmail.com>
 * \version 1.0
 * \date 2016-11-14
 * \license MIT
 */

#include <cmath>
#include <vector>
#include <iostream>

using namespace std;

#define DEBUG
// #undef DEBUG

void insertionSort(vector<int> &arr) {
    for (int i = 1; i < arr.size(); i++) {
        for (int j = i; j > 0 && arr[j - 1] > arr[j]; j--) {
            swap(arr[j - 1], arr[j]);
        }
    }
}

static int partition(vector<int> arr, int lo, int hi) {
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

static int _select2(vector<int> &arr, int kth, int lo, int hi) {
    return arr[kth];
}

int select2(vector<int> arr, int kth) {
    return _select2(arr, kth, 0, arr.size() - 1);
}

int main(void) {
    int n, kth;
    cin >> n;

    vector<int> arr(n);

    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }

    cin >> kth;

    cout << "[unsorted] arr[" << kth << "] = " << select2(arr, kth) << endl;

#ifdef DEBUG
    for (int i = 0; i < arr.size() - 1; i++) {
        cout << arr[i] << " ";
    }
    cout << arr[arr.size() - 1] << endl;
#endif // DEBUG

    insertionSort(arr);

    cout << "[ sorted ] arr[" << kth << "] = " << select2(arr, kth) << endl;

#ifdef DEBUG
    for (int i = 0; i < arr.size() - 1; i++) {
        cout << arr[i] << " ";
    }
    cout << arr[arr.size() - 1] << endl;
#endif // DEBUG

    return 0;
}