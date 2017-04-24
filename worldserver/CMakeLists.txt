cmake_minimum_required (VERSION 2.8.11)
project (WorldServer)
find_package(Boost COMPONENTS system REQUIRED)
set(myIncludes  ${Boost_INCLUDE_DIRS} ${PROJECT_SOURCE_DIR}/lib)
include_directories(${myIncludes})
add_subdirectory(src)


