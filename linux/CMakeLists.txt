cmake_minimum_required(VERSION 3.16)

project(Hysteria2VpnClient)

# Set C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Find required packages
find_package(PkgConfig REQUIRED)
find_package(GTK3 REQUIRED)
find_package(WebKit2 REQUIRED)

# Include directories
include_directories(${CMAKE_SOURCE_DIR}/src)
include_directories(${GTK3_INCLUDE_DIRS})
include_directories(${WEBKIT2_INCLUDE_DIRS})

# Source files
set(SOURCES
    src/main.cpp
    src/App.cpp
    src/VpnManager.cpp
)

# Create executable
add_executable(${PROJECT_NAME} ${SOURCES})

# Link libraries
target_link_libraries(${PROJECT_NAME}
    ${GTK3_LIBRARIES}
    ${WEBKIT2_LIBRARIES}
    pthread
    dl
)

# Compiler flags
target_compile_options(${PROJECT_NAME} PRIVATE
    ${GTK3_CFLAGS_OTHER}
    -Wall
    -Wextra
    -std=c++17
)

# Install target
install(TARGETS ${PROJECT_NAME}
    RUNTIME DESTINATION bin
)
