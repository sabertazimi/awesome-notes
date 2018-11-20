# CMake Basic Notes

<!-- TOC -->

- [CMake Basic Notes](#cmake-basic-notes)
  - [Basic Build System](#basic-build-system)
  - [Useful Command](#useful-command)
    - [Install Command](#install-command)
  - [Useful Tools](#useful-tools)

<!-- /TOC -->

## Basic Build System

build for executable

```cmake
cmake_minimum_required(VERSION 2.8.9)
project(directory_test)

# Bring the headers, such as Student.h into the project
include_directories(include)

# Can manually add the sources using the set command as follows:
# set(SOURCES src/mainapp.cpp src/Student.cpp)

# However, the file(GLOB...) allows for wildcard additions:
file(GLOB SOURCES "src/*.cpp")

MESSAGE(STATUS "CMake demo: build for executable")

add_executable(testStudent ${SOURCES})
```

build for library

```cmake
cmake_minimum_required(VERSION 2.8.9)
project(directory_test)
set(CMAKE_BUILD_TYPE Release)

# Bring the headers, such as Student.h into the project
include_directories(include)

# However, the file(GLOB...) allows for wildcard additions:
file(GLOB SOURCES "src/*.cpp")

# Generate the shared library from the sources
# flag: SHARED, STATIC, MODULE
add_library(testStudent SHARED ${SOURCES})

MESSAGE(STATUS "CMake demo: build for library")

# Set the location for library installation -- i.e., /usr/lib in this case
# not really necessary in this example. Use "sudo make install" to apply
install(TARGETS testStudent DESTINATION /usr/lib)
```

use a shared or library

```cmake
cmake_minimum_required(VERSION 2.8.9)
project (TestLibrary)

# For the shared library:
set (PROJECT_LINK_LIBS libtestStudent.so)
link_directories(~/exploringBB/extras/cmake/studentlib_shared/build)

# For the static library:
# set (PROJECT_LINK_LIBS libtestStudent.a)
# link_directories(~/exploringBB/extras/cmake/studentlib_static/build)

include_directories(~/exploringBB/extras/cmake/studentlib_shared/include)

add_executable(libtest libtest.cpp)
target_link_libraries(libtest ${PROJECT_LINK_LIBS} )

MESSAGE(STATUS "CMake demo: use library")
```

## Useful Command

### Install Command

```cmake
INSTALL(TARGETS targets...
        [[ARCHIVE|LIBRARY|RUNTIME]
        [DESTINATION < dir >]
        [PERMISSIONS permissions...]  
        [CONFIGURATIONS
        [Debug|Release|...]]
        [COMPONENT < component >]
        [OPTIONAL]
        ] [...])

INSTALL(TARGETS myrun mylib mystaticlib
        RUNTIME DESTINATION bin
        LIBRARY DESTINATION lib
        ARCHIVE DESTINATION libstatic）


INSTALL(FILES files... DESTINATION <dir>
     [PERMISSIONS permissions...]
     [CONFIGURATIONS [Debug|Release|...]]
     [COMPONENT <component>]
     [RENAME <name>] [OPTIONAL])


INSTALL(FILES COPYRIGHT README DESTINATION share/doc/cmake/t2)
```

## Useful Tools

ldd and ar

```bash
ldd library.so
ar -t library.a
```
