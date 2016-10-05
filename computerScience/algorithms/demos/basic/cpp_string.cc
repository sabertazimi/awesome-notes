/*
 * cpp_string.cc
 * Copyright (C) 2016 sabertazimi <sabertazimi@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

#include <iostream>
#include <string>
#include <sstream>

using namespace std;

void getline_stringstream(void) {
    string line;

    while (getline(cin, line)) {
        int sum = 0,
            x;
        stringstream ss(line);

        while (ss >> x) {
            sum += x;
        }

        cout<<sum<<"\n";
    }
}

int main(void) {
    getline_stringstream();
    return 0;
}


