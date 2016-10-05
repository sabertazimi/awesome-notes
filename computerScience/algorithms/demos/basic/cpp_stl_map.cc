/*
 * cpp_map.cc
 * Copyright (C) 2016 sabertazimi <sabertazimi@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

#include <iostream>
#include <string>
#include <cctype>
#include <vector>
#include <map>
#include <algorithm>

using namespace std;

// store string(hash_value) count
map<string, int> cnt;

vector<string> words;

string repr(const string &s) {
    string ans = s;

    // lower
    for (int i = 0; i < ans.length(); i++) {
        ans[i] = tolower(ans[i]);
    }

    // sort
    sort(ans.begin(), ans.end());

    return ans;
}

int main(void) {
    int n = 0;
    string s;

    while (cin >> s) {
        if (s[0] == '#') {
            break;
        }

        words.push_back(s);
        string r = repr(s);

        if (!cnt.count(r)) {
            cnt[r] = 0;
        }

        cnt[r]++;
    }

    vector<string> ans;

    for (int i = 0; i < words.size(); i++) {
        if (cnt[repr(words[i])] == 1) {
            ans.push_back(words[i]);
        }
    }

    sort(ans.begin(), ans.end());

    for (int i = 0; i < ans.size(); i++) {
        cout << ans[i] << "\n";
    }

    return 0;
}
