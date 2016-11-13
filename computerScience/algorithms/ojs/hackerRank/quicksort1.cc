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


