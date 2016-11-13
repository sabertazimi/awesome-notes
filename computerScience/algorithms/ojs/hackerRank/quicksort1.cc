/*!
 * \file quicksort1.cc
 * \brief Quicksor 1 - Partition from HackerRank
 *
 * \author sabertazimi, <sabertazimi@gmail.com>
 * \version 1.0
 * \date 2016
 * \license MIT
 */

#include <vector>
#include <iostream>

using namespace std;

void partition(vector<int> arr) {
    // enter code for partitioning and printing here.
    int guard = arr[0],
        left = 1,
        right = arr.size() - 1;

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
    arr[right] = arr[0];
    arr[0] = tmp;

    for (int i = 0; i < arr.size() - 1; i++) {
        cout << arr[i] << " ";
    }
    cout << arr[arr.size() - 1];
}

int main(void) {
    vector<int> arr;
    int size;

    cin >> size;

    for (int i = 0; i < size; i++) {
        int tmp;
        cin >> tmp;
        arr.push_back(tmp);
    }

    partition(arr);

    return 0;
}


