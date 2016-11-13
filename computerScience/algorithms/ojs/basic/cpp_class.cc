/*
 * cpp_class.cc
 * Copyright (C) 2016 sabertazimi <sabertazimi@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

#include <iostream>

using namespace std;

class Point {
private:
    int x;
    int y;

public:
    Point(int x = 0, int y = 0) {
        this->x = x;
        this->y = y;
    }

    virtual int getX(void) const {
        return this->x;
    }

    virtual int getY(void) const {
        return this->y;
    }

    virtual Point &setX(int x) {
        this->x = x;
        return *this;
    }

    virtual Point &setY(int y) {
        this->y = y;
        return *this;
    }

    virtual Point operator+(const Point &A) const {
        return Point(A.x + this->getX(), A.y + this->getY());
    }

    friend inline ostream& operator<<(ostream &out, const Point &p) {
        out << "(" << p.x << "," << p.y << ")";
        return out;
    }
};

int main(void) {
    Point a, b(1, 2);
    a.setX(3);
    cout<< a + b << "\n";

    return 0;
}



