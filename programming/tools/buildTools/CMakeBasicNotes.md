# CMake Basic Notes

<!-- TOC -->

- [CMake Basic Notes](#cmake-basic-notes)
  - [Basic Build System](#basic-build-system)
    - [Basic Options](#basic-options)
  - [Flow Control](#flow-control)
    - [if control](#if-control)
    - [foreach control](#foreach-control)
    - [while control](#while-control)
    - [function control](#function-control)
      - [Basic Usage of Function](#basic-usage-of-function)
      - [Parse Arguments of Function](#parse-arguments-of-function)
  - [Useful Command](#useful-command)
    - [Checking Command](#checking-command)
    - [Testing Command](#testing-command)
    - [Option Command](#option-command)
    - [Math Command](#math-command)
    - [List Command](#list-command)
    - [Package Command](#package-command)
    - [Install Command](#install-command)
      - [install binaries](#install-binaries)
      - [install normal files](#install-normal-files)
      - [install scripts](#install-scripts)
      - [install directories](#install-directories)
      - [Install Demo](#install-demo)
    - [find packages](#find-packages)
      - [Basic Usage of Find](#basic-usage-of-find)
      - [Find CMake](#find-cmake)
      - [Full Find Demo](#full-find-demo)
  - [Useful Tools](#useful-tools)
  - [Config Command](#config-command)
    - [Version Config](#version-config)
    - [Project Config](#project-config)
    - [Environment Config](#environment-config)
    - [Library for Clients Usage](#library-for-clients-usage)
  - [Test Setting](#test-setting)
  - [Generator Expression](#generator-expression)
  - [Submodule and Dependencies](#submodule-and-dependencies)
  - [CMake Patterns](#cmake-patterns)
    - [Modern CMake](#modern-cmake)
      - [Interface vs Private](#interface-vs-private)
    - [Nice Patterns](#nice-patterns)
    - [Anti Patterns](#anti-patterns)
  - [Makefile Notes](#makefile-notes)
    - [Makefile Macro](#makefile-macro)
      - [Built-in Makefile Macro](#built-in-makefile-macro)
    - [Built-in Makefile Variable](#built-in-makefile-variable)
    - [Makefile Inexplicit Rules](#makefile-inexplicit-rules)
      - [Makefile C Rules](#makefile-c-rules)
      - [Makefile C++ Rules](#makefile-c-rules-1)
      - [Makefile ASM Rules](#makefile-asm-rules)
      - [Makefile Object Linking](#makefile-object-linking)
    - [Makefile Function](#makefile-function)
    - [Makefile Best Practice](#makefile-best-practice)
  - [Reference](#reference)

<!-- /TOC -->

## Basic Build System

build for executable

```bash
cmake_minimum_required(VERSION 2.8.9)
project(directory_test)

add_definitions(-DUSEXX)
add_compile_options(-std=c++11 -Wall -Wextra)

# Bring the headers, such as Student.h into the project
include_directories(include)

# Can manually add the sources using the set command as follows:
# set(SOURCES src/mainApp.cpp src/Student.cpp)

# However, the file(GLOB...) allows for wildcard additions:
file(GLOB SOURCES "src/*.cpp")

message(STATUS "CMake demo: build for executable")

add_executable(testStudent ${SOURCES})
```

build for library

```bash
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

message(STATUS "CMake demo: build for library")

# Set the location for library installation -- i.e., /usr/lib in this case
# not really necessary in this example. Use "sudo make install" to apply
install(TARGETS testStudent DESTINATION /usr/lib)
```

use a shared or static library

```bash
cmake_minimum_required(VERSION 2.8.9)
project(TestLibrary)

# For the shared library:
set(PROJECT_LINK_LIBS libTestStudent.so)
link_directories(~/exploringBB/extras/cmake/studentLib_shared/build)

# For the static library:
# set (PROJECT_LINK_LIBS libTestStudent.a)
# link_directories(~/exploringBB/extras/cmake/studentLib_static/build)

include_directories(~/exploringBB/extras/cmake/studentLib_shared/include)

add_executable(libTest libTest.cpp)
target_link_libraries(libTest ${PROJECT_LINK_LIBS} )

message(STATUS "CMake demo: use library")
```

set output of library

```bash
# 指定lib输出目录
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/lib)
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/lib)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)

# 指定版本
set(DEMO5_VERSION_MAJOR 1)
set(DEMO5_VERSION_MINOR 1)
set(DEMO5_VERSION_PATCH 1)
set(DEMO5_VERSION ${DEMO5_VERSION_MAJOR}.${DEMO5_VERSION_MINOR}.${DEMO5_VERSION_PATCH})

aux_source_directory(. SRC_LIST)

add_library(demo5 SHARED ${SRC_LIST})
set_target_properties(
    demo5 PROPERTIES
    VERSION ${DEMO5_VERSION}
    SOVERSION ${DEMO5_VERSION_MAJOR}
)
```

build for library and executable

```bash
cmake_minimum_required(VERSION 3.5)
project(MiniSat VERSION 2.2 LANGUAGES CXX)

add_library(libMiniSat STATIC
    miniSat/core/Solver.cc
    miniSat/utils/Options.cc
    miniSat/utils/System.cc
    miniSat/simp/SimpSolver.cc
)

target_compile_features(libMiniSat
    PUBLIC
      cxx_attributes
      cxx_defaulted_functions
      cxx_deleted_functions
      cxx_final
)

target_include_directories(libMiniSat PUBLIC ${CMAKE_CURRENT_SOURCE_DIR})

target_compile_definitions(libMiniSat PUBLIC __STDC_LIMIT_MACROS __STDC_FORMAT_MACROS)

# Also build the two MiniSat executables
add_executable(miniSat miniSat/core/Main.cc)
target_link_libraries(miniSat libMiniSat)

add_executable(miniSat-simp miniSat/simp/Main.cc)
target_link_libraries(miniSat-simp libMiniSat)
```

### Basic Options

```bash
make VERBOSE=1
```

Standard options:

- `-DCMAKE_BUILD_TYPE=` Pick from Release, RelWithDebInfo, Debug, or sometimes more
- `-DCMAKE_INSTALL_PREFIX=` /usr/local (the default), ~/.local
- `-D BUILD_SHARED_LIBS=`
- `--trace` print every line of CMake

## Flow Control

### if control

- Unary: NOT, TARGET, EXISTS (file), DEFINED
- Binary: STREQUAL, AND, OR, MATCHES(regular expression), VERSION_LESS, VERSION_LESS_EQUAL

```bash
if(WIN32)
    message("This is win32 platform")
else()
    message("This is not win32 platform")
endif()
```

### foreach control

```bash
set(FOR_LIST demo1.cpp demo2.cpp demo3.cpp)
foreach(f ${FOR_LIST})
    message("now is file: " ${f})
endforeach ()
```

### while control

```bash
set(A "1")
set(B "1")
while(A LESS "1000000")
    message("${A}")                 # Print A
    math(EXPR T "${A} + ${B}")      # Add values of A and B; store result in T
    set(A "${B}")                   # Assign the value of B to A
    set(B "${T}")                   # Assign the value of T to B
endwhile()
```

### function control

#### Basic Usage of Function

```bash
function(doubleIt VALUE)
    math(EXPR RESULT "${VALUE} * 2")
    message("${RESULT}")
endfunction()

doubleIt("4")          # Prints: 8
```

```bash
function(doubleIt VARNAME VALUE)
    math(EXPR RESULT "${VALUE} * 2")
    set(${VARNAME} "${RESULT}" PARENT_SCOPE)
endfunction()

doubleIt(RESULT "4")   # Tell the function to set the variable named RESULT
message("${RESULT}")   # Prints: 8
```

```bash
function(doubleEach)
    foreach(ARG ${ARGN})           # Iterate over each argument
        math(EXPR N "${ARG} * 2")  # Double ARG numeric value
        message("${N}")            # Print N
    endforeach()
endfunction()

doubleEach(5 6 7 8)                # Prints 10, 12, 14, 16 on separate lines
```

#### Parse Arguments of Function

```bash
function(COMPLEX)
cmake_parse_arguments(
    COMPLEX_PREFIX
    "SINGLE;ANOTHER"
    "ONE_VALUE;ALSO_ONE_VALUE"
    "MULTI_VALUES"
    ${ARGN}
)

endfunction()

complex(SINGLE ONE_VALUE value MULTI_VALUES some other values)
```

Inside the function after this call, you'll find:

```bash
COMPLEX_PREFIX_SINGLE = TRUE
COMPLEX_PREFIX_ANOTHER = FALSE
COMPLEX_PREFIX_ONE_VALUE = "value"
COMPLEX_PREFIX_ALSO_ONE_VALUE = <UNDEFINED>
COMPLEX_PREFIX_MULTI_VALUES = "some;other;values"
```

## Useful Command

### Checking Command

```bash
# does this system provide the log and exp functions?
include(CheckFunctionExists)
check_function_exists(log HAVE_LOG)
check_function_exists(exp HAVE_EXP)
```

### Testing Command

```bash
#define a macro to simplify adding tests, then use it
macro(do_test arg result)
  add_test(TutorialComp${arg} Tutorial ${arg})
  set_tests_properties(TutorialComp${arg}
    PROPERTIES PASS_REGULAR_EXPRESSION ${result})
endmacro(do_test)

# do a bunch of result based tests
do_test(25 "25 is 5")
do_test(-25 "-25 is 0")
```

```bash
include(CTest)

# does the application run
add_test (TutorialRuns Tutorial 25)

# does it sqrt of 25
add_test (TutorialComp25 Tutorial 25)
set_tests_properties (TutorialComp25 PROPERTIES PASS_REGULAR_EXPRESSION "25 is 5")

# does it handle negative numbers
add_test (TutorialNegative Tutorial -25)
set_tests_properties (
    TutorialNegative PROPERTIES
    PASS_REGULAR_EXPRESSION "-25 is 0"
)

# does it handle small numbers
add_test (TutorialSmall Tutorial 0.0001)
set_tests_properties (
    TutorialSmall PROPERTIES
    PASS_REGULAR_EXPRESSION "0.0001 is 0.01"
)

# does the usage message work?
add_test (TutorialUsage Tutorial)
set_tests_properties (
    TutorialUsage PROPERTIES
    PASS_REGULAR_EXPRESSION "Usage:.*number"
)
```

### Option Command

```bash
# 是否使用我们自己的函数？
option(USE_MATH
        "Use tutorial provided math implementation" ON)

# add the MathFunctions library?
if(USE_MATH)
  include_directories("${PROJECT_SOURCE_DIR}/MathFunctions")
  add_subdirectory(MathFunctions)
  set(EXTRA_LIBS ${EXTRA_LIBS} MathFunctions)
endif(USE_MATH)

# add the executable
add_executable(Tutorial tutorial.cxx)
target_link_libraries(Tutorial  ${EXTRA_LIBS})
```

### Math Command

```bash
set(ARGS "EXPR;T;1 + 1")
math(${ARGS})                      # Equivalent to calling math(EXPR T "1 + 1")
```

### List Command

```bash
set(MY_LIST These are separate arguments)
list(REMOVE_ITEM MY_LIST "separate")  # Removes "separate" from the list
message("${MY_LIST}")                 # Prints: These;are;arguments
```

### Package Command

```bash
# build a CPack driven installer package
include(InstallRequiredSystemLibraries)
set(CPACK_RESOURCE_FILE_LICENSE
     "${CMAKE_CURRENT_SOURCE_DIR}/License.txt")
set(CPACK_PACKAGE_VERSION_MAJOR "${Tutorial_VERSION_MAJOR}")
set(CPACK_PACKAGE_VERSION_MINOR "${Tutorial_VERSION_MINOR}")
include(CPack)
```

```bash
cpack --config CPackConfig.cmake
cpack --config CPackSourceConfig.cmake
```

### Install Command

#### install binaries

```bash
INSTALL(TARGETS targets...
        [[ARCHIVE|LIBRARY|RUNTIME]
        [DESTINATION < dir >]
        [PERMISSIONS permissions...]  
        [CONFIGURATIONS
        [Debug|Release|...]]
        [COMPONENT < component >]
        [OPTIONAL]
        ] [...])

INSTALL(TARGETS myRun myLib myStaticLib
        RUNTIME DESTINATION bin
        LIBRARY DESTINATION lib
        ARCHIVE DESTINATION libStatic）
```

#### install normal files

```bash
INSTALL(FILES files... DESTINATION <dir>
     [PERMISSIONS permissions...]
     [CONFIGURATIONS [Debug|Release|...]]
     [COMPONENT <component>]
     [RENAME <name>] [OPTIONAL])


INSTALL(FILES COPYRIGHT README DESTINATION share/doc/cmake/t2)
```

#### install scripts

```bash
INSTALL(PROGRAMS files... DESTINATION <dir>
     [PERMISSIONS permissions...]
     [CONFIGURATIONS [Debug|Release|...]]
     [COMPONENT <component>]
     [RENAME <name>] [OPTIONAL])


INSTALL(PROGRAMS runHello.sh DESTINATION bin)
```

#### install directories

```bash
INSTALL(DIRECTORY dirs... DESTINATION <dir>
     [FILE_PERMISSIONS permissions...]
     [DIRECTORY_PERMISSIONS permissions...]
     [USE_SOURCE_PERMISSIONS]
     [CONFIGURATIONS [Debug|Release|...]]
     [COMPONENT <component>]
     [[PATTERN <pattern> | REGEX <regex>]
     [EXCLUDE] [PERMISSIONS permissions...]] [...])

INSTALL(DIRECTORY icons scripts/ DESTINATION share/myProj
     PATTERN "CVS" EXCLUDE
     PATTERN "scripts/*"
     PERMISSIONS OWNER_EXECUTE OWNER_WRITE OWNER_READ
     GROUP_EXECUTE GROUP_READ)
```

#### Install Demo

```bash
find_package(Bar 2.0 REQUIRED)
add_library(Foo ...)
target_link_libraries(Foo PRIVATE Bar::Bar)

install(TARGETS Foo EXPORT FooTargets
  LIBRARY DESTINATION lib
  ARCHIVE DESTINATION lib
  RUNTIME DESTINATION bin
  INCLUDES DESTINATION include
)

install(EXPORT FooTargets
  FILE FooTargets.cmake
  NAMESPACE Foo::
  DESTINATION lib/cmake/Foo
)
```

### find packages

find modules

```bash
cmake –-help-module-list
ls /usr/share/cmake/Modules/

cmake --help-module FindBZip2
```

#### Basic Usage of Find

```bash
project(helloWorld)
add_executable(helloWorld hello.c)
find_package (BZip2)
if (BZIP2_FOUND)
    include_directories(${BZIP_INCLUDE_DIRS})
    target_link_libraries(helloWorld ${BZIP2_LIBRARIES})
endif (BZIP2_FOUND)
```

```bash
find_path(Foo_INCLUDE_DIR foo.h)
find_library(Foo_LIBRARY foo)
mark_as_advanced(Foo_INCLUDE_DIR Foo_LIBRARY)

include(FindPackageHandleStandardArgs)
find_package_handle_standard_args(Foo
  REQUIRED_VARS Foo_LIBRARY Foo_INCLUDE_DIR
)

if(Foo_FOUND AND NOT TARGET Foo::Foo)
  add_library(Foo::Foo UNKNOWN IMPORTED)
  set_target_properties(Foo::Foo PROPERTIES
    IMPORTED_LINK_INTERFACE_LANGUAGES "CXX"
    IMPORTED_LOCATION "${Foo_LIBRARY}"
    INTERFACE_INCLUDE_DIRECTORIES "${Foo_INCLUDE_DIR}"
  )
endif()
```

#### Find CMake

Find.cmake: add find module for project

```bash
# cmake/FindDEMO9LIB.cmake
# 辅助输出信息
message("now using FindDEMO9LIB.cmake find demo9 lib")

# 将demo9.h文件路径赋值给DEMO9LIB_INCLUDE_DIR
FIND_PATH(DEMO9LIB_INCLUDE_DIR demo9.h /usr/include/demo9/
        /usr/local/demo9/include/)
message("./h dir ${DEMO9LIB_INCLUDE_DIR}")

# 将libDemo9_lib.a文件路径赋值给DEMO9LIB_LIBRARY
FIND_LIBRARY(DEMO9LIB_LIBRARY libDemo9_lib.a /usr/local/demo9/lib/)
message("lib dir: ${DEMO9LIB_LIBRARY}")

if(DEMO9LIB_INCLUDE_DIR AND DEMO9LIB_LIBRARY)
    # 设置变量结果
    set(DEMO9LIB_FOUND TRUE)
endif(DEMO9LIB_INCLUDE_DIR AND DEMO9LIB_LIBRARY)
```

#### Full Find Demo

```bash
# CMakeLists.txt
cmake_minimum_required(VERSION 3.5)

project(demo9)

# create libDemo9_lib.a
set(SRC_LIB demo9.cpp)
add_library(demo9_lib STATIC ${SRC_LIB})

# install it
install(TARGETS demo9_lib DESTINATION demo9/lib)
install(FILES demo9.h DESTINATION demo9/include)

# create demo9_main executable
set(SRC_EXE demo9_main.cpp)

# set demo9_lib cmake module path
set(CMAKE_MODULE_PATH ${PROJECT_SOURCE_DIR}/cmake)
message("cmake_module_path: ${CMAKE_MODULE_PATH}")
find_package(DEMO9LIB)

if(DEMO9LIB_FOUND)
    add_executable(demo9_main ${SRC_EXE})
    message("found demo9 ${DEMO9LIB_INCLUDE_DIR} ${DEMO9LIB_LIBRARY}")
    include_directories(${DEMO9LIB_INCLUDE_DIR})
    target_link_libraries(demo9_main ${DEMO9LIB_LIBRARY})
else()
    message("not found DEMO9LIB_FOUND")
endif(DEMO9LIB_FOUND)
```

## Useful Tools

ldd and ar

```bash
ldd library.so
ar -t library.a
```

Makefile

```bash
# -----------------------------------------------------------------------------
# CMake project wrapper Makefile ----------------------------------------------
# -----------------------------------------------------------------------------

SHELL := /bin/bash
RM    := rm -rf
MKDIR := mkdir -p

all: ./build/Makefile
    @ $(MAKE) -C build

./build/Makefile:
    @  ($(MKDIR) build > /dev/null)
    @  (cd build > /dev/null 2>&1 && cmake ..)

clean:
    @  ($(MKDIR) build > /dev/null)
    @  (cd build > /dev/null 2>&1 && cmake .. > /dev/null 2>&1)
    @- $(MAKE) --silent -C build clean || true
    @- $(RM) ./build/Makefile
    @- $(RM) ./build/src
    @- $(RM) ./build/test
    @- $(RM) ./build/CMake*
    @- $(RM) ./build/cmake.*
    @- $(RM) ./build/*.cmake
    @- $(RM) ./build/*.txt

ifeq ($(findstring clean,$(MAKECMDGOALS)),)
    $(MAKECMDGOALS): ./build/Makefile
    @ $(MAKE) -C build $(MAKECMDGOALS)
endif
```

## Config Command

### Version Config

```bash
cmake_minimum_required(VERSION 3.1)

if(${CMAKE_VERSION} VERSION_LESS 3.13)
  cmake_policy(VERSION ${CMAKE_MAJOR_VERSION}.${CMAKE_MINOR_VERSION})
else()
  cmake_policy(VERSION 3.13)
endif()
```

### Project Config

```bash
project(MyProject VERSION 1.0 DESCRIPTION "Very nice project" LANGUAGES CXX)
```

### Environment Config

`set(ENV{variable_name} value)` and get `$ENV{variable_name}` environment variables

### Library for Clients Usage

```bash
include(CMakePackageConfigHelpers)
write_basic_package_version_file("FooConfigVersion.cmake"
  VERSION ${Foo_VERSION}
  COMPATIBILITY SameMajorVersion
)

install(FILES "FooConfig.cmake" "FooConfigVersion.cmake"
  DESTINATION lib/cmake/Foo
)
```

```bash
include(CMakeFindDependencyMacro)
find_dependency(Bar 2.0)
include("${CMAKE_CURRENT_LIST_DIR}/FooTargets.cmake")
```

## Test Setting

```bash
set(CTEST_SOURCE_DIRECTORY "/source")
set(CTEST_BINARY_DIRECTORY "/binary")

set(ENV{CXXFLAGS} "--coverage")
set(CTEST_CMAKE_GENERATOR "Ninja")
set(CTEST_USE_LAUNCHERS 1)

set(CTEST_COVERAGE_COMMAND "gcov")
set(CTEST_MEMORYCHECK_COMMAND "valgrind")
#set(CTEST_MEMORYCHECK_TYPE "ThreadSanitizer")

ctest_start("Continuous")
ctest_configure()
ctest_build()
ctest_test()
ctest_coverage()
ctest_memcheck()
ctest_submit()
```

```bash
macro(package_add_test TESTNAME)
    add_executable(${TESTNAME} ${ARGN})
    target_link_libraries(${TESTNAME} gtest gmock gtest_main)
    add_test(${TESTNAME} COMMAND ${TESTNAME})
    set_target_properties(${TESTNAME} PROPERTIES FOLDER tests)
endmacro()

package_add_test(test1 test1.cpp)
```

## Generator Expression

Most CMake commands happen at configure time,
include the if statements seen above.
Generator expressions were added at runtime.
They are evaluated in target properties:

- If you want to put a compile flag only for the DEBUG configuration
- Limiting an item to a certain language only, such as CXX
- Accessing configuration dependent properties, like target file location
- Giving a different location for build and install directories

```bash
target_include_directories(MyTarget PUBLIC
  $<BUILD_INTERFACE:"${CMAKE_CURRENT_SOURCE_DIR}/include">
  $<INSTALL_INTERFACE:include>
)
```

## Submodule and Dependencies

```bash
find_package(Git QUIET)

if(GIT_FOUND AND EXISTS "${PROJECT_SOURCE_DIR}/.git")
  execute_process(COMMAND
    ${GIT_EXECUTABLE} submodule update --init --recursive
    WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR} RESULT_VARIABLE GIT_SUBMOD_RESULT
  )

  if(NOT GIT_SUBMOD_RESULT EQUAL "0")
    message(FATAL_ERROR "git submodule update --init failed with ${GIT_SUBMOD_RESULT}")
  endif()
endif()
```

## CMake Patterns

### Modern CMake

Modern CMake is all about targets and properties.

Constructors of Targets:

- add_executable()
- add_library()

Member variables of Targets:

- Target properties

Member functions:

- get_target_property()
- set_target_properties()
- get_property(TARGET)
- set_property(TARGET)
- target_compile_definitions()
- target_compile_features()
- target_compile_options()
- target_include_directories()
- target_link_libraries()
- target_sources()

#### Interface vs Private

interface properties model usage requirements,
whereas private properties model build requirements of targets.

### Nice Patterns

- Think in targets (Object-Oriented)
- Export your interface: You should be able to run from build or install
- Write a Config.cmake file: This is what a library author should do to support clients
- Make ALIAS targets to keep usage consistent
- Combine common functionality into clearly documented functions
- Use lowercase function names
- Upper case is for variables
- Use cmake_policy and/or range of versions

### Anti Patterns

- Do not use global functions: e.g `link_directories`, `include_libraries`
- Don't add unneeded PUBLIC requirements e.g `-Wall`
- Don't GLOB files
- Link to built files directly: Always link to targets if available
- Never skip PUBLIC/PRIVATE when linking

## Makefile Notes

### Makefile Macro

```makefile
foo := a.o b.o c.o
bar := $(foo:.o=.c)
first_second = Hello
a = first
b = second
all = $($a_$b)
```

这里的`$a_$b` 组成了 `first_second`, 于是, \$(all)的值就是“Hello”。

#### Built-in Makefile Macro

- AR: 函数库打包程序。默认命令是“ar”
- AS: 汇编语言编译程序。默认命令是“as”
- CC: C 语言编译程序。默认命令是“cc”
- CXX: C++语言编译程序。默认命令是“g++”
- CO: 从 RCS 文件中扩展文件程序。默认命令是“co”
- CPP: C 程序的预处理器（输出是标准输出设备）。默认命令是“\$(CC) –E”
- FC: Fortran 和 RatFor 的编译器和预处理程序。默认命令是“f77”
- GET: 从 SCCS 文件中扩展文件的程序。默认命令是“get”。
- LEX: Lex 方法分析器程序（针对于 C 或 RatFor）。默认命令是“lex”
- PC: Pascal 语言编译程序。默认命令是“pc”
- YACC: Yacc 文法分析器（针对于 C 程序）。默认命令是“yacc”
- YACCR: Yacc 文法分析器（针对于 RatFor 程序）。默认命令是“yacc –r”
- MAKEINFO: 转换 TexInfo 源文件（.texi）到 Info 文件程序。默认命令是“makeinfo”
- TEX: 从 TeX 源文件创建 TeX DVI 文件的程序。默认命令是“tex”
- TEXI2DVI: 从 TexInfo 源文件创建军 TeX DVI 文件的程序。默认命令是“texi2dvi”
- WEAVE: 转换 Web 到 TeX 的程序。默认命令是“weave”
- CWEAVE: 转换 C Web 到 TeX 的程序。默认命令是“cweave”
- TANGLE: 转换 Web 到 Pascal 语言的程序。默认命令是“tangle”
- CTANGLE: 转换 C Web 到 C。默认命令是“ctangle”
- RM: 删除文件命令。默认命令是“rm –f”
- ARFLAGS: 函数库打包程序 AR 命令的参数。默认值是“rv”
- ASFLAGS: 汇编语言编译器参数。（当明显地调用“.s”或“.S”文件时）
- CFLAGS: C 语言编译器参数
- CXXFLAGS: C++语言编译器参数
- COFLAGS: RCS 命令参数
- CPPFLAGS: C 预处理器参数。（ C 和 Fortran 编译器也会用到）
- FFLAGS: Fortran 语言编译器参数
- GFLAGS: SCCS “get”程序参数
- LDFLAGS: 链接器参数。（如：“ld”)
- LFLAGS: Lex 文法分析器参数
- PFLAGS: Pascal 语言编译器参数
- RFLAGS: RatFor 程序的 Fortran 编译器参数
- YFLAGS: Yacc 文法分析器参数

### Built-in Makefile Variable

- $@: 表示规则中的目标文件集。在模式规则中，如果有多个目标，那么，"$@"就是匹配于目标中模式定义的集合
- $%: 仅当目标是函数库文件中，表示规则中的目标成员名。
  例如，如果一个目标是"foo.a(bar.o)"，那么，"$%"就是"bar.o"，"\$@"就是"foo.a"。
  如果目标不是函数库文件（Unix 下是[.a]，Windows 下是[.lib]），那么，其值为空
- $<: 依赖目标中的第一个目标名字。如果依赖目标是以模式（即"%"）定义的，
  那么"$<"将是符合模式的一系列的文件集。注意，其是一个一个取出来的
- \$?: 所有比目标新的依赖目标的集合。以空格分隔
- \$^: 所有的依赖目标的集合。以空格分隔。如果在依赖目标中有多个重复的，那个这个变量会去除重复的依赖目标，只保留一份
- $+: 这个变量很像"$^"，也是所有依赖目标的集合。只是它不去除重复的依赖目标
- `$*` : 这个变量表示目标模式中"%"及其之前的部分。如果目标是"dir/a.foo.b"，
  并且目标的模式是`a.%.b`，那么，
  `$*`的值就是`dir/a.foo`。这个变量对于构造有关联的文件名是比较有较。如果目标中没有模式的定义，那么`$*`也就不能被推导出，
  但是，如果目标文件的后缀是 make 所识别的，那么`$*`就是除了后缀的那一部分。例如：如果目标是`foo.c`，
  因为".c"是 make 所能识别的后缀名，所以，`$*`的值就是"foo"。这个特性是 GNU make 的，
  很有可能不兼容于其它版本的 make，
  所以，你应该尽量避免使用`$*`，
  除非是在隐含规则或是静态模式中。
  如果目标中的后缀是 make 所不能识别的，那么`$*`就是空值
- $(@D): 表示"$@"的目录部分（不以斜杠作为结尾），
  如果"$@"值是"dir/foo.o"，那么"$(@D)"就是"dir"，
  而如果"\$@"中没有包含斜杠的话，其值就是"."（当前目录）
- $(@F): 表示"$@"的文件部分，如果"$@"值是"dir/foo.o"，那么"$(@F)"就是"foo.o"，
  "$(@F)"相当于函数"$(notdir \$@)"
- `$(*D)"/"$(*F)`: 和上面所述的同理，也是取文件的目录部分和文件部分。对于上面的那个例子，`$(*D)`返回"dir"，而`$(*F)`返回"foo"
- "$(%D)"/"$(%F)": 分别表示了函数包文件成员的目录部分和文件部分。
  这对于形同"archive(member)"形式的目标中的"member"中包含了不同的目录很有用。
- "$(<D)"/"$(<F)": 分别表示依赖文件的目录部分和文件部分。
- "$(^D)"/"$(^F)": 分别表示所有依赖文件的目录部分和文件部分。（无相同的）
- "$(+D)"/"$(+F)": 分别表示所有依赖文件的目录部分和文件部分。（可以有相同的）
- "$(?D)"/"$(?F)": 分别表示被更新的依赖文件的目录部分和文件部分。

### Makefile Inexplicit Rules

#### Makefile C Rules

`<n>.o`的目标的依赖目标会自动推导为`<n>.c`，并且其生成命令是“$(CC) –c $(CPPFLAGS) \$(CFLAGS)”

#### Makefile C++ Rules

`<n>.o`的目标的依赖目标会自动推导为`<n>.cc`或是`<n>.C`,
并且其生成命令是`$(CXX) –c $(CPPFLAGS) \$(CFLAGS)`
(建议使用`.cc`作为 C++源文件的后缀，而不是`.C`).

#### Makefile ASM Rules

`<n>.o` 的目标的依赖目标会自动推导为`<n>.s`，默认使用编译品“as”，并且其生成命令是：“$(AS) $(ASFLAGS)”。
`<n>.s` 的目标的依赖目标会自动推导为`<n>.S`，默认使用 C 预编译器“cpp”，并且其生成命令是：“$(AS) $(ASFLAGS)”。

#### Makefile Object Linking

`<n>`目标依赖于`<n>.o`，通过运行 C 的编译器来运行链接程序生成（一般是“ld”），其生成命令是：
`$(CC) $(LDFLAGS) <n>.o $(LOADLIBES) $(LDLIBS)`
这个规则对于只有一个源文件的工程有效，同时也对多个 Object 文件（由不同的源文件生成）的也有效。例如如下规则：

x : y.o z.o

并且“x.c”、“y.c”和“z.c”都存在时，隐含规则将执行如下命令：

cc -c x.c -o x.o
cc -c y.c -o y.o
cc -c z.c -o z.o
cc x.o y.o z.o -o x
rm -f x.o
rm -f y.o
rm -f z.o

### Makefile Function

- filter
- shell
- subst
- wildcard

### Makefile Best Practice

```makefile
$(filter %.o,$(files)): %.o: %.c
$(filter %.elc,$(files)): %.elc: %.el
```

```makefile
$(CC) -c $(CFLAGS) $< -o $@
```

```makefile
(%.o) : %.c
$(CC) $(CFLAGS) $(CPPFLAGS) -c $< -o $*.o
$(AR) r $@ $*.o
$(RM) $*.o
```

```makefile
%.d: %.c
@set -e; rm -f $@; /
$(CC) -M $(CPPFLAGS) $< > $@.$$$$; /
sed 's,/($*/)/.o[ :]*,/1.o $@ : ,g' < $@.$$$$ > $@; /
$(RM) -f $@.$$$$
```

## Reference

- [Official Reference](https://cmake.org/cmake/help/latest)
- [CMake Practice](http://file.ncnynl.com/ros/CMake%20Practice.pdf)
- [CGold CMake](https://cgold.readthedocs.io/en/latest)
- [Modern CMake](https://cliutils.gitlab.io/modern-cmake)
