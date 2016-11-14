#include <vector>
#include <iostream>

using namespace std;

void insertionSort(vector<int> &arr) {
    for (int i = 1; i < arr.size(); i++) {
        for (int j = i; arr[j - 1] > arr[j] && j > 0; j--) {
            swap(arr[j - 1], arr[j]);
        }
        
        for (int i = 0; i < arr.size() - 1; i++) {
            cout << arr[i] << " ";
        }
        cout << arr[arr.size() - 1] << endl;
    }
}

int main(void) {
   int n;
   cin >> n;
   vector<int> arr(n);
    

    for (int i = 0; i < n; i++) {
       cin >> arr[i];
   }
    

   insertionSort(arr);
   return 0;
}