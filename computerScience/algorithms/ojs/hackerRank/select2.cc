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

static int r = 3;      ///< separte array into groups, each group-array contains r elements

/// \brief insertion sort algorithm implementation
/// \param arr array
/// \param lo  lowest limit of array
/// \param hi  highest limit of array
/// \return void
void insertionSort(vector<int> &arr, int lo, int hi) {
    for (int i = 1; i < hi + 1; i++) {
        for (int j = i; j > lo && arr[j - 1] > arr[j]; j--) {
            swap(arr[j - 1], arr[j]);
        }
    }
}

/// \brief partition algorithm implementation
/// \param arr array
/// \param lo  lowest limit of array
/// \param hi  highest limit of array
/// \return index of guard element(separation position)
static int partition(vector<int> &arr, int lo, int hi) {
    int guard = lo,     ///< the index of guard element
        ge = hi + 1;    ///< the limit of greater/equal element area

    // move all of elements greater than or equal to guard element to the right area of array
    for (int i = hi; i > guard; i--) {
        if (arr[i] >= arr[guard]) {
            swap(arr[--ge], arr[i]);
        }
    }

    // move guard element to correct position
    swap(arr[--ge], arr[guard]);

    return ge;
}

/// \brief group select algorithm implementation(iteration version)
/// \param arr array with non-repeating elements and size bigger than r
/// \param kth expect the kth largest element in array
/// \param lo  lowest limit of array
/// \param hi  highest limit of array
/// \return index of kth element
static int _select2(vector<int> &arr, int kth, int lo, int hi) {
    int n  = arr.size();

    while (1) {
        if (n <= r) {
            insertionSort(arr, lo, hi);
            return (kth + lo - 1);
        }

        /* start of getting median of medians */

        for (int i = 0; i < n/r; i++) {
            // sort each group-array(sub-array)
            insertionSort(arr, lo + i*r, lo + (i + 1)*r - 1);

            // collect medians in front part of arr[lo:hi];
            swap(arr[lo + i], arr[lo + i*r + ceil((double)r/2.0) - 1]);
        }

        // select ceil(n/r/2) largest element from medians-array(in front part of arr[lo:hi])
        int spot = _select2(arr, ceil((double)n/r/2.0), lo, lo + n/r - 1);

        // move median of medians-array to arr[lo]
        swap(arr[lo], arr[spot]);

        /* end of getting median of medians */

        // invoke partition with arr[lo](median of medians-array) as guard
        spot = partition(arr, lo, hi);

        if (kth == spot - lo + 1) {
            return spot;
        } else if (kth < spot - lo + 1) {
            hi = spot - 1;
        } else {
            kth -= (spot - lo + 1);
            lo = spot + 1;
        }
    }
}

/// \brief wrapper function
/// \param arr array with non-repeating elements
/// \param kth expect the kth largest element in array
/// \return the value of kth largest element
int select2(vector<int> arr, int kth) {
    if ((int)arr.size() <= r) {
        insertionSort(arr, 0, arr.size() - 1);
        return arr[kth];
    } else {
        return arr[_select2(arr, kth, 0, arr.size() - 1)];
    }
}

int main(void) {
    int n, kth;
    cin >> n;

    vector<int> arr(n);

    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }

    do {
        cin >> kth;
    } while (kth < 1);

    cout << "[unsorted] arr[" << kth << "] = " << select2(arr, kth) << endl;

#ifdef DEBUG
    for (int i = 0; i < (int)arr.size() - 1; i++) {
        cout << arr[i] << " ";
    }
    cout << arr[arr.size() - 1] << endl;
#endif // DEBUG

    // insertionSort(arr, 0, arr.size() - 1);

    cout << "[ sorted ] arr[" << kth << "] = " << select2(arr, kth) << endl;

#ifdef DEBUG
    for (int i = 0; i < (int)arr.size() - 1; i++) {
        cout << arr[i] << " ";
    }
    cout << arr[arr.size() - 1] << endl;
#endif // DEBUG

    return 0;
}
